import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import College from '../models/College.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const domain = email.split('@')[1];
  const college = await College.findOne({ domain });
  if (!college) return res.status(403).json({ error: 'College not registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, passwordHash, role: 'general_user', collegeId: college._id
  });

  const token = jwt.sign({ id: user._id, role: user.role, collegeId: college._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role, collegeId: user.collegeId }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
