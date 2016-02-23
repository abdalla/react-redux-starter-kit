var webpack = require('webpack');
module.exports = {
  entry: [
      'webpack-dev-server/client?http://localhost:8081',
      './src/js/app.js'
  ],
  output: {
    path: __dirname + '/client/js',
    filename: 'bundle.js'
  },
  module: {
      loaders: [
          { test: /\.js?$/, loaders: ['babel', 'babel-loader'], exclude: /node_modules/ }
      ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'source-map'
};
