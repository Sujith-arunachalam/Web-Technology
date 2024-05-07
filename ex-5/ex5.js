var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(req, res) {
  var path = url.parse(req.url).pathname;
  console.log('Request for ' + path + ' received');
  
  var query = url.parse(req.url).query;
  console.log(query);
  var params = querystring.parse(query);
  var username = params["username"];
  var id = params["id"];
  var branch = params["branch"];
  var mobileNo = params["phno"];
  var gender = params["gender"];
  var branchadd = params["branchadd"];

  var htmlResponse = `
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
        border: 2px solid #dddddd;
        text-align: left;
        padding: 8px;
        color: black;
      }
      th {
        background-color: #f2f2f2;
        background color: black;
        
      }
      h3{
        background-color: aqua;
        color: black;
        text-align: center;

      }
    </style>
    </head>
    <body>
    <h2>User Details</h2>
    <table>
      <tr>
        <th><h3>Field</h3></th>
        <th><h3>Value</h3></th>
      </tr>
      <tr>
        <th>Username</th>
        <td>${username}</td>
      </tr>
      <tr>
        <th>ID</th>
        <td>${id}</td>
      </tr>
      <tr>
        <th>Branch</th>
        <td>${branch}</td>
      </tr>
      <tr>
        <th>Mobile No</th>
        <td>${mobileNo}</td>
      </tr>
      <tr>
        <th>Gender</th>
        <td>${gender}</td>
      </tr>
      <tr>
        <th>Branch address</th>
        <td>${branchadd}</td>
      </tr>
    </table>
    </body>
    </html>
  `;
  

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(htmlResponse);
  res.end();
}

http.createServer(onRequest).listen(8080);
console.log('Server is running...');