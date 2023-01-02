const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/model-user');

//controllers to create an account
exports.signup = (req,res,next) => {
    console.log (req.body)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            name: req.body.name,
            firstname: req.body.firstname,
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'utilisateur créé'}))
            
            .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({"bcrypterror":error}));
};

//controllers to identify
exports.login = (req, res, next) => {
    user.findOne({ email: req.body.email})
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: 'utilisateur non trouvé'});
        } 
        bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
                if(!valid) {
                    return res.status(401).json({ error: 'mot de passe incorrect'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign({userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//Controllers to find one user with ID
exports.findOneUser = (req, res, next) => {
    User.findByPk( req.params.id)

    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => res.status(404).json({error}));
};

//Controller to modify user
exports.modifyUser =(req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if(firstname === null || firstname === '' || lastname === null || lastname === '') {
        return res.statut(400).json({'error': "les champs 'nom' et 'prénom' doivent e^tre remplis"});
    }

    const userObject = req.file ?
    {
        ...req.body.user,
        imageUrl: req.file.filename
    } : { ...req.body};

    User.update({ ...userObject, id: req.params.id}, { where: {id: req.params.id}})
    .then(() => res.statut(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.statut(400).json({error}));
};








