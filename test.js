const puppeteer = require('puppeteer-core');

(async () => { 
    const browser = await puppeteer.launch({
        headless: false, // Set to true if you want to run in headless mode
        executablePath: '/data/data/com.termux/files/usr/lib/chromium/chrome'
    });
    console.log('Browser launched');
    
    const page = await browser.newPage();
    console.log('New page created');
    
    await page.goto('https://login.live.com', { waitUntil: 'networkidle2' });
    console.log('Navigated to login.live.com');
    
    // Enter your email
    await page.type('input[name="loginfmt"]', 'your-email@example.com');
    console.log('Email entered');

    // Wait for and click the "Next" button
    await page.waitForSelector('button#idSIButton9', { visible: true });
    await page.click('button#idSIButton9');
    console.log('Clicked Next');

    // Wait for the password field to appear
    await page.waitForSelector('input[name="passwd"]', { visible: true });

    // Enter your password
    await page.type('input[name="passwd"]', 'your-password');
    console.log('Password entered');

    // Click the "Sign in" button
    await page.click('button#idSIButton9');
    console.log('Clicked Sign in');
    
    // Handle any additional steps, such as "Stay signed in?" prompt
    await page.waitForSelector('button#idSIButton9', { visible: true });
    await page.click('button#idSIButton9');
    console.log('Clicked Stay signed in');

    // Wait for the page to fully load after login
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log('Logged in successfully');
    
    // Close the browser
    await browser.close();
    console.log('Browser closed');
})();
