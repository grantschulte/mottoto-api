const app = require("./src/app");
const port = process.env.NODE_ENV === "test"
  ? 7000
  : process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

module.exports = app;
