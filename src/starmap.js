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
        name: 'Whirlpool Galaxy - M51',
        imgFormat: 'jpeg',
        // wcs data is from astrometry.net submision. 
        // need to download wcs.fits file then parse manually by changing file extension to .txt
        // then search for below datapoints required
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 202.748475904,  // RA point of reference
            CRVAL2: 47.0335854634,  // DEC point of reference
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
                A.marker(ra, dec, { popupTitle: 'Whirlpool Galaxy - M51' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(M51, 'Whirlpool Galaxy - M51');

    const Tail_of_RHO = A.image('https://images.jakeastro.io/Tail_Of_RHO.jpeg', {
        name: 'Tail of RHO - IC4604',
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
                A.marker(ra, dec, { popupTitle: 'Tail of RHO - IC4604' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Tail_of_RHO, 'Tail of RHO - IC4604');

    const Sculptor_Galaxy = A.image('https://images.jakeastro.io/Sculptor_Galaxy.jpg', {
        name: 'Sculptor Galaxy - NGC253',
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
                A.marker(ra, dec, { popupTitle: 'Sculptor Galaxy - NGC253' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Sculptor_Galaxy, 'Sculptor Galaxy - NGC253');

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
                A.marker(ra, dec, { popupTitle: 'NGC1365' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(NGC1365, 'NGC1365');

    const Tadpole_Nebula = A.image('https://images.jakeastro.io/Tadpole_Nebula.jpg', {
        name: 'Tadpole Nebula - NGC1893',
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
                A.marker(ra, dec, { popupTitle: 'Tadpole Nebula - NGC1893' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Tadpole_Nebula, 'Tadpole Nebula - NGC1893');

    const Centaurus_A = A.image('https://images.jakeastro.io/Centaurus_A.jpg', {
        name: 'Centaurus A - NGC5128',
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
                A.marker(ra, dec, { popupTitle: 'Centaurus A - NGC5128' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Centaurus_A, 'Centaurus A - NGC5128');

    const Witch_Head = A.image('https://images.jakeastro.io/IC2118.jpg', {
        name: 'Witch\'s Head - IC2118',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 76.5755416142,
            CRVAL2: -8.19899915396,
            CRPIX1: 2023.21207682,
            CRPIX2: convertWCStoAladinCRPIX2(1011.91623942, 1697),
            CD1_1: -6.60935482733E-05,
            CD1_2: swapCDSign(0.00132272638655),
            CD2_1: -0.0013224311271,
            CD2_2: swapCDSign(-6.6031917906E-05),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Witch\'s Head - IC2118' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Witch_Head, 'Witch\'s Head - IC2118');

    const Anteater_Nebula = A.image('https://images.jakeastro.io/Anteater_Nebula.jpg', {
        name: 'Anteater_Nebula - NGC6726',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 285.99850158,
            CRVAL2: -37.3318483589,
            CRPIX1: 2544.26786296,
            CRPIX2: convertWCStoAladinCRPIX2(3354.11604818, 5134),
            CD1_1: -0.000296483602066,
            CD1_2: swapCDSign(-4.0998033356E-05),
            CD2_1: 4.09980906266E-05,
            CD2_2: swapCDSign(-0.000295789980018),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Anteater_Nebula - NGC6726' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Anteater_Nebula, 'Anteater Nebula - NGC6726');

    const Orion_Nebula = A.image('https://images.jakeastro.io/Orion_Nebula.jpg', {
        name: 'Orion Nebula - NGC1976',
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
                A.marker(ra, dec, { popupTitle: 'Orion Nebula - NGC1976' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Orion_Nebula, 'Orion Nebula - NGC1976');

    const Horsehead_Nebula = A.image('https://images.jakeastro.io/horsehead_nebula.jpg', {
        name: 'Horsehead Nebula - IC434',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 84.9159837519,
            CRVAL2: -2.70371636125,
            CRPIX1: 1359.08266195,
            CRPIX2: convertWCStoAladinCRPIX2(484.560175578, 1868),
            CD1_1: 0.000426413162502,
            CD1_2: swapCDSign(0.00100021699462),
            CD2_1: -0.00100019790719,
            CD2_2: swapCDSign(0.000426779974677),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Horsehead Nebula - IC434' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Horsehead_Nebula, 'Horsehead Nebula - IC434');

    const Carina_Nebula = A.image('https://images.jakeastro.io/carinaSHOcity.jpg', {
        name: 'Carina Nebula - NGC3372',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 160.341078706,
            CRVAL2: -60.735042197,
            CRPIX1: 1018.27912903,
            CRPIX2: convertWCStoAladinCRPIX2(429.944290161, 1667),
            CD1_1: 0.00133373167053,
            CD1_2: swapCDSign(-0.000512781437316),
            CD2_1: 0.000511740638441,
            CD2_2: swapCDSign(0.00133482037829),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Carina Nebula - NGC3372' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Carina_Nebula, 'Carina Nebula - NGC3372');

    const NGC5139 = A.image('https://images.jakeastro.io/NGC5139.jpg', {
        name: 'Globular Cluster NGC5139',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 200.255875997,
            CRVAL2: -46.5981008637,
            CRPIX1: 4917.77502441,
            CRPIX2: convertWCStoAladinCRPIX2(2377.04794312, 3613),
            CD1_1: -0.000322532561609,
            CD1_2: swapCDSign(-0.000502274940284),
            CD2_1: 0.000502248935089,
            CD2_2: swapCDSign(-0.000323471555397),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Globular Cluster NGC5139' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(NGC5139, 'Globular Cluster NGC5139');

    const Iris_Nebula = A.image('https://images.jakeastro.io/iris.jpeg', {
        name: 'Iris Nebula - NGC7023',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 315.515372,
            CRVAL2: 68.4210726724,
            CRPIX1: 692.056152344,
            CRPIX2: convertWCStoAladinCRPIX2(13.083106995, 1836),
            CD1_1: -0.00023253126547,
            CD1_2: swapCDSign(0.000308715359157),
            CD2_1: -0.000308488622039,
            CD2_2: swapCDSign(-0.000232431935716),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Iris Nebula - NGC7023' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Iris_Nebula, 'Iris Nebula - NGC7023');

    const Crab_Nebula = A.image('https://images.jakeastro.io/m1.jpg', {
        name: 'Crab Nebula - M1',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 315.515372,
            CRVAL2: 68.4210726724,
            CRPIX1: 692.056152344,
            CRPIX2: convertWCStoAladinCRPIX2(13.083106995, 1836),
            CD1_1: -0.00023253126547,
            CD1_2: swapCDSign(0.000308715359157),
            CD2_1: -0.000308488622039,
            CD2_2: swapCDSign(-0.000232431935716),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Crab Nebula - M1' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Iris_Nebula, 'Crab Nebula - M1');

    const Veil_Nebula = A.image('https://images.jakeastro.io/veil.jpg', {
        name: 'Veil Nebula - NGC6960',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 311.447255488,
            CRVAL2: 30.7811756101,
            CRPIX1: 1372.7996521,
            CRPIX2: convertWCStoAladinCRPIX2(837.680267334, 1771),
            CD1_1: 0.000128624194075,
            CD1_2: swapCDSign(0.000368163406287),
            CD2_1: -0.000367865953458,
            CD2_2: swapCDSign(0.000128410411368),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Veil Nebula - NGC6960' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Veil_Nebula, 'Veil Nebula - NGC6960');

    const Bodes_Galaxy = A.image('https://images.jakeastro.io/m81.jpg', {
        name: 'Bode\'s Galaxy - M81',
        imgFormat: 'jpeg',
        wcs: {
            NAXIS: 2,
            CTYPE1: 'RA---TAN',
            CTYPE2: 'DEC--TAN',
            CRVAL1: 148.740351955,
            CRVAL2: 69.075480912,
            CRPIX1: 1169.64736938,
            CRPIX2: convertWCStoAladinCRPIX2(873.078323364, 1889),
            CD1_1: 0.000256165968618,
            CD1_2: swapCDSign(0.000219208285645),
            CD2_1: -0.000219263240637,
            CD2_2: swapCDSign(0.000256541289583),
        },
        successCallback: (ra, dec, fov, image) => {
            markers.addSources([
                A.marker(ra, dec, { popupTitle: 'Bode\'s Galaxy - M81' })
            ]);
            image.setOpacity(1);
        }
    });
    aladin.setOverlayImageLayer(Bodes_Galaxy, 'Bode\'s Galaxy - M81');
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