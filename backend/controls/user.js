const sequelize = require('../models');
const User = sequelize.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordSchema = require('../models/validator-password');

exports.signup = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, avec une majuscule, une miniscule et un chiffre au moins.' });
  }
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

  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const email = req.body.email;
  const password = req.body.password;
  const user = User.create({ prenom, nom, email, password });
  res.status(200).json({
    id: user.id,
    // token: jwt.sign(
    //   { userId: user.id },
    //   'RANDOM_TOKEN_SECRET',
    //   { expiresIn: '24h' }
    // )
  });
}

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            id: user.id,
            // token: jwt.sign({ id: user.id }, `secretToken`, {
            //   expiresIn: "24h",
            token: jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: "24h",
            })
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Profil supprimé" });
      }
      else {
        res.status(404).json({ message: "Profil non trouvé" })
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.params.id } })
    if (req.body.prenom) {
      user.prenom = req.body.prenom
      console.log("Ancien prenom : ", user.prenom)
    }
    if (req.body.nom) {
      user.nom = req.body.nom
      console.log("Ancien nom : ", user.nom)
    }
    if (req.body.email) {
      user.email = req.body.email
      console.log("Ancien email : ", user.email)
    }
    if (req.body.password) {
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
      User.beforeUpdate(generateHash);
      user.password = req.body.password
      console.log("Ancien password : ", user.password)
    }
    try {
      user.save({})
      console.log("New userInfo : ", user)
      res.status(200).json({
        user: user,
        messageRetour: "Votre profil a bien été modifié",
      })
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour de votre proifl" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
};

exports.findAll = async (req, res, next) => {

  try {
    User.findAll({
      attributes: ["id", "prenom", "nom", "email"],
    }).then(users => {
      users.map(users => {
        // if(post.imageUrl) post.imageUrl = `http://localhost:4200/images/${post.imageUrl}`
        // if(post.User.avatar) post.User.avatar = `http://localhost:4200/images/${post.User.avatar}`
      });
      res.json(users)
    })
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenue lors de la récupération des utilisateurs",
    })
  }
};

exports.findOne = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    }, attributes: ["id", "prenom", "nom", "email"]
  }).then(
    (user) => {
      if (!user) {
        return res.status(404).json({ message: "Profil non trouvé" });
      }
      // product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
      res.status(200).json(user);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};

exports.findOnePost = (req, res, next) => {
  User.findOne({
    where: {
      user_id: req.params.id
    }, attributes: ["id", "prenom", "nom", "email"]
  }).then(
    (user) => {
      if (!user) {
        return res.status(404).json({ message: "Profil non trouvé" });
      }
      // product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
      res.status(200).json(user);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};

