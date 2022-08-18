const http = require('http');

const requestHandler = (req, res) => {
  const { url, method } = req;
  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <html>
      <head>
        <title>Http Request</title>
        <style>
          h1 { 
            color: blue;
          }
          body {
            background-color: black;
          }
        </style>
      </head>
      <body>
        <h1>Url: ${url}</h1>
        <h1>Method: ${method}</h1>
      </body>
    </html>
  `);
  res.end();
};

const server = http.createServer(requestHandler);

server.listen(8500);
