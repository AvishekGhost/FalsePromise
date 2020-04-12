const jwt = require("jsonwebtoken");
require("dotenv").config();
const Bloodbank = require("../Models/bloodbank");

exports.bloodbankSignup = async (req, res) => {
  const bloodbankExists = await Bloodbank.findOne({
    email: req.body.email
  });

  if (bloodbankExists)
    return res.status(403).json({
      error: "Email is taken!"
    });
  const bloodbank = await new Bloodbank(req.body);
  await bloodbank.save();
  res.status(200).json({
    msg: "Account created sucessfully!"
  });
};

exports.bloodbankSignin = (req, res) => {
  const { email, password } = req.body;

  Bloodbank.findOne({ email }, (err, bloodbank) => {
    if (err || !bloodbank) {
      return res.status(401).json({
        error: "bloodbank with this email doesn't exit. Please Sign In"
      });
    }

    if (!bloodbank.authenticate(password)) {
      return res.status(401).json({
        error: "Invalid Email/Password!"
      });
    }

    const token = jwt.sign({ _id: bloodbank.id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });

    const {
      name,
      phone,
      bloodTypes,
      address,
      latitude,
      longitude,
      email,
      type
    } = bloodbank;

    return res.json({
      token,
      bloodbank: {
        email,
        name,
        phone,
        bloodTypes,
        address,
        latitude,
        longitude,
        type
      }
    });
  });
};

exports.bloodbankSignout = (req, res) => {
  res.clearCookie("t");
  return res.json({
    msg: "Sign out success!"
  });
};

exports.getbloodbank = (req, res) => {
  Bloodbank.find((err, bloodbank) => {
    if (err) {
      return res.status(401).json({
        error: "Error Fetching Blood banks"
      });
    }
    return res.json(bloodbank);
  });
};

exports.temp = (req, res) => {
  const email = "nrs@gmail.com";

  Bloodbank.findOne({ email }, (err, bloodbank) => {
    if (err) {
      return res.status(401).json({
        error: "bloodbank with this email doesn't exit. Please Sign In"
      });
    }

    const {
      name,
      phone,
      bloodTypes,
      address,
      latitude,
      longitude,
      email,
      type
    } = bloodbank;

    return res.json({
      email,
      name,
      phone,
      bloodTypes,
      address,
      latitude,
      longitude,
      type
    });
  });
};
