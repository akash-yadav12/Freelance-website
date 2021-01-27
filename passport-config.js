const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('./models/user')

async function getUserByEmail(email){
    const user =  await User.find({email:email})
    return  (user[0])
}

function initialize(passport, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
    console.log(user,password,email,"lets see whats inside")
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
        else{
            try {
                if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
                } else {
                return done(null, false, { message: 'Password incorrect' })
                }
            } catch (e) {
                return done(e)
            }
    }

  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize