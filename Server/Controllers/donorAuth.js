const jwt = require("jsonwebtoken");
require("dotenv").config();
const Donor = require("../Models/donor");

exports.donorSignup = async (req, res) => {
  const donorExists = await Donor.findOne({
    email: req.body.email
  });

  if (donorExists)
    return res.status(403).json({
      error: "Email is taken!"
    });
  const donor = await new Donor(req.body);
  await donor.save();
  res.status(200).json({
    msg: "Account created sucessfully!"
  });
};

exports.donorSignin = (req, res) => {
  const { email, password } = req.body;

  Donor.findOne({ email }, (err, donor) => {
    if (err || !donor) {
      return res.status(401).json({
        error: "donor with this email doesn't exit. Please Sign In"
      });
    }

    if (!donor.authenticate(password)) {
      return res.status(401).json({
        error: "Invalid Email/Password!"
      });
    }

    const token = jwt.sign({ _id: donor.id }, process.env.JWT_SECRET);

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
    } = donor;
    return res.json({
      token,
      donor: {
        email,
        name,
        phone,
        blood,
        address,
        latitude,
        longitude,
        type
      }
    });
  });
};
exports.donorSignout = (req, res) => {
  res.clearCookie("t");
  return res.json({
    msg: "Sign out success!"
  });
};

exports.getDonors = (req, res) => {
  Donor.find((err, donor) => {
    if (err) {
      return res.status(401).json({
        error: "Error Fetching Blood banks"
      });
    }
    return res.json(donor);
  });
};
