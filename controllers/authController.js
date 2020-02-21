
const jwt     = require('jwt-simple');
const config  = require('../config');
const uuid = require("uuid")
const client = require('../models')
const bcrypt = require('bcryptjs');

const tokenForUser = function(id) {
  const timestamp = new Date().getTime();
  // Sub === subject
  // iat === issued at time

  // Its going to encode the whole 1st object and then add our secret to it
  return jwt.encode({ sub: id, iat: timestamp}, config.SECRET_KEY);
};


module.exports = {
  signUp: async (req, res) => {
    console.log("you got me")
    let { password, username } = req.body;
    if(!username || !password) {
      return res.status(422).json({ error: 'You must provide an username and password' });
    }
    try {
      // Check if theres existing user
      const existingUser = await client.Client.query(`SELECT * FROM asana_internal_use WHERE name = $1`, [username])


      // if user exist, throw error
      if(existingUser.rowCount !== 0) {
        return res.status(422).json({ error: 'Username is in user' });
      }

      const salt = await bcrypt.genSalt();
      console.log('salt', salt);
      const hash = await bcrypt.hash(password, salt);
      console.log('hash', hash);
      password = hash;
      const id = uuid()

      const user = await client.Client.query(`INSERT INTO asana_internal_use (id, name, password) VALUES($1, $2, $3)`, [id, username, password])
      res.json({ token: tokenForUser(id)});
    } catch(e) {
      console.log(e, "something bad happened")
      res.status(404).json({ e });
    }

  },
  signIn: async (req, res) => {
    res.send({ token: tokenForUser(req.user), user : req.user});

  }
};