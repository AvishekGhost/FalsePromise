const express = require("express");
const { placeOrder, getOrder } = require("../Controllers/orderAuth");

const router = express.Router();

router.post("/order/placeorder", placeOrder);
router.get("/order/getorders", getOrder);

module.exports = router;
/*
{
    "bloodbank_email": "im@nigga.com",
    "bloodbank_phone" : 98888,
    "blood": "niggative",
    "amount": 69,
    "receiver_phone": 1234,
    "receiver_address": "Nigga house",
    "receiver_latitude": 12,
    "receiver_longitude": 21,
    "receiver_email": "im@nigga.com",
    "password": "123"
 }*/
