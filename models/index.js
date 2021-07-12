const User = require('./User');
const Article = require('./Article');

User.hasMany(Article, {
  foreignKey: 'user_id',
});

Article.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Article };
