import http from "http";
import { JSDOM } from "jsdom";

var options = {
  host: "www.comicsrss.com",
  port: 80,
  path: "/",
};

var content = "";

var req = http.request(options, function (res) {
  res.setEncoding("utf8");
  res.on("data", function (chunk) {
    content += chunk;
  });

  res.on("end", function () {
    const htmlTrim = content.trim();

    const dom = new JSDOM(htmlTrim);

    const title = dom.window.document.querySelector("title");

    console.log(title.textContent);
  });
});

req.end();
