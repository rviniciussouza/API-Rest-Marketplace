const express = require("express");
const routes = express.Router();
const validate = require("express-validation");
const authMiddleware = require("./app/middlewares/auth");
const validators = require("./app/validators");
const controllers = require("./app/controllers");
const handler = require("express-async-handler");

routes.post(
	"/users",
	validate(validators.User),
	handler(controllers.UserController.store)
);
routes.post(
	"/sessions",
	validate(validators.Session),
	handler(controllers.SessionController.store)
);
routes.use(authMiddleware);

/**
 * Ads
 */

routes.get("/ads", handler(controllers.AdController.index));
routes.get("/ads/:id", handler(controllers.AdController.show));
routes.post(
	"/ads",
	validate(validators.Ad),
	handler(controllers.AdController.store)
);
routes.put(
	"/ads/:id",
	validate(validators.Ad),
	handler(controllers.AdController.update)
);
routes.delete("/ads/:id", handler(controllers.AdController.destroy));

/**
 * Purchase
 */

routes.post(
	"/purchases",
	validate(validators.Purchase),
	handler(controllers.PurchaseController.store)
);

module.exports = routes;
