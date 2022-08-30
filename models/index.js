const { User } = require('./User')
const { Board } = require('./Board')
const { Cheese } = require('./Cheese')

// Multiple Boards can be added to a User.
User.hasMany(Board, { 
  foreignKey: 'userId',
})
Board.belongsTo(User)

Board.belongsToMany(Cheese, { through: 'BoardCheese', foreignKey: 'boardId' })
Cheese.belongsToMany(Board, { through: 'BoardCheese', foreignKey: 'cheeseId' })

module.exports = { User, Board, Cheese }