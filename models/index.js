const Post = require('./post');
const User = require('./user');
const Comment = require('./comment');

//associations
User.hasMany(Post, {
  foreignKey: 'userId',
});
User.hasMany(Comment, {
  foreignKey: 'userId',
});
Post.belongsTo(User, {
  foreignKey: 'userId',
});
Post.hasMany(Comment, {
  foreignKey: 'postId',
});
Comment.belongsTo(User, {
  foreignKey: 'userId',
});
Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

module.exports = { User, Post, Comment };
