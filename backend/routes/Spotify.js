const SupabaseConnector = require('../SupabaseConnector.js');
var express = require('express');
var router = express.Router();
var cors = require('cors');
var cookieParser = require('cookie-parser');
const request = require('request');
const querystring = require('querystring');
// const { add } = require('nodemon/lib/rules/index.js');


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
var user_id = null;


router.get("/login", function(req, res) {
    var state = generateRandomString(16);
    var userId = req.query.user_id; // Assuming you have the user ID in the request object
    user_id = userId;
    if (!userId) {
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
<<<<<<< HEAD
    }
=======
        console.log("user id is", user_id);
        console.log("access token is", access_token);
        console.log("refresh token is", refresh_token);

        addSpotifyLoginInformation(user_id, access_token, refresh_token);

        res.redirect('http://localhost:3000/home');
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
>>>>>>> 6a41c3feb83b4018422b99acb02d7883f36daf9a
});




router.get('/currently_playing', async function(req, res) {
<<<<<<< HEAD
    try {
        var user_id = req.query.user_id;
        var spotifyInformation = await getSpotifyInformation(user_id);
        // console.log("user id is", user_id);
        console.log("spotify information is", spotifyInformation);

        await refreshAccessToken(spotifyInformation.Spotify_Refresh_Token);
        // console.log("refreshaccesstoken function called");

        // console.log("user id is", user_id, "SpotifyAUthriization token is", spotifyInformation[0].Spotify_Authorization_Token, "SpotifyRefreshToken is", spotifyInformation[0].Spotify_Refresh_Token);
        await callCurrentlyPlayingEndpoint(user_id, spotifyInformation[0].Spotify_Authorization_Token, spotifyInformation[0].Spotify_Refresh_Token);
        console.log("callcurrentlyplayingfunction called");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

    async function refreshAccessToken(refresh_token) {
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
                var access_token_api = body.access_token;
                var refresh_token_api = body.refresh_token;
                console.log("access token is", access_token_api);
                console.log("refresh token is", refresh_token_api);
                callCurrentlyPlayingEndpoint(user_id, access_token_api, refresh_token_api);
            } else {
                console.log("error is", error);
            }
        });
    }

    async function callCurrentlyPlayingEndpoint(user_id, access_token, refresh_token_api) {
        var options = {
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
        };
        console.log("INSIDE CALLCURRENTLYPLAYING....");
        console.log("user id is", user_id, "access token is", access_token, "refresh token is", refresh_token_api);
        request.get(options, async function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("body is", body);
                console.log("user id is", user_id);
                console.log("access token is", access_token);
                console.log("refresh token is", refresh_token_api);

                await sendSpotifyInformationAndSongs(user_id, access_token, refresh_token_api, body);
                // res.redirect('http://localhost:3000/home');
                // res.send(body);
            } else {
                res.status(response.statusCode).send(error);
            }
        });
        res.redirect('http://localhost:3000/home');
    }
});

router.get('/isUserSignedIn', async function(req, res) {
    var user_id = req.query.user_id;

    var spotifyInformation = await getSpotifyInformation(user_id);
    console.log("spotify information is IN is usersignedin?", spotifyInformation);
    if (spotifyInformation['Spotify_Authorization_Token'] && spotifyInformation['Spotify_Refresh_Token']) {
        res.send(true);
    } else {
        res.send(false);
    }
});
=======
  try {
    var user_id = req.query.user_id;
    var spotifyInformation = await getSpotifyInformation(user_id);
    // console.log("user id is", user_id);
    console.log("spotify information's refresh token is", spotifyInformation[0].Spotify_Refresh_Token);

    await refreshAccessToken(user_id,spotifyInformation[0].Spotify_Refresh_Token);
    // console.log("refreshaccesstoken function called");
    var spotifyInformation = await getSpotifyInformation(user_id);

    console.log("user id is", user_id, "SpotifyAUthriization token is", spotifyInformation[0].Spotify_Authorization_Token, "SpotifyRefreshToken is", spotifyInformation[0].Spotify_Refresh_Token);
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
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token_api = body.access_token;
        
        console.log("body in refreshAcessToken Post)",body);
        console.log("access token is 1", access_token_api);
        console.log("access token 2 is ", body.access_token);
        console.log("refresh token is", refresh_token);
        callCurrentlyPlayingEndpoint(user_id_token, access_token_api, refresh_token);
      } else {
        console.log("error is in refreshAcessToken function", error);
        console.log("status code is", response.statusCode);
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
      console.log("INSIDE CALLCURRENTLYPLAYING....");
      console.log("user id is", user_id, "access token is", access_token, "refresh token is", refresh_token_api);
      request.get(options, async function(error, response, body) {
          if (!error && response.statusCode === 200) {
              console.log("body is", body);
              console.log("user id is", user_id);
              console.log("access token is", access_token);
              console.log("refresh token is", refresh_token_api);

              await sendSpotifyInformationAndSongs(user_id, access_token, refresh_token_api, body);
              // Move the redirect inside the callback
              // res.redirect('http://localhost:3000/home');
          } else {
              console.log("error is in callcurrentlyplayingendpoint", error, "status code is "  + response.statusCode);
          }
      });
}

