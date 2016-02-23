/* @flow */

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';

const app = express();
const upload = multer();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, function () {
  console.log('Express listening on port 3000');
});

//sample routes
//import dogs from './routes/dogs';
//app.use('/dogs', dogs);

app.get('/hello', (req, res) => {
  res.send('Hello Carlos, my master!');
});

app.get('/add/:x/:y', (req, res) => {
  const x = req.params.x * 1;
  const y = req.params.y * 1;

  res.send({sum: x+y});
});
