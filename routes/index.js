const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Nature Notes API</h1>
    <p><a href="/login">Log in with Google</a></p>
  `);
});

router.use('/trails', require('./trails'));
router.use('/wildlife', require('./wildlife'));

module.exports = router;
