export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Aşağıdakilerden hangisi SDLC'nin (Yazılım Geliştirme Yaşam Döngüsü) temel aşamalarından biri değildir?",
    options: ["Analiz", "Pazarlama", "Tasarım", "Geliştirme"],
    correctAnswer: "Pazarlama",
  },
  {
    id: 2,
    text: "Bir uygulamanın fazla kullanıcı yükü altında nasıl tepki verdiğini gözlemlemek için hangi test yöntemi uygulanır?",
    options: [
      "Manuel Test",
      "Yük Testi (Load Testing)",
      "UI Otomasyon Testi",
      "Performans Testi",
    ],
    correctAnswer: "Yük Testi (Load Testing)",
  },
  {
    id: 3,
    text: "Aşağıdakilerden hangisi C# programlama dilini kullanabileceğiniz bir frameworktür?",
    options: ["Spring Boot", ".NET", "Django", "Express.js"],
    correctAnswer: ".NET",
  },
  {
    id: 4,
    text: "Hangisi performans optimizasyonu için kullanılan teknolojilerden biridir?",
    options: ["Apache", "Redis", "Nginx", "IIS"],
    correctAnswer: "Redis",
  },
  {
    id: 5,
    text: "Aşağıdakilerden hangisi Agile'ın ritüellerinden biri değildir?",
    options: ["Sprint Planlama", "Daily", "Waterfall", "Sprint Retrospektif"],
    correctAnswer: "Waterfall",
  },
  {
    id: 6,
    text: "UAT'nin açılımı nedir?",
    options: [
      "User Abilty Test",
      "User Acceptance Test",
      "User Acceptance Theory",
      "User Action Test",
    ],
    correctAnswer: "User Acceptance Test",
  },
  {
    id: 7,
    text: "Hangi test türüyle, aynı senaryolar tekrar tekrar insan müdahalesi olmadan çalıştırılabilir?",
    options: [
      "Fonksiyonel Test",
      "Yük Testi",
      "Otomasyon Testi",
      "Keşifsel (Exploratory) Test",
    ],
    correctAnswer: "Otomasyon Testi",
  },
  {
    id: 8,
    text: "Aşağıdakilerden hangisi Front-End’in temelini oluşturan teknolojilerin arasında yer almaz?",
    options: ["HTML", "CSS", "JavaScript", "Java"],
    correctAnswer: "Java",
  },
  {
    id: 9,
    text: "Hangisi Front-End’in sorumlulukları arasında yer almaz?",
    options: [
      "Kullanıcı Deneyimi",
      "Erişilebilirlik",
      "İsteklerin Cevap Verme Süresi",
      "SEO",
    ],
    correctAnswer: "İsteklerin Cevap Verme Süresi",
  },
  {
    id: 10,
    text: "GDG On Campus kulübünün büyük etkinliği olan ve birbirinden değerli konuşmacıların katılacağı organizasyonun adı nedir?",
    options: ["CodeFest", "TechXperience", "Tech Summit", "DevTalks"],
    correctAnswer: "Tech Summit",
  },
];
