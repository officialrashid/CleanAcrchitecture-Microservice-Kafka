
const serverConfig = (server, config) => {
  const startServer = () => {
    server.listen(config.port, () => {
      
      console.log(`Server listening on port ${config.port} product-service`);
    });
  };

  return {
    startServer
  };
};

export default serverConfig;
