export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "GDG on Campus Core Team ekibi kaç kişiden oluşur?",
    options: ["25", "27", "28", "29"],
    correctAnswer: "29",
  },
  {
    id: 2,
    text: "En büyük etkinliğimiz hangisidir?",
    options: ["Tech Summit", "AI Summit", "Code Fest", "Dev Days"],
    correctAnswer: "Tech Summit",
  },
  {
    id: 3,
    text: "Core Team ekibi kaç alt ekipten oluşur?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    id: 4,
    text: "Geçen sene toplam etkinlik sayımız nedir?",
    options: ["10", "15", "14", "12"],
    correctAnswer: "14",
  },
  {
    id: 5,
    text: "Google'ın yapay zeka geliştirme platformu nedir?",
    options: ["TensorFlow", "Flutter", "Android Studio", "Firebase"],
    correctAnswer: "TensorFlow",
  },
  {
    id: 6,
    text: "Google'ın mobil uygulama geliştirme framework'ü hangisidir?",
    options: ["React Native", "Flutter", "Swift", "Angular"],
    correctAnswer: "Flutter",
  },
  {
    id: 7,
    text: "2024 yılında Türkiye'de Google üzerinde en çok yapılan arama hangisidir?",
    options: ["Olimpiyatlar", "Türkiye maçı", "Euro 2024", "Osimhen"],
    correctAnswer: "Euro 2024",
  },
  {
    id: 8,
    text: 'Google tarafından geliştirilen ve "Go" olarak da bilinen, basitliği ve yüksek performansıyla öne çıkan açık kaynaklı programlama dilinin yaygın adı nedir?',
    options: ["GoScript", "G-Lang", "Dart", "Golang"],
    correctAnswer: "Golang",
  },
  {
    id: 9,
    text: 'Google, 2004 yılında Gmail\'i ilk kez duyurduğunda, o dönem için "imkansız" denilecek kadar yüksek olan ne kadar ücretsiz depolama alanı sunmuştu? (O dönem rakipleri 2-4 MB veriyordu)',
    options: ["250 Megabyte", "1 Gigabyte", "500 Megabyte", "10 Gigabyte"],
    correctAnswer: "1 Gigabyte",
  },
  {
    id: 10,
    text: "Google'ın 1998'de yaptığı ilk Google Doodle'ı (logodaki değişiklik), kurucuların nerede olduklarını ve ofiste olmadıklarını göstermek için tasarlanmıştı. Kurucular neredeydi?",
    options: [
      "Burning Man Festivali'nde",
      "Dünya Kupası Finali'nde",
      "Kendi mezuniyet törenlerinde",
      "Bir Star Trek kongresinde",
    ],
    correctAnswer: "Burning Man Festivali'nde",
  },
  {
    id: 11,
    text: "Google tarafından geliştirilen Flutter, hangi programlama diliyle yazılmıştır?",
    options: ["Java", "Dart", "Kotlin", "Python"],
    correctAnswer: "Dart",
  },
  {
    id: 12,
    text: "Google'ın yapay zeka modeli Gemini'ın eski adı nedir?",
    options: ["DeepMind", "AlphaGo", "Mistral", "Bard"],
    correctAnswer: "Bard",
  },
  {
    id: 13,
    text: "Google'ın web uygulama framework'ü nedir?",
    options: ["Angular", "React", "Vue", "Svelte"],
    correctAnswer: "Angular",
  },
  {
    id: 14,
    text: "Google'ın logosunda kullanılan renklerden hangisi yoktur?",
    options: ["Mavi", "Kırmızı", "Yeşil", "Mor"],
    correctAnswer: "Mor",
  },
  {
    id: 15,
    text: 'Google Cloud\'un "makine öğrenimi" hizmetini içeren aracı hangisidir?',
    options: ["Google Colab", "BigQuery", "Vertex AI", "Firebase"],
    correctAnswer: "Vertex AI",
  },
  {
    id: 16,
    text: "GDG'nin açılımı nedir?",
    options: [
      "Google Development Group",
      "Google Developer Groups",
      "Global Development Guild",
      "Google Dev Gathering",
    ],
    correctAnswer: "Google Developer Groups",
  },
  {
    id: 17,
    text: "Google tarafından geliştirilen işletim sistemi olmayan seçenek hangisidir?",
    options: ["Chrome OS", "Android", "Fuchsia", "Ubuntu"],
    correctAnswer: "Ubuntu",
  },
  {
    id: 18,
    text: "Google'ın dil modellerine dayalı üretken yapay zekâ asistanının adı nedir?",
    options: ["Bard", "Copilot", "Gemini", "Claude"],
    correctAnswer: "Gemini",
  },
  {
    id: 19,
    text: 'Google\'ın "Gemini" modelinde, yalnızca metin değil; görüntü, ses ve video gibi çoklu veri türlerini işleme yeteneğine ne ad verilir?',
    options: [
      "Reinforcement Learning",
      "Multimodal",
      "Federated Learning",
      "Zero-Shot",
    ],
    correctAnswer: "Multimodal",
  },
  {
    id: 20,
    text: "Google'ın web uygulamalarında veri depolamak ve senkronize etmek için geliştirdiği bulut tabanlı veritabanı hizmeti hangisidir?",
    options: ["MongoDB", "MySQL", "Firestore", "BigQuery"],
    correctAnswer: "Firestore",
  },
];
