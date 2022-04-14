const User = require('../models/user');
const Post = require('../models/blogs');

module.exports = {
  async blogs(req, res){
    const titre = req.body.titre;
    const texte = req.body.texte;
    const imageUrl = req.body.imageUrl;
    const user_id = req.params.id;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({error: 'User not found'});
    }
    const publi = await Post.create({titre, texte, imageUrl, user_id});
    return res.json(publi);}};

// exports.blogs = async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       attributes: ["prenom", "nom", "id"],
//       where: {id: req.body.users_id},
//       order: [["createdAt", "DESC"]],
//     })

//     if (user !== null) {
//       console.log("user :", user)
//       const post = await Post.create({
//         titre: req.body.titre,
//         texte: req.body.texte,
//         imageUrl: req.body.imageUrl,
//         user_id: req.params.user_id
//       })

//       res.status(201).json({post: post})
//     } else {
//       res.status(400).json({réponse: "L'utilisateur n'existe pas"})
//     }
//   } catch (error) {
//     return res.status(500).send({error: "Erreur serveur"})
//   }
// };

// exports.blogs = (req, res, next) => {
//   const titre = req.body.titre;
//   const texte = req.body.texte;
//   const imageUrl = req.body.imageUrl;
//   const user_id = req.params.user_id;
//     const user = User.findByPk(user_id);
//   if (!user) {
//     return res.status(400).json({error: 'User not found !!!'});
//   }

//   const publi = Publi.create({titre, texte, imageUrl, user_id});

//   return res.json(publi);

// }

