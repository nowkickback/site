const fs = require("fs");
const path = require("path");

module.exports = function () {
  const dir = path.join(__dirname, "products");
  const list = [];

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json")) continue;
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    list.push(data);
  }

  return list.sort((a, b) => (a.order || 0) - (b.order || 0));
};
