import nodemailer from 'nodemaler';

export const sendEmail = (subject, message, send_to, sent_from, reply_to) => {
  //create email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  //Option for sending email;
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  //send email;
  transporter.sendEmail(options, function (err, info) {
    if (err) {
      console.log(err);
    }
    console.log(info);
  });
};
