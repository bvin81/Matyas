"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Star, Ruler, Shield } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { IMG } from "@/lib/images";

const GALLERY_IMAGES = [
  IMG.casa3,
  IMG.casa1,
  IMG.casa2,
];

const USP_ICONS = [CheckCircle2, Shield, Star, Ruler];

export default function Home() {
  const { tr } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={IMG.casaHero}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: "var(--clr-hero-overlay)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {tr.hero.title}
            </h1>
            <p className="text-lg text-gray-200 mb-10 leading-relaxed">{tr.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-colors text-base"
                style={{ background: "var(--clr-accent)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--clr-accent-dk)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clr-accent)")}
              >
                {tr.hero.cta_primary}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/produse"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-colors text-base"
              >
                {tr.hero.cta_secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USP band */}
      <section className="py-20" style={{ background: "var(--clr-dark)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{tr.usp.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tr.usp.items.map((item, i) => {
              const Icon = USP_ICONS[i];
              return (
                <div key={i} className="text-center">
                  <div
                    className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ background: "var(--clr-accent-subtle)", border: "1px solid var(--clr-accent-lt)" }}
                  >
                    <Icon size={26} style={{ color: "var(--clr-accent-lt)" }} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{tr.gallery_preview.title}</h2>
            <p className="text-gray-500">{tr.gallery_preview.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i} className="relative h-56 sm:h-72 rounded-2xl overflow-hidden group">
                <Image
                  src={src}
                  alt={`Reference ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/referinte" className="font-semibold hover:underline" style={{ color: "var(--clr-accent)" }}>
              {tr.gallery_preview.view_all}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16" style={{ background: "var(--clr-accent)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{tr.cta_band.title}</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">{tr.cta_band.subtitle}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            style={{ color: "var(--clr-accent)" }}
          >
            {tr.cta_band.button}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
