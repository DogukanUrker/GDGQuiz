"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  Award,
  Clock,
  Lock,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Participant {
  _id: string;
  nickname: string;
  totalPoints: number;
  correctAnswers: number;
  incorrectAnswers: number;
  submittedAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState(5);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

  useEffect(() => {
    if (isAuthenticated) {
      fetchParticipants();
      const interval = setInterval(fetchParticipants, 5000);

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return 10;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(countdownInterval);
      };
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Hatalı şifre!");
    }
  };

  const fetchParticipants = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setParticipants(data);
      setError("");
      setLastRefreshed(new Date());
      setCountdown(10);
    } catch (error) {
      console.error("Liderlik tablosu alınırken bir hata oluştu", error);
      setError(
        "Liderlik tablosu alınamadı. Lütfen MongoDB bağlantınızı kontrol edin.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveParticipant = async (id: string) => {
    try {
      const response = await fetch(`/api/remove-participant?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setParticipants(participants.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Katılımcı silinirken bir hata oluştu", error);
      setError("Katılımcı silinemedi. Lütfen tekrar deneyin.");
    }
  };

  const filteredParticipants = participants.filter((p) =>
    p.nickname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
        <Card className="w-full max-w-md shadow-lg border-blue-200">
          <CardHeader className="bg-blue-50 rounded-t-lg border-b border-blue-100">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-full border-2 border-blue-200 shadow-md">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-blue-900">
              Yönetici Girişi
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-700" />
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-blue-900"
                  >
                    Şifre
                  </label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Yönetici şifresini girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
                {error && (
                  <div className="p-2 text-sm text-red-600 bg-red-50 rounded-md border border-red-200 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                onClick={handleLogin}
              >
                Giriş Yap
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gradient-to-b from-blue-50 to-white">
      <Card className="shadow-xl border-blue-200 max-w-7xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg border-b border-blue-200 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-md">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-blue-900">
                Liderlik Tablosu
              </CardTitle>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={fetchParticipants}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 text-lg px-6 py-5"
              >
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    <span>Yükleniyor...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    <span>Yenile</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {error && (
            <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {participants.length === 0 && !error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <User className="h-12 w-12 text-blue-300 mb-4" />
              <p className="text-lg font-medium text-blue-800">
                Henüz katılımcı bulunmamaktadır
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Katılımcılar quiz'i tamamladıkça burada görünecekler
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <TableRow className="border-b-2 border-blue-200">
                    <TableHead className="w-24 text-blue-900 text-lg font-bold text-center">
                      Sıra
                    </TableHead>
                    <TableHead className="text-blue-900 text-lg font-bold">
                      İsim
                    </TableHead>
                    <TableHead className="text-center text-blue-900 text-lg font-bold">
                      Puan
                    </TableHead>
                    <TableHead className="text-center text-blue-900 text-lg font-bold">
                      Doğru
                    </TableHead>
                    <TableHead className="text-center text-blue-900 text-lg font-bold">
                      Yanlış
                    </TableHead>
                    <TableHead className="text-center text-blue-900 text-lg font-bold">
                      Sil
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-2xl">
                  {filteredParticipants
                    .sort((a, b) => b.totalPoints - a.totalPoints)
                    .map((participant, index) => (
                      <TableRow
                        key={participant._id}
                        className="hover:bg-blue-50 transition-colors border-b"
                      >
                        <TableCell className="font-medium text-center py-4">
                          {index === 0 ? (
                            <div className="flex items-center justify-center">
                              <div className="bg-yellow-100 p-2 rounded-full shadow-md">
                                <Award className="h-7 w-7 text-yellow-600" />
                              </div>
                            </div>
                          ) : index === 1 ? (
                            <div className="text-2xl font-bold text-gray-600">2</div>
                          ) : index === 2 ? (
                            <div className="text-2xl font-bold text-gray-600">3</div>
                          ) : (
                            <div className="text-xl text-gray-600">{index + 1}</div>
                          )}
                        </TableCell>
                        <TableCell className="font-bold text-blue-900">
                          {participant.nickname}
                        </TableCell>
                        <TableCell className="text-center font-bold text-blue-900">
                          <div className="bg-blue-50 rounded-full px-4 py-1 inline-block">
                            {participant.totalPoints}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="bg-green-50 text-green-600 font-bold px-4 py-1 rounded-full">
                            {participant.correctAnswers}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="bg-red-50 text-red-600 font-bold px-4 py-1 rounded-full">
                            {participant.incorrectAnswers}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveParticipant(participant._id)}
                            className="hover:bg-red-100 hover:text-red-600 transition-colors p-2"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
