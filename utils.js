const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('');

const endpointEmitter = async (request, callback) => {
  console.log(`Server emitting at route ${request.url}`);

  const { method, url } = request;
  let data = undefined;

  if ( method === 'POST' ) {
    const buffers = [];

    for await (const chunk of request) {
      buffers.push(chunk);
    }

    data = Buffer.concat(buffers).toString();
  }

  callback(data);
};

const sendEmail = (subject, text) => {
  const msg = {
    to: 'mikedev0431@gmail.com', // Andrew make sure to change this to YOUR personal email.
    from: 'michael@orijinator.com', // Change to your verified sender
    subject: subject,
    text: text,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error)
    });
};

module.exports = {
  endpointEmitter,
  sendEmail
};