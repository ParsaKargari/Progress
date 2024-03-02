const SupabaseConnector = require('../APIGateway/Supabase.js');


class Spotify {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }
    //Table Getters    
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

    async getLastPlayedSong(userID) {
        try {
            const result = await this.client
                .from('Users')
                .select('Currently_Playing_Song')
                .eq('UserID', userID);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    //Table Setters

    async setAccessToken(userID, accessToken) {
        try {
            const result = await this.client
                .from('Users')
                .update({ Spotify_Authorization_Token: accessToken })
                .eq('UserID', userID);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    async setRefreshToken(userID, refreshToken) {
        try {
            const result = await this.client
                .from('Users')
                .update({ Spotify_Refresh_Token: refreshToken })
                .eq('UserID', userID);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async setLastPlayedSong(userID, songInfo) {
        try {
            const result = await this.client
                .from('Users')
                .update({ Currently_Playing_Song: songInfo })
                .eq('UserID', userID);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    


    // Methods involving the Spotify API

    async  getNewAccessToken(refreshToken) {
        var request = require('request');
        var options = {
          'method': 'GET',
          'url': 'http://localhost:8888/refresh_token?refresh_token=' + refreshToken,
          'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': ''
          }
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
        });
        return response.body;
      
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
          client_id: process.env.SPOTIFY_CLIENT_ID,
          scope: scope,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
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
