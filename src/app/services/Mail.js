const nodemailer = require("nodemailer");
const mailConfig = require("../../config/mail");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const exphbs = require("express-handlebars");

const transport = nodemailer.createTransport(mailConfig);

const viewPath = path.resolve(__dirname, "..", "views", "emails");
console.log(path.resolve(viewPath, "partials"));
transport.use(
	"compile",
	hbs({
		viewEngine: exphbs.create({
			partialsDir: path.resolve(viewPath, "partials"),
			compilerOptions: {
				allowProtoPropertiesByDefault: true,
				allowProtoMethodsByDefault: true
			}
		}),
		viewPath,
		extName: ".hbs"
	})
);

module.exports = transport;
