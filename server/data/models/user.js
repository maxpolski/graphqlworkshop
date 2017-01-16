import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  login: String,
  password: String,
  firstName: String,
  lastName: String,
});

export default mongoose.model('User', UserSchema);
