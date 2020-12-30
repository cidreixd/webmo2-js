const path = require('path')
const isDevelop = process.env.MODE === 'dev' ? true : false

module.exports = {
  mode: isDevelop ? 'development' : 'production',
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: "umd",
    library: "Webmo",
    filename: isDevelop ? "webmo.js" : "webmo.min.js",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: [
      '.ts',
      '.js',
    ],
  },
}
