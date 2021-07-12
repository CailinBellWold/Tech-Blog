const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: CURRENT_TIMESTAMP,
    },
    updated_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: NULL,
      onUpdate: CURRENT_TIMESTAMP,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    // timestamps: true,
    underscored: true,
    modelName: 'Article',
  }
);

module.exports = Article;
