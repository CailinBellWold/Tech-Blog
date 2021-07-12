const sequelize = require('../config/connection');
const { User, Article } = require('../models');

const userData = require('./user-seed.json');
const giftData = require('./article-seed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // we need to use bcrypt each userData.password
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Article.bulkCreate(articleData);

  process.exit(0);

};

seedDatabase();