const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.use(express.static('public'));

app.get('/', async (request, response) => {
    try {
        response.send(`<body bgcolor="#F0FFFF"><div style="text-align: center;vertical-align: middle;"><img class="logo" src="/images/hello.gif" alt="Star" height="360" width="600"></div><br style="line-height: 10"><div style="text-align: center;vertical-align: middle;"><button onclick="window.location.href='/hello'"><b>Get some quotes</b></button></div></img></body>`);
    } catch(e) {
        console.log(e)
    }
});

let getQuote = async () => {
  return new Promise (async (succ, err) => {
    try {
      const browser = await puppeteer.launch({args:['--no-sandbox', '--disable-setuid-sandbox']});
      const page = await browser.newPage();
      await page.goto("http://toanhtran.github.io/quote_generator/");
      let quote = await page.evaluate(() => document.querySelector(".quote").innerHTML);
      succ(quote);
    } catch(e) {
      err(e);
    }
  });
};

app.get('/hello', async (request, response) => {
    try {
        let quote = await getQuote();
        response.send(`<body background = "/images/black.png"><div style="text-align: center;vertical-align: middle;"><img class="logo" src="/images/heading.png" alt="Star" height="360" width="600"></div><div style="text-align: center;vertical-align: middle;line-height: 90px; color: white; font-size: large;>` + quote +
            `<br><br><button onClick=location=URL><b>refresh</b></button></div></img></body>`);
    } catch (e) {
        console.log(e);
    }
});

app.listen(3000, () => {
  console.log("listen:3000");
});
