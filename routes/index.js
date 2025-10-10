const router = require('express').Router();

router.get('/', (req, res) => {
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

router.use('/trails', require('./trails'));
router.use('/wildlife', require('./wildlife'));
router.use('/gear', require('./gear'));
router.use('/hikers', require('./hikers'));

module.exports = router;
