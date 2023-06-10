import { connectToDatabase } from "@/src/mongodb/connect"

export default async function handler(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("words");
  const words = await collection.find({}).toArray();

  res.status(200).json(words);
}
