const { sequelize } = require('../db');
const { Sequelize } = require('sequelize');

// TODO: create the Cheese model. 
// The model should have the following attributes:
// - id: a unique id for each user
// - name: the name of the cheese
// - description: a description of the cheese

const Cheese = sequelize.define('cheeses', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
  }
})

module.exports = { Cheese };