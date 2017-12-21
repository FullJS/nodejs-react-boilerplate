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
      message: send.message
    };

    transporte.sendMail(email, function (err, info) {
      if (err) {
        console.error(erro);
        reject(erro);     
      }
      resolve(info);
    });
  });
}

module.exports = { Sender };
