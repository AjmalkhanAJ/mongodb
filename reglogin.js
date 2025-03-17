// const http = require ('http');
// const url = require ('url');
// const fs = require ('fs');

// const server = http.createServer((req,res)=>{
//     const parseurl = url.parse (req.url,true);
//     console.log(parseurl);
   
//     if(parseurl.pathname === "/")
//     {
//         res.writeHead(200,{"content-Type":"text/html"});
//         fs.readFile("text.html","utf8",(err,data)=>{
//             if (err) throw err;
//             else{
//                 res.write(data);
//                 res.end();
//             }
//         })
//     }
// })
//     elseif(parseurl.pathname === "/check")
//     {
//         let n = parseurl.query.name
//         let m = parseurl.query.mail
//         let p = parseurl.query.pass
         
//         const {MongoClient}= require("mongodb")
//         const client = new MongoClient ("mongodb+srv://ajmal:ajmal%40123@ajmal.i78ik.mongodb.net/")
//         client.db("test").collection("clg").insertOne({name:n,class:m})

//         .catch(err=>console.log(err))
        
//         res.writeHead(200,{"content-Type":"text/html"});
//         fs.writeFile('db.txt',n+""+m+""+p,(err)=>{
//             if (err) throw err;
//             else{
//                 res.write(`<script>alert('register success')</script>`);
//                 res.end();
//             }
//         })
//     }
//      elseif(parseurl.pathname === "/log")
//         {
//             res.writeHead(200,{"content-Type":"text/html"});
//             fs.readFile("txt1.html","utf8",(err,data)=>{
//                 if (err) throw err;
//                 else{
//                     res.write(data);
//                     res.end();
//                 }
//             })
//         }
//         elseif(parseurl.pathname === "/logcheck")
//             res.writeHead(200,{"content-Type":"text/html"});
//         fs.readFile("txt1.html","utf8",(err,data)=>{
//             if (err) throw err;
//            else {
//                 let ln = parseurl.query.lname
//                 let lp = parseurl.query.lpass
//                  let k = data.split('')
//                  let ar = k[0].split('')
//                  if(ar[0] == ln && ar[2] == lp){
//                     res.write(`<script>alert("login success")</script> `);
//                  }
        
//            }
//            else {
//             res.write(`<script>alert("failed to login")</script>`);
//            }
//               res.end();  
//             })
//             else {
//                 res.writeHead(404,{"content-Type":"text/html"});
//                 res.write(`<h1> page not found </h1>`);
//                 res.end();
            
//             }
        
// server.listen(4000,()=>{
//    console.log("server running on http://localhost:4000");
// })



const http=require("http");
const url=require("url");
const fs=require("fs");

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
      const{MongoClient}=require("mongodb")
      const client = new MongoClient("mongodb+srv://ajmal:ajmal%40123@ajmal.i78ik.mongodb.net/")
      client.db("test").collection("clg").insertOne({names:n,class:m,pass:p})

    .catch(err=>console.log(err))
  
        res.writeHead(200,{"content-type":"text/html"});
        fs.writeFile("db.next",n+""+m+""+p,(err)=>{
         if(err)throw err;
         else{
            res.write(`<script>alert("register success")</script>`);
            res.end();
         }
        
    })
}
 else if(parseurl.pathname==="/log")
  {
    res.writeHead(200,{"content-type":"text/html"});
    // client.db("test").collection("clg").find({})
    // .toArray()
    // .then((data)=>{
    //   console.log(data);
    //   for(const element of data){
    //     console.log(element)
    //     res.write(element.name+" "+element.email+" "+element.pass+'\b');
    //   }
    //   res.end();
    // })
    // .catch((err)=>console.log(err))
    fs.readFile("txt1.html","utf8",(err,data)=>{
      if (err)throw err;
    else{
      res.write(data);
      res.end();
    }
  })
}

else if(parseurl.pathname ==="/logcheck"){
  let n=parseurl.query.lname;
  let m=parseurl.query.lmail;
      // let p=parseurl.query.pass;
      const{MongoClient}=require("mongodb")
      const client = new MongoClient("mongodb+srv://ajmal:ajmal%40123@ajmal.i78ik.mongodb.net/")
      client.db("test").collection("clg").find({names:ln,class:lm})
      .toArray()
      .then((res)=>{
        console.log(res)
        client.close()
      })
     .catch((err)=>console.log(err))
      fs.readFile("db.txt","utf8",(err,data)=>{
        if(err)throw err;
        else{
          let lines=data.split("\n");
          for(let i=0;i<lines.length;i++){
            let line=lines[i].trim().split("");
            if(line[0]===n && line[1]===m){
              res.writeHead(200,{"content-type":"text/html"});
              res.write(`<script>alert("login success")</script>`);
              res.end();
            }
          }
        }
      })

}
    else{
      res.writeHead(404,{"content-type":"text/html"});
      res.write(`<h1>page not found<h1>`);
      res.end();

    }
    })
    server.listen(4000,()=>{
      console.log("server running on http://localhost:4000");
    })