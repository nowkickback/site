/** @param {import("@awesome.me/buildawesome").UserConfig} eleventyConfig */
module.exports = async function ($config) {
  $config.addPassthroughCopy("css");
  $config.addPassthroughCopy("assets");
  $config.addPassthroughCopy({ "fonts/woff2": "fonts/woff2" });

  $config.addWatchTarget("css/");
  $config.addWatchTarget("assets/");
  $config.addWatchTarget("fonts/woff2/");

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
