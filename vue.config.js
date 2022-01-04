const ansiRegex = require('ansi-regex')
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  // lintOnSave : false,
  publicPath: '/',
  assetsDir: process.env.BASE_URL,
  transpileDependencies: [ansiRegex]
}