const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');
const { registerSchema, loginSchema } = require('../validators/validators');

const SALT_ROUNDS = 10;

async function register(req, res, next) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existing = await User.findOne({ where: { email: value.email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const passwordHash = await bcrypt.hash(value.password, SALT_ROUNDS);
    const user = await User.create({ email: value.email, passwordHash, fullName: value.fullName });
    res.json({ id: user.id, email: user.email, fullName: user.fullName, createdAt: user.createdAt });
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ where: { email: value.email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(value.password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    res.json({ accessToken: token, tokenType: 'Bearer' });
  } catch (err) { next(err); }
}

module.exports = { register, login };
