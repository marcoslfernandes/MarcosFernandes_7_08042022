const Sequelize = require('sequelize');
const User = require('./user');
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

const Post = sequelize.define('Blogs', {

  titre: {
    type: Sequelize.STRING,
    allowNull: false
   
  },
  texte: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true
    
  },

  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'utilisateurs', key: 'id'},
    
  }

});


// Post.sync({force: true});

// Post.create({
//   titre: 'Test',
//   texte: 'Texte texte texte',
//   imageUrl: 'Test image',
//   user_id: '1'
// });