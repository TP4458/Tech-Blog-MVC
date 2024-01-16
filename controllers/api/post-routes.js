const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Blog.update(
      {
        user_id: req.session.user_id,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!editPost[0]) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.status(200).json(editPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
