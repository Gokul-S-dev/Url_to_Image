const express = require('express')
const path = require('path')

const app = express();
const PORT = 3000;

// This middleware allows Express to read form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"public")));

app.post('/download',(req,res) => {
    const url = req.body.url;
    console.log(`URL: ${url}`);
    
    // Send a response back to the browser
    res.send(`Received URL: ${url}`);
})

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
})

