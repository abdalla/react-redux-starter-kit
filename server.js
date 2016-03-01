'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//upload stuff for express ==> https://github.com/expressjs/multer


var app = (0, _express2.default)(); //log stuff for express ==> https://github.com/expressjs/morgan
//body parsin stuff => https://github.com/expressjs/body-parser

var upload = (0, _multer2.default)();

var port = process.env.PORT || 1407;
var env = process.env.NODE_ENV;

console.log(_path2.default.join(__dirname, '/build'));
app.use('/static', _express2.default.static(_path2.default.join(__dirname, '/build')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var server = app.listen(port, function () {
  console.log('Express listening on port ' + port + ' for ' + env + ' environment');
});

// Sends all requests to index.html so we can support BrowserHistory
app.get('/', function (request, response) {
  response.sendFile(_path2.default.resolve(__dirname, './build/public/', 'index.html'));
});

//////////////////////////////////////////////////
//sample routes
//////////////////////////////////////////////////
app.get('/hello', function (req, res) {
  res.send('Hello Carlos, my master!');
});

app.get('/add/:x/:y', function (req, res) {
  var x = req.params.x * 1;
  var y = req.params.y * 1;

  res.send({ sum: x + y });
});

var cb0 = function cb0(req, res, next) {
  console.log('CB0');
  next();
};

var cb1 = function cb1(req, res, next) {
  console.log('CB1');
  next();
};

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});