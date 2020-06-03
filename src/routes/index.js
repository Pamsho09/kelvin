const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
router.get('/', (req, res) => {
  res.render('index')
});

router.get('/about', (req, res) => {
  res.send('about');
});

router.get('/cursos',isAuthenticated,(req, res) => {
  res.render('cursos');
});
module.exports = router;

router.get('/perfil',isAuthenticated,(req, res) => {
  res.render('perfil');
});
module.exports = router;