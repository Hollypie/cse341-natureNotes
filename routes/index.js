const router = require('express').Router();
const trailRoutes = require('./trails');
const wildlifeRoutes = require('./wildlife');
const gearRoutes = require('./gear');
const hikersRoutes = require('./hikers');

router.get('/', (req, res) => {
  /* #swagger.ignore = true */

  if (!req.user && !req.session.user)
    return res.send(`
      <h1>⛺ Welcome to Nature Notes API</h1>
      <p><a href="/api-docs">🔓 API Documentation</a> <sup>*Note that you'll only have read access to resources (i.e., only GET routes will work)</sup></p>
      <p><a href="/login">Log in with Google</a></p>
  `);

  res.send(`
    <h1>⛺ Welcome to Nature Notes API</h1>
    <p><a href="/api-docs">🔐 API Documentation</a> <sup>*You have full access now! Be wise</sup></p>
    <p><a href="/logout">Log out</a></p>
    <p>Hello, ${req.user?.displayName || req.session.user.displayName}!</p>
  `);
});

router.use('/trails', trailRoutes);
router.use('/wildlife', wildlifeRoutes);
router.use('/gear', gearRoutes);
router.use('/hikers', hikersRoutes);

module.exports = router;
