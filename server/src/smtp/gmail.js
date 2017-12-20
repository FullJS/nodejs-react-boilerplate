var nodemailer = require('nodemailer');

const SendEmail = (toIn, subjectIn, htmlIn) => {
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
    subject: subjectIn,
    html: htmlIn
  };
  
  transporte.sendMail(email, function(err, info){
    if(err)
      throw err;
  });
}

export default SendEmail;