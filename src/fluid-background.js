const LIBRARY_URL = 'https://esm.run/webgl-fluid-enhanced@0.8.0';

const CONTAINER_ID = 'fluid-background';

const DEFAULTS = {
  colorPalette: ['#1b2a6b', '#000b4dff'],
  backgroundColor: '#0a0a0a',
  hover: true,             // react to moouse movement
  curl: 0,                 
  splatRadius: 0.15,
  splatForce: 1200,        // the 6000 default is far too energetic behind text
  velocityDissipation: 0.4,
  densityDissipation: 0.2, // lower = the initial glow lingers longer
  simResolution: 64,       
  dyeResolution: 512,
  pressureIterations: 8,
  brightness: 0.2,
  colorful: false,
  bloom: true,
  bloomIntensity: 0.25,
  sunrays: true,
};

const GLOW_DEFAULTS = {
  count: 7,        // number of initial soft blobs
  frames: 20,      // softly show glowing blobs initially
  radius: 0.9,     // splatRadius while the glow is first drawn
  intensity: 0.5,  // total dye strength
};

let instance = null;

function injectStyles() {
  if (document.getElementById(`${CONTAINER_ID}-styles`)) return;

  const style = document.createElement('style');
  style.id = `${CONTAINER_ID}-styles`;
  style.textContent = `
    #${CONTAINER_ID} {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
    }
    #${CONTAINER_ID} canvas {
      display: block;
    }
  `;
  document.head.appendChild(style);
}

function makeContainer() {
  let el = document.getElementById(CONTAINER_ID);
  if (!el) {
    el = document.createElement('div');
    el.id = CONTAINER_ID;
    el.setAttribute('aria-hidden', 'true');
    document.body.prepend(el);
  }
  return el;
}

/**
 * The container is pointer-events:none so links stay clickable, which means
 * the canvas never receives a mousemove of its own. Forward them.
 * The library reads offsetX/offsetY, not clientX/clientY — and since the
 * canvas fills the viewport the two are equivalent.
 */
function forwardPointer(canvas) {
  addEventListener('mousemove', (e) => {
    const ev = new MouseEvent('mousemove');
    Object.defineProperty(ev, 'offsetX', { value: e.clientX });
    Object.defineProperty(ev, 'offsetY', { value: e.clientY });
    canvas.dispatchEvent(ev);
  }, { passive: true });
}

/** '#1b2a6b' -> { r: 0.106, g: 0.165, b: 0.42 } */
function hexToUnit(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16) / 255,
    g: parseInt(h.substring(2, 4), 16) / 255,
    b: parseInt(h.substring(4, 6), 16) / 255,
  };
}

/**
 * Fade a faint, motionless glow in on load.
 *
 * Neither public splat method can do this:
 *   - multipleSplats hardcodes its force as 1000 * (Math.random() - 0.5),
 *     so the dye gets launched across the screen. No config option for it.
 *   - splatAtLocation accepts a velocity of 0, but takes a hex string, and
 *     the library's HEXtoRGB returns 0-255 values that it then multiplies
 *     by 10. Even '#010101' lands ~20x too bright and blows out to white.
 *
 * Simulation.splat() takes normalised coordinates, an explicit velocity and
 * a 0-1 colour, which is exactly right. It is `private` in the TypeScript
 * source, but that is compile-time only, so it exists at runtime. We are
 * pinned to 0.8.0, so it cannot shift under us — but this is still reaching
 * past the public API, hence the guard below.
 */
function initialGlow(simulation, palette, options, restoreRadius) {
  const { count, frames, radius, intensity } = { ...GLOW_DEFAULTS, ...options };

  const inner = simulation.simulation;
  if (!inner || typeof inner.splat !== 'function') {
    console.warn('Fluid background: splat() unavailable, skipping the glow.');
    return;
  }

  // Positions are fixed for the whole ramp. Re-randomising every frame would
  // scatter faint dots instead of building a few coherent blobs.
  const perFrame = intensity / frames;
  const blobs = Array.from({ length: count }, (_, i) => {
    const unit = hexToUnit(palette[i % palette.length]);
    return {
      x: Math.random(),
      y: Math.random(),
      color: {
        r: unit.r * perFrame,
        g: unit.g * perFrame,
        b: unit.b * perFrame,
      },
    };
  });

  // A wide radius is what makes these read as a glow rather than dots.
  simulation.setConfig({ splatRadius: radius });

  let frame = 0;
  const tick = () => {
    // Velocity of exactly zero: the dye is deposited and stays put.
    blobs.forEach((b) => inner.splat(b.x, b.y, 0, 0, b.color));

    if (++frame < frames) requestAnimationFrame(tick);
    else simulation.setConfig({ splatRadius: restoreRadius });
  };

  tick();
}

/**
 * Start the background. Safe to call more than once — later calls return the
 * existing instance rather than stacking simulations.
 * @param {object} overrides - webgl-fluid-enhanced config keys (camelCase),
 *   plus `glow`: false to skip the opening blooms, or an object to tune
 *   { count, frames, radius, intensity }.
 * @returns {Promise<object|null>} the simulation, or null if guards said no
 */
export async function initFluidBackground(overrides = {}) {
  if (instance) return instance;

  const { glow = true, ...config } = overrides;

  let WebGLFluidEnhanced;
  try {
    ({ default: WebGLFluidEnhanced } = await import(LIBRARY_URL));
  } catch (err) {
    console.warn('Fluid background: library failed to load, skipping.', err);
    return null;
  }

  injectStyles();
  const container = makeContainer();

  const simulation = new WebGLFluidEnhanced(container);

  // The constructor writes inline styles onto the container, including
  // position:relative, which beats the stylesheet. Put it back.
  container.style.position = 'fixed';

  const settings = { ...DEFAULTS, ...config };
  simulation.setConfig(settings);
  simulation.start();

  // Must come after start() — the splat methods are no-ops before then.
  if (glow) {
    initialGlow(
      simulation,
      settings.colorPalette,
      glow === true ? {} : glow,
      settings.splatRadius,
    );
  }

  forwardPointer(container.querySelector('canvas'));

  // stop() cancels the rAF and unbinds listeners; start() re-inits cleanly.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) simulation.stop();
    else simulation.start();
  });

  addEventListener('beforeunload', () => simulation.stop());

  instance = simulation;
  return simulation;
}

/** Tear the background down and remove its element. */
export function destroyFluidBackground() {
  if (!instance) return;
  instance.stop();
  document.getElementById(CONTAINER_ID)?.remove();
  instance = null;
}

// Auto-start when loaded as `fluid-background.js?auto`.
if (new URL(import.meta.url).searchParams.has('auto')) {
  initFluidBackground();
}