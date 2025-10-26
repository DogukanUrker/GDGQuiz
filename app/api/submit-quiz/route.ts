import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { questions } from "@/lib/questions";

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function POST(request: Request) {
  let client;
  try {
    const { nickname, answers } = await request.json();

    let totalPoints = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    answers.forEach(
      (answer: { questionId: number; answer: string; timeTaken: number }) => {
        const question = questions[answer.questionId];

        if (question.correctAnswer === answer.answer) {
          // Calculate points based on time taken (faster = more points)
          // Maximum 100 points for correct answer in 1 second or less
          // Minimum 50 points for correct answer in 10 seconds or more
          const timePoints = Math.max(
            50,
            100 - Math.floor(answer.timeTaken / 100),
          );
          totalPoints += timePoints;
          correctAnswers++;
        } else {
          incorrectAnswers++;
        }
      },
    );

    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db();
    const collection = db.collection("results");

    await collection.insertOne({
      nickname,
      totalPoints,
      correctAnswers,
      incorrectAnswers,
      answers,
      submittedAt: new Date(),
    });

    return NextResponse.json({
      nickname,
      totalPoints,
      correctAnswers,
      incorrectAnswers,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Sonuçlar kaydedilirken bir hata oluştu" },
      { status: 500 },
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
