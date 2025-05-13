const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
  let filePath = '.'+req.url;
  if(filePath === "./") filePath = "./index.html";
  
  const extname = path.extname(filePath);
  let contentType = "Text/html";
  if(extname === ".css") contentType = "Text/css";
  if(extname === ".xml") contentType = "Text/xml";
  if(extname === ".js") contentType = "appication/js";
  
  fs.readFile(filePath,function(err,htmlDoc){
    if(err){
        res.writeHead(200, {'Content-Type': 'text/html'});
        return res.end("404 : Not found!!!!!");
    }
    res.writeHead(200, {'Content-Type': contentType});
    var q = url.parse(req.url,true).query;
    var txt = q.fname+ ' '+q.lname;
    res.write(htmlDoc);
    res.end();
  });
  
});

server.listen(8080);