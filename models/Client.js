
const bcrypt = require('bcryptjs');
const validator = require('validator');
const config = require('../config')

const validateEmail = function(email){
  return validator.isEmail(email);
};
const {Pool, Client} = require('pg')
const connectionString = config.DB_CONNECTION

const client = new Client({
    connectionString:connectionString
})


client.connect();


// UserSchema.pre('save', async function(next){
//   const user = this;
//   try {
//     const salt = await bcrypt.genSalt();
//     console.log('salt', salt);
//     const hash = await bcrypt.hash(user.password, salt);
//     console.log('hash', hash);
//     user.password = hash;
//     next();
//   } catch(e) {
//     return next(e);
//   }
// });

// UserSchema.methods.comparePassword = async function(candidatePassword, callback){
//   const user = this;
//   try {
//     const isMatch = await bcrypt.compare(candidatePassword, user.password);
//     callback(null, isMatch);
//   } catch(e) {
//     callback(e);
//   }
// };


// const User = mongoose.model('User', UserSchema);

module.exports = client;