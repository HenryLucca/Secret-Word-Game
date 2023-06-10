import { connectToDatabase } from "@/src/mongodb/connect"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
    try {

        if (req.method !== "POST" && req.method !== "GET") {
            return res.status(400).json({ error: "Method not allowed" })
            // } else if (!req.body.name || !req.body.score) {
            //     return res.status(400).json({error: "Missing name or score"})
        } else if (req.method === "GET") {
            const db = await connectToDatabase();
            const collection = db.collection("highscores");
            const highscores = await collection.find({}).toArray();
            highscores.sort((a, b) => b.score - a.score);
            res.status(200).json(highscores);
            return;
        } else if (req.method === "POST") {
            const { name, score } = req.body;
            const db = await connectToDatabase();
            const collection = db.collection("highscores");
            const highscores = await collection.find({}).toArray();
            highscores.sort((a, b) => b.score - a.score);

            // if score is higher than the lowest score in the array, add it to the array and remove the lowest score
            if (highscores.length < 5) {
                await collection.insertOne({ name, score });
            } else {
                const lowestScore = highscores[highscores.length - 1].score;
                if (score > lowestScore) {
                    await collection.insertOne({ name, score });
                    await collection.deleteOne({ score: lowestScore });
                }
            }
            // return the updated highscores array
            const updatedHighscores = await collection.find({}).toArray();
            updatedHighscores.sort((a, b) => b.score - a.score);
            res.status(200).json(highscores);
            return;
        }

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

}