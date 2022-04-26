import { link } from "fs";
import http from "http";
import { JSDOM } from "jsdom";

var options = {
  host: "www.comicsrss.com",
  port: 80,
  path: "/",
};

var content = "";

const getRSSLinks = (htmlText) => {
  const dom = new JSDOM(htmlText);

  const ulList = dom.window.document.getElementById("comics-list");

  const aList = ulList.getElementsByTagName("a");

  const links = [];
  for (let i = 0; i < aList.length; i++) {
    const aItem = aList.item(i);

    if (aItem.href.endsWith(".rss")) {
      links.push("https://www.comicsrss.com" + aItem.href.substring(1));
    }
  }

  return links;
};

const getRandomLink = (links) => {
  return links[Math.floor(Math.random() * links.length)];
};

// Init

var req = http.request(options, function (res) {
  res.setEncoding("utf8");
  res.on("data", function (chunk) {
    content += chunk;
  });

  res.on("end", function () {
    const htmlTrim = content.trim();

    const links = getRSSLinks(htmlTrim);

    const randomLink = getRandomLink(links);

    console.log("Random Link:\n" + randomLink);
  });
});

req.end();
