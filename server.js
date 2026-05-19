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

success:false,
error:"No URL"

});

}

try{

const data = await ytdlp(

url,

{
dumpSingleJson:true
}

);

console.log(data);

const videoUrl =

data.url ||

(data.formats &&
data.formats[0] &&
data.formats[0].url);

res.json({

success:true,

title:
data.title ||
"Instagram Reel",

thumbnail:
data.thumbnail ||
"https://via.placeholder.com/500",

video:
videoUrl ||
""

});

}catch(error){

console.log(error);

res.status(500).json({

success:false,

error:
"Instagram extraction failed"

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