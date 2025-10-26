import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function GET() {
  let client;
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db();
    const collection = db.collection("results");

    const results = await collection
      .find({})
      .sort({ totalPoints: -1 })
      .toArray();

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Liderlik tablosu alınırken bir hata oluştu" },
      { status: 500 },
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
