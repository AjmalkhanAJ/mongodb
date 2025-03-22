const {MongoClient} = require ('mongodb')
const client = new MongoClient('mongodb+srv://ajmal:ajmal%40123@ajmal.i78ik.mongodb.net/')
// client.connect()
// .then (()=>{
//     console.log("connected")
// })
// .catch((error)=>console.log("failed",error))

const nameAr = process.argv[2];
const pass = process.argv[3];
// console.log(`hello!$ {nameAr} `);

    client.db("test").collection("clg").insertOne({
        name : nameAr,
        pass : pass
    })
    .then((res)=>{
        console.log(res)
    client.close()
        .catch(err=>console.log(err))
})


// const khan = capital (process.argv[2]||"welcome");
// console.log(`hello!$ {nameAry} `);

// function capital (khan){
//     client.db("test").collection("clg").updateOne({nameAr:'kalki'},
//         {
//             $set:
//             {
//                 nameAr:khan
//             }
//         }
//     )

//     .then((res)=>{
//     console.log(res)
//     client.close()
//     .catch(err=>console.log(err))
// })
// }
   
   
