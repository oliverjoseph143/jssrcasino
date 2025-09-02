const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const pool = require('./db');
require('dotenv').config();

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in our database
      const [users] = await pool.execute(
        'SELECT * FROM users WHERE google_id = ? OR email = ?',
        [profile.id, profile.emails[0].value]
      );
      
      if (users.length > 0) {
        // User exists
        const user = users[0];
        
        // If user exists but doesn't have Google ID, update it
        if (!user.google_id) {
          await pool.execute(
            'UPDATE users SET google_id = ?, profile_image = ? WHERE id = ?',
            [profile.id, profile.photos[0].value, user.id]
          );
        }
        
        return done(null, user);
      } else {
        // Create new user
        const referralCode = 'GL' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const [result] = await pool.execute(
          'INSERT INTO users (google_id, name, email, profile_image, email_verified, referral_code) VALUES (?, ?, ?, ?, ?, ?)',
          [profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value, 1, referralCode]
        );
        
        // Get the newly created user
        const [newUsers] = await pool.execute(
          'SELECT * FROM users WHERE id = ?',
          [result.insertId]
        );
        
        return done(null, newUsers[0]);
      }
    } catch (err) {
      return done(err, null);
    }
  }
));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails', 'photos']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in our database
      const [users] = await pool.execute(
        'SELECT * FROM users WHERE facebook_id = ? OR email = ?',
        [profile.id, profile.emails[0].value]
      );
      
      if (users.length > 0) {
        // User exists
        const user = users[0];
        
        // If user exists but doesn't have Facebook ID, update it
        if (!user.facebook_id) {
          await pool.execute(
            'UPDATE users SET facebook_id = ?, profile_image = ? WHERE id = ?',
            [profile.id, profile.photos[0].value, user.id]
          );
        }
        
        return done(null, user);
      } else {
        // Create new user
        const referralCode = 'GL' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const [result] = await pool.execute(
          'INSERT INTO users (facebook_id, name, email, profile_image, email_verified, referral_code) VALUES (?, ?, ?, ?, ?, ?)',
          [profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value, 1, referralCode]
        );
        
        // Get the newly created user
        const [newUsers] = await pool.execute(
          'SELECT * FROM users WHERE id = ?',
          [result.insertId]
        );
        
        return done(null, newUsers[0]);
      }
    } catch (err) {
      return done(err, null);
    }
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    done(null, users[0]);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;