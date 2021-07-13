const router = require('express').Router();
const { Article, Comment, User} = require('../models');
const { update } = require(''../models/User');
const withAuth = require(''../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signin', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('signin');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('signup');
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const articleData = await Article.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    // Serialize data so the template can read it
    const article = articleData.map((article) => article.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      article,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
// router.get("/userlanding", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//     });

//     const user = userData.get({ plain: true });

//     res.render("userlanding", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



module.exports = router;
