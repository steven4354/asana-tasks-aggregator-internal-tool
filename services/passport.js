const passport      = require('passport');
const User          = require('../models/Client');
const config        = require('../config');
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt        = require('bcryptjs');


const localOptions = { usernameField: 'username' };

let userID = ""

const localLogin = new LocalStrategy(localOptions, async (username, password, done) => {
  try {
    const user = await User.query(`SELECT * FROM asana_internal_use  WHERE name = $1`, [username])
    if(user.rowCount === 0) {
      return done(null, false);
    }
    let userData =  user.rows[0]
    console.log(userData)
    const isMatch = await bcrypt.compare(password, userData.password)
    if (isMatch){
      return done(null, user);
    }else{
      return done(null, false);
    }      
  }catch(e){
      done(e, false);
  }


  
});




const jwtOptions = {

  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET_KEY

};


const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {

  try {
    if(payload.sub.rowCount !== 0) {
      // userID = payload.sub.rows[0].id
      done(null, payload.sub.rows[0]);
    } else {
      done(null, false);
    }
  } catch(e) {
    done(e, false);
    console.log(e)
  }
});




// const saveUser = async (email, accessToken) => {
//   let duplicateUser=[] ;
//   const user = {email, accessToken};
//   const ID = userID
//   console.log(ID, "this is id")
//   console.log(user.email, "this is email")
//   console.log(user.accessToken, "this is token")

  

//   try {
//       const existingUser = await User.query("SELECT * FROM calendar_access_tokens WHERE id = $1", [ID])
//       if (existingUser.rowCount.length !== 0){
//           duplicateUser =  existingUser.rows
//       }
//       if (duplicateUser.length === 0 && user.accessToken !== accessToken)  {
//           // console.log('The user exists and db token expired', duplicateUser);
//           user.accessToken = accessToken;
//       }
//       else if (duplicateUser.length !== 0) {
//           const new_user = await User.query(`INSERT INTO calendar_access_tokens (user_id, email, access_token) VALUES($1, $2, $3)`, [ID, user.email, user.accessToken])
//           console.log(new_user)
//       }
//   } catch (e) {
//       throw e
//   }
//   // check if user exist, don't save it

  
// };

passport.use(localLogin);
passport.use(jwtLogin);