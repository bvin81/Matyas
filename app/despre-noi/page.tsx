"use client";

import Image from "next/image";
import { Award, Users, MapPin, Briefcase } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { IMG } from "@/lib/images";

const STAT_ICONS = [Award, Briefcase, MapPin, Users];
const PARTNER_LOGOS = ["VEKA", "REHAU", "SCHUCO", "ROTO", "WINKHAUS", "SALAMANDER"];

export default function DespreNoiPage() {
  const { tr } = useLang();
  const ab = tr.about_page;

  return (
    <div className="min-h-screen">
      <div className="py-16 px-4" style={{ background: "var(--clr-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">{ab.title}</h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{ab.story_title}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{ab.story_text1}</p>
              <p className="text-gray-600 leading-relaxed">{ab.story_text2}</p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src={IMG.santier} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: "var(--clr-accent)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {ab.stats.map((stat, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <div key={i} className="text-center">
                  <Icon size={28} className="mx-auto mb-3 text-white/70" />
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{ab.team_title}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ab.team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                {/* Initials instead of stock portraits: real team photos come from the client */}
                <div
                  aria-hidden="true"
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: "var(--clr-accent)" }}
                >
                  {member.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-10">{ab.partners_title}</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {PARTNER_LOGOS.map((logo) => (
              <div key={logo} className="px-6 py-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-400 font-bold text-lg tracking-wide">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
