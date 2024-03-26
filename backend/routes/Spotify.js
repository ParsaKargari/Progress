const SupabaseConnector = require('../SupabaseConnector.js');
var express = require('express');
var router = express.Router();
var cors = require('cors');
var cookieParser = require('cookie-parser');
const request = require('request');
const querystring = require('querystring');
const { add } = require('nodemon/lib/rules/index.js');


// import { DotenvConfigOptions } from 'dotenv';

var client_id = '26b0736d78ef449a92dc41137875af72'
var client_secret = '4530b6e7f3e64af89a17d03e5d3097a0'
var redirect_uri = `${process.env.REACT_APP_API_URL}/Spotify/callback`

// Middleware to serve static files from the 'public' directory
// router.use(express.static(__dirname + '/public'));

var allowedOrigins = ['http://localhost:3000', 'https://progresslive.vercel.app'];

router.use((req, res, next) => {
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  next();
});

// Middleware to parse cookies
router.use(cookieParser());

const generateRandomString = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
};

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
  next();
});


var stateKey = 'spotify_auth_state';
router.get("/", function(req, res) {
  console.log("BASIC SPOTIFY ROUTE");

  res.send("BASIC SPOTIFY ROUTE");
});
var user_id = null;


router.get("/login", function(req, res) {
  var state = generateRandomString(16);
  var userId = req.query.user_id; // Assuming you have the user ID in the request object
  user_id = userId;
  if(!userId) {
    return res.status(400).send("User ID is missing in the URL query parameters.");
  }
  res.cookie(stateKey, state);

  var scope = 'user-read-private user-read-email user-read-currently-playing';
  res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}&user_id=${userId}`);
});

// Callback Router:
router.get("/callback", function(req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  // var userId = req.query.user_id || null; // Retrieve the user ID passed in the query
// console.log("user id is", user_id);
// console.log("code is", code);
// console.log("state is", state);
// console.log("stored state is", storedState);

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
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

    request.post(authOptions, async function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        request.get(options, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var spotifyUserId = body.id;
            // Now you have both userId and spotifyUserId, you can associate them in your database
            // Assuming you have a function to associate them like saveAssociation(userId, spotifyUserId)
            // saveAssociation(userId, spotifyUserId);

          }
        });
        // console.log("user id is", user_id);
        // console.log("access token is", access_token);
        // console.log("refresh token is", refresh_token);

        await addSpotifyLoginInformation(user_id, access_token, refresh_token);

        res.redirect('http://localhost:3000/home');
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});




router.get('/currently_playing', async function(req, res) {
  try {
    var user_id = req.query.user_id;
    var spotifyInformation = await getSpotifyInformation(user_id);
    // console.log("user id is", user_id);
    // console.log("spotify information's refresh token is", spotifyInformation[0].Spotify_Refresh_Token);

    await refreshAccessToken(user_id,spotifyInformation[0].Spotify_Refresh_Token);
    // console.log("refreshaccesstoken function called");
    var spotifyInformation = await getSpotifyInformation(user_id);

    // console.log("user id is", user_id, "SpotifyAUthriization token is", spotifyInformation[0].Spotify_Authorization_Token, "SpotifyRefreshToken is", spotifyInformation[0].Spotify_Refresh_Token);
    // await callCurrentlyPlayingEndpoint(user_id, spotifyInformation[0].Spotify_Authorization_Token, spotifyInformation[0].Spotify_Refresh_Token);
    console.log("callcurrentlyplayingfunction called");
    res.redirect('http://localhost:3000/home');
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }});

  async function refreshAccessToken(user_id_token, refresh_token) {
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
    request.post(authOptions, async function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token_api = body.access_token;
        
        // console.log("body in refreshAcessToken Post)",body);
        // console.log("access token is 1", access_token_api);
        // console.log("access token 2 is ", body.access_token);
        // console.log("refresh token is", refresh_token);
        await callCurrentlyPlayingEndpoint(user_id_token, access_token_api, refresh_token);
      } else {
        // console.log("error is in refreshAcessToken function", error);
        // console.log("status code is", response.statusCode);
        // console.log(client_id + ':' + client_secret)
        console.log('Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')));
      }
    });
  }



    async function callCurrentlyPlayingEndpoint(user_id, access_token, refresh_token_api) {
      var options = {
          url: 'https://api.spotify.com/v1/me/player/currently-playing',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
      };
      // console.log("INSIDE CALLCURRENTLYPLAYING....");
      // console.log("user id is", user_id, "access token is", access_token, "refresh token is", refresh_token_api);
      request.get(options, async function(error, response, body) {
          if (!error && response.statusCode === 200) {
              // console.log("body is", body);
              // console.log("user id is", user_id);
              // console.log("access token is", access_token);
              // console.log("refresh token is", refresh_token_api);

              await sendSpotifyInformationAndSongs(user_id, access_token, refresh_token_api, body);
              // Move the redirect inside the callback
              // res.redirect('http://localhost:3000/home');
          } 
          else if(error) {
            console.log("error is in callcurrentlyplayingendpoint", error);


          }
            else if (response && response.statusCode === 204) {
              console.log("No song is currently playing");

          }
          else {
            console.log("no response and no error");}
      });
}



router.get('/isUserSignedIn', async function(req, res) {
  var user_id = req.query.user_id;
  var spotifyInformation = await getSpotifyInformation(user_id);
  // console.log("spotify information is IN is usersignedin?", spotifyInformation);
  console.log(spotifyInformation[0]['Spotify_Authorization_Token'] && spotifyInformation[0]['Spotify_Refresh_Token']);
  if(spotifyInformation[0]['Spotify_Authorization_Token'] && spotifyInformation[0]['Spotify_Refresh_Token']) {
    console.log("is usersigned in sent true");
    res.send(true);
  } else {
    res.send(false);}
  });








module.exports = router;


async function addSpotifyLoginInformation(user_id, accessToken, refreshToken ) {
  var supabase = new SupabaseConnector();
  var client = supabase.getClient();
  try {
      const result = await client
          .from('Users')
          .update([{ Spotify_Refresh_Token: refreshToken, Spotify_Authorization_Token: accessToken }])
          .eq('UserID', user_id);
      return result;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async function sendSpotifyInformationAndSongs(user_id, accessToken, refreshToken, currently_playing) {
  // console.log("inside sendSpotifyInformationAndSongs");
  // console.log("user id is", user_id);
  // console.log("access token is", accessToken);
  // console.log("refresh token is", refreshToken);
  // console.log("currently playing is", currently_playing);

  var supabase = new SupabaseConnector();
  var client = supabase.getClient();
  try {
      const result = await client
          .from('Users')
          .update([{ Spotify_Refresh_Token: refreshToken, Spotify_Authorization_Token: accessToken, Currently_Playing_Song: currently_playing }])
          .eq('UserID',user_id);}
  catch (error) {
      console.error(error);
      throw error;
  };
}
async function getSpotifyInformation(user_id) {
  var supabase = new SupabaseConnector();
  var client = supabase.getClient();
  const { data, error } = await client
      .from('Users')
      .select('Spotify_Refresh_Token, Spotify_Authorization_Token')
      .eq('UserID', user_id);
  return data;}



