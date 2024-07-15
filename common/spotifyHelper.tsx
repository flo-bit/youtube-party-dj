import { getSessionWithCode, sessions } from "backend/sessions.ts";



export const generateRandomString = (length:number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
    
  export const sha256 = (plain : string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  
  //@ts-ignore input type
  export const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    }
   
  export const  authorizeSpotify = (clientID :string, clientRedirect :string, codeChallenge:string) => {
    const auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: clientID,
      scope: "streaming \
               user-read-email \
               user-read-private",
      redirect_uri: clientRedirect,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
     
      })
        
    const authUrl = 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString();
    redirect(authUrl);
    }
  
    export const  getAccessToken = async (codeVerifier :string, spotifyCode:string, clientID : string, clientRedirect:string )=>{
      console.log("getting token")
      //const session = getSessionWithCode(sessionCode);
      //console.log(session.spotifyInformation);
      
      
          
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code : spotifyCode as string,
          redirect_uri: clientRedirect,
          client_id: clientID,
          code_verifier: codeVerifier as string, 
        }),
      }	
    
      let accessToken =""
      const body = await fetch('https://accounts.spotify.com/api/token', payload);
      const response = await body.json().then((r) => accessToken = r.access_token );
      
      console.log(response.access_token);
      
      return accessToken
      }