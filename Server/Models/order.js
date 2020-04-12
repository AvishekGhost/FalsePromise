const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const orderSchema = new mongoose.Schema({
  bloodbank_email: {
    type: String,
    trim: true,
    required: true
  },
  bloodbank_phone: {
    type: Number,
    required: true
  },
  blood: {
    type: String,
    trim: true,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  is_delivered: {
    type: Boolean
  },
  receiver_phone: {
    type: Number,
    trim: true,
    required: true
  },
  receiver_address: {
    type: String,
    trim: true,
    required: true
  },
  receiver_latitude: {
    type: Number,
    required: true
  },
  receiver_longitude: {
    type: Number,
    required: true
  },
  receiver_email: {
    type: String,
    trim: true,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  type: String,
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
  // photo: {
  // 	data: Buffer,
  // 	contentType: String
  // },
});

orderSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.type = "order";
    this.is_delivered = false;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

// methods
orderSchema.methods = {
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

module.exports = mongoose.model("Order", orderSchema);
