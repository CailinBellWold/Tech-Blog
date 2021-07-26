const router = require('express').Router();
const { Article, Comment, User} = require('../models');

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

router.get('/articles/:id', async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'user_id', 'created_at'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const articleSingle = articleData.get({ plain: true });

    res.render('viewArticle', { 
      articleSingle, 
      logged_in: req.session.logged_in 
    });
    console.log(">>>>>>>View Article by ID WITHOUTH Auth");
    console.log(">>>>>>>>>>>>>>>articleSingle", articleSingle);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
