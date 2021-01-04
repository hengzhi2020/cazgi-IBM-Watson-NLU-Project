const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.PAI_URL;

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: '{apikey}',
  }),
  serviceUrl: '{url}',
});
return naturalLanguageUnderstanding;

};
