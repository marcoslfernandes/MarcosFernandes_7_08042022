const sequelize = require('../models');
const User = sequelize.User;
const Post = sequelize.Post;
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
      const imageUrl = req.body.imageUrl;
      // const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const user_id = req.params.id;
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({error: 'User not found'});
      }
      const publi = await Post.create({titre, texte, imageUrl, user_id});
      return res.json(publi);
    }

   exports.deletePost = async (req, res, next) => {
   
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