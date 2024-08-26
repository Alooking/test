const puppeteer = require('puppeteer');

(async () => {
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
})();
