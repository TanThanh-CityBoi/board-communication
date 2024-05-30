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
    ready = enc.decode(arr)

    console.log('Data received: ', ready);
    console.log('data to string: ', data?.toString('utf8'))
});

