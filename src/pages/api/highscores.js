import { connectToDatabase } from "@/src/mongodb/mongodb"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
    try{
        const { name, score } = req.body;
        const db = await connectToDatabase();
        const collection = db.collection("highscores");
        const highscores = await collection.find({}).toArray();

        // if score is higher than the lowest score in the array, add it to the array and remove the lowest score
        if (highscores.length < 5) {
            await collection.insertOne({name, score});
        } else {
            const lowestScore = highscores[highscores.length - 1].score;
            if (score > lowestScore) {
                await collection.insertOne({name, score});
                await collection.deleteOne({score: lowestScore});
            }
        }
        res.status(200).json(highscores);
            
    }
    catch(err){
        res.status(500).json({error: err.message});
    }

}