const http = require('http');

const requestHandler = (req, res) => {
  // console.log(req);
  const { url, method } = req;
  console.log(url);
  console.log(method);
};

const server = http.createServer(requestHandler);

server.listen(8500);
