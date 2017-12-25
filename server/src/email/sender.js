var nodemailer = require('nodemailer');

const Sender = (toIn, send = { subject: '', message: '' }) => {
  return new Promise(function (resolve, reject) {

    var transporte = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'jahnkehoch@gmail.com',
        pass: 'hochjahnke'
      }
    });

    var email = {
      from: 'jahnkehoch@gmail.com',
      to: toIn,
      subject: send.subject,
      html: send.message
    };

    transporte.sendMail(email, function (e, info) {
      if (e) {
        console.error(e);
        reject(e);     
      }
      resolve(info);
    });
  });
}

module.exports = { Sender };
