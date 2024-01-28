// const seedPost = require('./postSeed');
// const seedUser = require('./userSeed');
// const seedComm = require('./commSeed');

// const sequelize = require('../config/connection');

// // seeding the schema
// const seedAll = async () => {
//   await sequelize.sync({ force: true });
//   console.log('\n--- DATABASE SYNCED ---\n');

//   await seedUser();
//   console.log('\n--- USERS SEEDED ---\n');

//   await seedPost();
//   console.log('\n--- POSTS SEEDED ---\n');

//   await seedComm();
//   console.log('\n--- COMMENTS SEEDED ---\n');

//   process.exit(0);
// };

// seedAll();

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const userSeed = require('./userSeed.json');
const postSeed = require('./postSeed.json');
const commSeed = require('./commSeed.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userSeed, {
    individualHooks: true,
    returning: true,
  });

  // console.log(users)
  // const userData = users.map((user)=>user.get({plain:true}))
  //console.log(userData)

  const postInfo = await Post.bulkCreate(postSeed);
  // const postData = postInfo.map((post) => post.get({ plain: true }));

  // console.log(postData)

  const comments = await Comment.bulkCreate(commSeed);

  process.exit(0);
};

seedAll();
