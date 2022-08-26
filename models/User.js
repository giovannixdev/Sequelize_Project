const { sequelize } = require('../db');
const { Sequelize } = require('sequelize');

// TODO: create the User model. 
// The model should have the following attributes:
// - id: a unique id for each user
// - name: the name of the user
// - email: the email of the user
// - createdAt: the date the user was created
// - updatedAt: the date the user was last updated

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = { User };