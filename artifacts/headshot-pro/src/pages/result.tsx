import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useGetJob, getGetJobQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Loader2, Download, AlertCircle, RefreshCw, Languages } from "lucide-react";
import FeedbackModal from "@/components/FeedbackModal";

type PhotoStyle = "classique" | "moderne" | "decontracte" | "exterieur";

const STYLE_INFO: Record<PhotoStyle, { label: string; gradient: string }> = {
  classique: { label: "Classique", gradient: "from-slate-100 to-slate-200" },
  moderne: { label: "Moderne / Créatif", gradient: "from-slate-700 to-slate-900" },
  decontracte: { label: "Décontracté business", gradient: "from-amber-50 to-orange-100" },
  exterieur: { label: "Fond extérieur flou", gradient: "from-green-100 to-emerald-200" },
};

function StyleBadge({ style }: { style?: string }) {
  if (!style) return null;
  const info = STYLE_INFO[style as PhotoStyle];
  if (!info) return null;
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border text-sm">
      <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${info.gradient} ring-1 ring-border`} />
      <span className="text-muted-foreground">Style :</span>
      <span className="font-semibold">{info.label}</span>
    </div>
  );
}

export default function Result() {
  const params = useParams<{ jobId: string }>();
  const [, setLocation] = useLocation();
  const jobId = params.jobId;
  const [cvLang, setCvLang] = useState<"fr" | "en">("fr");
  const [cvDownloading, setCvDownloading] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const { data: job, isLoading, isError } = useGetJob(jobId || '', {
    query: {
      enabled: !!jobId,
      queryKey: getGetJobQueryKey(jobId || ''),
      refetchInterval: (query) => {
        const data = query.state.data;
        if (data && (data.status === 'processing' || data.status === 'pending_payment')) {
           return 3000;
        }
        return false;
      }
    }
  });

  useEffect(() => {
    if (!jobId || job?.status !== "completed") return;
    let already = false;
    try {
      already = localStorage.getItem(`feedback-${jobId}`) === "1";
    } catch {}
    if (already) return;
    const t = setTimeout(() => setFeedbackOpen(true), 4000);
    return () => clearTimeout(t);
  }, [jobId, job?.status]);

  const apiBase = import.meta.env.BASE_URL.replace(/\/$/, "");
  const photoDownloadUrl = job?.resultDataUrl ? `${apiBase}/api/jobs/${jobId}/photo.png` : "";
  const cvDownloadUrl = job?.cvPdfDataUrl
    ? `${apiBase}/api/jobs/${jobId}/cv.pdf${cvLang === "en" ? "?lang=en" : ""}`
    : "";

  const handleCvDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cvLang !== "en") return; // FR is cached, instant
    e.preventDefault();
    if (!cvDownloadUrl || cvDownloading) return;
    setCvDownloading(true);
    try {
      const res = await fetch(cvDownloadUrl);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cv-${jobId}-en.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setCvDownloading(false);
    }
  };

  if (!jobId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Commande introuvable</h2>
          <Button onClick={() => setLocation('/')} variant="outline">Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground font-medium animate-pulse">Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-8 bg-card rounded-2xl border shadow-sm">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Commande introuvable</h2>
          <p className="text-muted-foreground mb-6">Impossible de charger les détails de cette commande. Elle a peut-être expiré ou l'identifiant est incorrect.</p>
          <Button onClick={() => setLocation('/')} variant="outline" className="w-full">Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 flex flex-col">
      <nav className="border-b border-border/40 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <button onClick={() => setLocation('/')} className="flex items-center hover:opacity-80 transition-opacity">
            <img src={`${import.meta.env.BASE_URL}logo-icon.png`} alt="HeadshotCV" className="h-11 w-11 rounded-lg object-cover" />
          </button>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        {job.status === 'pending_payment' && (
          <div className="text-center max-w-md w-full mt-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-muted-foreground animate-spin" />
            </div>
            <h1 className="text-2xl font-bold mb-3 font-serif">En attente du paiement</h1>
            <p className="text-muted-foreground">Veuillez finaliser le paiement pour lancer la transformation.</p>
          </div>
        )}

        {job.status === 'processing' && (
          <div className="text-center max-w-xl w-full mt-10">
            <div className="bg-card border rounded-3xl p-10 shadow-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 animate-pulse" />
               
               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-24 h-24 relative mb-8">
                   <div className="absolute inset-0 rounded-full border-4 border-muted" />
                   <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                   <div className="absolute inset-0 flex items-center justify-center text-primary">
                     <Wand2 className="w-8 h-8 animate-pulse" />
                   </div>
                 </div>
                 <h1 className="text-3xl font-bold mb-4 font-serif">Transformation en cours...</h1>
                 <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto leading-relaxed">
                   Notre IA analyse l'éclairage, ajuste l'arrière-plan et génère votre photo de profil de qualité studio.
                 </p>
                 <div className="w-full bg-secondary rounded-full h-2 mb-2 overflow-hidden">
                    <div className="h-full bg-primary animate-pulse w-full origin-left" />
                 </div>
                 <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-6">Cela prend généralement 15 à 30 secondes</p>
                 <StyleBadge style={job.style} />
               </div>
            </div>
          </div>
        )}

        {job.status === 'completed' && (
          <div className="w-full max-w-5xl mt-6">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tight mb-4 font-serif">Votre photo professionnelle est prête</h1>
              <p className="text-lg text-muted-foreground mb-5">Téléchargez votre résultat en haute résolution et mettez votre profil à jour.</p>
              <StyleBadge style={job.style} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-4">
                <div className="bg-card border rounded-2xl p-4 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="font-semibold">Photo originale</span>
                  </div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
                    {job.imageDataUrl ? (
                      <img src={job.imageDataUrl} alt="Original" className="w-full h-full object-cover grayscale opacity-70" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">Aucune image trouvée</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-card border rounded-2xl p-4 shadow-xl ring-1 ring-primary/20 flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between mb-4 px-2 relative z-10">
                    <span className="font-semibold text-primary">Résultat généré</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase tracking-wider">Qualité Studio</span>
                  </div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-6 shadow-inner">
                    {job.resultDataUrl ? (
                      <img src={job.resultDataUrl} alt="Résultat" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">Résultat en attente...</div>
                    )}
                  </div>
                  
                  <a
                    href={photoDownloadUrl}
                    download={`headshotcv-${job.id}.png`}
                    className="inline-flex w-full h-14 items-center justify-center rounded-md bg-primary text-lg font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger la photo
                  </a>
                  {cvDownloadUrl && (
                    <div className="mt-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Languages className="h-3.5 w-3.5" />
                          <span>Langue du CV</span>
                        </div>
                        <div className="inline-flex rounded-md border bg-background p-0.5" role="group" aria-label="Langue du CV">
                          <button
                            type="button"
                            onClick={() => setCvLang("fr")}
                            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                              cvLang === "fr"
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            aria-pressed={cvLang === "fr"}
                          >
                            FR
                          </button>
                          <button
                            type="button"
                            onClick={() => setCvLang("en")}
                            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                              cvLang === "en"
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            aria-pressed={cvLang === "en"}
                          >
                            EN
                          </button>
                        </div>
                      </div>
                      <a
                        href={cvDownloadUrl}
                        download={`cv-${job.id}${cvLang === "en" ? "-en" : ""}.pdf`}
                        onClick={handleCvDownload}
                        aria-disabled={cvDownloading}
                        className={`inline-flex w-full h-12 items-center justify-center rounded-md border border-input bg-background text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          cvDownloading ? "pointer-events-none opacity-70" : ""
                        }`}
                      >
                        {cvDownloading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Traduction en cours...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-5 w-5" />
                            {cvLang === "fr" ? "Télécharger mon CV (PDF)" : "Download my CV (PDF)"}
                          </>
                        )}
                      </a>
                      {cvLang === "en" && (
                        <p className="text-[11px] text-muted-foreground text-center px-2">
                          La version anglaise est générée à la volée (10-20 sec).
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button variant="outline" onClick={() => setLocation('/upload')} className="h-12 px-6">
                <RefreshCw className="mr-2 h-4 w-4" />
                Créer une autre photo
              </Button>
            </div>
          </div>
        )}

        {job.status === 'completed' && jobId && (
          <FeedbackModal jobId={jobId} open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
        )}

        {job.status === 'failed' && (
          <div className="text-center max-w-md w-full mt-20 p-8 bg-card border border-destructive/20 rounded-3xl shadow-sm">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-3 font-serif">Génération impossible</h1>
            <p className="text-muted-foreground mb-3">
              Notre IA n'a pas pu traiter votre photo cette fois-ci. Cela arrive parfois sur certains clichés.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Astuce : un selfie de face, bien éclairé, le visage entièrement visible et sans filtre donne les meilleurs résultats.
            </p>
            <Button size="lg" className="w-full" onClick={() => setLocation('/upload')}>
              Réessayer avec une autre photo
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

function Wand2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 4V2" />
      <path d="M15 16v-2" />
      <path d="M8 9h2" />
      <path d="M20 9h2" />
      <path d="M17.8 11.8 19 13" />
      <path d="M15 9h0" />
      <path d="M17.8 6.2 19 5" />
      <path d="m3 21 9-9" />
      <path d="M12.2 6.2 11 5" />
    </svg>
  );
}
