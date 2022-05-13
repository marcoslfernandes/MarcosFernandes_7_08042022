const sequelize = require('../models');
const User = sequelize.User;
const Post = sequelize.Post;
const fs = require('fs');
const Comments = sequelize.Comment;
const auth = require('../middleware/auth')
const multer = require('multer');




exports.createPost = async (req, res, next) => {
  const post = JSON.parse(req.body.post);
  const titre = post.titre;
  const texte = post.texte;
  // const imageUrl = req.body.imageUrl;
  // const imageUrl = `${req.file.filename}`;
  const user_id = req.params.id;
  const user = await User.findByPk(user_id);
  User.findOne({
    where: {
      id: req.params.id
    }, attributes: ["id", "prenom", "nom", "email"]
  })
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  } let imageUrl
  if (req.file) {
    console.log("filename", req.file.filename)
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  const publi = await Post.create({ titre, texte, imageUrl, user_id });
  return res.json(publi);
}

// exports.deletePost = async (req, res, next) => {
//   // Post.findOne({ where: { id: req.params.id } }).then(
//   //   (post) => {
//   //     if (!post) {
//   //       res.status(404).json({
//   //         error: new Error('No such Thing!')
//   //       });
//   //     }
//   //     if (post.user_id !== req.auth.userId) {
//   //       res.status(400).json({
//   //         error: new Error('Unauthorized request!')
//   //       });
//   //     }

//   //   }
//   // )
//         Comment.destroy({ where: { post_id: req.params.id } })
//         Post.destroy({
//           where: { id: req.params.id }
//         })
//           .then(function (deletedRecord) {
//             // if (post.user_id !== req.auth.userId) {
//             //   res.status(400).json({
//             //     error: new Error('Unauthorized request!')
//             //   });
//             // }
//             if (deletedRecord === 1) {
//               res.status(200).json({ message: "Post supprimé" });
//             }
//             else {
//               res.status(404).json({ message: "Post non trouvé" })
//             }
//           })
//           .catch(function (error) {
//             res.status(500).json(error);
//           });
//       };


// exports.deletePost = async (req, res, next) => {
//   try {
//     const post = await Post.findOne({where: {id: req.params.id}})
//     console.log("Post trouvé", post)
//     if (User.admin == 0 && post.user_id !== req.auth.userId) {
//               res.status(400).json({
//                 error: new Error('Unauthorized request!')
//               });
//             }
//     if (post.imageUrl) {
//       const filename = post.imageUrl.split("/images")[0]
//       console.log("Filename to Delete", filename)
//       fs.unlink(`images/${filename}`, function(error) {
//         if(error){
//           throw error;
//         }
//         const filename = post.imageUrl.split("/images")[0]
//         console.log("Filename to Delete", filename)
//         fs.unlink(`images/${filename}`)
//         Comments.destroy({where : {post_id: req.params.id}})
//         Post.destroy({where: {id: req.params.id}})
//         res.status(200).json({message: "Post et image supprimé"})
//       })
//     } 
//   } catch (error) {
//     return res.status(500).send({error: "Erreur serveur"})
//   }
// };

// exports.deletePost = (req, res, next) => {
//   Post.findOne({ where: { id: req.params.id } })
//     .then(post => {
//       const filename = post.imageUrl.split('/images/')[1];
//       fs.unlink(`images/${filename}`, () => {
//         Comments.destroy({ where: { post_id: req.params.id } })
//         Post.destroy({ where: { id: req.params.id } })
//           .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
//           .catch(error => res.status(400).json({ error }));
//       });
//     })
//     .catch(error => res.status(500).json({ error }));
// };

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({where: {id: req.params.id}})
    console.log("Post trouvé :", post)
    if (User.admin == 0 && comment_id.user_id !== req.auth.userId) {
      res.status(400).json({
        error: new Error('Unauthorized request!')
      });
    }
    if (post.imageUrl) {
      const filename = post.imageUrl.split("/images")[1]
      console.log("Filename to Delete", filename)
      fs.unlink(`images/${filename}`, function(error) {
        if(error){
          throw error;
        }
        Comments.destroy({where : {post_id: req.params.id}})
        Post.destroy({where: {id: req.params.id}})
        res.status(200).json({message: "Post et image supprimé"})
      })
    } else {
      Post.destroy({where: {id: post.id}}, {truncate: true})
      res.status(200).json({message: "Post supprimé"})
    }
  } catch (error) {
    return res.status(500).send({error: "Erreur serveur"})
  }
};




exports.findAll = async (req, res, next) => {

  try {
    Post.findAll({ attributes: ["id", "titre", "texte", "imageUrl", "user_id"], })
      .then(posts => {
        posts.map(posts => {
          // if(post.imageUrl) post.imageUrl = `http://localhost:4200/images/${post.imageUrl}`
          // if(post.User.avatar) post.User.avatar = `http://localhost:4200/images/${post.User.avatar}`
        });
        res.json(posts)
      })
  } catch (error) { return res.status(500).send({ error: "Une erreur est survenue lors de la récupération des posts ", }) }
};

exports.findOne = (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.id
    }, attributes: ["id", "titre", "texte", "imageUrl", "user_id"]
  }).then(
    (post) => {
      if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
      }
      // product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
      res.status(200).json(post);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};


exports.findAllPostsUser = async (req, res, next) => {

  try {
    Post.findAll({
      where: { user_id: req.params.id },
      attributes: ["id", "titre", "texte", "imageUrl", "user_id"],
    })
      .then(posts => {
        posts.map(posts => {
          // if(post.imageUrl) post.imageUrl = `http://localhost:4200/images/${post.imageUrl}`
          // if(post.User.avatar) post.User.avatar = `http://localhost:4200/images/${post.User.avatar}`
        });
        res.json(posts)
      })
  } catch (error) { return res.status(500).send({ error: "Une erreur est survenue lors de la récupération des posts ", }) }
};


exports.findOnePost = async (req, res, next) => {

  try {

    Post.findOne({
      where: { user_id: req.params.id },
      attributes: ["id", "titre", "texte", "imageUrl", "user_id"],
    })
      .then(posts => {
        posts.map(posts => {
          // if(post.imageUrl) post.imageUrl = `http://localhost:4200/images/${post.imageUrl}`
          // if(post.User.avatar) post.User.avatar = `http://localhost:4200/images/${post.User.avatar}`
        });
        res.json(posts)
      })
  } catch (error) { return res.status(500).send({ error: "Une erreur est survenue lors de la récupération des posts ", }) }
};


