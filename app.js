const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//database connection
require("./config/database");

//require route file
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const outletRouter = require("./routes/outlet");

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));

//body parser

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/outlet", outletRouter);

app.listen(1001, ()=>{
    console.log("Server running on port 1001");
})