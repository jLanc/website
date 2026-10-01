# Personal Website
---
Welcome to my personal website. I am developing it to showcase my astrophotography, various tooling I create and the hikes I've enjoyed in the UK. All photos are my own. 

The website was built both as a learning task for frontend web development, and because I wanted a more personal touch to the display of my projects. 

### Tech Stack & Libraries Used
---
+ HTML 
+ Javascript
+ CSS
+ MapBox - Hiking Map
+ Aladin - Star Map
+ WebGL Fluid - Fluid simulation interactive background
+ CloudFlare - Website Hosting & CI/CD runner on repo push to publish new website version 
+ Git LFS - Storage of thumbnail images
+ GitHub - Code Storage

### Feature Roadmap
---
| Feature | Description |
| ------ | ----------- |
| Home Page | Slideshow of astro images with panning movement ✅ |
| Gallery Page | Single Page to display all astro images ✅ |
| Hikes Page | Interactive Map Box 3d map with gpx track overlay ✅ |
| About Page | Simple page with overview of myself ✅ |
| Interactive Background | 2d Fluid simulation WebGL background ✅ |
| Star Map | Pannable night sky map with astro image overlay in correct positions 👨‍💻 |
| Technical Debit Cleanup 1| Remove duplicate css entries 🗓️|
| Blog Page| Similar layer to gallery but for blog posts on scientific endeavors. Posts should use a modal to overlay post contents when selected 🗓️|
| Technical Debit Cleanup 2| Use JSON for Star Map entries rather than adding code directly into html file. Create JS to parse json & construct what we need 🗓️|
| Star Map Styling| Create CSS for star map buttons so they're less harsh to the eye 🗓️|
| Gallery Page Modal| When an image is selected, a modal should pop up displaying the image and a description. Expansion to have on hover plate solved coordinates on second iteration 🗓️|
| Star Map FOV simulator| Telescope FOV indicator with a selectable telescope setup (sct or 13028HNT) 🗓️|
| Star Map custom horizon| Horizon overlay 🗓️|
| Star Map Planned Targets| Overlay or FOV indicator mapping locations of planned imaging targets 🗓️|


### Workflow For Uploading New Image
---
1. Download medium sized image to use as thumbnail from my AstroBin. Store in assets/astro-image-thumbnails folder
2. Download extra large sized image to use as main gallery and home page image also from AstroBin. Store in Cloudfront R2 bucket
3. Add entry into home page and gallery
4. Upload extra large image to astrometry.net, download WCS coordinate.fits file from successful plate solve job
5. Create new entry in Star Map page
5. rename wcs.fits to wcs.txt and pick out the image coordinate values we need for star map.
6. Create star map entry in html file (for now - see feature list)
7. Test star map entry locally with full sized image in R2 bucket
8. If all good, commit & push to live