import { Db, MongoClient } from 'mongodb';

const mongourl = process.env['MONGOHOST'];
const mongouser = process.env['MONGOUSER'];
const mongopass = process.env['MONGOPASS'];
const mongodatabase = process.env['MONGODATABASE'];
const connectStr = `mongodb+srv://${mongouser}:${mongopass}@${mongourl}/${mongodatabase}`;
console.log(connectStr)
const client = new MongoClient(connectStr, {
  useNewUrlParser :true,
  useUnifiedTopology :true 
})

interface DBprops {
  db:Db,
  client:MongoClient
}

export default async function connect() : Promise<DBprops>  {
  if (! client.isConnected()) {
    await client.connect();
  }
  const db = client.db(mongodatabase)
   
return  {db, client}
}
  