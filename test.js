const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/opt/render/project/.render/chrome/opt/google/chrome/google-chrome',
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await browser.close();
})();
