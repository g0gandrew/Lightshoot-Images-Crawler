// Importing Modules
const { default: axios } = require("axios");
const fs = require('fs');
const saveImage = require('images-downloader').images;
//

// Global Variables
const website = "https://prnt.sc/";
//

setInterval(async () => {
    let randomLink = randomLinkGenerator();
    let fullLink = website + randomLink;
    try {
        let htmlPage = (await axios.get(fullLink)).data; // Gets the whole HTML page with image code inside
        let imageStoragePath = `./images/${randomLink}` // Setting the image storage path
        const imageExternalLink = extractImageLink(htmlPage);
        await saveImage([imageExternalLink], `./images`);

    }
    catch (e) {
        console.log("Image couldn't be saved!");
    }
}, 5000);


function extractImageLink(htmlPage) {
    let imageLink = "";
    let imageLinkStartPattern = `<meta name="twitter:image:src" content="`;
    let patternStringStartPosition = htmlPage.search(imageLinkStartPattern);
    for (let i = patternStringStartPosition + imageLinkStartPattern.length; i < 1000000; ++i) {
        if (!(htmlPage[i] == `"`))
            imageLink += htmlPage[i];
        else
            break;
    }
    return imageLink;
}


function randomLinkGenerator() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const validLink = alphabet[Math.floor(Math.random() * 26)] + alphabet[Math.floor(Math.random() * 26)] + Math.floor(Math.random() * 9 + 1) + Math.floor(Math.random() * 9 + 1) + Math.floor(Math.random() * 9 + 1) + Math.floor(Math.random() * 9 + 1);
    return validLink;
}

