const faker = require('faker');

const db = require('../config/connection');
const { Card, User } = require('../models');

db.once('open', async () => {
  await Card.remove({});
  await User.remove({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insert(userData);

  // create cards
  let createdCards = [];
  for (let i = 0; i < 100; i += 1) {
    const cardTitle = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdCard = await Card.create({ cardTitle, cardBody, cardSubject, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { cards: createdCard._id } }
    );

    createdCards.push(createdCard);
  }

  console.log('all done!');
  process.exit(0);
});
