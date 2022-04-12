const User = require('../models/user');
const Publi = require('../models/blogs');


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

module.exports = {

async blogs(req, res){

  const titre = req.body.titre;
  const texte = req.body.texte;
  const imageUrl = req.body.imageUrl;
  const user_id = req.params.user_id;

  const user = await User.findByPk(user_id);

  if (!user) {
    return res.status(400).json({error: 'User not found !!!'});
  }

  const publi = await Publi.create({titre, texte, imageUrl});

  return res.json(publi);

}

};

