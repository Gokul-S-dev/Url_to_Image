const express = require('express')
const path = require('path')
const axios = require('axios')
const fs = require('fs');

const app = express();
const PORT = 3000;

// This middleware allows Express to read form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"public")));

app.post('/download',async(req,res) => {
    try{
    const imgurl = req.body.url;
    console.log(`URL: ${imgurl}`);
  

    //fetch image using axios
    const response = await axios({
       url: imgurl,
       method:"GET",
       responseType:"stream",
    });

    //Create unique filename
    const fileName=`img_${Date.now()}.jpg`;
    const savePath= path.join("downloads",fileName);

    //Make sure folder exists
    if(!fs.existsSync("downloads")){
        fs.mkdirSync("downloads");
    }


    //Save image file
    const writer = fs.createWriteStream(savePath);
    response.data.pipe(writer);

    writer.on("finish", ()=>{
        res.json({
            message:"Image download",
            file:fileName
        });
    });

    writer.on("error",(err) =>{
        res.status(500).json({error:"Erroe saving image",details:err.message})
    })
      
}
catch(error){
  res.status(500).json({error:"Failed to download image",details:error.message})
}
})

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
})

