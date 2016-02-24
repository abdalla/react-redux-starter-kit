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


const app = (0, _express2.default)(); //log stuff for express ==> https://github.com/expressjs/morgan
//body parsin stuff => https://github.com/expressjs/body-parser

const upload = (0, _multer2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, '/../public')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

const server = app.listen(3000, function () {
  console.log('Express listening on port 3000');
});

// Sends all requests to index.html so we can support BrowserHistory
app.get('*', function (request, response) {
  response.sendFile(_path2.default.resolve(__dirname, '../../public', 'index.html'));
});

//sample routes
app.get('/hello', (req, res) => {
  res.send('Hello Carlos, my master!');
});

app.get('/add/:x/:y', (req, res) => {
  const x = req.params.x * 1;
  const y = req.params.y * 1;

  res.send({ sum: x + y });
});