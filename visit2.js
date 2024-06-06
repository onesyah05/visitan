const axios = require('axios');
const puppeteer = require('puppeteer');
const UserAgent = require('user-agents');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time);
    });
}

const getLinks = async () => {
    try {
        const response = await axios.get('https://jsonblob.com/api/jsonBlob/1243773632148004864');
        // return response.data;
        return ["https://www.highcpmgate.com/hfti37z08a?key=211ed34a603fc6ced7d0721c88cf2d3b"]
    } catch (error) {
        console.log('Error fetching links:', error);
        return [];
    }
};

const visits = async (url, retries = 2) => {
    for (let i = 0; i < retries; i++) {
        try {
            const userAgents = [
                'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A5341f Safari/604.1',
                'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Mobile Safari/537.36',
                'Mozilla/5.0 (iPad; CPU OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/604.1',
                'Mozilla/5.0 (Linux; Android 9; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
            ];
            const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();

            await page.setUserAgent(userAgent);
            await page.setDefaultNavigationTimeout(120000); // Set navigation timeout to 120 seconds

            const response = await page.goto(url, { waitUntil: 'load', timeout: 120000 });

            console.log(`Opened URL with user agent: ${userAgent}`);
            console.log(`Response status: ${response.status()}`);

            await delay(5000); // Wait for 5 seconds
            await browser.close();
            break; // Exit loop if successful
        } catch (error) {
            console.log(`Attempt ${i + 1} failed for ${url}:`, error.message);
            if (i === retries - 1) {
                console.log(`Failed to open ${url} after ${retries} attempts`);
            } else {
                console.log(`Retrying ${url}...`);
            }
        }
    }
};

(async () => {
    while (true) {
        const links = await getLinks();
        let counter = 1;
        for (const link of links) {
            console.log(`\n-----------------------------------------`);
            console.log(`LINK KE ${counter}`);
            for (let i = 0; i < 10; i++) {
                console.log(`\n[Click ke ${i + 1}]`);
                await visits(link, 2);
                console.log('\n');
            }
            console.log(`-----------------------------------------\n`);
            counter++;
            await delay(5000); 
        }
        await delay(5000); // Wait for 5 seconds before repeating
    }
})();
