"use strict";

let express = require('express');
let path = require('path');

let webpack = require('webpack');
let webpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config');

let app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'src')));

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
})

const webpackPort = parseInt(app.get('port'),10) + 1;

if(process.env.environment != "prod") {
  new webpackDevServer(webpack(config), {
     historyApiFallback: false,
     stats: {
       colors: true
     },
     proxy: {
       "*": "http://localhost:" + app.get('port')
     }
  }).listen(webpackPort, '0.0.0.0', function (err, result) {
     if (err) {
       console.log(err);
     }
     console.log(`Listening at localhost:${webpackPort}`);
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
