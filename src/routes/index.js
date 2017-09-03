const app = require("express");
const router = app.Router();

const users = require("./users");
const mottos = require("./mottos");

/*
 * Users
 */

router.get("/users", users.index);
router.get("/users/:handle", users.get);
router.post("/users", users.create);
router.put("/users/:handle", users.update);
router.delete("/users/:handle", users.remove);


/*
 * Mottos
 */

router.get("/mottos", mottos.index);
router.get("/mottos/:id", mottos.get);
router.post("/mottos", mottos.create);
router.put("/mottos/:id", mottos.update);
router.delete("/mottos/:id", mottos.remove);

/*
 * Catch All
 */

router.all("*", (req, res, next) => {
  let error = new Error("Not found.");
  error.status = 404;
  next(error);
});

module.exports = router;
