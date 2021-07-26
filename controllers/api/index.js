const router = require('express').Router();
const articleRoutes = require('./articleRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

router.use('/articles', articleRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;