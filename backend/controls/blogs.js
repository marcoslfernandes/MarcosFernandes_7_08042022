const Publi = require('../models/blogs');
const User = require('../models/user');
const fs = require('fs');

module.exports = {

async store(req, res){

  const titre = req.body.titre;
  const texte = req.body.texte;
  const imageUrl = req.body.imageUrl;
  const user_id = req.body.params;

  const user = await User.findByPk(user_id);

  if (!user) {
    return res.status(400).json({error: 'User not found !!!'});
  }

  const publi = await Publi.create({titre, texte, imageUrl, id});

  return res.json(publi);

}

};