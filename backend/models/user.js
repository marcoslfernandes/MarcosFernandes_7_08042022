


  module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Utilisateurs", {
      prénom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return User;
  };

  

// User.associate = models => {
// User.hasMany(models.Blogs, {
//   onDelete: "cascade"
// })};
