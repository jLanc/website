// Astro Tools JavaScript Functions

async function runTool(event, toolName) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const resultDiv = document.getElementById(`result-${toolName}`);

    // Handle exposure calculator locally
    if (toolName === 'exposure') {
        return calculateEquivalentExposure(form, resultDiv);
    }

    // Show loading state
    resultDiv.classList.add('show');
    resultDiv.textContent = 'Running...';

    // Template for calling backend python scripts
    // Included for future dev but not used now


    /* Build CLI-style parameters for other tools
    const params = [];
    for (let [key, value] of formData.entries()) {
        params.push(`--${key}`);
        params.push(value);
    }

    try {
        // Call your Python backend
        const response = await fetch('/api/astro-tools', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tool: toolName,
                params: params
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        resultDiv.textContent = `Command: python ${toolName}.py ${params.join(' ')}\n\nResult:\n${JSON.stringify(result, null, 2)}`;

    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }*/

    return false;
}

function calculateEquivalentExposure(form, resultDiv) {
    // Get input values
    const f1 = parseFloat(form.fratio1.value);
    const exp1 = parseFloat(form['exposure-time'].value); // Using exposure time for T1
    const f2 = parseFloat(form.fratio2.value);

    // Validate inputs
    if (f1 <= 0 || f2 <= 0 || exp1 <= 0) {
        resultDiv.classList.add('show');
        resultDiv.innerHTML = '<span style="color: red;">Error: All values must be positive numbers</span>';
        return false;
    }

    // Calc explination
    // For diffuse objects with fixed camera, SNR=1/f^2 (surface brightness dependent)
    // Signal=(D/f)^2 x exposure_time where D is aperture
    // For equivalent SNR: (1/f1^2) x exp1 = (1/f2^2) x exp2
    // Therefore: exp2 = exp1 x (f2/f1)^2

    const exp2 = exp1 * Math.pow(f2 / f1, 2);

    // Calculate ratio
    const ratio = f2 / f1;
    const exposureRatio = exp2 / exp1;

    // Format times nicely
    const formatTime = (seconds) => {
        if (seconds < 60) {
            return `${seconds.toFixed(1)}s`;
        } else if (seconds < 3600) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.round(seconds % 60);
            return `${mins}m ${secs}s`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const mins = Math.round((seconds % 3600) / 60);
            return `${hours}h ${mins}m`;
        }
    };

    // Show result
    resultDiv.classList.add('show');
    resultDiv.innerHTML = `
        <strong>Results:</strong><br><br>
        <strong>Telescope 1:</strong> f/${f1} @ ${formatTime(exp1)}<br>
        <strong>Telescope 2:</strong> f/${f2} @ ${formatTime(exp2)}<br><br>
        <strong>Equivalent Exposure:</strong> ${formatTime(exp2)}<br>
        <strong>Exposure Multiplier:</strong> ${exposureRatio.toFixed(2)}x<br><br>
    `;

    return false;
}