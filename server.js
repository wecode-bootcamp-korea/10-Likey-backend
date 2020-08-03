const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const mongoose = require('./database');

(async function() {
  try {
    // db connection
    await mongoose;
    console.log('DB CONNECTED');
    server.listen(8000, () => console.log('Server is listening to port: ', 8000));
  } catch (err) { 
    console.log('DB CONNECTION ERROR');
    console.log(err);
  } 
})();