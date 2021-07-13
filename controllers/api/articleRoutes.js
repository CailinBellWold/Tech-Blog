const router = require('express').Router();
const { Article, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newArticle);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//MAY NEED TO UPDATE TO VIEW WITHOUT UPDATING
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
    const articleData = await Article.update(req.body, {
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