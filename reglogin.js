const http=require("http");
const url=require("url");
const fs=require("fs");

const{MongoClient}=require("mongodb")
const client = new MongoClient("mongodb+srv://ajmal:ajmal%40123@ajmal.i78ik.mongodb.net/")

const server=http.createServer((req,res)=>{
    const parseurl=url.parse(req.url,true);
    console.log(parseurl);
    if(parseurl.pathname==="/")
    {
      res.writeHead(200,{"content-type":"text/html"});
      fs.readFile("text.html","utf8",(err,data)=>{
        if (err)throw err;
      else{
        res.write(data);
        res.end();
      }
      
    })
  }

    else if(parseurl.pathname ==="/check")
    {
      let n=parseurl.query.name;
      let m=parseurl.query.mail;
      let p=parseurl.query.pass;

      client.db("test").collection("clg").insertOne({names:n,email:m,pass:p})

    .then((res)=>{
      console.log(res)
      client.close()
    })
    .catch((err)=>console.log(err))
        
    }

 else if(parseurl.pathname==="/log")
  {
    res.writeHead(200,{"content-type":"text/html"});
    fs.readFile("txt1.html","utf8",(err,data)=>{
      if (err)throw err;
      else{
        res.write(data);
        res.end();
      }
    })
}

else if(parseurl.pathname ==="/logcheck"){
  let ln=parseurl.query.lname;
  // let m=parseurl.query.mail;
  let lp=parseurl.query.lpass;

      client.db("test").collection("clg").find({})
      .toArray()
      .then((cdata)=>{
        var f= false;
        for(const element of cdata){
          if (element.names === ln && element.pass === lp){
            f=true
            break
          }
        }
        if(f){
              res.writeHead(200,{"content-type":"text/html"});
              res.write('<script>alert("log success") </script>');
              res.end();
        }
    
        else{
          res.writeHead(200,{"content-type":"text/html"});
          res.write("<h1>page not found<h1>");
          res.end();

        }
    client.close()
    })
    .catch((err)=>console.log(err))
  }
    else{
      res.writeHead(200,{"content-type":"text/html"});
      res.write(`<h1>page not found<h1>`);
      res.end();
    }
})
    server.listen(4000,()=>{
      console.log("server running on http://localhost:4000");
    })