const router = require('express').Router();
const { Comment, Article, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Article,
          attributes: ['username'],
        },
      ],
      where: {
          article_id: req.params.id,
        },
      order: [['created_at', 'ASC']],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('comments', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// router.post('/', withAuth, (req, res) => {
//   // check the session
//   if (req.session) {
//     Comment.create({
//       comment_text: req.body.comment_text,
//       post_id: req.body.post_id,
//       // use the id from the session
//       user_id: req.session.user_id,
//     })
//       .then(dbCommentData => res.json(dbCommentData))
//       .catch(err => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   }
// });

router.get('/updateComment/:id', withAuth, async (req, res) => {  
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      where: {
        user_id: req.session.user_id,
      },
    });

    const comment = commentData.get({ plain: true });

    res.render('updateComment', {
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(
      ...req.body,
    // {
    //   title: req.body.articleTitle,
    //   content: req.body.articleContent,
    // },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id.' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

//WORKS
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;