const app         = require("express")();
const config      = require("dotenv").config();
const mongoose    = require("mongoose");
const bodyParser  = require("body-parser");
const morgan      = require("morgan");
const db          = require("./database");
const routes      = require("./routes");
const errors      = require("./utils/errors");

// Logging

app.use(morgan("tiny"));

// Body Parser for req.body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes & Handlers

app.use("/", routes);

// Error Handling

app.use(errors.log);
app.use(errors.clientErrorHandler);
app.use(errors.globalErrorHandler);

module.exports = app;
