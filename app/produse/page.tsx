"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { IMG } from "@/lib/images";

type Category = "all" | "windows" | "doors" | "shutters" | "mosquito";

const CATEGORIES: Category[] = ["windows", "doors", "shutters", "mosquito"];

const products = [
  { category: "windows" as Category, image: IMG.ferestrePvc, detail: IMG.ferestrePvc, nameRo: "Ferestre PVC", nameHu: "PVC ablakok", detailsRo: "Ferestre PVC cu geam termoizolant dublu sau triplu strat. Profile cu 5 sau 6 camere, feronerie premium inclusă.", detailsHu: "PVC ablakok kétrétegű vagy háromrétegű hőszigetelő üveggel. 5–6 kamrás profilok, prémium vasalattal." },
  { category: "windows" as Category, image: IMG.ferestreAluminiu, detail: IMG.ferestreAluminiu, nameRo: "Ferestre aluminiu", nameHu: "Alumínium ablakok", detailsRo: "Ferestre din aluminiu cu rupere de punte termică. Rezistente la coroziune, ideale pentru construcții moderne.", detailsHu: "Hőhídmentes alumínium ablakok. Korrózióálló, modern épületekhez ideális." },
  { category: "doors" as Category, image: IMG.usaBalcon, detail: IMG.usaBalcon, nameRo: "Uși de intrare", nameHu: "Bejárati ajtók", detailsRo: "Uși de intrare din aluminiu sau PVC cu sistem antiefracție certificat. Umplutură termoizolantă.", detailsHu: "Alumínium vagy PVC bejárati ajtók tanúsított betörésálló rendszerrel. Hőszigetelő töltéssel." },
  { category: "doors" as Category, image: IMG.usiInterioare, detail: IMG.usiInterioare, nameRo: "Uși interioare", nameHu: "Belső ajtók", detailsRo: "Uși interioare din MDF sau lemn masiv, bătante, glisante sau pliante. Gamă largă de culori.", detailsHu: "MDF vagy tömörfa belső ajtók, nyíló, toló vagy harmonika kivitelben. Széles szín- és mintaválaszték." },
  { category: "shutters" as Category, image: IMG.fatadaLamele, detail: IMG.fatadaLamele, nameRo: "Rulouri exterioare", nameHu: "Kültéri redőnyök", detailsRo: "Rulouri exterioare din aluminiu cu acționare manuală sau automată. Compatibile cu sisteme smart home.", detailsHu: "Kültéri alumínium redőnyök kézi vagy motoros működtetéssel. Okosotthon rendszerekkel kompatibilis." },
  { category: "shutters" as Category, image: IMG.obloane, detail: IMG.obloane, nameRo: "Jaluzele & Sisteme umbrire", nameHu: "Zsaluziák & Árnyékolók", detailsRo: "Jaluzele interioare și exterioare din lemn, aluminiu sau material textil. Sisteme personalizabile.", detailsHu: "Bel- és kültéri fa, alumínium vagy textil zsaluziák. Testre szabható árnyékolórendszerek." },
  { category: "mosquito" as Category, image: IMG.plasaInsecte, detail: IMG.plasaInsecte, nameRo: "Plase insecte", nameHu: "Szúnyoghálók", detailsRo: "Plase de insecte fixe, rulante sau pliante. Cadre din aluminiu ușor, montaj rapid.", detailsHu: "Fix, feltekerhető vagy összehajtható szúnyoghálók. Könnyű alumínium keret, gyors szerelés." },
  { category: "mosquito" as Category, image: IMG.ferestrePvc, detail: IMG.ferestrePvc, nameRo: "Accesorii & Piese schimb", nameHu: "Kiegészítők & Alkatrészek", detailsRo: "Accesorii și piese de schimb: mânere, balamale, garnituri. Service și înlocuire rapidă.", detailsHu: "Kiegészítők és cserealkatrészek: kilincsek, zsanérok, tömítések. Gyors szerviz és csere." },
];

function ProduceContent() {
  const { lang, tr } = useLang();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<(typeof products)[0] | null>(null);

  // Filter comes from ?filter=… (homepage links); a click overrides it. No setState in an effect.
  const param = searchParams.get("filter") as Category | null;
  const paramFilter: Category = param && CATEGORIES.includes(param) ? param : "all";
  const [userFilter, setFilter] = useState<Category | null>(null);
  const filter = userFilter ?? paramFilter;

  // Close the product dialog with Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  const filters: { key: Category; label: string }[] = [
    { key: "all", label: tr.products_page.filter_all },
    { key: "windows", label: tr.products_page.filter_windows },
    { key: "doors", label: tr.products_page.filter_doors },
    { key: "shutters", label: tr.products_page.filter_shutters },
    { key: "mosquito", label: tr.products_page.filter_mosquito },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 px-4" style={{ background: "var(--clr-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">{tr.products_page.title}</h1>
          <nav className="text-sm text-gray-400">
            <Link href="/" className="hover:text-white">{tr.nav.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">{tr.products_page.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-colors border"
              style={
                filter === f.key
                  ? { background: "var(--clr-accent)", color: "#fff", borderColor: "var(--clr-accent)" }
                  : { background: "#fff", color: "#4b5563", borderColor: "#e5e7eb" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <button
              type="button"
              key={i}
              className="text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--clr-accent)]"
              onClick={() => setSelected(p)}
            >
              <div className="relative h-44 overflow-hidden">
                <Image src={p.image} alt={lang === "ro" ? p.nameRo : p.nameHu} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm">{lang === "ro" ? p.nameRo : p.nameHu}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-dialog-title"
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <Image src={selected.detail} alt={lang === "ro" ? selected.nameRo : selected.nameHu} fill sizes="(min-width: 672px) 672px, 100vw" className="object-cover" />
              <button aria-label={tr.products_page.close} autoFocus className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100" onClick={() => setSelected(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="p-6">
              <h2 id="product-dialog-title" className="text-xl font-bold text-gray-900 mb-3">{lang === "ro" ? selected.nameRo : selected.nameHu}</h2>
              <p className="text-gray-600 leading-relaxed">{lang === "ro" ? selected.detailsRo : selected.detailsHu}</p>
              <div className="mt-6 flex gap-3">
                <Link href="/contact" className="px-6 py-2.5 text-white rounded-lg font-medium text-sm transition-colors bg-[var(--clr-accent)] hover:bg-[var(--clr-accent-dk)]">
                  {tr.nav.quote}
                </Link>
                <button className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors" onClick={() => setSelected(null)}>
                  {tr.products_page.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProducePage() {
  return (
    <Suspense>
      <ProduceContent />
    </Suspense>
  );
}
