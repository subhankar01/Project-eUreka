const {spawn } = require("child_process");
const path = require("path");
const pathlocation = path.join(__dirname,"pneumonia.py")
const path2 = path.join(__dirname,"heart.py")
const path3 = path.join(__dirname,"cancer.py")

//Pneumonia X-RAY Scan
module.exports.pneumonia = (req,res) => {
    console.log("ok");
    var process = spawn('python',[pathlocation, "viral1.jpeg"] );
    process.stdout.on('data', function(data) { 
        console.log(data,"in process function");
        res.send(JSON.parse(data.toString())); 
    }) 
}

//Heart state prediction
module.exports.heart = (req,res) => {
    const {age,bp,chol,hbr,sex} = req.body;
    var process = spawn('python',[path2,age,bp,chol,hbr,sex] );
    process.stdout.on('data', function(data) { 
        console.log(data,"in process function");
        res.send(JSON.parse(data.toString())); 
    })
} 

//Cancer prediction
module.exports.cancer = (req,res) => {
    var process = spawn('python',[path3]);
    process.stdout.on('data', function(data) { 
        console.log(data,"in process function");
        res.json(JSON.parse(data.toString())); 
    }) 
}