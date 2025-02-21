const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Get file extension
  let ext = path.extname(filePath);

  // Default to serving HTML files
  if (!ext) filePath += '.html';

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Handle 404 Not Found
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(data, 'utf8');
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf8');
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});