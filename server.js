const http = require('http');
const headers = require('./headers');
const message = require('./messages');
const { endpointEmitter, sendEmail } = require('./utils');

const serverListener = async (request, response) => {
  endpointEmitter(request, async (data) => {
    const success = JSON.stringify(message.success);
    const error = JSON.stringify(message.error);

    if ( data ) {
      const dataToJson = JSON.parse(data);

      //Email request goes here.
      console.log(dataToJson);
      // sendEmail(dataToJson.fullName, dataToJson.email, dataToJson.phone, dataToJson.projectDetails);

      response.writeHead(200, headers);
      response.end(success);
      return;
    };

    response.writeHead(200, headers);
    response.end(error);
  });
};

const server = http.createServer(serverListener);

server.listen(3001, () => console.log('Server is running on port 3001.'));