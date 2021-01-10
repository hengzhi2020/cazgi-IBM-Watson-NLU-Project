const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();

app.use(express.static('client'));

app.get('/text/sentiment/', (req, res) => {
  let returnData = getNLUInstance();
  returnData
    .analyze({
      html: req.query.text,
      features: {
        sentiment: {},
        emotion: {},
      },
    })
    .then((response) => {
      res.end(
        'Sentiment Analysis (Text) is: ' +
          JSON.stringify(response.result.sentiment.document, null, 2)
      );
    })
    .catch((err) => {
      console.log('error: ', err);
    });
});

app.get('/text/emotion', (req, res) => {
  let returnData = getNLUInstance();
  returnData
    .analyze({
      html: req.query.text,
      features: {
        sentiment: {},
        emotion: {},
      },
    })
    .then((response) => {
      res.end(
        'from /text/emotion is' +
          JSON.stringify(response.result.emotion.document.emotion, null, 2)
      );
    })
    .catch((err) => {
      console.log('error: ', err);
    });
});

app.get('/url/sentiment/:dd', (req, res) => {
  let returnData = getNLUInstance();
  returnData
    .analyze({
      html: req.params.dd,
      features: {
        sentiment: {},
        emotion: {},
      },
    })
    .then((response) => {
      res.end(
        'Sentiment Analysis (URL) is: ' +
          JSON.stringify(response.result.sentiment.document, null, 2)
      );
    })
    .catch((err) => {
      console.log('error: ', err);
    });
});

app.get('/url/emotion/:dd', (req, res) => {
  let returnData = getNLUInstance();
  returnData
    .analyze({
      html: req.params.dd,
      features: {
        sentiment: {},
        emotion: {},
      },
    })
    .then((response) => {
      res.end(
        'from /url/emotion is' +
          JSON.stringify(response.result.emotion.document.emotion, null, 2)
      );
    })
    .catch((err) => {
      console.log('error: ', err);
    });
});

getNLUInstance = () => {
  let api_key = process.env.API_KEY;
  let api_url = process.env.API_URL;
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url,
  });
  return naturalLanguageUnderstanding;
};

let server = app.listen(8080, () => {
  console.log('Listening', server.address().port);
});
