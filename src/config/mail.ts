import nodemailer from "nodemailer";
import "dotenv/config";
import hbs from "nodemailer-express-handlebars";
import { resolve } from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: resolve(__dirname, "..", "shared", "views", "emails"),
    layoutsDir: resolve(__dirname, "..", "shared", "views", "emails"),
    defaultLayout: "",
  },
  viewPath: resolve(__dirname, "..", "shared", "views", "emails"),
  extName: ".hbs",
};
transporter.use("compile", hbs(handlebarOptions));

export { transporter };
