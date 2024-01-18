const { User } = require('../models');

//sample user data
const userData = [
  {
    user_name: 'MrNobody',
    email: 'nobody@email.com',
    password: '123456',
  },
  {
    user_name: 'MrWick',
    email: 'iluvdogs@email.com',
    password: 'puppy',
  },
];
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
