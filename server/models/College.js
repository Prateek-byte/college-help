import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: String,
  domain: String
});

export default mongoose.model('College', collegeSchema);
