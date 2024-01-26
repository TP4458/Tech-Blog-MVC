const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll();
    res.status(200).json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.userName = dbUserData.userName;
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({
//       where: { email: req.body.email },
//     });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect username or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.userId = userData.id;
//       req.session.loggedIn = true;

//       res
//         .status(200)
//         .json({ user: userData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
    if ((req.session.loggedIn = true)) {
      console.log('logged in yea');
    } else {
      console.log('not logged in');
    }
    // console.log(req.session);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// logout;
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
