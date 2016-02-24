/* @flow */

import express from 'express';
import bodyParser from 'body-parser'; //body parsin stuff => https://github.com/expressjs/body-parser
import multer from 'multer'; //upload stuff for express ==> https://github.com/expressjs/multer
import morgan from 'morgan'; //log stuff for express ==> https://github.com/expressjs/morgan
import path from 'path';

const app = express();
const upload = multer();

app.use(express.static(path.join(__dirname, '/../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, function () {
  console.log('Express listening on port 3000');
});

// Sends all requests to index.html so we can support BrowserHistory
app.get('*', function(request, response){
  response.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
});

//sample routes
app.get('/hello', (req, res) => {
  res.send('Hello Carlos, my master!');
});

app.get('/add/:x/:y', (req, res) => {
  const x = req.params.x * 1;
  const y = req.params.y * 1;

  res.send({sum: x+y});
});
