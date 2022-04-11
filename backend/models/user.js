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
  },
  
});

User.associate = models => {

User.hasMany(models.blogs, {
  onDelete: "cascade"
})

};

module.exports = User;



// function generateHash(user) {
//   if (user === null) {
//       throw new Error('No found employee');
//   }
//   else if (!user.changed('password')) return user.password;
//   else {
//       let salt = bcrypt.genSaltSync();
//       return user.password = bcrypt.hashSync(user.password, salt);
//   }
// }

// User.beforeCreate(generateHash);

// User.beforeUpdate(generateHash);

// User.sync({force: true});

// User.create({
//   prénom: 'Marcos',
//   nom: 'Fernandes',
//   email: 'marcos@gmail.com',
//   password: 'abcdefghi'
// })