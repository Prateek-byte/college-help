import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scope: String, // "global" or ObjectId.toString()
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Resource', resourceSchema);
