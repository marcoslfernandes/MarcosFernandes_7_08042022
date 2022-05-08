const sequelize = require('../models');
const User = sequelize.User;
const Post = sequelize.Post;
const Comment = sequelize.Comment;
const multer = require('multer');
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});



    exports.createPost = async (req, res, next) => {
      
      const titre = req.body.titre;
      const texte = req.body.texte;
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
        return res.status(400).json({error: 'User not found'});
      }let imageUrl
      if (req.file) {
        console.log("filename", req.file.filename)
        imageUrl = `${req.file.filename}`
      } 
      const publi = await Post.create({titre, texte, imageUrl, user_id});
      return res.json(publi);
    }

   exports.deletePost = async (req, res, next) => {
    Comment.destroy({where : {post_id:req.params.id}})
    Post.destroy({
      where: {id: req.params.id}})
      .then(function (deletedRecord) {
      if(deletedRecord === 1){
          res.status(200).json({message:"Post supprimé"});          
      }
      else
      {res.status(404).json({message:"Post non trouvé"})
      }})
  .catch(function (error){
      res.status(500).json(error);});};

      // exports.deletePost = async (req, res, next) => {
      //   try {
      //     const post = await Post.findOne({where: {id: req.params.id}})
      //     console.log("Post trouvé :", post)
      //     if (post.imageUrl) {
      //       const filename = post.imageUrl.split("/images")[0]
      //       console.log("Filename to Delete", filename)
      //       fs.unlink(`images/${filename}`, function(error) {
      //         if(error){
      //           throw error;
      //         }
      //         Comments.destroy({where : {posts_id :req.params.id}})
      //         Post.destroy({where: {id: req.params.id}})
      //         res.status(200).json({message: "Post et image supprimé"})
      //       })
      //     } else {
      //       Post.destroy({where: {id: post.id}}, {truncate: true})
      //       res.status(200).json({message: "Post supprimé"})
      //     }
      //   } catch (error) {
      //     return res.status(500).send({error: "Erreur serveur"})
      //   }
      // };

    exports.findAll = async (req, res, next) => {

      try {
        Post.findAll({attributes: ["id", "titre", "texte", "imageUrl", "user_id"],})
          .then(posts => {
          posts.map(posts => {
          // if(post.imageUrl) post.imageUrl = `http://localhost:4200/images/${post.imageUrl}`
          // if(post.User.avatar) post.User.avatar = `http://localhost:4200/images/${post.User.avatar}`
          });
          res.json(posts)})
      } catch (error) {return res.status(500).send({error: "Une erreur est survenue lors de la récupération des posts ",})}};

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
          Post.findAll({   where: { user_id: req.params.id },
            attributes: ["id", "titre", "texte", "imageUrl", "user_id"],})
            .then(posts => {
            posts.map(posts => {
            // if(post.imageUrl) post.imageUrl = `http://localhost:4200/images/${post.imageUrl}`
            // if(post.User.avatar) post.User.avatar = `http://localhost:4200/images/${post.User.avatar}`
            });
            res.json(posts)})
        } catch (error) {return res.status(500).send({error: "Une erreur est survenue lors de la récupération des posts ",})}};
   

        exports.findOnePost = async (req, res, next) => {

          try {
           
            Post.findOne({   where: { user_id: req.params.id },
              attributes: ["id", "titre", "texte", "imageUrl", "user_id"],})
              .then(posts => {
              posts.map(posts => {
              // if(post.imageUrl) post.imageUrl = `http://localhost:4200/images/${post.imageUrl}`
              // if(post.User.avatar) post.User.avatar = `http://localhost:4200/images/${post.User.avatar}`
              });
              res.json(posts)})
          } catch (error) {return res.status(500).send({error: "Une erreur est survenue lors de la récupération des posts ",})}};
    
  
   