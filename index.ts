// Imports
import puppeteer from "puppeteer";

function logExecution(message: string) {
  // Create local file
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, "runtime.log");
  // Get current date
  const currentDate = new Date();
  // Write log
  fs.appendFileSync(
    filePath,
    `${currentDate.toISOString()} - ${message}\n`,
    "utf8"
  );
}

// Main function
(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
  });
  // Create a new page
  const page = await browser.newPage();
  //Set height and width of the viewport
  await page.setViewport({
    width: 1366,
    height: 768,
  });
  // Go to the URL
  const url = "https://ge.globo.com/futebol/brasileirao-serie-a/";
  await page.goto(url, { waitUntil: "networkidle2" });
  // LOG
  logExecution("Page loaded");
  // Scroll down 200px of the page
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  // Take a screenshot
  await page.screenshot({ path: "./screenshot.png" });
  // LOG
  logExecution("Screenshot taken");
  // Close the browser
  await browser.close();
})();
