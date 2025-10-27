"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full max-w-md shadow-xl border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg border-b border-blue-200 py-8">
          <CardTitle className="text-4xl font-bold text-center text-blue-900">
            404
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 px-6 text-center">
          <p className="text-xl text-blue-800 mb-6">
            Aradığınız sayfa bulunamadı
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 mx-auto">
              <Home className="h-4 w-4" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}

