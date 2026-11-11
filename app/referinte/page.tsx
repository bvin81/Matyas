"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { IMG } from "@/lib/images";

type GalleryCategory = "windows" | "doors" | "complex";


const galleryItems: { src: string; category: GalleryCategory }[] = [
  { src: IMG.ferestrePvc, category: "windows" },
  { src: IMG.ferestreAluminiu, category: "windows" },
  { src: IMG.fereastraInterior, category: "windows" },
  { src: IMG.interiorVitrat, category: "windows" },
  { src: IMG.usiInterioare, category: "doors" },
  { src: IMG.usaBalcon, category: "doors" },
  { src: IMG.casa3, category: "complex" },
  { src: IMG.casaHero, category: "complex" },
  { src: IMG.casa1, category: "complex" },
  { src: IMG.casa2, category: "complex" },
  { src: IMG.fatadaLamele, category: "complex" },
];

const CATEGORIES: { key: GalleryCategory; imageRo: string; imageHu: string; cover: string }[] = [
  { key: "windows", imageRo: "Ferestre", imageHu: "Ablakok", cover: IMG.fereastraInterior },
  { key: "doors", imageRo: "Uși", imageHu: "Ajtók", cover: IMG.usiInterioare },
  { key: "complex", imageRo: "Proiecte complexe", imageHu: "Komplex projektek", cover: IMG.casa3 },
];

const countFor = (key: GalleryCategory) => galleryItems.filter((g) => g.category === key).length;

export default function ReferintePage() {
  const { lang, tr } = useLang();
  const [selected, setSelected] = useState<GalleryCategory | null>(null);

  const filtered = selected ? galleryItems.filter((g) => g.category === selected) : [];

  const catLabel = (key: GalleryCategory) =>
    lang === "ro"
      ? CATEGORIES.find((c) => c.key === key)!.imageRo
      : CATEGORIES.find((c) => c.key === key)!.imageHu;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-16 px-4" style={{ background: "var(--clr-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-1">{tr.gallery_page.title}</h1>
          <p className="text-gray-400">{tr.gallery_page.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Category grid view ── */}
        {!selected && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelected(cat.key)}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 aspect-[4/3] cursor-pointer"
              >
                <Image
                  src={cat.cover}
                  alt={lang === "ro" ? cat.imageRo : cat.imageHu}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white text-xl font-bold">
                    {lang === "ro" ? cat.imageRo : cat.imageHu}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    {countFor(cat.key)} {lang === "ro" ? "fotografii" : "fotó"} →
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Photos view ── */}
        {selected && (
          <>
            {/* Back button */}
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:underline"
              style={{ color: "var(--clr-accent)" }}
            >
              <ArrowLeft size={16} />
              {lang === "ro" ? "Înapoi la categorii" : "Vissza a kategóriákhoz"}
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-8">{catLabel(selected)}</h2>

            {/* Masonry grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <div key={i} className="break-inside-avoid relative overflow-hidden rounded-2xl">
                  <Image
                    src={item.src}
                    alt={catLabel(selected)}
                    width={600}
                    height={450}
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
