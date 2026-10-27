/** @param {import("@awesome.me/buildawesome").UserConfig} eleventyConfig */
module.exports = async function ($config) {
  $config.addPassthroughCopy("css");
  $config.addPassthroughCopy("assets");
  $config.addPassthroughCopy({ "fonts/woff2": "fonts/woff2" });

  $config.addWatchTarget("css/");
  $config.addWatchTarget("assets/");
  $config.addWatchTarget("fonts/woff2/");

  // "$4,890" — prices come from src/_data/pricing.json.
  $config.addFilter("usd", (n) => "$" + Number(n).toLocaleString("en-US"));
  $config.addFilter("merge", (a, b) => ({ ...a, ...b }));
  $config.addFilter("findBy", (list, key, value) => (list || []).find((item) => item[key] === value));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
