const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

async store(req, res){

  function generateHash(user) {
    if (user === null) {
        throw new Error('No found employee');
    }
    else if (!user.changed('password')) return user.password;
    else {
        let salt = bcrypt.genSaltSync();
        return user.password = bcrypt.hashSync(user.password, salt);
    }
  }
  
  User.beforeCreate(generateHash);
  User.beforeUpdate(generateHash);
  
  const prénom = req.body.prenom;
  const nom = req.body.nom;
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.create({prénom, nom, email, password});

  return res.json(user)}};

  

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//       .then(hash => {
//         const user = new User({
//           email: req.body.email,
//           password: hash
//         });
//         user.save()
//           .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//           .catch(error => res.status(400).json({ error }));
//       })
//       .catch(error => res.status(500).json({ error }));
//   };

  // exports.login = (req, res, next) => {
  //   User.findOne({ email: req.body.email })
  //     .then(user => {
  //       if (!user) {
  //         return res.status(401).json({ error: 'Utilisateur non trouvé !' });
  //       }
  //       bcrypt.compare(req.body.password, user.password)
  //         .then(valid => {
  //           if (!valid) {
  //             return res.status(401).json({ error: 'Mot de passe incorrect !' });
  //           }
  //           res.status(200).json({
  //             userId: user._id,
  //             token: jwt.sign(
  //               { userId: user._id },
  //               'RANDOM_TOKEN_SECRET',
  //               { expiresIn: '24h' }
  //             )
  //           });
  //         })
  //         .catch(error => res.status(500).json({ error }));
  //     })
  //     .catch(error => res.status(500).json({ error }));
  // };