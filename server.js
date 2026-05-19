const express = require("express");

const cors = require("cors");

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

res.json({

success:true,

title:"Instagram Reel",

thumbnail:
"https://images.unsplash.com/photo-1498050108023-c5249f4df085",

video:
"https://www.w3schools.com/html/mov_bbb.mp4"

});

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, ()=>{

console.log(
"Server Running"
);

});
