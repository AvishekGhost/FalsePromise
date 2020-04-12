const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT;

//db connection shit here
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("Db connected");
});

mongoose.connection.on("error", err => {
  console.log(`Db Connection error: ${err.message}`);
});

//adding shittu routes
const receiverAuthRoutes = require("./Routes/receiverRoute");
const driverAuthRoutes = require("./Routes/driverRoute");
const bloodbankRoutes = require("./Routes/bloodbankRoute");
const donorRoutes = require("./Routes/donorRoute");
const orderRoutes = require("./Routes/orderRoute");

//gg easy coding
const app = express();

//mmiddleware shits
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", receiverAuthRoutes);
app.use("/", driverAuthRoutes);
app.use("/", bloodbankRoutes);
app.use("/", donorRoutes);
app.use("/", orderRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
