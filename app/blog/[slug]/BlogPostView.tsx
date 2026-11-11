"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { posts } from "@/lib/blog-posts";

export default function BlogPostView({ slug }: { slug: string }) {
  const { lang } = useLang();
  const post = posts[slug];

  if (!post) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Post not found</p></div>;

  const title = lang === "ro" ? post.titleRo : post.titleHu;
  const content = lang === "ro" ? post.contentRo : post.contentHu;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 sm:h-96">
        <Image src={post.image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--clr-hero-overlay)" }} />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pb-8">
            <div className="flex items-center gap-4 text-xs text-gray-300 mb-3">
              <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">{title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm hover:underline mb-8" style={{ color: "var(--clr-accent)" }}>
          <ArrowLeft size={16} />
          {lang === "ro" ? "Înapoi la blog" : "Vissza a bloghoz"}
        </Link>
        <div className="prose prose-gray max-w-none">
          {content.split("\n\n").map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**")) {
              return <h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">{para.replace(/\*\*/g, "")}</h3>;
            }
            const parts = para.split(/\*\*([^*]+)\*\*/g);
            return (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">
                {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
              </p>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl border" style={{ background: "var(--clr-accent-bg)", borderColor: "var(--clr-accent-subtle)" }}>
          <h3 className="font-semibold text-gray-900 mb-2">
            {lang === "ro" ? "Interesat de produsele noastre?" : "Érdekli az ajánlatunk?"}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {lang === "ro" ? "Contactați-ne pentru o consultanță gratuită." : "Vegye fel velünk a kapcsolatot ingyenes tanácsadásért."}
          </p>
          <Link href="/contact" className="inline-block px-6 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors" style={{ background: "var(--clr-accent)" }}>
            {lang === "ro" ? "Cerere ofertă" : "Ajánlatkérés"}
          </Link>
        </div>
      </div>
    </div>
  );
}
