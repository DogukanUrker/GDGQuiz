"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const hasCompletedQuiz = localStorage.getItem("hasCompletedQuiz");
    if (hasCompletedQuiz === "true") {
      router.push("/results");
    }
  }, [router]);

  const handleStartQuiz = () => {
    if (nickname.trim()) {
      localStorage.setItem("quizNickname", nickname);
      router.push("/quiz");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-xl border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg border-b border-blue-200 py-8">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-center text-blue-900">
              GDG on Campus YU
            </CardTitle>
            <CardDescription className="text-lg sm:text-xl text-center text-blue-700 mt-2">
              İsminizi girerek başlayın
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 px-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="nickname"
                  className="text-lg font-medium text-blue-900"
                >
                  İsminiz
                </label>
                <Input
                  id="nickname"
                  placeholder="İsminizi girin"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="border-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400 h-14 text-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && nickname.trim()) {
                      handleStartQuiz();
                    }
                  }}
                />
              </div>
              <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
                <h3 className="font-bold text-lg text-amber-800 mb-2">
                  Puanlama Sistemi
                </h3>
                <p className="text-base text-amber-700 leading-relaxed">
                  Her soru için, ne kadar hızlı cevap verirseniz o kadar çok
                  puan kazanırsınız. Doğru cevaplar için maksimum 100 puan,
                  yanlış cevaplar için 0 puan verilir. Hızlı cevap verin, yüksek
                  puan kazanın!
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-b-lg border-t border-blue-200 p-6">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 text-white font-bold text-xl py-8 rounded-xl shadow-lg"
              onClick={handleStartQuiz}
              disabled={!nickname.trim()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span
                className={`transform transition-transform duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              >
                Quize Başla
              </span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
