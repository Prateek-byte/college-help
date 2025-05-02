import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: { type: String, enum: ['owner', 'general_admin', 'college_admin', 'general_user'] },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' }
});

export default mongoose.model('User', userSchema);
