const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());

app.get("/", (req,res)=>{

res.send("Nova Backend Running");

});

app.get("/download", async(req,res)=>{

try{

const url = req.query.url;

if(!url){

return res.json({
success:false,
message:"No URL"
});

}

/* DEMO WORKING VIDEO */

const demoVideo =
"https://www.w3schools.com/html/mov_bbb.mp4";

const demoThumb =
"https://images.unsplash.com/photo-1498050108023-c5249f4df085";

res.json({

success:true,

title:"Instagram Reel",

thumbnail:demoThumb,

video:demoVideo,

audio:demoVideo

});

}catch(error){

res.json({

success:false,
message:"Server Error"

});

}

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log("Server Running");

});