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
            CRVAL1: 202.748475904,
            CRVAL2: 47.0335854634,
            CRPIX1: 1903.05758667,
            CRPIX2: convertWCStoAladinCRPIX2(1152.73989868, 1600),
            CD1_1: 0.000114839718337,
            CD1_2: swapCDSign(0.000306960785317),
            CD2_1: -0.000307080250502,
            CD2_2: swapCDSign(0.0001158181453255),
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
            CRPIX2: convertWCStoAladinCRPIX2(419.315711975, 1701),
            CD1_1: 3.25351360059E-05,
            CD1_2: swapCDSign(0.001434030750455),
            CD2_1: -0.00143217748797,
            CD2_2: swapCDSign(3.24560388415E-05),
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

    const Orion_Nebula = A.image('https://images.jakeastro.io/Orion_Nebula.jpg', {
        name: 'Orion Nebula',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 84.2968940375,
            CRVAL2: -5.79723083066,
            CRPIX1: 1795.85941569,
            CRPIX2: convertWCStoAladinCRPIX2(1155.69907633, 1811),
            CD1_1: 0.000377004632075,
            CD1_2: swapCDSign(0.00121229172654),
            CD2_1: -0.00121270813927,
            CD2_2: swapCDSign(0.000376874392791),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Orion Nebula', popupDesc: 'Orion Nebula' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Orion_Nebula, 'Sculptor Galaxy');

    const Sculptor_Galaxy = A.image('https://images.jakeastro.io/Sculptor_Galaxy.jpg', {
        name: 'Sculptor Galaxy',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 11.7999198006,
            CRVAL2: -25.419074962,
            CRPIX1: 1880.3789978,
            CRPIX2: convertWCStoAladinCRPIX2(899.573699951, 1717),
            CD1_1: -0.000149371359336,
            CD1_2: swapCDSign(0.000209196996388),
            CD2_1: -0.00020881649716,
            CD2_2: swapCDSign(-0.000149224473923),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Sculptor Galaxy', popupDesc: 'Sculptor Galaxy' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Sculptor_Galaxy, 'Sculptor Galaxy');

    const NGC1365 = A.image('https://images.jakeastro.io/NGC1365.jpg', {
        name: 'NGC1365',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 54.6036961049,
            CRVAL2: -36.4276325089,
            CRPIX1: 1879.08247884,
            CRPIX2: convertWCStoAladinCRPIX2(1023.43623861, 1665),
            CD1_1: 0.00045614867396,
            CD1_2: swapCDSign(0.00137448362354),
            CD2_1: -0.00137465780068,
            CD2_2: swapCDSign(0.000458458507196),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'NGC1365', popupDesc: 'NGC1365' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(NGC1365, 'NGC1365');

    const Tadpole_Nebula = A.image('https://images.jakeastro.io/Tadpole_Nebula.jpg', {
        name: 'Tadpole Nebula',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 80.6315365793,
            CRVAL2: 33.3587670468,
            CRPIX1: 1392.89859009,
            CRPIX2: convertWCStoAladinCRPIX2(1038.20043945, 1781),
            CD1_1: -0.000242308068456,
            CD1_2: swapCDSign(0.000121308926644),
            CD2_1: -0.000121181207985,
            CD2_2: swapCDSign(-0.000242145521042),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Tadpole Nebula', popupDesc: 'Tadpole Nebula' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Tadpole_Nebula, 'Tadpole Nebula');

    const Centaurus_A = A.image('https://images.jakeastro.io/Centaurus_A.jpg', {
        name: 'Centaurus A',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 200.755551898,
            CRVAL2: -43.2852293034,
            CRPIX1: 1808.37382507,
            CRPIX2: convertWCStoAladinCRPIX2(343.030528545, 1673),
            CD1_1: -0.000187027971158,
            CD1_2: swapCDSign(0.000683333176443),
            CD2_1: -0.000683010390726,
            CD2_2: swapCDSign(-0.000187311690756),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Centaurus A', popupDesc: 'Centaurus A' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Centaurus_A, 'Centaurus A');
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