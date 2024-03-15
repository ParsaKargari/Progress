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
var redirect_uri = 'http://localhost:9000/Spotify/callback'

// Middleware to serve static files from the 'public' directory
// router.use(express.static(__dirname + '/public'));

// Middleware to enable CORS
router.use(cors());

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

// router.get("/login", function(req, res) {
//   console.log("redirect uri is", redirect_uri);
//   console.log("client id is", client_id);
//   console.log("client secret is", client_secret);
//   console.log('login'); 

//   var state = generateRandomString(16);
//   // Assuming stateKey is defined elsewhere
//   res.cookie(stateKey, state);

//   var scope = 'user-read-private user-read-email user-read-currently-playing';
//   res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}`);
// });

// // Callback Router:

// router.get('/callback', function(req, res) {



//   var code = req.query.code || null;
//   var state = req.query.state || null;
//   var storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.redirect('/#' +
//       querystring.stringify({
//         error: 'state_mismatch'
//       }));
//   } else {
//     res.clearCookie(stateKey);
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;

//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect('/#' +
//           querystring.stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });
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
console.log("user id is", user_id);
console.log("code is", code);
console.log("state is", state);
console.log("stored state is", storedState);

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

    request.post(authOptions, function(error, response, body) {
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
        console.log("user id is", user_id);
        console.log("access token is", access_token);
        console.log("refresh token is", refresh_token);

        addSpotifyLoginInformation(user_id, access_token, refresh_token);
        // res.redirect('/#' +
        //   querystring.stringify({
        //     access_token: access_token,
        //     refresh_token: refresh_token,
        //     user_id: userId
        //   }));
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

// app.use(express.static(__dirname + '/public'))
//    .use(cors())
//    .use(cookieParser());
   
//   // functions logs in: scope signifies the permissions we are asking for. Will redirect to the redirect_uri regardless if it fails or works
//   // it will give us their access token and refresh token
//   // the URI has to match the URI on our developer panela
//   // the return type will be a code that we can use to get the access token and refresh token
//   // the state is used to protect against cross-site request forgery attacks

//   app.get('/login', function(req, res) {
//     console.log("redirect uri is", redirect_uri);
//     console.log("client id is", client_id);
//     console.log("client secret is", client_secret);
//     console.log('login');

//     var state = generateRandomString(16);
//     res.cookie(stateKey, state);
  
//     var scope = 'user-read-private user-read-email user-read-currently-playing';
//     // res.redirect('https://accounts.spotify.com/authorize?' +
//     //   querystring.stringify({
//     //     response_type: 'code',
//     //     client_id: client_id,
//     //     scope: scope,
//     //     redirect_uri: redirect_uri,
//     //     state: state
//     //   }));
//     res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}`);

//   });

// app.get('/callback', function(req, res) {


// console.log('callback');
//   var code = req.query.code || null;
//   var state = req.query.state || null;
//   var storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     // res.redirect('/#' +
//     //   querystring.stringify({
//     //     error: 'state_mismatch'
//     //   }));
//     res.redirect(`/#error=state_mismatch`);

//   } else {
//     res.clearCookie(stateKey);
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;

//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         // res.redirect('/#' +
//         //   querystring.stringify({
//         //     access_token: access_token,
//         //     refresh_token: refresh_token
//         //   }));
//         res.redirect(`/#access_token=${access_token}&refresh_token=${refresh_token}`);

//       } else {
//         res.redirect(`/#error=invalid_token`);

//       }
//     });
//   }
// });

// app.get('/refresh_token', function(req, res) {

//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 
//       'content-type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
//     },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token,
//           refresh_token = body.refresh_token;
//       res.send({
//         'access_token': access_token,
//         'refresh_token': refresh_token
//       });
//     }
//   });
//   console.log('refresh token', refresh_token);
//   console.log('authorization token', authOptions.headers.Authorization);
// });


// app.get('/currently_playing', function(req, res) {

//     var access_token = req.query.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/me/player/currently-playing',
//       headers: { 'Authorization': 'Bearer ' + access_token },
//       json: true
//     };

//     request.get(options, function(error, response, body) {
//       console.log(body);

//       if(!error && response.statusCode === 200) {
//         res.send(body);
//       }
//       else{
//         res.status(response.statusCode).send(error);
//       }
//     });});

//     app.get('/', function(req, res) {
//         // Send a response indicating that the server is running
//         res.send('Server is running.');
//       });

//     // const PORT = process.env.PORT || 3000; // Or any other port you prefer
//     // const PORT = 3001;

//     // app.listen(PORT, () => {
//     //   console.log(`Server is running on port ${PORT}`);
//     // });
    