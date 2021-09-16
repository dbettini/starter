"use strict";

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": `${__dirname}/app`,
      },
    },
    entry: {
      app: "./app/main.js",
    },
  },
};
