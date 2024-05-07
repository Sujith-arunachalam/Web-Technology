const http = require('http');
const querystring = require('querystring');

function onRequest(req, res) {
  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); 
    });

    req.on('end', () => {
      const params = querystring.parse(body);
      const { username, id, branch, phno, gender, branchadd } = params;

      const htmlResponse = `
        <html>
        <head>
        <title>User Details</title>
        <style>
          table {
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: 50%;
            margin: 20px auto;
          }
          td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
        </head>
        <body>
        <h2>User Details</h2>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Username</td>
            <td>${username}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>${id}</td>
          </tr>
          <tr>
            <td>Branch</td>
            <td>${branch}</td>
          </tr>
          <tr>
            <td>Mobile No</td>
            <td>${phno}</td>
          </tr>
          <tr>
            <td>gender</td>
            <td>${gender}</td>
          </tr>
          <tr>
            <td>branch address</td>
            <td>${branchadd}</td>
          </tr>
        </table>
        </body>
        </html>
      `;

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(htmlResponse);
      res.end();
    });
  } else {
   
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }
}

http.createServer(onRequest).listen(8000);
console.log('Server is running...');
