const router = require('express').Router();
const passport = require('passport');

// Models
const User = require('../models/User');

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { name,escuela,email, password, password2,ran } = req.body;
  if(password != password2) {
    errors.push({text: 'Contraseña no coincide.'});
  }
  if(password.length < 4) {
    errors.push({text: 'La contraseña debe tener mas de 4 caracteres.'})
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, name, escuela, email, password, password2});
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'El correo esta en uso.');
      res.redirect('/users/signup');
    } else {
      // Saving a New User
      const newUser = new User({name,escuela, email, password,ran});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Cuenta creada.');
      res.redirect('/users/signin');
    }
  }
});

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Adios');
  res.redirect('/users/signin');
});

module.exports = router;
