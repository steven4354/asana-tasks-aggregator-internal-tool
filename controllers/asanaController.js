const asana = require('asana');
const axios = require("axios")
const qs = require('qs')
const client = require('../models')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


module.exports = {
    connect: async (req, res) => {
      const userID = req.user.id
      try{
        const url = "https://app.asana.com/-/oauth_token"
        const requestBody = {
            "grant_type": "authorization_code",
            "client_id": process.env.asana_client_id,
            "client_secret": process.env.asana_secret_key,
            "redirect_uri": process.env.asana_redirect_url,
            "code": req.body.accessCode,
            "code_verifier": "token"
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const request = await axios.post(url, qs.stringify(requestBody), config)
        console.log(request.data.access_token)
        const user = await client.Client.query(`UPDATE asana_internal_use SET access_token = $1, refresh_token = $2 WHERE id = $3 `, [request.data.access_token, request.data.refresh_token, userID])
        res.json({token : request.data.access_token})

        
      }catch(e){
        console.log(e, "this is error")
        res.status(401).json({ e });
      }
    },
    token: async (req, res) => {
        try{
            console.log(req.body.accessToken)
            const client = asana.Client.create().useAccessToken(req.body.accessToken);
            client.users.me()
                .then(user => {
                    const userId = user.gid;
                    // The user's "default" workspace is the first one in the list, though
                    // any user can have multiple workspaces so you can't always assume this
                    // is the one you want to work with.
                    const workspaceId = user.workspaces[0].gid;
                    return client.tasks.findAll({
                        assignee: userId,
                        workspace: workspaceId,
                        completed_since: 'now',
                        opt_fields: 'id, name, assignee_status, completed, followers, notes',
                    });
                })
                .then(response => {
                    // There may be more pages of data, we could stream or return a promise
                    // to request those here - for now, let's just return the first page
                    // of items.
                    console.log(response.data)
                    res.json({data: response.data})
                })
                .catch(err => {
                    if (err.status == 401){
                        
                    }
                    res.status(401).json({ err });
                })
        }catch(e){
            res.status(404).json({ e });
        } 
    },
    refresh: async (req, res) =>{
        try{
            const url = "https://app.asana.com/-/oauth_token"
            const requestBody = {
                "grant_type": "refresh_token",
                "client_id": process.env.asana_client_id,
                "client_secret": process.env.asana_secret_key,
                "redirect_uri": process.env.asana_redirect_url,
                "refresh_token": req.user.refresh_token,
                "code_verifier": "token"
            }
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            const request = await axios.post(url, qs.stringify(requestBody), config)
            console.log(request.data.access_token, "new one")
            const user = await client.Client.query(`UPDATE asana_internal_use SET access_token = $1 WHERE id = $2 `, [request.data.access_token, req.user.id])
            console.log(user)
            res.json({accessToken: request.data.access_token})

        }catch(e){
            res.status(401).json({ e })
        }

    }

    
  };
  