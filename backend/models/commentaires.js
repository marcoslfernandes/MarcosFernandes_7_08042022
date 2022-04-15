const Sequelize = require('sequelize');
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

const Comment = sequelize.define('Commentaires', {
  Texte: {
    type: Sequelize.STRING,
    allowNull: false
  },
  utilisateurs_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  blogs_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  },
  {timestamps: false}
  );

  module.exports = Comment;