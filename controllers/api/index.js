const router = require('express').Router();
const articleRoutes = require('./articleRoutes');
const userRoutes = require('./userRoutes');

router.use('/article', articleRoutes);
router.use('/user', userRoutes);

module.exports = router;