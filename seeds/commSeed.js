const { Comment } = require('../models');

const commData = [
  {
    commentBody: 'wow so amazing!',
    userId: 1,
    postId: 2,
  },
  {
    commentBody: 'such a great idea!',
    userId: 2,
    postId: 1,
  },
];
const seedComm = () => Comment.bulkCreate(commData);

module.exports = seedComm;
