module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Commentaires', {
    texte: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // post_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    },
    {timestamps: false}
    );
  return Comment;
};






  