import express from 'express';
import { connect, disconnect } from "./mongo/mongoManager.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { Staff } from './mongo/schemas.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/* --- Basic Express Server --- */

let server = express();

// Connect to Mongo
await connect(process.env.MG_USER, process.env.MG_PASS, process.env.MG_HOST);

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.html');
});

server.get('/staff', async function (req, res){
  const staff = await Staff.find();
  res.send({staff});
});

const app = server.listen(8081, function () {
    console.log('Contacts running on port 8081!');    
});


/* --- Server Cleanup --- */

const cleanup = async function(){
  console.log('Termination signal received: cleaning up...');
  // Close our Express erver
  app.close(() => console.log('HTTP server closed'));
  // Also disconnect from Mongo database
  disconnect().then(() => console.log('Mongo connection closed'));
}

// This is here to clean up and close any connections when our application is killed
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);