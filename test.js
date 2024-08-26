const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

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

// Function to run the Puppeteer script in an infinite loop
(async () => {
    while (true) {
        try {
            await yourMainFunction();
        } catch (error) {
            console.error("An error occurred: ", error);
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before rerunning
    }
})();

// Express server to serve status or other endpoints
app.get('/', (req, res) => {
    res.send('Puppeteer script is running continuously!');
});

// Additional endpoints (if needed)
app.get('/status', (req, res) => {
    res.send('Puppeteer is still running!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
});
