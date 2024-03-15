import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
	name: String,
	author: String,
	body: String,
	phone: Number,
  password:String,
  token:String,
	phone: {
		type: Number,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: { type: Date, default: Date.now },
});

const userModel = mongoose.model('User', blogSchema);

export default userModel;
