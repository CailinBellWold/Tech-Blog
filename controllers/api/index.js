//Intuiting that comments should be a subset of article routes, not get their own...
const router = require('express').Router();
const articleRoutes = require('./articleRoutes');
const userRoutes = require('./userRoutes');

router.use('/articles', articleRoutes);
router.use('/users', userRoutes);

module.exports = router;