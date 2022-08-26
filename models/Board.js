const { sequelize } = require('../db');
const { Sequelize } = require('sequelize');

// TODO: create the Board model. 
// The model should have the following attributes:
// - id: a unique id for each board
// - name: the name of the board
// - description: a description of the board
// - rating: the rating of the board
// - createdAt: the date the board was created
// - updatedAt: the date the board was last updated

const Board = sequelize.define('boards', {
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
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = { Board };