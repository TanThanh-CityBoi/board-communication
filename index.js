const SerialPort = require('serialport').SerialPort;
const sp = new SerialPort({path: "COM3", baudRate: 115200});

const messageStr = 'FF'
const sent_data = Buffer.from(messageStr, 'utf8').toString('hex');


sp.on("open", function(err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
      }
    
    console.log("port has opened");

    sp.write(sent_data, function(err){
        if(err){
            return console.log('Error on write', err.message);
        }
        console.log('Port.write: ', sent_data);
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

// Read data that is available but keep the stream from entering "flowing mode"
sp.on('readable', function () {
    const dt2 = sp.read()
    console.log('Data2:', dt2);
    
    console.log('Data2Str:', dt2?.toString('utf8'));
});