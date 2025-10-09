const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Nature Notes API</h1>
    <p><a href="/login">Log in with Google</a></p>
  `);
});

router.use('/trails', require('./trails'));
router.use('/wildlife', require('./wildlife'));
router.use('/gear', require('./gear'));
router.use('/hikers', require('./hikers'));

module.exports = router;
