const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({});

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
  console.log(">>>>>>>>>>>>>>>>>>>>New Comment Post ROUTE");
  try {
    const newComment = await Comment.create({
      ...req.body,
      // content: req.body.content,
      // article_id: req.body.article_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});



router.get("/:id", withAuth, async (req, res) => {  
  try {
    const articleData = await Article.findByPk(req.params.id, {
      where: {
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

router.put('/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.update(
    {
      title: req.body.articleTitle,
      content: req.body.articleContent,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!articleData) {
      res.status(404).json({ message: 'No article found with this id.' });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!articleData) {
      res.status(404).json({ message: 'No item(s) found with this id!' });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;