const express = require("express");
const https = require("https");
const { extractStories } = require("./htmlParser");

const app = express();
const PORT = 3000;
// Fetch HTML from a URL
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status Code: ${res.statusCode}`));
        return;
      }
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}


app.get("/", (req,res)=>{
    res.send("API Working...");
})


app.get("/getTimeStories", async (req, res) => {
  try {
    const html = await fetchHTML("https://time.com");
    const stories = extractStories(html);
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server Started`);
});

//Export handler for Vercel (FOR Deployment)
module.exports = app;
