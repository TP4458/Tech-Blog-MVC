const seedPost = require('./postSeed');
const seedUser = require('./userSeed');
const seedComm = require('./commSeed');

const sequelize = require('../config/connection');

// seeding the schema
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n--- DATABASE SYNCED ---\n');

  await seedUser();
  console.log('\n--- USERS SEEDED ---\n');

  await seedPost();
  console.log('\n--- POSTS SEEDED ---\n');

  await seedComm();
  console.log('\n--- COMMENTS SEEDED ---\n');

  process.exit(0);
};

seedAll();
