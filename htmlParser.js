function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–");
}

function extractStories(html) {

  const sliceStart = html.indexOf("Latest Stories");
  const windowed = sliceStart > -1 ? html.slice(sliceStart, sliceStart + 150000) : html;

  const regex = /<a[^>]+href="(https?:\/\/time\.com\/\d+[^"]+)"[^>]*>(.*?)<\/a>/gi;
  const stories = [];
  const seen = new Set();

  let match;
  while ((match = regex.exec(windowed)) && stories.length < 6) {
    const link = match[1];
    const title = decodeEntities(match[2].replace(/<[^>]*>/g, "").trim());

    if (title && !seen.has(link)) {
      seen.add(link);
      stories.push({ title, link });
    }
  }

  return stories;
}

module.exports = { extractStories };
