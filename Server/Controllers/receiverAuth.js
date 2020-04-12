const jwt = require("jsonwebtoken");
require("dotenv").config();
const Receiver = require("../Models/receiver");

exports.receiverSignup = async (req, res) => {
  const receiverExists = await Receiver.findOne({
    email: req.body.email
  });

  if (receiverExists)
    return res.status(403).json({
      error: "Email is taken!"
    });
  const receiver = await new Receiver(req.body);
  await receiver.save();
  res.status(200).json({
    msg: "Account created sucessfully!"
  });
};

exports.receiverSignin = (req, res) => {
  const { email, password } = req.body;

  Receiver.findOne({ email }, (err, receiver) => {
    if (err || !receiver) {
      return res.status(401).json({
        error: "receiver with this email doesn't exit. Please Sign In"
      });
    }

    if (!receiver.authenticate(password)) {
      return res.status(401).json({
        error: "Invalid Email/Password!"
      });
    }

    const token = jwt.sign({ _id: receiver.id }, process.env.JWT_SECRET);

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
    } = receiver;
    return res.json({
      token,
      receiver: {
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

exports.receiverSignout = (req, res) => {
  res.clearCookie("t");
  return res.json({
    msg: "Sign out success!"
  });
};

exports.getreceivers = (req, res) => {
  Receiver.find((err, receiver) => {
    if (err) {
      return res.status(401).json({
        error: "Error Fetching recievers"
      });
    }
    return res.json(receiver);
  });
};
