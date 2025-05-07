import express from 'express';
import Resource from '../models/Resource.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};

router.get('/', async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json(resources);
});

router.post('/', auth, async (req, res) => {
  const { title, url, scope, tags } = req.body;
  const resource = await Resource.create({
    title, url, postedBy: req.user.id, scope, tags
  });
  res.status(201).json(resource);
});

export default router;
