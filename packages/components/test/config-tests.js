const showroom = require('showroom/puppeteer')({
    port: 8082,
    headless: process.env.NODE_ENV !== 'development'
});

before(async () => {
    await showroom.start();

    global.showroom = showroom;
});

after(async () => {
    await showroom.stop();
    console.log('Showroom down');
    delete global.showroom;
});