require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const spotifyWebAPi = require('spotify-web-api-node');
const app = express();
app.use(cors());
app.use(bodyparser.json());


app.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new spotifyWebAPi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken,
    })

    spotifyApi.refreshAccessToken().then(data => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
        })
    
    }).catch(err => {
        console.log(err)
        res.sendStatus(400);
    });
});
app.post('/login', async (req, res) => {
    const code = req.body.code;
    const spotifyApi = new spotifyWebAPi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(() => {
        res.status(400).json({
            error: 'Invalid code'
        });
    });
})

app.listen(3001)