const SupabaseConnector = require('../APIGateway/Supabase.js');

class Spotify {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    async getAccessToken(userID) {
        try {
            const result = await this.client
                .from('Users')
                .select('Spotify_Authorization_Token')
                .eq('UserID', userID);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getRefreshToken(userID) {
        try {
            const result = await this.client
                .from('Users')
                .select('Spotify_Refresh_Token')
                .eq('UserID', userID);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    // Call this method to get the login page for spotify
    async LoginUser() {
        // if the user is not logged in, return the login page
        // CLIETN ID and REDIRECT URI are the ones that are provided by spotify
        var state = generateRandomString(16);
        res.cookie(stateKey, state);

        var scope = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state user-modify-playback-state streaming user-top-read';

        res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));

    }

    
//Call this method to get the song token for the user

async getCurrentPlayingTrack(accessToken) {

    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://api.spotify.com/v1/me/player/currently-playing',
      'headers': {
        'Authorization': 'Bearer ' + accessToken,
      }
    };
    await request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
    return response.body;
  
  }





}

let spotifyAccount = new Spotify();
spotifyAccount.LoginUser();
