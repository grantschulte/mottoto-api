const apiRoutes = require("express").Router();
const routes    = require("express").Router();
const jwt       = require("jsonwebtoken");

const users     = require("./users");
const mottos    = require("./mottos");
const auth      = require("./auth");
const authors   = require("./authors");

const authUtils = require("../utils/auth");

/*
 * Public Routes
 */

routes.get("/", (req, res, next) => {
  res.send("Motto API Index");
});

// Auth

routes.post("/auth/create", auth.create);
routes.post("/auth/login", auth.login);
routes.get("/auth/me/from/token", authUtils.checkForAccessToken, auth.meFromToken);

// Authors

routes.get("/authors", authors.index);
routes.get("/authors/:handle", authors.get);

/*
 * API Routes
 */

// Require authentication for api routes.

apiRoutes.use(authUtils.checkForAccessToken);

// Users

apiRoutes.put("/users", users.update);
apiRoutes.delete("/users", users.remove);

// Mottos

apiRoutes.put("/mottos", mottos.update);

module.exports = { routes, apiRoutes };
