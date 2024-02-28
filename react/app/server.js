// server.js (Express.js 예시)

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 5000;

app.get('/screenshot', async (req, res) => {
  const url = req.query.url; // 캡처할 페이지의 URL
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': screenshot.length,
  });
  res.end(screenshot, 'binary');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
