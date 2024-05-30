
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
    console.log("🚀 ~ SP.ON_DATA:", data)

    //
    const enc = new TextDecoder();
    const arr = new Uint8Array(data);
    console.log("🚀 ~ UNIT_ARR:", arr)

    const parsedData = enc.decode(arr)
    console.log("🚀 ~ PARSED_DATA:", arr)


    sp.write(`COM4_REPLY: ${data}`, () => {
        console.log("COM4_RETURNED")
    })

    console.log('DATA_RECEIVED: ', parsedData);
});




