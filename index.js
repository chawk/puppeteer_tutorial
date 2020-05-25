const puppeteer = require('puppeteer')
const fileHandler = require('./fileHandler')

const videos = require('./data/videos')

async function start() {

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-fullscreen'
        ]
    })
    
    const page = await browser.newPage()

    await page.setViewport({ width: 1920, height: 1080 })

    for (var x = 0; x < videos.videos.length; x++) {
        await page.goto(`https://www.youtube.com/watch?v=${videos.videos[x]}`)

        let viewsElement = await page.waitForXPath('//*[@id="count"]/yt-view-count-renderer/span[1]', 5000);
        let views = await (await viewsElement.getProperty('textContent')).jsonValue();
        views = views.replace(/ views/g, '');
        views = views.replace(/,/g, '');
        fileHandler.writeData(videos.videos[x], views, 'views')

        let descriptionElement = await page.waitForXPath('//*[@id="description"]/yt-formatted-string', 5000);
        let description = await (await descriptionElement.getProperty('textContent')).jsonValue();

        fileHandler.writeData(videos.videos[x], description, 'description')


    }  
}

start()
