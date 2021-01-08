const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();

app.use(express.static('client'));

// const cors_app = require('cors');
// app.use(cors_app());

app.get('/', (req, res) => {
  console.log('GET return at /');
  res.render('index.html');
  res.end('hello from port 8080');
});

app.get('/url/emotion', (req, res) => {
  return res.send({ happy: '90', sad: '10' });
});

app.get('/url/sentiment', (req, res) => {
  return res.send('url-sentiment- ' + req.query.url);
});

app.get('/text/emotion', (req, res) => {
  return res.send({ happy: '10', sad: '90' });
});

// app.get('/text/sentiment/:text', (req, res) => {
app.get('/text/sentiment/', (req, res) => {
  console.log('text/sentiment/? req.query.text: ', req.query.text);

  res.send('text-sentiment- ' + req.query.text);
});

getNLUInstance = () => {
  let api_key = process.env.API_KEY;
  let api_url = process.env.API_URL;

  const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url,
  });
  return naturalLanguageUnderstanding;
};

// console.log('naturalLanguageUnderstanding is: ', naturalLanguageUnderstanding);

let server = app.listen(8080, () => {
  console.log('API_KEY at listen ==>', process.env.API_KEY);
  console.log('API_URL at listen ==>', process.env.API_URL);
  console.log('Listening', server.address().port);
});
