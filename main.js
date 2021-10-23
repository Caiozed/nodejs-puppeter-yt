const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
    });

    let page = await browser.newPage();
    await page.goto('https://google.com');

    await page.evaluate(() => {
        let input = document.querySelector('input[name=q]')
        input.value = "nodejs";
    });

    await page.keyboard.press("Enter");

    pages = await browser.pages();
    page = pages[1]

    let links = await page.evaluate(() => {
        var filtro = /node/g;
        let htmlLinks = [...document.getElementsByTagName('a')];
        return htmlLinks.map(m => m.href)
        .filter(a => filtro.test(a))
    });

    console.log(links)
    await browser.close();
})()
