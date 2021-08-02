const router = require('express').Router();
const { Article, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const articleData = await Article.findAll({
      include: {
        model: User,
        attributes: ['username'],
      },
      where: {
        user_id: req.session.user_id,
      },
    });

    const articles = articleData.map((article) => article.get({ plain: true }));

    res.render('dashboard', {
      articles,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/newArticle', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.render('newArticle');
  } else {
  res.redirect('/signin');
  }
});

router.get('/updateArticle/:id', withAuth, async (req, res) => {  
  try {
    const articleData = await Article.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    const article = articleData.get({ plain: true });

    res.render('updateArticle', {
      article,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
