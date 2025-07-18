const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth');

const {errorHandler} = auth;

module.exports.registerUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  if (!req.body.email.includes("@")) {
    return res.status(400).send({ message: 'Invalid email format' });
  }

  User.findOne({ email: req.body.email }).then(existingUser => {
    if (existingUser) {
      return res.status(409).send({ message: 'Email already exists' });
    }

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    });

    return newUser.save()
      .then(() => res.status(201).send({ message: 'Registered Successfully' }))
      .catch(error => errorHandler(error, req, res));
  }).catch(error => errorHandler(error, req, res));
};


module.exports.loginUser = (req, res) => {

    if(req.body.email.includes("@")){
        return User.findOne({ email : req.body.email })
        .then(result => {
        	console.log(result)
            if(result == null){
                return res.status(404).send({ message: 'No email found' });
            } else {
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
                if (isPasswordCorrect) {
                    return res.status(200).send({ 
                        message: 'User logged in successfully',
                        access : auth.createAccessToken(result)
                        })
                } else {
                    return res.status(401).send({ message: 'Incorrect email or password' });
                }
            }
        })
        .catch(error => errorHandler(error, req, res));
    } else {
        return res.status(400).send({ message: 'Invalid email format' });
    }


};

module.exports.getProfile = (req, res) => {
    const userId = req.user.id;

   return User.findById(userId)
        .then(user => {
            if (!user) {
                res.status(404).send({ error: 'User not found' });
            }
            user.password = undefined;
            return res.status(200).send({ user });
        })
        .catch(err => res.status(500).send({ error: 'Failed to fetch user profile', details: err }));
};
