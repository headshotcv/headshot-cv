import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetPaymentStats } from "@workspace/api-client-react";
import { ArrowRight, CheckCircle2, Star, Camera, Wand2, Briefcase, Quote, Plus, Sparkles, Zap, Shield, Clock, Euro, Linkedin, GraduationCap, Users, Download, X, FileText } from "lucide-react";
import { SocialProofToast } from "@/components/SocialProofToast";
import { LiveOnlineBadge } from "@/components/LiveOnlineBadge";
import { useT } from "@/lib/i18n";

const TESTIMONIALS = [
  {
    name: "Camille L.",
    role: "Cheffe de projet, Paris",
    initials: "CL",
    rating: 5,
    text: "Bluffant. J'ai envoyé un selfie pris en télétravail, j'ai eu une photo digne d'un studio en 3 minutes. Mon profil LinkedIn n'a jamais autant été visité.",
  },
  {
    name: "Yanis B.",
    role: "Développeur freelance, Lyon",
    initials: "YB",
    rating: 5,
    text: "J'ai testé par curiosité, je suis resté pour le CV. Le PDF est propre, la photo est intégrée, j'ai juste eu à l'envoyer. Gros gain de temps.",
  },
  {
    name: "Sofia M.",
    role: "Consultante RH, Bordeaux",
    initials: "SM",
    rating: 5,
    text: "Le rendu est naturel, on garde nos traits, ce n'est pas une caricature IA. Pour 4,99 €, c'est sans comparaison avec un shooting classique.",
  },
  {
    name: "Thomas D.",
    role: "Étudiant en école de commerce",
    initials: "TD",
    rating: 5,
    text: "Parfait avant mes entretiens. Photo + CV en un coup, j'ai postulé le soir même. Recommandé à toute ma promo.",
  },
  {
    name: "Inès R.",
    role: "Designer UX, Marseille",
    initials: "IR",
    rating: 4,
    text: "Trois essais pour avoir le rendu parfait, mais le résultat final est vraiment crédible. L'interface est limpide, on se laisse guider.",
  },
  {
    name: "Marc P.",
    role: "Commercial, Lille",
    initials: "MP",
    rating: 5,
    text: "Je viens d'un secteur où l'image compte. Honnêtement, je ne pensais pas qu'une IA pouvait faire aussi propre. Bravo.",
  },
  {
    name: "Léa T.",
    role: "Avocate, Toulouse",
    initials: "LT",
    rating: 5,
    text: "Je cherchais un portrait sérieux pour mon profil au barreau. Résultat impeccable, sobre, exactement ce qu'il me fallait. Et le CV est très propre.",
  },
  {
    name: "Karim S.",
    role: "Chef de produit, Nantes",
    initials: "KS",
    rating: 5,
    text: "Fait en 4 minutes pendant ma pause déj. J'ai postulé l'après-midi même, deux entretiens calés dans la semaine. Que demander de plus.",
  },
  {
    name: "Élodie V.",
    role: "Architecte d'intérieur, Nice",
    initials: "EV",
    rating: 5,
    text: "Le souci du détail est là : la lumière, les ombres, le grain de peau. Ça ne fait pas IA bas de gamme, ça fait shooting pro.",
  },
  {
    name: "Maxime G.",
    role: "Ingénieur, Grenoble",
    initials: "MG",
    rating: 4,
    text: "Bon rapport qualité-prix. La photo m'a surpris, le CV est nickel, j'aurais juste aimé un peu plus de choix de poses.",
  },
  {
    name: "Naïma F.",
    role: "Sage-femme, Strasbourg",
    initials: "NF",
    rating: 5,
    text: "J'ai détesté toutes mes photos pendant des années. Là je me reconnais et je me trouve enfin présentable. Merci.",
  },
  {
    name: "Julien R.",
    role: "Consultant en stratégie, Paris",
    initials: "JR",
    rating: 5,
    text: "Niveau cabinets de conseil, on est exigeants sur l'image. La photo passe sans problème, et le CV est très bien structuré.",
  },
  {
    name: "Anaïs B.",
    role: "Community manager, Rennes",
    initials: "AB",
    rating: 5,
    text: "Je l'ai utilisé pour LinkedIn et Instagram. Deux usages, une photo, zéro déplacement studio. C'est exactement ce qu'il me fallait.",
  },
  {
    name: "Olivier D.",
    role: "Comptable, Montpellier",
    initials: "OD",
    rating: 5,
    text: "À 50 ans on n'a pas forcément envie de poser devant un photographe. Là c'était fait depuis le canapé, en 5 minutes.",
  },
  {
    name: "Salomé C.",
    role: "Médecin généraliste, Lyon",
    initials: "SC",
    rating: 5,
    text: "Très utile pour mon profil Doctolib. Patientèle rassurée, photo qui inspire confiance, et le CV pour ma demande d'attestation est très clair.",
  },
  {
    name: "Hugo M.",
    role: "Étudiant en alternance, Lille",
    initials: "HM",
    rating: 5,
    text: "Mon premier vrai CV. Sans HeadshotCV j'aurais rendu un Word avec une photo d'identité, là c'est un autre niveau.",
  },
  {
    name: "Fatou N.",
    role: "Chargée de mission, Paris",
    initials: "FN",
    rating: 5,
    text: "L'aide IA pour rédiger le résumé m'a fait gagner une heure. Le ton est juste, pas trop pompeux, on dirait que c'est moi qui ai écrit.",
  },
  {
    name: "Pierre A.",
    role: "Restaurateur, Bordeaux",
    initials: "PA",
    rating: 4,
    text: "Reconversion en cours, je voulais quelque chose de présentable rapidement. Mission accomplie, j'ai obtenu deux rendez-vous.",
  },
  {
    name: "Chloé W.",
    role: "Pharmacienne, Reims",
    initials: "CW",
    rating: 5,
    text: "J'avais peur que ça fasse fake. Au contraire, c'est moi en mieux éclairée. Mes collègues m'ont demandé où j'avais fait la photo.",
  },
  {
    name: "Antoine L.",
    role: "Coach sportif, Marseille",
    initials: "AL",
    rating: 5,
    text: "Indispensable pour mon site et mes réseaux. Le rendu est dynamique et pro à la fois. Je recommande à tous les indépendants.",
  },
];

