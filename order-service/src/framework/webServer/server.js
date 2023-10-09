// serverConfig.js
// import {consumeOrder} from "../../event/orderConsumer.js"

const serverConfig = (server, config) => {
    const startServer = () => {
      server.listen(config.port, () => {
        console.log(`Server listening on port 6000 - orderService`);
      });
    };
  
    return {
      startServer,
    };
  };
  
  export default serverConfig;
  
  // await consumeOrder()