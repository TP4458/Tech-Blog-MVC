const { Comment } = require('../models');

const commData = [
  {
    comment_body: 'wow so amazing!',
    user_id: 1,
    post_id: 2,
  },
  {
    comment_body: 'such a great idea!',
    user_id: 2,
    post_id: 1,
  },
];
const seedComm = () => Comment.bulkCreate(commData);

module.exports = seedComm;
