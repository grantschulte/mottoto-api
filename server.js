const app = require("./src/app");
const config = require("./config");
const port = process.env.PORT || config.getPort();

app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

module.exports = app;
