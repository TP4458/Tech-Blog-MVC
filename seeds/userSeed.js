const { User } = require('../models');

//sample user data
const userData = [
  {
    userName: 'MrNobody',
    email: 'nobody@email.com',
    password: '123456',
  },
  {
    userName: 'MrWick',
    email: 'iluvdogs@email.com',
    password: 'puppy',
  },
];
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
