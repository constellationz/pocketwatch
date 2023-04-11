// email.js
// Contains functionality for email


const mailgun = require("mailgun-js");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

// Try sending an email
// @return success, error
const sendEmail = async (email, subject, payload, template) => {
  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);
  const options = () => {
    return {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };
  };

  mg.messages().send(options(), (error, body) => {
    if (error) {
      console.log(error)
    }
  });
}

// Given a user, send them an email if and only if their email has been verified
const sendEmailIfVerified = async (user, subject, payload, template) => {
  if (user.emailVerified) {
    sendEmail(user.email, subject, payload, template)
  }
}

module.exports = {
  sendEmail,
  sendEmailIfVerified,
}
