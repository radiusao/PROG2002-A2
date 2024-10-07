const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const app=express();

  
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




app.use(express.static(path.join(__dirname, 'public/')));

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"));
});
app.get("/search",(req,res)=>{
  res.sendFile(path.join(__dirname,"search.html"));
});
app.get("/fundraiser/:id",(req,res)=>{
  res.sendFile(path.join(__dirname,"fundraiser.html"));
});
app.get("/donate/:id",(req,res)=>{
  res.sendFile(path.join(__dirname,"donate.html"));
});
app.get("/admin",(req,res)=>{
  res.sendFile(path.join(__dirname,"admin.html"));
});


app.listen(8080,()=>{
  console.log("Running in 8080");
});