"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { questions } from "@/lib/questions";
import { AlertCircle, CheckCircle2, Clock, HelpCircle } from "lucide-react";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<
    Array<{ questionId: number; answer: string; timeTaken: number }>
  >([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [nickname, setNickname] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const storedNickname = localStorage.getItem("quizNickname");
    if (!storedNickname) {
      router.push("/");
      return;
    }
    setNickname(storedNickname);
    setStartTime(Date.now());

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleAnswerSelect = (value: string, index: number) => {
    setSelectedAnswer(value);
    setSelectedOptionIndex(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;

      setAnswers([
        ...answers,
        {
          questionId: currentQuestion,
          answer: selectedAnswer,
          timeTaken,
        },
      ]);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setSelectedOptionIndex(null);
        setStartTime(Date.now());
        setElapsedTime(0);
      }
    }
  };

  const handleSubmitAnswers = async () => {
    if (selectedAnswer) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;

      const finalAnswers = [
        ...answers,
        {
          questionId: currentQuestion,
          answer: selectedAnswer,
          timeTaken,
        },
      ];

      setIsSubmitting(true);

      try {
        const response = await fetch("/api/submit-quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname,
            answers: finalAnswers,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("quizResults", JSON.stringify(data));
          router.push("/results");
        } else {
          console.error("Sonuçlar gönderilirken bir hata oluştu");
          setSubmitError(
            "Sonuçlar gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
          );
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Sonuçlar gönderilirken bir hata oluştu", error);
        setSubmitError(
          "Sonuçlar gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        );
        setIsSubmitting(false);
      }
    }
  };

  if (!nickname) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-blue-700 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = (currentQuestion / questions.length) * 100;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full max-w-2xl shadow-lg border-blue-200">
        <CardHeader className="bg-blue-50 rounded-t-lg border-b border-blue-100 pb-2">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-xl font-bold text-blue-900">
              Soru {currentQuestion + 1}/{questions.length}
            </CardTitle>
            <div className="flex items-center gap-2 text-blue-700">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{elapsedTime} saniye</span>
            </div>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
              <p className="text-lg font-medium text-blue-900">
                {question.text}
              </p>
            </div>

            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={(value) => {}}
            >
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 border p-4 rounded-md cursor-pointer transition-all duration-200 ${
                    selectedOptionIndex === index
                      ? "bg-blue-100 border-blue-300 shadow-sm"
                      : "hover:bg-blue-50 border-blue-100"
                  }`}
                  onClick={() => handleAnswerSelect(option, index)}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-grow cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 w-full bg-blue-50 rounded-b-lg border-t border-blue-100 pt-4">
          {submitError && (
            <div className="w-full p-3 mb-2 text-sm text-red-600 bg-red-50 rounded-md border border-red-200 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {submitError}
            </div>
          )}
          <div className="flex justify-between w-full">
            <div className="text-sm text-blue-700 flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" />
              <span>Seçiminizi yapın ve ilerleyin</span>
            </div>

            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
              >
                Sonraki Soru
              </Button>
            ) : (
              <Button
                onClick={handleSubmitAnswers}
                disabled={!selectedAnswer || isSubmitting}
                className="bg-green-600 hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Cevapları Gönder
                  </>
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
