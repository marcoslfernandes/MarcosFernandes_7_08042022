const Comment = require('../models/commentaires');
const Post = require('../models/blogs');
const User = require('../models/user');

// création d'un commentaire
// exports.createComment = async (req, res, next) => {

//     const Texte = req.body.Texte;
//     const utilisateurs_id = req.params.id;
//     const blogs_id = req.params.id

//     const user = await User.findByPk(utilisateurs_id);
//     if (!user) {
//       return res.status(400).json({error: 'User not found'});
//     }
//     // const commentaire = await Post.findByPk(blogs_id);
//     // if (!commentaire) {
//     //     return res.status(400).json({error: 'Post not found'});
//     //   }
//     const com = await Comment.create({Texte, utilisateurs_id, blogs_id});
//     return res.json(com);

//   }


exports.createComment = async (req, res, next) => {
    try {
      const user = await User.findOne({
        attributes: ["prénom", "nom", "email"],
        where: {id: req.params.id},
      })
      console.log("utilisateur trouvé", user.dataValues)
      const comment = await Comment.create({
        Texte: req.body.Texte,
        utilisateurs_id: req.params.id,
        blogs_id: req.params.id,
      })
      comment.dataValues.User = user.dataValues
      console.log("commentaire créé", comment.dataValues)
      res.status(201).json({comment: comment})
    } catch {
      res.status(500).send({error: "Erreur serveur"})
    }
  }


  