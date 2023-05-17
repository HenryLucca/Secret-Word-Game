const { MongoClient } = require("mongodb");
const uri ='mongodb+srv://admin:0XWGR2Nl9xrxCq6o@secretwordgame.yopmucy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectToDatabase(){
    try{
        await client.connect();
        await client.db("SecretWordGame").command({ ping: 1 });
    } catch(e){
        console.log(e);
    } finally {
        await client.close();
    }
    await client.connect();
    const db = client.db('SecretWordGame');
    return db;
}