const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Groupomania', 'marcos', '12345', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  });
  
  sequelize
  .authenticate()
  .then(() => {
  console.log('Connection has been established successfully.');
  })
  .catch(err => {
  console.error('Unable to connect to the database:', err);
  });

  const User = require('./user.js')(sequelize, DataTypes);
  const Post = require('./blogs.js')(sequelize, DataTypes);

  const dbb = {  };

  dbb.sequelize = sequelize;

  dbb.User = User;
  dbb.Post = Post;

  module.exports = dbb;