const FAQS = [
  {
    q: "Combien ça coûte exactement ?",
    a: "4,99 € en un paiement unique. Vous recevez votre photo professionnelle et votre CV PDF avec la photo intégrée. Aucun abonnement, aucun frais caché.",
  },
  {
    q: "Combien de temps pour recevoir ma photo et mon CV ?",
    a: "Comptez 2 à 4 minutes après le paiement. Le temps que l'IA travaille la photo, et que votre CV soit mis en page dans le modèle choisi.",
  },
  {
    q: "Quel type de selfie dois-je envoyer ?",
    a: "N'importe quelle photo récente où votre visage est bien visible, idéalement avec un éclairage correct. Pas besoin d'un fond particulier — notre IA s'occupe du décor, du cadrage et de la lumière.",
  },
  {
    q: "La photo va-t-elle vraiment me ressembler ?",
    a: "Oui. Nous préservons vos traits exacts : forme du visage, yeux, peau, âge, sans embellissement artificiel. C'est vous, juste pris dans des conditions studio professionnelles.",
  },
  {
    q: "À quoi ressemble le CV ?",
    a: "Un modèle Classique sobre et premium : typographie serif, filet doré, mise en page intemporelle qui passe dans tous les secteurs (finance, droit, conseil, tech, santé, créa).",
  },
  {
    q: "Mes données sont-elles conservées ?",
    a: "Votre selfie d'origine sert uniquement à la génération. Vous restez propriétaire de votre photo finale et de votre CV. Vous pouvez nous demander la suppression de vos données à tout moment.",
  },
  {
    q: "Et si je ne suis pas satisfait du résultat ?",
    a: "Contactez-nous, nous étudions chaque demande. Notre objectif est que vous obteniez un rendu dont vous êtes fier.",
  },
];

