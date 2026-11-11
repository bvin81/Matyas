"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function Footer() {
  const { tr } = useLang();

  const links = [
    { href: "/", label: tr.nav.home },
    { href: "/produse", label: tr.nav.products },
    { href: "/referinte", label: tr.nav.gallery },
    { href: "/despre-noi", label: tr.nav.about },
    { href: "/contact", label: tr.nav.contact },
    { href: "/blog", label: tr.nav.blog },
  ];

  return (
    <footer style={{ background: "var(--clr-dark)" }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{ background: "var(--clr-accent)" }}
              >
                <span className="text-white font-bold text-sm">FP</span>
              </div>
              <span className="font-bold text-lg text-white">FerestrăPro</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">{tr.footer.desc}</p>
            <div className="flex gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.07)" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.07)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.07)" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{tr.footer.links_title}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[var(--clr-accent-lt)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{tr.footer.contact_title}</h4>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: tr.footer.address },
                { icon: Phone, text: tr.footer.phone },
                { icon: Mail, text: tr.footer.email },
                { icon: Clock, text: tr.footer.hours },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <Icon size={16} className="mt-0.5 shrink-0" style={{ color: "var(--clr-accent-lt)" }} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-gray-500">
          {tr.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
