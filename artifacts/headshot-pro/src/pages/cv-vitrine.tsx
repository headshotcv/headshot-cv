import { Link } from "wouter";

const PORTRAIT = `${import.meta.env.BASE_URL}exemples/margaux.png`;

function VitrineCV() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        aspectRatio: "9 / 16",
        containerType: "inline-size",
        background: "#f4ede1",
        color: "#1a1614",
        fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%), radial-gradient(80% 50% at 100% 100%, rgba(184,89,58,0.06) 0%, rgba(184,89,58,0) 60%)",
        }}
      />

      <div
        className="relative flex items-center justify-between font-sans shrink-0"
        style={{
          padding: "2cqw 4cqw",
          fontSize: "clamp(9px, 1.4cqw, 14px)",
          letterSpacing: "0.4cqw",
          textTransform: "uppercase",
          color: "#7a6c5d",
          borderBottom: "1px solid rgba(26,22,20,0.12)",
        }}
      >
        <span>Édition N°01 — Paris</span>
        <span>MMXXVI</span>
      </div>

      <div
        className="relative w-full overflow-hidden shrink-0"
        style={{ aspectRatio: "9 / 8.5" }}
      >
        <img
          src={PORTRAIT}
          alt="Margaux Lefèvre"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "50% 28%" }}
        />
      </div>

      <div
        className="relative flex-1 flex flex-col"
        style={{ padding: "2.5cqw 5cqw 1.5cqw" }}
      >
        <div className="flex items-end justify-between" style={{ gap: "3cqw" }}>
          <div
            style={{
              fontSize: "clamp(40px, 7.2cqw, 78px)",
              lineHeight: 0.92,
              letterSpacing: "-0.15cqw",
              color: "#1a1614",
              fontStyle: "italic",
              fontWeight: 500,
              flexShrink: 1,
            }}
          >
            Margaux<br />Lefèvre
          </div>
          <div
            style={{
              fontSize: "clamp(16px, 2.6cqw, 28px)",
              lineHeight: 1,
              color: "#1a1614",
              fontFamily: "'Caveat', 'Dancing Script', cursive",
              opacity: 0.75,
              paddingBottom: "1.5cqw",
            }}
          >
            — M.
          </div>
        </div>

        <div
          className="font-sans"
          style={{
            marginTop: "1.8cqw",
            fontSize: "clamp(10px, 1.45cqw, 14px)",
            letterSpacing: "0.32cqw",
            textTransform: "uppercase",
            color: "#b8593a",
            fontWeight: 600,
          }}
        >
          Directrice artistique · Indépendante
        </div>

        <div
          style={{
            marginTop: "2.6cqw",
            fontSize: "clamp(14px, 2.4cqw, 24px)",
            lineHeight: 1.25,
            fontStyle: "italic",
            color: "#2b231f",
          }}
        >
          «&nbsp;Je ne dessine pas des portfolios. Je dessine des premières
          impressions.&nbsp;»
        </div>

        <div
          className="font-sans"
          style={{
            marginTop: "2.4cqw",
            fontSize: "clamp(11px, 1.6cqw, 16px)",
            lineHeight: 1.55,
            color: "#3a312c",
          }}
        >
          Onze ans à donner une voix visuelle à des maisons et à des marques
          indépendantes. Anciennement Hermès, aujourd'hui à mon compte avec
          une liste courte de clients qui croient que la retenue est la
          déclaration la plus forte.
        </div>

        <div
          className="flex items-center"
          style={{ marginTop: "3cqw", gap: "2cqw" }}
        >
          <div
            className="font-sans"
            style={{
              fontSize: "clamp(9px, 1.3cqw, 13px)",
              letterSpacing: "0.4cqw",
              textTransform: "uppercase",
              color: "#7a6c5d",
              whiteSpace: "nowrap",
            }}
          >
            Sélection
          </div>
          <div style={{ flex: 1, height: "1px", background: "rgba(26,22,20,0.18)" }} />
        </div>

        <div style={{ marginTop: "1cqw" }}>
          {[
            { year: "2025", project: "Maison Bréon", detail: "identité & édito" },
            { year: "2024", project: "Le Bon Marché", detail: "campagne printemps" },
            { year: "2023", project: "Apartamento", detail: "numéro invitée" },
          ].map(item => (
            <div
              key={item.project}
              className="flex items-baseline"
              style={{ padding: "1.1cqw 0", borderBottom: "1px solid rgba(26,22,20,0.1)" }}
            >
              <div
                className="font-sans"
                style={{ width: "9cqw", fontSize: "clamp(10px, 1.4cqw, 14px)", color: "#7a6c5d", letterSpacing: "0.1cqw" }}
              >
                {item.year}
              </div>
              <div style={{ flex: 1, fontSize: "clamp(13px, 2.1cqw, 22px)", fontStyle: "italic", color: "#1a1614" }}>
                {item.project}
              </div>
              <div
                className="font-sans"
                style={{ fontSize: "clamp(10px, 1.35cqw, 13px)", color: "#3a312c", textAlign: "right" }}
              >
                {item.detail}
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div
          className="font-sans flex items-center justify-between"
          style={{
            marginTop: "2cqw",
            paddingTop: "2cqw",
            fontSize: "clamp(9px, 1.25cqw, 12px)",
            letterSpacing: "0.28cqw",
            textTransform: "uppercase",
            color: "#7a6c5d",
            borderTop: "1px solid rgba(26,22,20,0.12)",
          }}
        >
          <span>margaux@lefevre.studio</span>
          <span>+33 6 12 34 56 78</span>
        </div>
      </div>
    </div>
  );
}

export default function CvVitrine() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#1a1614" }}>
      <header
        className="flex items-center justify-between"
        style={{ padding: "20px 28px", color: "#e8dfd1" }}
      >
        <Link href="/" className="text-sm opacity-70 hover:opacity-100 transition">
          ← Retour
        </Link>
        <div className="text-xs uppercase tracking-[0.35em] opacity-60">
          Le CV vitrine
        </div>
        <div className="w-16" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-10">
        <div
          className="relative"
          style={{
            width: "min(92vw, calc(100vh * 9 / 16 - 140px))",
            aspectRatio: "9 / 16",
            boxShadow:
              "0 50px 100px -20px rgba(0,0,0,0.6), 0 30px 60px -30px rgba(184,89,58,0.25)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <VitrineCV />
        </div>

        <div className="mt-10 max-w-md text-center" style={{ color: "#e8dfd1" }}>
          <p
            className="text-base"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", opacity: 0.85 }}
          >
            Ce CV a été généré pour 4,99 € avec une simple photo.
            Le tien peut ressembler à ça aussi.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center justify-center mt-6 rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition hover:scale-[1.02]"
            style={{
              background: "#f4ede1",
              color: "#1a1614",
              boxShadow: "0 10px 30px -10px rgba(244,237,225,0.4)",
            }}
          >
            Créer le mien — 4,99 €
          </Link>
          <div className="text-xs uppercase tracking-[0.3em] mt-4 opacity-50">
            5 minutes · Paiement en une fois
          </div>
        </div>
      </div>
    </div>
  );
}

export { VitrineCV };
