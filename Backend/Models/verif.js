const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VerifSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
		unique: true,
	},
	tokenverif: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("veriftoken", VerifSchema);