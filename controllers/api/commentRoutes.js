const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbCommData = await Comment.findAll();
    const comments = dbCommData.map((comment) => comment.toJSON());
    res.status(200).render('/', { comments });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      commentBody: req.body.commentBody,
      postId: req.body.postId,
      userId: req.body.userId,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const editComment = await Comment.update(
      {
        userId: req.session.userId,
        commentBody: req.body.commentBody,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!editComment[0]) {
      res.status(404).json({
        message: 'no comment found with this ID',
      });
      return;
    }
    res.status(200).json(editComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete(':/id', withAuth, async (req, res) => {
  try {
    const dbCommData = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });
    if (!dbCommData) {
      res.status(404).json({ message: 'No comment found for this user!' });
      return;
    }
    res.status(200).json(dbCommData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
