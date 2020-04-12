const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const bloodbankSchema = new mongoose.Schema({
	name: { type: String, trim: true, required: true },
	phone: { type: Number, trim: true, required: true },
	bloodTypes: {
		'A+': { type: Number, required: true },
		'A-': { type: Number, required: true },
		'B+': { type: Number, required: true },
		'B-': { type: Number, required: true },
		'O+': { type: Number, required: true },
		'O-': { type: Number, required: true },
		'AB+': { type: Number, required: true },
		'AB-': { type: Number, required: true }
	},
	address: { type: String, trim: true, required: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
	email: { type: String, trim: true, required: true },
	hashed_password: { type: String, required: true },
	type: String,
	salt: String,
	created: { type: Date, default: Date.now }
});

bloodbankSchema
	.virtual("password")
	.set(function(password) {
		this._password = password;
		this.type = "bloodbank";
		this.salt = uuidv1();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(() => {
		return this._password;
	});

// methods
bloodbankSchema.methods = {
	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	encryptPassword: function(password) {
		if (!password) return "";
		try {
			return crypto
				.createHmac("sha1", this.salt)
				.update(password)
				.digest("hex");
		} catch (err) {
			return "";
		}
	}
};

module.exports = mongoose.model("Bloodbank", bloodbankSchema);
