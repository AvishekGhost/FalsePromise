const jwt = require("jsonwebtoken");
require("dotenv").config();
const Driver = require("../Models/driver");

exports.driverSignup = async (req, res) => {
	const driverExists = await Driver.findOne({
		email: req.body.email
	});

	if (driverExists)
		return res.status(403).json({
			error: "Email is taken!"
		});
	const driver = await new Driver(req.body);
	await driver.save();
	res.status(200).json({
		msg: "Account created sucessfully!"
	});
};

exports.driverSignin = (req, res) => {
	const { email, password } = req.body;

	Driver.findOne({ email }, (err, driver) => {
		if (err || !driver) {
			return res.status(401).json({
				error: "driver with this email doesn't exit. Please Sign In"
			});
		}

		if (!driver.authenticate(password)) {
			return res.status(401).json({
				error: "Invalid Email/Password!"
			});
		}

		const token = jwt.sign({ _id: driver.id }, process.env.JWT_SECRET);

		res.cookie("t", token, { expire: new Date() + 9999 });

		const {
			name,
			blood,
			address,
			latitude,
			longitude,
			email,
			phone,
			type
		} = driver;

		return res.json({
			token,
			driver: { email, name, phone, blood, address, latitude, longitude, type }
		});
	});
};

exports.driverSignout = (req, res) => {
	res.clearCookie("t");
	return res.json({
		msg: "Sign out success!"
	});
};
