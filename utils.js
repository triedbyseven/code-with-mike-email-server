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

const sendEmail = (fullName, email, phone, projectDetails) => {
  const subject = `📧  You have revieved a new email lead from ${fullName}!`;
  const text = `
    📧 You have revieved a new email lead!

    Full Name: ${fullName}
    Email: ${email}
    Phone: ${phone}
    Project Details: ${projectDetails}
  `;
  const html = `
    📧 You have revieved a new email lead!
    <br />
    <br />
    Full Name: ${fullName} <br />
    Email: ${email} <br />
    Phone: ${phone} <br />
    Project Details: ${projectDetails}
  `;

  const msg = {
    to: 'mikedev0431@gmail.com', // Andrew make sure to change this to YOUR personal email.
    from: 'michael@orijinator.com', // Change to your verified sender
    subject: subject,
    text: text,
    html: html,
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