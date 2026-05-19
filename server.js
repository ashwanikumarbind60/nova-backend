const express = require("express");

const cors = require("cors");

const { exec } = require("child_process");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req,res)=>{

res.send("Nova Backend Running");

});

app.post("/download",(req,res)=>{

const url = req.body.url;

if(!url){

return res.status(400).json({

error:"No URL provided"

});

}

const command =

`yt-dlp -j "${url}"`;

exec(command,(error,stdout,stderr)=>{

if(error){

return res.status(500).json({

error:"Failed to fetch reel"

});

}

try{

const data =
JSON.parse(stdout);

res.json({

success:true,

title:data.title,

thumbnail:data.thumbnail,

video:data.url

});

}catch(e){

res.status(500).json({

error:"Invalid response"

});

}

});

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, ()=>{

console.log(
"Server Running"
);

});