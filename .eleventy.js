const pluginLazyImages = require('eleventy-plugin-lazyimages');
const pluginRssFeed = require('@11ty/eleventy-plugin-rss');

const filterNbsp = require('eleventy-nbsp-filter');

const filters = require('./src/utils/filters.js');
const shortcodes = require('./src/utils/shortcodes.js');

module.exports = function (config) {
  // Plugins
  config.addPlugin(pluginRssFeed);

  if (process.env.ELEVENTY_ENV == 'production') {
    config.addPlugin(pluginLazyImages);
  }

  // Markdown It
  let markdownIt = require('markdown-it');
  let markdownItFootnotes = require('markdown-it-footnote');
  let markdownItSub = require('markdown-it-sub');
  let markdownItSup = require('markdown-it-sup');
  let markdownItExternalAnchor = require('markdown-it-external-anchor');
  let options = {
    html: true,
  };

  let markdownLib = markdownIt(options)
    .use(markdownItFootnotes)
    .use(markdownItExternalAnchor, {
      domain: 'hamburg.stefanimhoff.de',
      class: 'external',
    })
    .use(markdownItSub)
    .use(markdownItSup);

  config.setLibrary('md', markdownLib);

  // Compress and combine JS files
  config.addFilter('jsmin', require('./src/utils/minify-js.js'));

  // Minify the HTML in production
  if (process.env.ELEVENTY_ENV == 'production') {
    config.addTransform('htmlmin', require('./src/utils/minify-html.js'));
  }

  // Shortcodes
  config.addShortcode('email', shortcodes.email);
  config.addShortcode('map', shortcodes.map);
  config.addShortcode('youtube', shortcodes.youtube);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });
  config.addFilter('nbsp', filterNbsp(2, 15));

  // Watch for changes and reload
  config.addWatchTarget('src/assets');

  // Copy static files to dist
  config.addPassthroughCopy({
    'src/static/**/*.{xml,html,ico}': '.',
  });
  config.addPassthroughCopy({
    'src/static/.well-known/*': '.well-known',
  });
  config.addPassthroughCopy({
    'src/downloads': 'downloads',
  });
  config.addPassthroughCopy({
    'src/assets/fonts': 'assets/fonts',
  });
  config.addPassthroughCopy({
    'src/assets/images': 'assets/images',
  });

  // Deep-Merge
  config.setDataDeepMerge(true);

  // Set input and output folders
  return {
    dir: {
      input: 'src',
      data: 'data',
      includes: 'includes',
      layouts: 'layouts',
      output: 'dist',
    },
    templateFormats: ['njk', 'md', '11ty.js', 'jpg', 'png', 'svg'],
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
