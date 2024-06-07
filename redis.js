const Redis = require("ioredis");

(() => {
    const redis = new Redis({
        host: "127.0.0.1",
        port: 6379,
        // username: "default",
        password:
            "6Iv7IrK4rbAT0KOWrmxjA6HMdnL351uD55zWgnAxbiH8+JcKJxTRzELOsV3MnuA+OD1PbGZQBncavNsu%",
    });

    // setInterval(() => {
    //     const message = { foo: Math.random() };
    //     const channel = "dev-channel";
    //     redis.publish(channel, JSON.stringify(message));
    //     //
    //     console.log("Published %s to %s", message, channel);
    // }, 5000);

    setInterval(() => {
        const message = "update-data";
        const channel = "data-channel";
        redis.publish(channel, message);
        //
        console.log("Published %s to %s", message, channel);
    }, 10000);
})();
