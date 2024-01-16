const router = require('express').Router();
const sequelise = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/editPost/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Post.findByPk(req.params.id);
    console.log(editPost);

    if (editPost) {
      const post = editPost.get({ plain: true });

      res.render('editPost', {
        ...post,
        logged_in: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
