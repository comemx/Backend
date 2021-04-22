/*

Index.js, is in charge of receiving the requests, it is the server,
it will verify that the requests are correct to enter the server or cancel them,
it has important configuration, database, headers, etc. the server.js
sends the information to response.js and route.js

*/

const express = require('express');
const { config } = require('./config');
const authenticate = require('./api/components/authenticate/network')
const user = require('./api/components/user/network');
const businessman = require('./api/components/businessman/network');
const local = require('./api/components/local/network');
const categories = require('./api/components/categories/network');
const food = require('./api/components/food/network');
const promotion = require('./api/components/promotion/network');
const forgotPassword = require('./api/components/forgotPassword/network');
const map = require('./api/components/map/network');
const cors = require('cors');
const app = express();
const db = require('./storage/index');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup')

//-------------------------------------------------------------------
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

  const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


//-------------------------------------------------------------------

//middlewares
app.use(morgan('dev'));


app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

// [initializing database]
db('')

// [server configuration]
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//validación que sí estemos en desarrollo
if(config.env === 'development'){
	console.log('[ Development config ]');
}

// [routes]
app.use('/api/user', user);
app.use('/api/businessman', businessman);
app.use('/api/local', local);
app.use('/api/categories', categories);
app.use('/api/food', food);
app.use('/api/promotion', promotion);
app.use('/api/authenticate', authenticate);
app.use('/api/forgot-password', forgotPassword);
app.use('/api/map', map);

// [static files]
app.use('/app', express.static('public'))

// [starting server]


app.listen(config.port, (err) => {
    if (err) console.error();
    else console.log(`[ Server running on port ${config.port} ]`);
});