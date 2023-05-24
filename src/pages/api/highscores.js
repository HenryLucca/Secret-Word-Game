import { connectToDatabase } from "@/src/mongodb/mongodb"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
    try{
        const { method } = req;
        const { name, score } = req.body;

        if (method === 'GET'){
            const db = await connectToDatabase();
            const collection = db.collection("highscores");
            const highscores = await collection.find({}).toArray();
            res.status(200).json(highscores);
        } else if (method === 'POST'){
            const db = await connectToDatabase();
            const collection = db.collection("highscores");
            const highscores = await collection.insertOne({name, score});
            res.status(200).json(highscores);
        } else if (method === 'DELETE'){
            const { id } = req.body;
            const db = await connectToDatabase();
            const collection = db.collection("highscores");
            collection.deleteOne(id);
        }
            
    }
    catch(err){
        res.status(500).json({error: err.message});
    }

}