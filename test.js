const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

// Define your main function as an async function
async function yourMainFunction() {
    const browser = await puppeteer.launch({
        executablePath: '/opt/render/project/.render/chrome/opt/google/chrome/google-chrome',
        args: ['--no-sandbox']
    });
    console.log("browser launched");

    const page = await browser.newPage();
    await page.goto('https://google.com');
    console.log("went to website");

    const title = await page.title();
    console.log("Page title: " + title);

    await browser.close();
    console.log("closed");

    return title;
}

// Define a route to trigger the Puppeteer script
app.get('/run-puppeteer', async (req, res) => {
    try {
        const title = await yourMainFunction();
        res.send(`Page title: ${title}`);
    } catch (error) {
        console.error("An error occurred: ", error);
        res.status(500).send('An error occurred while running Puppeteer');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
});
