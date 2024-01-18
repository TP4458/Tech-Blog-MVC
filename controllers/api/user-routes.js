const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  const dbUserData = await User.findAll();
  res.status(200).json(dbUserData);
});

// Authentication for login/signup
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });
    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    const validatePass = await userData.checkPassword(req.body.password);

    if (!validatePass) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      res.json({ user: dbUserData, message: 'You are now logged in' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
