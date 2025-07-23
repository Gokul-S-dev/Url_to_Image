import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname , "/index.html"));
})

//server listing
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})