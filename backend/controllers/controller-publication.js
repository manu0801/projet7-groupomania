const Publication = require('../models/model-publication');
const fs = require('fs');

//controllers to create publication
exports.createPublication = (req, res, next) => {
    const publicationObject = JSON.parse(req.body.sauce);
    delete publicationObject._id;
    const publication = new Sauce({
        ...publicationObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    publication.save()
    .then(() => res.status(201).json({ message: 'publication enregistrée'}))
    .catch(error => res.status(400).json({ error }));
};

//controllers to modify publication
exports.modifyPublication = (req, res, next) => {
    const publicationObject = req.file ?
    { ...JSON.parse(req.body.publica),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Publication.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'publication modifiée'}))
    .catch(error => res.status(400).json({ error }));
};

//controllers to delete publication
exports.deletePublication = (req,res,next) => {
    Publication.findOne({_id: req.params.id})
    .then(publication => {
        const filename = publication.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
        publication.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'publication supprimée'}))
        .catch(error => res.status(400).json({ error })); 
        });
    })
    .catch(error => res.status(500).json({ error}));
};

//controller to select one publication
exports.getOnePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id})
    .then(publication => res.status(200).json(publication))
    .catch(error => res.status(404).json({ error }));
};

//controller to see all the publications
exports.getAllPublication = (req, res, next) => {
    Publication.find()
    .then(publication => res.status(200).json(publication))
    .catch(error => res.status(400).json({ error }));
};

//controllers to like or dislike publication
exports.likeDislike = (req, res, next) => {
    if (req.body.like === 1) {
        Publication.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
            .then((publication) => res.status(200).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }))
    } else if (req.body.like === -1) {
        Publication.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
            .then((publication) => res.status(200).json({ message: 'Dislike ajouté !' }))
            .catch(error => res.status(400).json({ error }))
    }  else {
        Publication.findOne({ _id: req.params.id })
            .then(publication => {
                if (publication.usersLiked.includes(req.body.userId)) {
                    Publication.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                        .then((publication) => { res.status(200).json({ message: 'Like supprimé !' }) })
                        .catch(error => res.status(400).json({ error }))
                } else if (publication.usersDisliked.includes(req.body.userId)) {
                    Publication.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                        .then((publication) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }))
    }
};