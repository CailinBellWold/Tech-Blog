const router = require('express').Router();
const { Article, Comment, User} = require('../models');
const { update } = require('../models/User');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const articleData = await Article.findAll({
      include: [
        {
          model: Comment,
          attributes: ['content'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const articles = articleData.map((article) => article.get({ plain: true }));

    res.render('homepage', { 
      articles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signin', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signin');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/newArticle', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.render('newArticle');
  } else {
  res.redirect('/signin');
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
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

module.exports = router;
