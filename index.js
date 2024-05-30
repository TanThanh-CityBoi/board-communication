const express = require('express');
const app = express();


const morgan = require('morgan');
const cors = require('cors');
const bp = require('body-parser');
require("dotenv").config();


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(morgan('combined'));
app.use(cors());


const SerialPort = require('serialport').SerialPort;
const sp = new SerialPort({path: "COM4", baudRate: 115200});

const messageSend = 'FF'


sp.on("open", function(err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
      }
    
    console.log("port has opened");

    sp.write(messageSend, function(err){
        if(err){
            return console.log('Error on write', err.message);
        }
        console.log('Port.write: ', messageSend);
    });
});

sp.on('data', function(data){
    console.log("🚀 ~ sp.on ~ data:", data)
    // decoding uint8Array to string
    const enc = new TextDecoder();
    console.log("🚀 ~ sp.on ~ enc:", enc)
    const arr = new Uint8Array(data);
    console.log("🚀 ~ sp.on ~ arr:", arr)
    const parsedData = enc.decode(arr)


    sp.write(`COM4_REPLY: ${data}`, () => {
        console.log("com4 returnn")
    })

    console.log('Data received: ', parsedData);
});




//app listen
app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
})