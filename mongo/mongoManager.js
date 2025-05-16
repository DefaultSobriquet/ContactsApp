import 'dotenv/config';
import mongoose from 'mongoose';

import { Staff } from './schemas.js';

export async function connect(user, password, host) {
  // URL encode our variables and build a connection string
  const [eUser, ePass, eHost] = [user, password, host].map(encodeURIComponent)
  const uri = `mongodb+srv://${eUser}:${ePass}@${eHost}/?retryWrites=true&w=majority`;

  const clientOptions = {
    serverApi: { version: '1', strict: true, deprecationErrors: true }
  };

  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  await mongoose.connect(uri, clientOptions);
}

export async function disconnect(){
  await mongoose.disconnect();
}

export async function addStaff(details){
  // We can very easily create a new staff member using the model
  const staffMember = new Staff(details);
  staffMember.save();
}

export async function findStaff(details){
  
}