//   async function callCurrentlyPlayingEndpoint(user_id, access_token, refresh_token_api) {
//     var options = {
//       url: 'https://api.spotify.com/v1/me/player/currently-playing',
//       headers: { 'Authorization': 'Bearer ' + access_token },
//       json: true
//     };
//     console.log("INSIDE CALLCURRENTLYPLAYING....");
//     console.log("user id is", user_id, "access token is", access_token, "refresh token is", refresh_token_api);
//     request.get(options, async function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//         console.log("body is", body);
//         console.log("user id is", user_id);
//         console.log("access token is", access_token);
//         console.log("refresh token is", refresh_token_api);

//         await sendSpotifyInformationAndSongs(user_id, access_token, refresh_token_api, body);
//         // res.redirect('http://localhost:3000/home');
//         // res.send(body);
//       } else {
//         res.status(response.statusCode).send(error);
//       }
//     });
//     res.redirect('http://localhost:3000/home');
//   }
// });

router.get('/isUserSignedIn', async function(req, res) {
  var user_id = req.query.user_id;
  var spotifyInformation = await getSpotifyInformation(user_id);
  console.log("spotify information is IN is usersignedin?", spotifyInformation);
  console.log(spotifyInformation[0]['Spotify_Authorization_Token'] && spotifyInformation[0]['Spotify_Refresh_Token']);
  if(spotifyInformation[0]['Spotify_Authorization_Token'] && spotifyInformation[0]['Spotify_Refresh_Token']) {
    console.log("is usersigned in sent true");
    res.send(true);
  } else {
    res.send(false);}
  });
>>>>>>> 6a41c3feb83b4018422b99acb02d7883f36daf9a








module.exports = router;


async function addSpotifyLoginInformation(user_id, accessToken, refreshToken) {
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
    console.log("inside sendSpotifyInformationAndSongs");
    console.log("user id is", user_id);
    console.log("access token is", accessToken);
    console.log("refresh token is", refreshToken);
    console.log("currently playing is", currently_playing);

    var supabase = new SupabaseConnector();
    var client = supabase.getClient();
    try {
        const result = await client
            .from('Users')
            .update([{ Spotify_Refresh_Token: refreshToken, Spotify_Authorization_Token: accessToken, Currently_Playing_Song: currently_playing }])
            .eq('UserID', user_id);
    } catch (error) {
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
    return data;
}


// EXTRA STUFF

// app.get('/currently_playing', function(req, res) {

//     // var access_token = req.query.access_token;
//     var user_id = req.query.user_id;
//     var spotifyInformation = getSpotifyInformation(user_id);


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

//     app.get('/refresh_token', function(req, res) {

//       var refresh_token = req.query.refresh_token;
//       var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         headers: { 
//           'content-type': 'application/x-www-form-urlencoded',
//           'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
//         },
//         form: {
//           grant_type: 'refresh_token',
//           refresh_token: refresh_token
//         },
//         json: true
//       };

//       request.post(authOptions, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//           var access_token = body.access_token,
//               refresh_token = body.refresh_token;
//           res.send({
//             'access_token': access_token,
//             'refresh_token': refresh_token
//           });
//         }
//       });
//       addSpotifyLoginInformation(user_id, authOptions.headers.Authorization, refresh_token);

//     });



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





// router.get('/currently_playing', function(req, res) {
//   var user_id = req.query.user_id;
//   var spotifyInformation = await getSpotifyInformation(user_id);
//   console.log("user id is", user_id);
//   console.log("spotify information is", spotifyInformation);
//   // console.log("spotify information is", spotifyInformation);
//   refreshAccessToken(spotifyInformation.Spotify_Refresh_Token);
//   console.log("refreshaccesstoken function caleld")
//   var spotifyInformation = getSpotifyInformation(user_id);

//   callCurrentlyPlayingEndpoint(user_id, spotifyInformation.Spotify_Authorization_Token, spotifyInformation.Spotify_Refresh_Token);
//   console.log("callcurertlyplayignnfunctioncalled");



//   async function refreshAccessToken(refresh_token) {

//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       headers: { 
//         'content-type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//       },
//       form: {
//         grant_type: 'refresh_token',
//         refresh_token: refresh_token
//       },
//       json: true
//     };
//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//         var access_token_api = body.access_token;
//         var refresh_token_api = body.refresh_token;;
//         // res.send({
//         //   'access_token': access_token,
//         //   'refresh_token': refresh_token
//         // });
//         console.log("access token is", access_token_api);
//         console.log("refresh token is", refresh_token_api);
//         console.log("callcurertlyplayignnfunctioncalled");
//         callCurrentlyPlayingEndpoint(user_id,access_token_api, refresh_token_api);
//       }
//       else {
//         console.log("error is", error);
//         }
//       });
//     }


//     async function callCurrentlyPlayingEndpoint(user_id,access_token, refresh_token_api){
//       var options = {
//         url: 'https://api.spotify.com/v1/me/player/currently-playing',
//         headers: { 'Authorization': 'Bearer ' + access_token },
//         json: true
//       };
//       console.log("INSIDE CALLCURRENTLYPLAYING....");
//       console.log("user id is", user_id, "access token is", access_token, "refresh token is", refresh_token_api);
//       request.get(options, function(error, response, body) {
//         if(!error && response.statusCode === 200) {
//           sendSpotifyInformationAndSongs(user_id, access_token, refresh_token_api, body);
//           res.send(body);

//         }
//         else{
//           res.status(response.statusCode).send(error);
//         }
//       });
//       res.redirect('http://localhost:3000/home');    
//     }});