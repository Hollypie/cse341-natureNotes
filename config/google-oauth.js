const express = require('express');
const passport = require('passport');
const session = require('express-session');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongodb = require('../data/database');

const router = express.Router();

router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
  mongodb.getDb().collection('users').updateOne(
    { googleId: profile.id },
    {
      $set: {
        googleId: profile.id,
        fullName: profile.displayName,
        emails: profile.emails,
        accessToken: accessToken,
        refreshToken: refreshToken,
        lastLogin: new Date(),
      }
    },
    { upsert: true }
  ).then(() => {
    console.log('Google user logged:', profile.displayName);
    return done(null, profile);
  }).catch(err => done(err, null));
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

router.get('/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api-docs',
    successRedirect: '/'
  })
);

module.exports = router;