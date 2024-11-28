const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // create a transporter object

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });

  const app_password = process.env.app_password;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.email_address,
      pass: app_password,
    },
  });

  // define the email options
  const mailOptions = {
    from: "Gadget Plug",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
