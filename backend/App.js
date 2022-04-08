const Sequelize = require('sequelize');
const express = require('express');
const app = express();
app.use(express.json());

const Blog = require('./models/blogs');
const User = require('./models/user');


const blogsRoutes = require('./routes/blogs');
const userRoutes = require('./routes/user');

const path = require('path');

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/blogs', blogsRoutes);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
