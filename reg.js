const http = require ('http');
const url = require ('url');
const fs = require ('fs');


const server = http.createServer((req,res)=>{
    const parseUrl = url.parse(req.url,true);
    console.log(parseUrl);

    if(parseUrl.pathname === "/")
    {
        res.writeHead(200,{"content-Type":"text/html"});
        fs.readFile('server2.html','utf8',(err,data)=>{
        if (err) throw err;
        else{
            res.write(data);
            res.end();
        }
    })
}
else if(parseUrl.pathname === "/check")
{
    let aj="ajmal"
    res.writeHead(200,{"content-Type":"text/html"});
        res.write(`<h1> ${aj}</h1>`);
        res.end();
}
else if(parseUrl.pathname === "/about")
    {
        let sk="sharuk"
        res.writeHead(200,{"content-Type":"text/html"});
            res.write(`<h1> ${sk}</h1>`);
            res.end();
    }
    
else{
    res.writeHead(404,{"content-Type":"text/html"});
        res.write("<h1> page not found </h1>");
        res.end();
}
})
server.listen(4000,()=>{
    console.log("server running on http://localhost:4000");
})