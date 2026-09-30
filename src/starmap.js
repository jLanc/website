let aladin;
A.init.then(() => {
    aladin = A.aladin('#aladin-lite-div', {
        fov: 60,
        target: "17 04 10.06 -23 45 38.3",
        projection: "STG",
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
    /*const M51 = A.image('https://images.jakeastro.io/m51.jpeg', {
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
    aladin.setOverlayImageLayer(M51, 'M51');*/

        const Tail_of_RHO = A.image('https://images.jakeastro.io/Tail_Of_RHO.jpeg', {
        name: 'Tail of RHO',
        imgFormat: 'jpeg',
        // wcs data is from astrometry.net submision. 
        // need to download wcs.fits file then parse manually by changing file extension to .txt
        // then search for below datapoints required
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 245.758889483,
            CRVAL2: -23.9655442211,
            CRPIX1: 1343.86599223,
            // height of image here comes from the IMAGEH property returned by wcs.fits file
            CRPIX2: convertWCStoAladinCRPIX2(419.315711975,1701),
            CD1_1: swapCDSign(3.25351360059E-05),
            CD1_2: 0.001434030750455,
            CD2_1: swapCDSign(-0.00143217748797),
            CD2_2: 3.24560388415E-05,
        },
        successCallback: (ra, dec, fov, image) => {
            // Create a marker for an image so it can be easily seen from a distance
            // Using aladin catalog to do it
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Tail of RHO', popupDesc: 'Tail of RHO' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Tail_of_RHO, 'Tail of RHO');
});


// The following conversion functions are required to convert WCS to Aladin coordinates.
// The issue is that Aladin expect .fits image format which counts pixel rows from bottom up
// but the .jpeg's which are supplied count pixel rows from top down.
function convertWCStoAladinCRPIX2(wcsVal, height) {
    return height + 1 - wcsVal
}

// simple function so swapping the sign of the CDx_x value we get from wcs.fits file
function swapCDSign(cdVal) {
    return -cdVal
}