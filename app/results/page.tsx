"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizResults {
  nickname: string;
  totalPoints: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults");
    if (!storedResults) {
      router.push("/");
      return;
    }
    setResults(JSON.parse(storedResults));

    setTimeout(() => {
      setShowAnimation(true);
    }, 300);

    localStorage.setItem("hasCompletedQuiz", "true");
  }, [router]);

  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-blue-700 font-medium">
            Sonuçlar yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  const totalQuestions = results.correctAnswers + results.incorrectAnswers;
  const correctPercentage = (results.correctAnswers / totalQuestions) * 100;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full max-w-md shadow-xl border-blue-200 overflow-hidden">
        <div className="bg-blue-600 h-2"></div>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 py-4 sm:py-6">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full border-4 border-blue-200 shadow-lg">
              <Award className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-blue-900">
            Quiz Sonuçları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4 px-4 sm:pt-6 sm:px-6">
          <div className="text-center">
            <p className="text-lg sm:text-xl font-medium text-blue-800">
              Tebrikler, <span className="font-bold">{results.nickname}</span>!
            </p>
            <div className="mt-4">
              <div className="text-5xl sm:text-6xl font-bold text-blue-900 transition-all duration-1000 transform">
                <span
                  className={`inline-block ${
                    showAnimation ? "scale-110" : "scale-0"
                  } transition-transform duration-700`}
                >
                  {results.totalPoints}
                </span>
                <span className="text-xl sm:text-2xl ml-2">Puan</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-sm sm:text-base font-medium">
                <span className="text-blue-700">Doğruluk Oranı</span>
                <span className="text-blue-700">
                  {correctPercentage.toFixed(0)}%
                </span>
              </div>
              <Progress
                value={correctPercentage}
                className="h-2.5 bg-blue-100"
                indicatorClassName="bg-blue-600 transition-all duration-1000"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200 text-center shadow-md">
                <div className="flex justify-center mb-2">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <p className="text-sm sm:text-base text-green-600 font-medium">
                  Doğru
                </p>
                <p
                  className={`text-3xl sm:text-4xl font-bold text-green-700 transition-all duration-1000 ${
                    showAnimation ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {results.correctAnswers}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200 text-center shadow-md">
                <div className="flex justify-center mb-2">
                  <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                </div>
                <p className="text-sm sm:text-base text-red-600 font-medium">
                  Yanlış
                </p>
                <p
                  className={`text-3xl sm:text-4xl font-bold text-red-700 transition-all duration-1000 ${
                    showAnimation ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {results.incorrectAnswers}
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base font-medium text-blue-700 text-center mt-2">
              Sıralamanızı büyük ekranda görebilirsiniz
            </p>
          </div>
        </CardContent>
      </Card>
      <footer className="text-center text-gray-500 mt-8 flex items-center justify-center gap-2">
        <img src="/gdg-logo.png" alt="GDG Logo" className="w-10" />
        <p className="text-md ">
              Built by<a href="https://github.com/DogukanUrker/GDGQuiz" target="_blank" className="text-blue-600 hover:text-blue-700 font-bold"> Software Team</a>
        </p>
      </footer>
    </main>
  );
}
