const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yuanhar123@gmail.com",
    pass: "zfomkfzzrzdryrui",
  },
});

module.exports = transporter;
