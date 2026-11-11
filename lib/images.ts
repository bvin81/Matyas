// Every image of the site in one place, so placeholders are easy to swap
// for the client's own photos later. Files live in public/images/ as WebP,
// already resized (static export has no automatic image optimization).
// Sources: Pexels and Unsplash (free licences), downloaded for the demo.
export const IMG = {
  // Products (Pexels)
  ferestrePvc: "/images/ferestre-pvc.webp",
  ferestreAluminiu: "/images/ferestre-aluminiu.webp",
  usaBalcon: "/images/usa-balcon.webp",
  usiInterioare: "/images/usi-interioare.webp",
  obloane: "/images/obloane.webp",
  plasaInsecte: "/images/plasa-insecte.webp",
  // Houses, interiors, about page (Unsplash)
  casaHero: "/images/casa-hero.webp",
  casa1: "/images/casa-1.webp",
  casa2: "/images/casa-2.webp",
  casa3: "/images/casa-3.webp",
  fatadaLamele: "/images/fatada-lamele.webp",
  fereastraInterior: "/images/fereastra-interior.webp",
  interiorVitrat: "/images/interior-vitrat.webp",
  santier: "/images/santier.webp",
} as const;
