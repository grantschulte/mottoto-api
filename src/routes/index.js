const express = require("express");
const router = express.Router();
const users = require("./users");

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

module.exports = router;
