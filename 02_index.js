const http = require('http');
const fs = require('fs');
const path = require('path');

const mainPage = (res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <html>
      <head>
        <title>Dashboard</title>
      </head>
      <body>
        <h1>Send Your Message!</h1>
        <form action="/send_message" method="POST">
          <input type="text" name="msg" placeholder="Add your message...">
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
  `);
  res.end();
};

const notFoundPage = (res) => {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 404;
  res.write(`
    <html>
      <head>
        <title>Not Found</title>
        <style>
          h1 {
            color: yellow;
            text-align: center;
          }
          body {
            background-color: black;
          }
        </style>
      </head>
      <body>
        <h1>404</h1>
      </body>
    </html>
  `);
  res.end();
};

const log = (req) => {
  const logPath = path.join('.', path.sep, 'log', 'log.txt');
  const reqBody = [];
  // getting all chunks
  req.on('data', (chunk) => {
    reqBody.push(chunk);
  });
  // end of chunks transmission
  req.on('end', () => {
    const parseBody = Buffer.concat(reqBody).toString('utf-8');
    const msg = parseBody.split('=')[1];
    fs.writeFileSync(logPath, `${new Date()} - ${msg}\n`, { flag: 'a' });
  });
};

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === '/') {
    return mainPage(res);
  } else if (url === '/send_message' && method === 'POST') {
    log(req);
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  return notFoundPage(res);
};

const server = http.createServer(requestHandler);

server.listen(8500);
