/* const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
   User.findById(id, function(err, user) {
  }); 
  
  la razón por la que solo toma la identificación es para hacer las cookies más pequeñas,
  por lo que cada vez que un usuario envía una solicitud a una ruta que está autenticada o cualquier fila L,
  el pasaporte tomará la cookie, llamará a esta función, tomará la identificación de esta cookie encontrará al usuario en la base de datos y
  luego seleccionará los objetos de usuario completos tiene el objeto de usuario completo tiene el objeto de usuario completo y solicita ese usuario
  
  
  
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "700915505126-85agad2o6c2v8u5vi5oj7b728vqvc263.apps.googleusercontent.com",
    clientSecret: "TKuwjrfeUyIGWgYCk1Pe93os",
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    on this section you can register the user on database
     User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
    console.log(profile)
    done(null, profile);
  }
)); */

const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  /* User.findById(id, function(err, user) {
  }); 
  
  la razón por la que solo toma la identificación es para hacer las cookies más pequeñas,
  por lo que cada vez que un usuario envía una solicitud a una ruta que está autenticada o cualquier fila L,
  el pasaporte tomará la cookie, llamará a esta función, tomará la identificación de esta cookie encontrará al usuario en la base de datos y
  luego seleccionará los objetos de usuario completos tiene el objeto de usuario completo tiene el objeto de usuario completo y solicita ese usuario
  
  */
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "700915505126-85agad2o6c2v8u5vi5oj7b728vqvc263.apps.googleusercontent.com",
    clientSecret: "TKuwjrfeUyIGWgYCk1Pe93os",
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //on this section you can register the user on database
    /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    }); */
    console.log(profile)
    done(null, profile);
  }
));