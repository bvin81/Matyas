// Blog post content, shared by the post page (client) and generateStaticParams (server).
import { IMG } from "@/lib/images";

export type BlogPost = { image: string; date: string; readTime: string; titleRo: string; titleHu: string; contentRo: string; contentHu: string };

export const posts: Record<string, BlogPost> = {
  "cum-sa-alegi-ferestre-pvc": {
    image: IMG.ferestrePvc,
    date: "2025-06-10", readTime: "5 min",
    titleRo: "Cum să alegi ferestrele PVC potrivite pentru casa ta",
    titleHu: "Hogyan válassz PVC ablakokat az otthonodhoz",
    contentRo: `Alegerea ferestrelor este una dintre cele mai importante decizii pe care le puteți face atunci când renovați sau construiți o casă.

**Numărul de camere al profilului**

Profilele PVC moderne sunt disponibile cu 5, 6 sau 7 camere. Cu cât sunt mai multe camere, cu atât mai bună este izolația termică. Pentru climatul din România, recomandăm profile cu minimum 5 camere.

**Tipul de geam**

Geamul termoizolant poate fi dublu sau triplu. Geamul triplu oferă o izolație superioară — pentru zone cu ierni friguroase, este o investiție ce se amortizează rapid.

**Feroneria**

Feroneria de calitate asigură funcționarea corectă și securitatea ferestrei. Branduri precum ROTO, WINKHAUS sau MACO sunt recunoscute pentru durabilitate.

**Garanția**

O garanție de minimum 10 ani pentru profilul PVC și 5 ani pentru manoperă este un indicator al calității.`,
    contentHu: `Az ablakok kiválasztása az egyik legfontosabb döntés egy ház felújításakor vagy építésekor.

**A profil kamraszáma**

A modern PVC profilok 5, 6 vagy 7 kamrával érhetők el. Minél több kamra, annál jobb a hőszigetelés. A romániai éghajlat miatt legalább 5 kamrás profilt ajánlunk.

**Az üvegtípus**

A hőszigetelő üveg lehet kétrétegű vagy háromrétegű. A háromrétegű üveg jobb szigetelést nyújt — hideg telekkel rendelkező vidékeken gyorsan megtérülő befektetés.

**A vasalat**

A minőségi vasalat biztosítja az ablak megfelelő működését és biztonságát. Az ROTO, WINKHAUS és MACO márkák tartósságukról ismertek.

**A garancia**

A PVC profilra legalább 10 éves, a munkadíjra 5 éves garancia a minőség jelzője.`,
  },
  "avantajele-rulourilor-exterioare": {
    image: IMG.obloane,
    date: "2025-05-22", readTime: "4 min",
    titleRo: "5 avantaje ale rulourilor exterioare pe care nu le știai",
    titleHu: "5 dolog a kültéri redőnyökről, amit valószínűleg nem tudtál",
    contentRo: `Rulourile exterioare nu sunt doar pentru protecție solară — beneficiile lor sunt mult mai variate.

**1. Izolație termică suplimentară**

Un rulou exterior bine montat poate reduce pierderile de căldură cu până la 30%. Stratul de aer dintre rulou și geam acționează ca un tampon termic suplimentar.

**2. Protecție fonică**

Rulourile din aluminiu cu umplutură de spumă poliuretanică reduc semnificativ zgomotul exterior.

**3. Securitate sporită**

Rulourile blocate reprezintă o barieră fizică suplimentară. Modelele moderne se integrează în sisteme smart home.

**4. Protecție UV**

Previn decolorarea mobilierului și a pardoselilor prin blocarea razelor UV dăunătoare.

**5. Economii la energie**

Combinând izolația termică și protecția solară, rulourile pot reduce costurile cu 15-25% anual.`,
    contentHu: `A kültéri redőnyök nem csak napvédelemre valók — előnyeik sokkal változatosabbak.

**1. Extra hőszigetelés**

Egy jól beszerelt kültéri redőny akár 30%-kal csökkentheti az ablakon keresztüli hőveszteséget.

**2. Hangvédelem**

A poliuretán habbal töltött alumínium redőnyök jelentősen csökkentik a kültéri zajt.

**3. Fokozott biztonság**

A lezárt redőnyök fizikai akadályt jelentenek, és okosotthon rendszerekbe integrálhatók.

**4. UV-védelem**

Megakadályozzák a bútorok elszíneződését a káros UV-sugarak blokkolásával.

**5. Energiamegtakarítás**

Évi 15-25%-kal csökkenthetik a fűtési és hűtési költségeket.`,
  },
};
