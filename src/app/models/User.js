const bcrypt = require("bcryptjs");
const mogoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

const UserSchema = new mogoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre("save", async function(next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
	compareHash(password) {
		return bcrypt.compare(password, this.password);
	}
};

UserSchema.statics = {
	generateToken({ id }) {
		return jwt.sign({ id }, authConfig.secret, {
			expiresIn: authConfig.expiresIn
		});
	}
};

module.exports = mogoose.model("User", UserSchema);
