let aladin;
A.init.then(() => {
    aladin = A.aladin('#aladin-lite-div', {
        fov: 60,
        projection: "SIN",
        cooFrame: 'equatorial',
        survey: 'P/Mellinger/color',
        showFullscreenControl: false,
        toolbar: {
            position: 'bottomleft'
        },
        showLayersControl: true,
        showCooGridControl: true,
        showProjectionControl: false,
        showFrame: false
    });

    const markers = A.catalog({ 
        name: 'My images',
        color: '#00ffff',
        shape: "circle",
        displayLabel: true,
        sourceSize: "20"
    });
    aladin.addCatalog(markers);

    // ***************
    // Overlay Images
    // ***************
    const M51 = A.image('https://images.jakeastro.io/m51.jpeg', {
        name: 'M51',
        imgFormat: 'jpeg',
        // wcs data is from astrometry.net submision. 
        // need to download wcs.fits file then parse manually by changing file extension to .txt
        // then search for below datapoints required
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 202.748433353,
            CRVAL2: 47.0335497883,
            CRPIX1: 2854.3536377,
            CRPIX2: 1728.72976685,
            CD1_1: 7.65912303502E-05,
            CD1_2: 0.000204708633182,
            CD2_1: -0.000204730716872,
            CD2_2: 7.71919306021E-05,
        },
        successCallback: (ra, dec, fov, image) => {
            // Create a marker for an image so it can be easily seen from a distance
            // Using aladin catalog to do it
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'M51', popupDesc: 'Whirlpool Galaxy' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(M51, 'M51');
});