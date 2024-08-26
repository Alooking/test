const express = require('express');
const puppeteer = require('puppeteer');

let page; // Declare page at a higher scope

// Function to launch the browser and navigate to the login page
async function launchBrowser() {
    const browser = await puppeteer.launch({
        headless: true, // Set to true if you want to run in headless mode
        executablePath: '/opt/render/project/.render/chrome/opt/google/chrome',
        args: ['--no-sandbox']
    });
    console.log('Browser launched');
    
    page = await browser.newPage();
    console.log('New page created');
    
    await page.goto('https://login.live.com', { waitUntil: 'networkidle2' });
    console.log('Navigated to login.live.com');
}

// Start the browser when the script starts
launchBrowser();

// Set up the Express server
const app = express();
app.use(express.json()); // To parse JSON body in POST request

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Enter the email
        await page.type('input[name="loginfmt"]', email);
        console.log('Email entered');

        // Wait for and click the "Next" button
        await page.waitForSelector('button#idSIButton9', { visible: true });
        await page.click('button#idSIButton9');
        console.log('Clicked Next');

        // Wait for the password field to appear
        await page.waitForSelector('input[name="passwd"]', { visible: true });

        // Enter the password
        await page.type('input[name="passwd"]', password);
        console.log('Password entered');

        // Click the "Sign in" button
        await page.click('button#idSIButton9');
        console.log('Clicked Sign in');
        
        // Handle any additional steps, such as "Stay signed in?" prompt
        await page.waitForSelector('button#declineButton', { visible: true });
        await page.click('button#declineButton');
        console.log('Clicked Stay signed in');

        // Wait for the page to fully load after login
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('Logged in successfully');

        res.send('Logged in successfully');
    } catch (error) {
        console.error("An error occurred during login: ", error);
        res.status(500).send('An error occurred during login');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
