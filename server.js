const app = require("./src/app");
const config = require("./config");
const port = config.getPort();

app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

module.exports = app;
