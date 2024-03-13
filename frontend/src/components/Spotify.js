// import React from 'react';
//problem

// import SupabaseConnector from './Supabase.jsx';


// var request = require('request');
// var crypto = require('crypto');
// var cors = require('cors');
// var querystring = require('querystring');
// var cookieParser = require('cookie-parser');

require('dotenv').config();

var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
var client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
var redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

var express = require('express');
var app = express();


var request = require('request');
var cors = require('cors');
// var querystring = require('querystring');
var cookieParser = require('cookie-parser');






const generateRandomString = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    return randomString;
  };

var stateKey = 'spotify_auth_state';


app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
   
  // functions logs in: scope signifies the permissions we are asking for. Will redirect to the redirect_uri regardless if it fails or works
  // it will give us their access token and refresh token
  // the URI has to match the URI on our developer panela
  // the return type will be a code that we can use to get the access token and refresh token
  // the state is used to protect against cross-site request forgery attacks

  app.get('/login', function(req, res) {
    console.log("redirect uri is", redirect_uri);
    console.log("client id is", client_id);
    console.log("client secret is", client_secret);
    console.log('login');

    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    var scope = 'user-read-private user-read-email user-read-currently-playing';
    // res.redirect('https://accounts.spotify.com/authorize?' +
    //   querystring.stringify({
    //     response_type: 'code',
    //     client_id: client_id,
    //     scope: scope,
    //     redirect_uri: redirect_uri,
    //     state: state
    //   }));
    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}`);

  });

app.get('/callback', function(req, res) {


console.log('callback');
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    // res.redirect('/#' +
    //   querystring.stringify({
    //     error: 'state_mismatch'
    //   }));
    res.redirect(`/#error=state_mismatch`);

  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        // res.redirect('/#' +
        //   querystring.stringify({
        //     access_token: access_token,
        //     refresh_token: refresh_token
        //   }));
        res.redirect(`/#access_token=${access_token}&refresh_token=${refresh_token}`);

      } else {
        res.redirect(`/#error=invalid_token`);

      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
          refresh_token = body.refresh_token;
      res.send({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
  });
  console.log('refresh token', refresh_token);
  console.log('authorization token', authOptions.headers.Authorization);
});


app.get('/currently_playing', function(req, res) {

    var access_token = req.query.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/me/player/currently-playing',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };

    request.get(options, function(error, response, body) {
      console.log(body);

      if(!error && response.statusCode === 200) {
        res.send(body);
      }
      else{
        res.status(response.statusCode).send(error);
      }
    });});

    app.get('/', function(req, res) {
        // Send a response indicating that the server is running
        res.send('Server is running.');
      });

    // const PORT = process.env.PORT || 3000; // Or any other port you prefer
    const PORT = 3001;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    