const { validationResult } = require('express-validator');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class RegisterController {
  static registration = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { username, email, password, gender } = req.body;
    if (await User.findOne({ email })) {
      return res.status(409).json({ message: 'The user with this email has already been registered!' })
    }

    if (await User.findOne({ username })) {
      console.log(await User.findOne({ username }));
      return res.status(409).json({ message: 'The user with this username has already been registered!' })
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await new User({ username, email, gender, password: hashPassword })
    const { _id } = user;
    user
      .save()
      .then(response => {
        console.log(response)
      })
    const token = jwt.sign({
      email,
      username,
      _id
    }, process.env.JWT_SECRET, { expiresIn: '90d' });
    res.json({ token, user: jwt.verify(token, process.env.JWT_SECRET) });
  }
  static login = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ error: errors.array() });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email or password entered incorrectly, try again!' });
    }

    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email or password entered incorrectly, try again!' });
    }
    const { username, _id } = user;
    const token = jwt.sign({
      email,
      username,
      _id
    }, process.env.JWT_SECRET, { expiresIn: '90d' })
    res.json({ token, user: jwt.verify(token, process.env.JWT_SECRET) });
  }
  static changePassword = async (req, res, next) => {
    const { password, id } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ error: errors.array() });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await User.findOneAndUpdate({ _id: id }, { password: hashPassword });
    if (!user) {
      return res.status(401).json({ error: 'Email or password entered incorrectly, try again!' });
    }
    return res.json(user);

  }
}