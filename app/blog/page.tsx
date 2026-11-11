"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { IMG } from "@/lib/images";

const posts = [
  {
    slug: "cum-sa-alegi-ferestre-pvc",
    image: IMG.ferestrePvc,
    date: "2025-06-10",
    readTime: "5 min",
    titleRo: "Cum să alegi ferestrele PVC potrivite pentru casa ta",
    titleHu: "Hogyan válassz PVC ablakokat az otthonodhoz",
    excerptRo: "Alegerea ferestrelor potrivite poate fi o decizie dificilă. În acest articol vă explicăm ce trebuie să aveți în vedere atunci când achiziționați ferestre PVC: numărul de camere al profilului, tipul de geam, feroneria și garanția oferită.",
    excerptHu: "A megfelelő ablakok kiválasztása nehéz döntés lehet. Ebben a cikkben elmagyarázzuk, mire kell figyelni PVC ablakok vásárlásakor: a profil kamraszáma, az üvegtípus, a vasalat és a garancia.",
  },
  {
    slug: "avantajele-rulourilor-exterioare",
    image: IMG.obloane,
    date: "2025-05-22",
    readTime: "4 min",
    titleRo: "5 avantaje ale rulourilor exterioare pe care nu le știai",
    titleHu: "5 dolog a kültéri redőnyökről, amit valószínűleg nem tudtál",
    excerptRo: "Rulourile exterioare nu sunt doar pentru protecție solară. Acestea contribuie semnificativ la izolarea termică a casei, reduc zgomotul exterior și sporesc securitatea locuinței. Descoperă toate beneficiile lor.",
    excerptHu: "A kültéri redőnyök nem csak napvédelemre valók. Jelentősen hozzájárulnak a ház hőszigeteléséhez, csökkentik a külső zajt és növelik az otthon biztonságát. Fedezd fel az összes előnyüket.",
  },
];

export default function BlogPage() {
  const { lang, tr } = useLang();
  const bp = tr.blog_page;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-1">{bp.title}</h1>
          <p className="text-gray-400">{bp.subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <div className="relative h-48 sm:h-full">
                <Image
                  src={post.image}
                  alt={lang === "ro" ? post.titleRo : post.titleHu}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="sm:col-span-2 p-6">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {lang === "ro" ? post.titleRo : post.titleHu}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {lang === "ro" ? post.excerptRo : post.excerptHu}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  {bp.read_more}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
