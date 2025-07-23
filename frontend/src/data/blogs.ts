export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  images: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "samsung-s24-ultra",
    title: "Samsung Galaxy S24 Ultra: Review & Experience",
    category: "Handphone",
    date: "July 10, 2025",
    author: "Tech Reviewer",
    excerpt: "Review lengkap Samsung Galaxy S24 Ultra, kamera, performa dan fitur unggulan...",
    content: `
      Samsung Galaxy S24 Ultra menghadirkan pengalaman flagship yang luar biasa...
      Kamera 200MP, prosesor Snapdragon terbaru, dan layar AMOLED 120Hz membuatnya luar biasa.
    `,
    thumbnail: "/images/samsung-s24-1.jpg",
    images: ["/images/samsung-s24-1.jpg", "/images/samsung-s24-2.jpg"],
  },
  {
    id: "samsung-a55",
    title: "Samsung Galaxy A55: Mid-range Terbaik?",
    category: "Handphone",
    date: "June 28, 2025",
    author: "Gadget Mania",
    excerpt: "Apakah Galaxy A55 cukup tangguh untuk kelas menengah? Simak ulasannya...",
    content: `
      Galaxy A55 menawarkan fitur solid seperti layar Super AMOLED dan Exynos baru...
    `,
    thumbnail: "/images/samsung-a55.jpg",
    images: ["/images/samsung-a55.jpg", "/images/samsung-a55-2.jpg"],
  },
];
