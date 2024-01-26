const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['userName'],
        },
      ],
    });
    // serialize data for the template
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['userName'],
        },
        {
          model: Comment,
        },
      ],
    });

    const post = dbPostData.get({ plain: true });
    res.render('post', {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
        },
      ],
    });

    const user = dbUserData.get({ plain: true });

    res.render('dashboard'),
      {
        ...user,
        loggedIn: true,
      };
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }

    res.render('login');
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
