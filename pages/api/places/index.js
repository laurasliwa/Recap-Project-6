import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const places = await Place.find();
      response.status(200).json(places);
      return;
    } catch (error) {
      response.status(405).json({ message: "Method not allowed" });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const newPlace = request.body;
      await Place.create(newPlace);

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
