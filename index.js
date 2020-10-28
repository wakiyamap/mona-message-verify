const http = require('http');
const bitcoinMessage = require('bitcoinjs-message');
http.createServer(function (req, res) {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', function (chunk) {
      data += chunk
    }).on('end', function () {
      console.log(data);
      try {
        const obj = JSON.parse(data);
        res.writeHead(200, {'Content-Type' : 'text/html'});
        if (bitcoinMessage.verify(obj.message, obj.address, obj.signature, "\x19Monacoin Signed Message:\n", true)) {
          res.write("{\"result\": true}");
        } else {
          res.write("{\"result\": false}");
        }
        res.end();
      } catch (err) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write("{\"result\": false}");
        res.end();
      }
    })
  }
}).listen(3000);
