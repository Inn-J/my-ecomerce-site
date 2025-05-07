const http = require('http');
const subject = http.createServer(function (req, res){
    res.setHeader('Acess-Control-Allow-Drigin','*');
    res.setHeader('Acess-Control-Allow-Methods','GET,POST');
    res.setHeader('Acess-Control-Allow-Header','Content-type');
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write('{"contactSubject": ["General Enqury","Class","Schedule","Instructer","Price","Auther","Location","Other"]')
    res.end()
});
subject.listen(4040);