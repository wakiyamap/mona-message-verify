const http = require('http');
const bitcoinMessage = require('bitcoinjs-message');
http.createServer(function (req, res) {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', function (chunk) {
      data += chunk
    }).on('end', function () {
      if (data.length > 3000) {
        res.writeHead(413, {"Content-Type": "text/plain"});
        res.write("413 Payload Too Large\n");
        res.end();
      }
      try {
        const obj = JSON.parse(data);
        res.writeHead(200, {'Content-Type' : 'application/json'});
        if (bitcoinMessage.verify(obj.message, obj.address, obj.signature, "\x19Monacoin Signed Message:\n", true)) {
          res.write("{\"result\": true}");
        } else {
          res.write("{\"result\": false}");
        }
        res.end();
      } catch (err) {
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.write("{\"result\": false}");
        res.end();
      }
    })
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, {'Allow' : 'OPTIONS, POST'});
    res.end();
  } else {
    res.writeHead(405, {"Content-Type": "text/plain"});
    res.write("405 Method Not Allowed\n");
    res.end();
  }
}).listen(3000);
