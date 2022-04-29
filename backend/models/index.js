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
  const Comment = require('./commentaires.js')(sequelize, DataTypes);

  User.hasMany(Comment, {
    foreignKey: {
      name: "user_id",
      allowNull: false
    }
});

User.hasMany(Post, {
  foreignKey: {
    name: "user_id",
    allowNull: false
  }
});

Post.belongsTo(User, {
  foreignKey: "id"
});

Post.hasMany(Comment, {
  foreignKey: {
    name: "post_id",
    allowNull: false
  }
});

Comment.belongsTo(Post, {
  foreignKey: "id"
});

Comment.belongsTo(User, {
  foreignKey: "id"
});

  const dbb = {  };
  dbb.sequelize = sequelize;
  dbb.User = User;
  dbb.Post = Post;
  dbb.Comment = Comment;
  module.exports = dbb;

