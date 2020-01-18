const express = require("express");
var mongoose = require("mongoose");
const dbconfig = require("./config/database");
const validation = require("express-validation");
const Youch = require("youch");
class App {
	constructor() {
		this.express = express();
		this.isDev = process.env.NODE_ENV != "production";
		this.database();
		this.middlewares();
		this.routers();
		this.exception();
	}

	database() {
		mongoose
			.connect(dbconfig.uri, {
				dbName: "MarketPlace",
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			.then(() => {
				console.log("Conexao realizada com sucesso");
			})
			.catch(err => {
				console.log(err);
			});
	}

	middlewares() {
		this.express.use(express.json());
	}

	routers() {
		this.express.use(require("./routes"));
	}

	exception() {
		this.express.use(async (err, req, res, next) => {
			if (err instanceof validation.ValidationError) {
				return res.status(err.status).json(err);
			}

			if (process.env.NODE_ENV != "production") {
				const youch = new Youch(err, req);
				return res.send(await youch.toHTML());
			}
		});
	}
}

module.exports = new App().express;
