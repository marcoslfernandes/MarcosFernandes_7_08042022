const Publi = require('../models/blogs');
const fs = require('fs');

exports.createPubli = (req, res, next) => {
  const publiObject = JSON.parse(req.body.publi);
  delete publiObject._id;
  const publi = new Thing({
    ...publiObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  publi.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePubli = (req, res, next) => {
  Publi.findOne({
    _id: req.params.id
  }).then(
    (publi) => {
      res.status(200).json(publi);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyPubli = (req, res, next) => {
  const publiObject = req.file ?
    {
      ...JSON.parse(req.body.publi),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Publi.updateOne({ _id: req.params.id }, { ...publiObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePubli = (req, res, next) => {
  Publi.findOne({ _id: req.params.id })
    .then(publi => {
      const filename = publi.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Publi.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllPubli = (req, res, next) => {
  Publi.find().then(
    (publis) => {
      res.status(200).json(publis);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};