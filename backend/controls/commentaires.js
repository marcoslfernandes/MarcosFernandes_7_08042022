const sequelize = require('../models');
const User = sequelize.User;
const Comment = sequelize.Comment;



exports.createComment = async (req, res, next) => {
    try {
      const user = await User.findOne({
        attributes: ["prénom", "nom", "email"],
        where: {id: req.params.id},
      })
      console.log("utilisateur trouvé", user.dataValues)
      const comment = await Comment.create({
        texte: req.body.texte,
        user_id: req.params.id,
        post_id: req.body.post_id,
      })
      comment.dataValues.User = user.dataValues
      console.log("commentaire créé", comment.dataValues)
      res.status(201).json({comment: comment})
    } catch(erreur) {
      
      res.status(500).send({error: erreur.message})
    }
  };

    exports.deleteComment = async (req, res) => {
      const comment = await Comment.destroy({where: {id: req.params.id}})
      res.status(200).json({comment, message: "Commentaire supprimé"})
    };

    exports.findAll = async (req, res, next) => {

      try {
        Comment.findAll({
          attributes: ["texte", "post_id"],
          }).then(comments => {
          res.json(comments)
        })
      } catch (error) {
        return res.status(500).send({
          error: "Une erreur est survenue lors de la récupération des posts ",
        })
      }};
