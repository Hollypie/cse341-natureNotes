const router = require('express').Router();

router.get('/', (req, res) => {
  if (!req.user && !req.session.user)
    return res.send(`
      <h1>Welcome to Nature Notes API ⛺</h1>
      <p><a href="/login">Log in with Google 🔓</a></p>
  `);

  res.send(`
    <h1>Welcome to Nature Notes API ⛺</h1>
    <p>Hello, ${req.user?.displayName || req.session.user.displayName}!</p>
    <p><a href="/api-docs">API Documentation</a></p>
    <p><a href="/logout">Log out 🔐</a></p>
  `);
});

router.use('/trails', require('./trails'));
router.use('/wildlife', require('./wildlife'));

module.exports = router;
