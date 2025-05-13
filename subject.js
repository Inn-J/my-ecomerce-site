const http = require('http');
const subject = http.createServer(function (req, res){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST');
    res.setHeader('Access-Control-Allow-Header','Content-type');
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write('{"contactSubject": ["General Enqury","Class","Schedule","Instructer","Price","Auther","Location","Other"]}');
    res.end()
});
subject.listen(4040);