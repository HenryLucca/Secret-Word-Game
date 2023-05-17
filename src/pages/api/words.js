import { connectToDatabase } from "@/src/mongodb/mongodb"

export default async function handler(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("words");
  const words = await collection.find({}).toArray();

  res.status(200).json(words);
}
// words = [
//   {carro: ["Motor", "Porta", "Capô", "Pneu", "Antena"]},
//   {fruta: ["Banana", "Maçã", "Pêra", "Mamão", "Laranja"]},
//   {corpo: ["Braço", "Perna", "Cérebro", "Pescoço", "Olhos"]},
//   {computador: ["Mouse", "Teclado", "Monitor", "Gabinete"]},
//   {programação: ["Linguagem", "Framework", "JavaScript", "React"]},
//   {alimento: ["Arroz", "Feijão", "Carne", "Leite", "Ovo"]},
// ]