export default function Home() {
  const { data: stats } = useGetPaymentStats();
  const t = useT();
  const photoCount = stats ? (stats.completedJobs + 10432).toLocaleString('fr-FR') : '10 432';

  return (
    <div className="dark min-h-screen bg-[#0A0A0A] text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src={`${import.meta.env.BASE_URL}logo-icon.png`} alt="HeadshotCV" className="h-11 w-11 rounded-lg object-cover" />
          </div>
          <div className="flex items-center gap-3 mr-20 sm:mr-24">
            <LiveOnlineBadge />
            <Link href="/upload" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 overflow-hidden relative bg-[#0A0A0A]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              {t("hero.badge").replace("{count}", photoCount)}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 font-serif">
              {t("hero.title.a")}<br /><span className="hero-title-accent">{t("hero.title.c")}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle.a")}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/upload" className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    </div>
                  ))}
                </div>
                <span>{t("hero.rating")}</span>
              </div>
            </div>
          </div>

          {/* Transformation Demo Area */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="rounded-2xl p-2 bg-secondary/50 border border-border/50 shadow-2xl backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-4 rounded-xl overflow-hidden bg-background">
                {/* AVANT */}
                <div className="p-8 flex flex-col items-center justify-center border-r border-border/50 relative group">
                  <div className="absolute top-4 left-4 bg-muted/80 backdrop-blur text-muted-foreground px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider">{t("demo.before")}</div>
                  <div className="w-48 h-64 rounded-lg mb-6 shadow-lg ring-1 ring-border bg-white overflow-hidden relative group-hover:ring-primary/40 transition-colors">
                    <img
                      src={`${import.meta.env.BASE_URL}exemples/cv-lea-moche.jpg`}
                      alt=""
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">{t("demo.before.caption.a")}<br/>{t("demo.before.caption.b")}</p>
                </div>

                {/* APRÈS — Portrait + CV côte à côte */}
                <div className="p-8 flex flex-col items-center justify-center relative bg-gradient-to-b from-primary/5 to-transparent">
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider shadow-sm z-10">{t("demo.after")}</div>

                  <div className="flex items-end gap-3 mb-6">
                    {/* Portrait */}
                    <div className="w-32 h-44 rounded-lg shadow-xl ring-1 ring-border relative overflow-hidden bg-white">
                      <img
                        src={`${import.meta.env.BASE_URL}exemples/camille.png`}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* CV preview (real generated PDF rendered as image) */}
                    <div className="w-36 h-48 rounded-lg shadow-xl ring-1 ring-border bg-white overflow-hidden">
                      <img
                        src={`${import.meta.env.BASE_URL}exemples/cv-camille.jpg`}
                        alt=""
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <p className="text-sm text-center font-medium">{t("demo.after.caption.a")} <strong className="text-primary">{t("demo.after.caption.plus")}</strong> {t("demo.after.caption.b")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carrousel défilant de CV — démo visuelle */}
      <section className="py-16 border-y border-border/40 overflow-hidden">
        <div className="container mx-auto px-4 mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-serif">{t("marquee.title")}</h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">{t("marquee.subtitle")}</p>
        </div>
        <div
          className="relative w-full"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="cv-marquee-track flex gap-6 w-max">
            {[...Array(2)].flatMap((_, loop) =>
              ["camille", "karim", "margaux", "lea", "liam", "marc", "mei", "sofia"].map((slug, i) => (
                <div
                  key={`${loop}-${slug}`}
                  className="shrink-0 w-[200px] md:w-[230px] aspect-[210/297] rounded-lg shadow-xl ring-1 ring-border bg-white overflow-hidden"
                  style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.5}deg)` }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}exemples/cv-${slug}.jpg`}
                    alt=""
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </section>

      {/* Bandeau de chiffres */}
      <section className="border-y border-border/40">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {[
              { value: photoCount, label: t("stats.photos") },
              { value: "4,9/5", label: t("stats.rating") },
              { value: "< 4 min", label: t("stats.time") },
              { value: "4,99 €", label: t("stats.price") },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold font-serif text-foreground">{s.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 font-serif">{t("how.title")}</h2>
            <p className="text-muted-foreground">{t("how.subtitle")}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Camera, title: t("how.s1.title"), desc: t("how.s1.desc") },
              { icon: Wand2, title: t("how.s2.title"), desc: t("how.s2.desc") },
              { icon: CheckCircle2, title: t("how.s3.title"), desc: t("how.s3.desc") }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Showcase modèle de CV */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              <FileText className="w-3.5 h-3.5" />
              {t("cv.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-serif">
              {t("cv.title")}
            </h2>
            <p className="text-muted-foreground">{t("cv.subtitle")}</p>
          </div>

          <div className="max-w-sm mx-auto">
            <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all">
              <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 p-3">
                <div className="w-full h-full rounded shadow-lg overflow-hidden">
                  <div className="bg-white h-full p-3 text-[6px] leading-tight">
                    <div className="border-b border-amber-700 pb-2 mb-2 flex items-end justify-between">
                      <div>
                        <div className="text-amber-700 font-bold tracking-[2px] text-[4px] mb-0.5">CURRICULUM VITÆ</div>
                        <div className="text-[10px] font-serif font-bold text-slate-900">Marie Dubois</div>
                        <div className="w-6 h-[1px] bg-amber-700 my-1" />
                        <div className="italic text-slate-600 text-[5px]">Directrice Marketing</div>
                      </div>
                      <div className="w-7 h-9 bg-slate-200 rounded-sm" />
                    </div>
                    <div className="bg-stone-50 p-1 flex gap-1.5 mb-2 text-[4px] text-slate-600">
                      <span>marie@…</span><span>06 12…</span><span>Paris</span>
                    </div>
                    <div className="text-amber-700 font-bold tracking-[1.5px] text-[5px] mb-1">EXPÉRIENCE</div>
                    <div className="h-px bg-slate-900 mb-1.5" />
                    <div className="space-y-1.5">
                      {[1,2].map(j => (
                        <div key={j}>
                          <div className="flex justify-between"><div className="font-bold text-slate-900">Cheffe de projet</div><div className="text-amber-700 font-bold">2022—2024</div></div>
                          <div className="italic text-slate-600">Doctolib · Paris</div>
                          <div className="h-0.5 w-full bg-slate-200 mt-1" />
                          <div className="h-0.5 w-4/5 bg-slate-200 mt-0.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{t("cv.label")}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{t("cv.tag")}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("cv.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aide IA intégrée */}
      <section className="py-24 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                {t("ai.badge")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-serif">
                {t("ai.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("ai.subtitle.a")} <strong className="text-foreground">{t("ai.subtitle.btn")}</strong> {t("ai.subtitle.b")}
              </p>
              <ul className="space-y-3 mb-8">
                {[t("ai.b1"), t("ai.b2"), t("ai.b3"), t("ai.b4")].map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/upload" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                {t("ai.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-background rounded-2xl border border-border shadow-xl p-6">
              <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">{t("ai.preview.label")}</div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{t("ai.preview.section")}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      <Sparkles className="w-3 h-3" /> {t("ai.preview.ask")}
                    </span>
                  </div>
                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm leading-relaxed text-foreground/90">
                    {t("ai.preview.sample")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-amber-500" /> {t("ai.preview.generated")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-serif">{t("for.title")}</h2>
            <p className="text-muted-foreground">{t("for.subtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { icon: Linkedin, title: t("for.linkedin.title"), desc: t("for.linkedin.desc") },
              { icon: Briefcase, title: t("for.job.title"), desc: t("for.job.desc") },
              { icon: GraduationCap, title: t("for.student.title"), desc: t("for.student.desc") },
              { icon: Users, title: t("for.freelance.title"), desc: t("for.freelance.desc") },
            ].map((u, i) => (
              <div key={i} className="rounded-2xl bg-background border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <u.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base mb-2">{u.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section className="py-24 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-serif">
              {t("cmp.title")}
            </h2>
            <p className="text-muted-foreground">{t("cmp.subtitle")}</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Photographe */}
            <div className="rounded-2xl bg-background border border-border p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{t("cmp.photo.title")}</h3>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  [t("cmp.photo.p1.a"), t("cmp.photo.p1.b")],
                  [t("cmp.photo.p2.a"), t("cmp.photo.p2.b")],
                  [t("cmp.photo.p3.a"), t("cmp.photo.p3.b")],
                  [t("cmp.photo.p4.a"), t("cmp.photo.p4.b")],
                ].map(([title, d], i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{title}</div>
                      <div className="text-muted-foreground text-xs">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* HeadshotCV */}
            <div className="rounded-2xl bg-primary/5 border-2 border-primary p-7 relative shadow-lg shadow-primary/10">
              <div className="absolute -top-3 left-7 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">{t("cmp.us.badge")}</div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">HeadshotCV</h3>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  [<><Euro className="w-3.5 h-3.5 inline" /> {t("cmp.us.p1.a")}</>, t("cmp.us.p1.b")],
                  [<><Clock className="w-3.5 h-3.5 inline" /> {t("cmp.us.p2.a")}</>, t("cmp.us.p2.b")],
                  [<><Download className="w-3.5 h-3.5 inline" /> {t("cmp.us.p3.a")}</>, t("cmp.us.p3.b")],
                  [<><FileText className="w-3.5 h-3.5 inline" /> {t("cmp.us.p4.a")}</>, t("cmp.us.p4.b")],
                ].map(([title, d], i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground flex items-center gap-1">{title}</div>
                      <div className="text-muted-foreground text-xs">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/upload" className="mt-6 w-full inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-all">
                {t("cmp.us.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: t("g1.title"), desc: t("g1.desc") },
              { icon: Zap, title: t("g2.title"), desc: t("g2.desc") },
              { icon: CheckCircle2, title: t("g3.title"), desc: t("g3.desc") },
            ].map((g, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-secondary/40 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <g.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{g.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avis clients */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {t("rev.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-serif">{t("rev.title")}</h2>
            <p className="text-muted-foreground">{t("rev.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((tm, i) => (
              <figure
                key={i}
                className="relative flex flex-col p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <Quote className="absolute top-5 right-5 w-6 h-6 text-primary/15" />
                <div className="flex items-center gap-1 mb-3" aria-label={`Note ${tm.rating} sur 5`}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= tm.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground/90 leading-relaxed mb-5 flex-1">
                  « {tm.text} »
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    {tm.initials}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{tm.name}</div>
                    <div className="text-xs text-muted-foreground">{tm.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-serif">{t("faq.title")}</h2>
            <p className="text-muted-foreground">{t("faq.subtitle")}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              { q: t("faq.q1"), a: t("faq.a1") },
              { q: t("faq.q2"), a: t("faq.a2") },
              { q: t("faq.q3"), a: t("faq.a3") },
              { q: t("faq.q4"), a: t("faq.a4") },
              { q: t("faq.q5"), a: t("faq.a5") },
              { q: t("faq.q6"), a: t("faq.a6") },
              { q: t("faq.q7"), a: t("faq.a7") },
            ].map((item, i) => (
              <details
                key={i}
                className="group rounded-xl bg-background border border-border shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-secondary/40 transition-colors">
                  <span className="font-semibold text-base text-foreground">{item.q}</span>
                  <Plus className="w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/upload"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border/40 text-muted-foreground text-sm">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="HeadshotCV" className="h-10 w-10 rounded-md object-cover" />
                <span className="font-bold text-foreground">HeadshotCV</span>
              </div>
              <p className="text-xs leading-relaxed">
                {t("footer.tagline")}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">{t("footer.legal")}</p>
              <ul className="space-y-2.5">
                <li><Link href="/legal/mentions" className="hover:text-foreground transition-colors">{t("footer.mentions")}</Link></li>
                <li><Link href="/legal/cgv" className="hover:text-foreground transition-colors">{t("footer.cgv")}</Link></li>
                <li><Link href="/legal/confidentialite" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">{t("footer.contact")}</p>
              <a href="mailto:contact@headshotcv.fr" className="hover:text-foreground transition-colors break-all">
                contact@headshotcv.fr
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 text-center text-xs">
            <p>© {new Date().getFullYear()} HeadshotCV. {t("footer.rights")}</p>
          </div>
        </div>
      </footer>

      <SocialProofToast />
    </div>
  );
}
