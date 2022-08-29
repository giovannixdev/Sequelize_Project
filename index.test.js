const { sequelize } = require('./db')
const { User, Board, Cheese } = require('./models/index')

const {
  users,
  boards,
  cheeses,
} = require('./seedData');

describe('User, Board, Cheese Models', () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // TODO: sync
    await sequelize.sync({ force: true });
  });

  // CRUD OPERATIONS
  test('can create a User', async () => {
    const user = await User.create(users[0]);
    await User.create(users[1]);
    expect(user).toBeDefined();
    expect(user.name).toBe(users[0].name);
  });

  test('can create a Board', async () => {
    const board1 = await Board.create(boards[0]);
    await Board.create(boards[1]);
    await Board.create(boards[2]);
    expect(board1).toBeDefined();
    expect(board1.name).toBe(boards[0].name);
  });

  test('can create a Cheese', async () => {
    const cheese1 = await Cheese.create(cheeses[0]);
    await Cheese.create(cheeses[1]);
    expect(cheese1).toBeDefined();
    expect(cheese1.name).toBe(cheeses[0].name);
  });

  test('can find users', async () => {
    const foundUser = await User.findAll(
    {
      where: { id: 2 }
    });

    // console.log("foundUser ->", foundUser[0]);
    expect(foundUser.length).toBe(1);
    expect(foundUser[0].name).toBe(users[1].name);
  });

  test('can find boards', async () => {
    const foundBoard = await Board.findAll(
      {
        where: { id: 2 }
      });

    expect(foundBoard.length).toBe(1);
    expect(foundBoard[0].name).toBe(boards[1].name);
  });

  test('can find cheeses', async () => {
    const foundCheese = await Cheese.findAll(
      {
        where: { id: 2 }
      });

    expect(foundCheese.length).toBe(1);
    expect(foundCheese[0].name).toBe(cheeses[1].name);
  });

  test("can update a user", async () => {
    await User.update(
      {
        email: 'charmander@multiverse.io'
      },
      {
        where: { id: 1 }
      }
    );
    const user1 = await User.findByPk(1);
    expect(user1.email).toBe('charmander@multiverse.io');
  });

  test("can update a board", async () => {
    await Board.update(
      {
        description: 'French cheese board'
      },
      {
        where: { id: 1 }
      }
    );
    const board1 = await Board.findByPk(1);
    expect(board1.description).toBe('French cheese board');
  });

  test("can update a cheese", async () => {
    await Cheese.update(
      {
        description: 'provolone cheese'
      },
      {
        where: { id: 1 }
      }
    );
    const cheese1 = await Cheese.findByPk(1);
    expect(cheese1.description).toBe('provolone cheese');
  });

  test('can delete a user', async () => {
    // use the instance instead of the model to call destroy()
    const user1 = await User.findByPk(1);
    const destroyedUser = await user1.destroy();
    expect(destroyedUser.name).toBe(users[0].name);
    const remainingUsers = await User.findAll();
    expect(remainingUsers.length).toBe(1);
  });

  test('can delete a board', async () => {
    // use the instance instead of the model to call destroy()
    const board1 = await Board.findByPk(1);
    const destroyedBoard = await board1.destroy();
    expect(destroyedBoard.name).toBe(boards[0].name);
    const remainingBoards = await Board.findAll();
    expect(remainingBoards.length).toBe(2);
  });

  test('can delete a cheese', async () => {
    // use the instance instead of the model to call destroy()
    const cheese1 = await Cheese.findByPk(1);
    const destroyedCheese = await cheese1.destroy();
    expect(destroyedCheese.name).toBe(cheeses[0].name);
    const remainingCheeses = await Cheese.findAll();
    expect(remainingCheeses.length).toBe(1);
  });
})

describe("One to Many Association", () => {
  test("can create a user with boards", async () => {
    const users= await User.findAll();
    const boards = await Board.findAll();

    await users[0].addBoard(boards[0]);
    await users[0].addBoard(boards[1]);

    let userBoards = await users[0].getBoards();
    console.log(JSON.stringify(userBoards, null, 4));

    expect(userBoards.length).toBe(2);
  });
});