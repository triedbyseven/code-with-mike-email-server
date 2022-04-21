const http = require('http');
const { endpointEmitter, sendEmail } = require('./utils');

const serverListener = async (request, response) => {
  endpointEmitter(request, async (data) => {
    if ( data ) {
      const dataToJson = JSON.parse(data);

      //Email request goes here.
      console.log(dataToJson, dataToJson.subject, dataToJson.text);
      sendEmail(dataToJson.subject, dataToJson.text);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(data);
      return;
    };

    const error = JSON.stringify({
      error: 'No data was given.'
    });

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(error);
  });
};

const server = http.createServer(serverListener);

server.listen(3001, () => console.log('Server is running on port 3001.'));