const Sequelize = require('sequelize');
const Blogs = require('../models/blogs')
const { INTEGER } = require('sequelize/lib/data-types');
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
const User = sequelize.define('Utilisateurs', {
  prénom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: { isEmail: true },
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }});
// User.associate = models => {
// User.hasMany(models.Blogs, {
//   onDelete: "cascade"
// })};
module.exports = User;