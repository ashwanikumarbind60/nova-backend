const express = require("express");

const cors = require("cors");

const ytdlp = require("yt-dlp-exec");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req,res)=>{

res.send("Nova Backend Running");

});

app.post("/download", async (req,res)=>{

const url = req.body.url;

if(!url){

return res.status(400).json({

error:"No URL provided"

});

}

try{

const data = await ytdlp(

url,

{

dumpSingleJson:true,

noWarnings:true,

preferFreeFormats:true,

addHeader:[
"referer:instagram.com",
"user-agent:googlebot"
]

}

);

res.json({

success:true,

title:
data.title ||

"Instagram Reel",

thumbnail:
data.thumbnail ||

"https://via.placeholder.com/500",

video:
data.url ||

""

});

}catch(error){

console.log(error);

res.status(500).json({

error:"Failed to fetch reel"

});

}

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, ()=>{

console.log(
"Server Running"
);

});