const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registerController')
const { body, check } = require('express-validator');

/* GET home page. */
router.post('/registration', [
  check('username', 'All input fields must be filled in!').trim().notEmpty(),
  check('username', 'The name must contain a minimum of 4 maximum 16 characters!').isLength({ min: 4, max: 16 }),
  check('email', 'All input fields must be filled in!').trim().notEmpty(),
  check('email', 'Write correct email!').isEmail(),
  check('password', 'All input fields must be filled in!').trim().notEmpty(),
  check('password', 'The password must contain a minimum of 8 maximum 40 characters!').isLength({ min: 8, max: 40 }),
  check('password', 'Password and confirm password do not match!').custom((value, { req }) => value === req.body.confirmPassword),
  check('gender', 'All input fields must be filled in!').notEmpty()
], registrationController.registration)
router.post('/login', [
  check('email', 'Email or password entered incorrectly, try again!').trim().notEmpty().isEmail(),
  check('password', 'Email or password entered incorrectly, try again!').trim().notEmpty()
],
  registrationController.login);

module.exports = router;
