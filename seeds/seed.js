const sequelize = require('../config/connection');
const { User, Article, Comment } = require('../models');

const userData = require('./user-seed.json');
const articleData = require('./article-seed.json');
const commentData = require('./comment-seed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Article.bulkCreate(articleData);

  await Comment.bulkCreate(commentData);

  process.exit(0);

};

seedDatabase();