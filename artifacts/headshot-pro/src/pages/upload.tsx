import { useState, useRef, ChangeEvent, DragEvent, ReactNode } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateJob,
  useCreateCheckout,
  useImportCv,
  type CvImportResult,
} from "@workspace/api-client-react";
import {
  UploadCloud,
  X,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Sparkles,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PhotoStyle = "classique" | "moderne" | "decontracte" | "exterieur";

interface StyleOption {
  id: PhotoStyle;
  label: string;
  description: string;
  badge: string;
  gradient: string;
}
const STYLES: StyleOption[] = [
  { id: "classique", label: "Classique", description: "Fond gris studio, blazer, éclairage trois points", badge: "Le plus populaire", gradient: "from-slate-100 to-slate-200" },
  { id: "moderne", label: "Moderne / Créatif", description: "Fond sombre dégradé, éclairage dramatique", badge: "Tendance", gradient: "from-slate-700 to-slate-900" },
  { id: "decontracte", label: "Décontracté business", description: "Fond beige chaleureux, lumière naturelle", badge: "Idéal LinkedIn", gradient: "from-amber-50 to-orange-100" },
  { id: "exterieur", label: "Fond extérieur flou", description: "Verdure ou urbain en bokeh, lumière dorée", badge: "Authentique", gradient: "from-green-100 to-emerald-200" },
];

interface Exp { title: string; company: string; location?: string; startDate: string; endDate?: string; description?: string }
interface Edu { degree: string; school: string; location?: string; startDate: string; endDate?: string; description?: string }
interface Lang { name: string; level: string }
interface Cert { name: string; issuer?: string; year?: string }
interface Proj { name: string; description?: string; link?: string }
interface Ref { name: string; role?: string; contact?: string }

interface CVForm {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  website: string;
  linkedin: string;
  summary: string;
  experiences: Exp[];
  education: Edu[];
  skillsText: string;
  languages: Lang[];
  certifications: Cert[];
  projects: Proj[];
  references: Ref[];
  interestsText: string;
}

const emptyExp = (): Exp => ({ title: "", company: "", location: "", startDate: "", endDate: "", description: "" });
const emptyEdu = (): Edu => ({ degree: "", school: "", location: "", startDate: "", endDate: "", description: "" });
const emptyLang = (): Lang => ({ name: "", level: "" });
const emptyCert = (): Cert => ({ name: "", issuer: "", year: "" });
const emptyProj = (): Proj => ({ name: "", description: "", link: "" });
const emptyRef = (): Ref => ({ name: "", role: "", contact: "" });

function AIHelpButton({
  loading,
  disabled,
  onSuggest,
  label = "Aide IA",
}: {
  loading: boolean;
  disabled: boolean;
  onSuggest: () => void | Promise<void>;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSuggest}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
      {loading ? "L'IA rédige…" : label}
    </button>
  );
}

const initialCV: CVForm = {
  firstName: "", lastName: "", jobTitle: "", email: "", phone: "", address: "", city: "", website: "", linkedin: "",
  summary: "",
  experiences: [emptyExp()],
  education: [emptyEdu()],
  skillsText: "",
  languages: [emptyLang()],
  certifications: [],
  projects: [],
  references: [],
  interestsText: "",
};

export default function Upload() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [step, setStep] = useState(0);

  // Photo state
  const [dragActive, setDragActive] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<PhotoStyle>("classique");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // CV state
  const [cv, setCV] = useState<CVForm>(initialCV);

  // Existing-CV import state
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const [cvImported, setCvImported] = useState(false);
  const importCv = useImportCv();

  const createJob = useCreateJob();
  const createCheckout = useCreateCheckout();
  const isProcessing = createJob.isPending || createCheckout.isPending;

  // ---------- Photo handlers ----------
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Type de fichier invalide", description: "Veuillez téléverser une image.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Fichier trop volumineux", description: "Image de moins de 5 Mo.", variant: "destructive" });
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };
  const clearImage = () => {
    setImageFile(null); setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---------- Existing-CV import ----------
  const applyImported = (r: CvImportResult) => {
    setCV((prev) => {
      const exps = (r.experiences ?? [])
        .filter((e) => e.title || e.company)
        .map((e) => ({
          title: e.title ?? "",
          company: e.company ?? "",
          location: e.location ?? "",
          startDate: e.startDate ?? "",
          endDate: e.endDate ?? "",
          description: e.description ?? "",
        }));
      const edus = (r.education ?? [])
        .filter((e) => e.degree || e.school)
        .map((e) => ({
          degree: e.degree ?? "",
          school: e.school ?? "",
          location: e.location ?? "",
          startDate: e.startDate ?? "",
          endDate: e.endDate ?? "",
          description: e.description ?? "",
        }));
      const langs = (r.languages ?? [])
        .filter((l) => l.name)
        .map((l) => ({ name: l.name ?? "", level: l.level ?? "" }));
      const certs = (r.certifications ?? [])
        .filter((c) => c.name)
        .map((c) => ({ name: c.name ?? "", issuer: c.issuer ?? "", year: c.year ?? "" }));
      const projs = (r.projects ?? [])
        .filter((p) => p.name)
        .map((p) => ({ name: p.name ?? "", description: p.description ?? "", link: p.link ?? "" }));
      const refs = (r.references ?? [])
        .filter((x) => x.name)
        .map((x) => ({ name: x.name ?? "", role: x.role ?? "", contact: x.contact ?? "" }));

      return {
        ...prev,
        firstName: r.firstName ?? prev.firstName,
        lastName: r.lastName ?? prev.lastName,
        jobTitle: r.jobTitle ?? prev.jobTitle,
        email: r.email ?? prev.email,
        phone: r.phone ?? prev.phone,
        address: r.address ?? prev.address,
        city: r.city ?? prev.city,
        website: r.website ?? prev.website,
        linkedin: r.linkedin ?? prev.linkedin,
        summary: r.summary ?? prev.summary,
        experiences: exps.length ? exps : prev.experiences,
        education: edus.length ? edus : prev.education,
        skillsText: r.skills?.length ? r.skills.join(", ") : prev.skillsText,
        languages: langs.length ? langs : prev.languages,
        certifications: certs.length ? certs : prev.certifications,
        projects: projs.length ? projs : prev.projects,
        references: refs.length ? refs : prev.references,
        interestsText: r.interests?.length ? r.interests.join(", ") : prev.interestsText,
      };
    });
  };

  const handleCVImport = (file: File) => {
    const okType = file.type === "application/pdf" || file.type.startsWith("image/");
    if (!okType) {
      toast({ title: "Format non supporté", description: "Importez un PDF ou une image de votre CV.", variant: "destructive" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "Fichier trop volumineux", description: "CV de moins de 10 Mo.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      try {
        const result = await importCv.mutateAsync({ data: { fileDataUrl: dataUrl } });
        applyImported(result);
        setCvImported(true);
        toast({ title: "CV importé", description: "On a pré-rempli vos infos. Vérifiez-les aux étapes suivantes." });
      } catch {
        toast({ title: "Lecture impossible", description: "On n'a pas pu lire ce CV. Réessayez avec un autre fichier.", variant: "destructive" });
      } finally {
        if (cvFileInputRef.current) cvFileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCVImportChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleCVImport(e.target.files[0]);
  };

  // ---------- Generic CV helpers ----------
  const updateCV = <K extends keyof CVForm>(k: K, v: CVForm[K]) => setCV((p) => ({ ...p, [k]: v }));
  const updateArrayItem = <T,>(key: keyof CVForm, idx: number, patch: Partial<T>) => {
    setCV((p) => {
      const arr = (p[key] as unknown as T[]).map((it, i) => (i === idx ? { ...it, ...patch } : it));
      return { ...p, [key]: arr } as CVForm;
    });
  };
  const addItem = <T,>(key: keyof CVForm, factory: () => T) => {
    setCV((p) => ({ ...p, [key]: [...(p[key] as unknown as T[]), factory()] } as CVForm));
  };
  const removeItem = (key: keyof CVForm, idx: number) => {
    setCV((p) => ({ ...p, [key]: (p[key] as unknown as unknown[]).filter((_, i) => i !== idx) } as CVForm));
  };

  // ---------- AI suggestions ----------
  const [aiLoadingKey, setAiLoadingKey] = useState<string | null>(null);

  const buildAIContext = () => ({
    firstName: cv.firstName,
    lastName: cv.lastName,
    jobTitle: cv.jobTitle,
    summary: cv.summary,
    skills: cv.skillsText,
    experiences: cv.experiences.map((e) => ({
      title: e.title,
      company: e.company,
      startDate: e.startDate,
      endDate: e.endDate,
      description: e.description,
    })),
    education: cv.education.map((e) => ({
      degree: e.degree,
      school: e.school,
      startDate: e.startDate,
      endDate: e.endDate,
      description: e.description,
    })),
  });

  const requestSuggestion = async (
    key: string,
    field: string,
    extraContext: Record<string, unknown> = {},
  ): Promise<string | null> => {
    setAiLoadingKey(key);
    try {
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field, context: { ...buildAIContext(), ...extraContext } }),
      });
      if (!res.ok) throw new Error("AI error");
      const data = (await res.json()) as { suggestion?: string };
      if (!data.suggestion) throw new Error("Empty");
      return data.suggestion;
    } catch {
      toast({
        title: "L'IA n'a pas pu répondre",
        description: "Réessayez dans quelques secondes.",
        variant: "destructive",
      });
      return null;
    } finally {
      setAiLoadingKey(null);
    }
  };

  const aiBtnProps = (helpKey: string) => ({
    loading: aiLoadingKey === helpKey,
    disabled: aiLoadingKey !== null,
  });

  // ---------- Submit ----------
  const handleSubmit = async () => {
    if (!imagePreview) return;
    const skills = cv.skillsText.split(",").map((s) => s.trim()).filter(Boolean);
    const interests = cv.interestsText.split(",").map((s) => s.trim()).filter(Boolean);

    const cleanArr = <T,>(arr: T[], req: (keyof T)[]): T[] =>
      arr.filter((it) => req.every((k) => String((it as Record<string, unknown>)[k as string] ?? "").trim().length > 0));

    const cvData = {
      firstName: cv.firstName.trim(),
      lastName: cv.lastName.trim(),
      jobTitle: cv.jobTitle.trim() || undefined,
      email: cv.email.trim() || undefined,
      phone: cv.phone.trim() || undefined,
      address: cv.address.trim() || undefined,
      city: cv.city.trim() || undefined,
      website: cv.website.trim() || undefined,
      linkedin: cv.linkedin.trim() || undefined,
      summary: cv.summary.trim() || undefined,
      experiences: cleanArr(cv.experiences, ["title", "company", "startDate"]),
      education: cleanArr(cv.education, ["degree", "school", "startDate"]),
      skills,
      languages: cleanArr(cv.languages, ["name", "level"]),
      certifications: cleanArr(cv.certifications, ["name"]),
      projects: cleanArr(cv.projects, ["name"]),
      references: cleanArr(cv.references, ["name"]),
      interests,
    };

    try {
      const job = await createJob.mutateAsync({
        data: { imageDataUrl: imagePreview, style: selectedStyle, cvData, cvTemplate: "classique" },
      });
      const session = await createCheckout.mutateAsync({ data: { jobId: job.id } });
      window.location.href = session.url;
    } catch {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible d'initialiser votre commande. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  // ---------- Steps ----------
  // Each step = one focused question / topic. We never mix unrelated topics on
  // the same page.
  interface StepDef {
    title: string;
    subtitle?: string;
    canNext: () => boolean;
    render: () => ReactNode;
    optional?: boolean;
  }

  const steps: StepDef[] = [
    {
      title: "Votre photo",
      subtitle: "Choisissez un selfie net, de face, bien éclairé.",
      canNext: () => !!imagePreview,
      render: () => (
        <div className="space-y-5">
          {!imagePreview ? (
            <div
              className={`relative group flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed cursor-pointer overflow-hidden transition-all ${
                dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/50"
              }`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={handleChange} />
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7 text-muted-foreground group-hover:text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1">Glissez-déposez votre selfie</h3>
              <p className="text-sm text-muted-foreground mb-4">ou cliquez pour parcourir (max 5 Mo)</p>
              <Button type="button" variant="secondary" className="pointer-events-none">Choisir une photo</Button>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 bg-secondary/40 rounded-xl border border-border">
              <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0">
                <img src={imagePreview} alt="Aperçu" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{imageFile?.name ?? "Photo sélectionnée"}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Prête pour la transformation</p>
              </div>
              <button onClick={clearImage} className="w-8 h-8 rounded-full bg-background border border-border hover:bg-destructive hover:text-destructive-foreground text-muted-foreground flex items-center justify-center transition flex-shrink-0" title="Changer la photo">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Import existing CV */}
          <div className="rounded-xl border border-dashed border-border bg-secondary/20 p-4">
            <input
              ref={cvFileInputRef}
              type="file"
              className="hidden"
              accept="application/pdf,image/jpeg,image/png,image/webp"
              onChange={handleCVImportChange}
            />
            {cvImported ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">CV importé</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Vos infos sont pré-remplies. Vérifiez-les aux étapes suivantes.</p>
                </div>
                <Button type="button" variant="ghost" size="sm" disabled={importCv.isPending} onClick={() => cvFileInputRef.current?.click()}>
                  Changer
                </Button>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Vous avez déjà un CV ?</p>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                    Importez-le (PDF ou image) : on le lit et on pré-remplit tout pour vous. Vous n'aurez plus qu'à corriger avant de générer la version stylée.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={importCv.isPending}
                    onClick={() => cvFileInputRef.current?.click()}
                  >
                    {importCv.isPending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Lecture de votre CV…</>
                    ) : (
                      <><FileText className="w-4 h-4 mr-2" /> Importer mon CV</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Quel style de photo ?",
      subtitle: "Le rendu visuel que l'IA va appliquer à votre selfie.",
      canNext: () => true,
      render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STYLES.map((s) => {
            const sel = selectedStyle === s.id;
            return (
              <button key={s.id} onClick={() => setSelectedStyle(s.id)}
                className={`relative text-left rounded-xl border-2 p-4 transition-all ${
                  sel ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background hover:border-primary/40 hover:bg-secondary/40"
                }`}>
                <div className={`w-full h-10 rounded-lg bg-gradient-to-r ${s.gradient} mb-3`} />
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{s.label}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.description}</p>
                  </div>
                  {sel && <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-3 h-3 text-primary-foreground" /></div>}
                </div>
                <span className="inline-block mt-2 text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{s.badge}</span>
              </button>
            );
          })}
        </div>
      ),
    },
    {
      title: "Comment vous appelez-vous ?",
      subtitle: "Votre nom complet, affiché en grand en haut du CV.",
      canNext: () => cv.firstName.trim().length > 0 && cv.lastName.trim().length > 0,
      render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Prénom *" value={cv.firstName} onChange={(v) => updateCV("firstName", v)} placeholder="Marie" autoFocus />
          <Field label="Nom *" value={cv.lastName} onChange={(v) => updateCV("lastName", v)} placeholder="Dupont" />
        </div>
      ),
    },
    {
      title: "Quel poste recherchez-vous ?",
      subtitle: "Le titre affiché juste sous votre nom (facultatif).",
      canNext: () => true,
      optional: true,
      render: () => (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-sm font-medium">Titre / poste recherché</Label>
            <AIHelpButton
              {...aiBtnProps("jobTitle")}
              label="Pas d'inspi ? Demander à l'IA"
              onSuggest={async () => {
                const s = await requestSuggestion("jobTitle", "jobTitle");
                if (s) updateCV("jobTitle", s);
              }}
            />
          </div>
          <Input value={cv.jobTitle} onChange={(e) => updateCV("jobTitle", e.target.value)} placeholder="Cheffe de projet digital" autoFocus />
        </div>
      ),
    },
    {
      title: "Votre adresse e-mail ?",
      subtitle: "Pour que les recruteurs puissent vous contacter (facultatif).",
      canNext: () => true,
      optional: true,
      render: () => (
        <Field label="E-mail" value={cv.email} onChange={(v) => updateCV("email", v)} placeholder="marie@exemple.fr" type="email" autoFocus />
      ),
    },
    {
      title: "Votre numéro de téléphone ?",
      subtitle: "Facultatif.",
      canNext: () => true,
      optional: true,
      render: () => (
        <Field label="Téléphone" value={cv.phone} onChange={(v) => updateCV("phone", v)} placeholder="+33 6 12 34 56 78" autoFocus />
      ),
    },
    {
      title: "Où habitez-vous ?",
      subtitle: "Adresse et ville (facultatif).",
      canNext: () => true,
      optional: true,
      render: () => (
        <div className="space-y-4">
          <Field label="Adresse" value={cv.address} onChange={(v) => updateCV("address", v)} placeholder="12 rue de Rivoli" autoFocus />
          <Field label="Ville" value={cv.city} onChange={(v) => updateCV("city", v)} placeholder="Paris, France" />
        </div>
      ),
    },
    {
      title: "Votre profil LinkedIn ?",
      subtitle: "Facultatif.",
      canNext: () => true,
      optional: true,
      render: () => (
        <Field label="LinkedIn" value={cv.linkedin} onChange={(v) => updateCV("linkedin", v)} placeholder="linkedin.com/in/marie" autoFocus />
      ),
    },
    {
      title: "Votre site ou portfolio ?",
      subtitle: "Facultatif.",
      canNext: () => true,
      optional: true,
      render: () => (
        <Field label="Site web / portfolio" value={cv.website} onChange={(v) => updateCV("website", v)} placeholder="marie.fr" autoFocus />
      ),
    },
    {
      title: "Présentez-vous en quelques lignes",
      subtitle: "Un court résumé qui apparaît tout en haut du CV (facultatif).",
      canNext: () => true,
      optional: true,
      render: () => (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-sm font-medium">Profil / résumé (3-4 lignes)</Label>
            <AIHelpButton
              {...aiBtnProps("summary")}
              label="Pas d'inspi ? Demander à l'IA"
              onSuggest={async () => {
                const s = await requestSuggestion("summary", "summary");
                if (s) updateCV("summary", s);
              }}
            />
          </div>
          <Textarea autoFocus value={cv.summary} onChange={(e) => updateCV("summary", e.target.value)} placeholder="Présentez en quelques phrases votre profil, votre expertise et vos objectifs." rows={5} />
          <p className="text-xs text-muted-foreground mt-2">L'IA s'appuie sur vos expériences et compétences déjà saisies.</p>
        </div>
      ),
    },
    {
      title: "Vos expériences professionnelles",
      subtitle: "Ajoutez chaque poste occupé. Laissez la date de fin vide pour un poste en cours.",
      canNext: () => cv.experiences.every((e) => !e.title || (e.title && e.company && e.startDate)),
      optional: true,
      render: () => (
        <Section title="Expériences" onAdd={() => addItem("experiences", emptyExp)}>
          {cv.experiences.map((e, i) => (
            <ItemCard key={i} index={i} onRemove={cv.experiences.length > 1 ? () => removeItem("experiences", i) : undefined}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Intitulé du poste" value={e.title} onChange={(v) => updateArrayItem<Exp>("experiences", i, { title: v })} placeholder="Cheffe de projet" />
                <Field label="Entreprise" value={e.company} onChange={(v) => updateArrayItem<Exp>("experiences", i, { company: v })} placeholder="Acme SAS" />
                <Field label="Ville" value={e.location ?? ""} onChange={(v) => updateArrayItem<Exp>("experiences", i, { location: v })} placeholder="Paris" />
                <Field label="Date début" value={e.startDate} onChange={(v) => updateArrayItem<Exp>("experiences", i, { startDate: v })} placeholder="Sept. 2022" />
                <Field label="Date fin (vide = en cours)" value={e.endDate ?? ""} onChange={(v) => updateArrayItem<Exp>("experiences", i, { endDate: v })} placeholder="Mars 2024" className="sm:col-span-2" />
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-xs">Description / réalisations</Label>
                  <AIHelpButton
                    {...aiBtnProps(`exp-${i}`)}
                    label="Aide IA"
                    onSuggest={async () => {
                      const s = await requestSuggestion(`exp-${i}`, "experienceDescription", { currentItemIndex: i });
                      if (s) updateArrayItem<Exp>("experiences", i, { description: s });
                    }}
                  />
                </div>
                <Textarea value={e.description ?? ""} onChange={(ev) => updateArrayItem<Exp>("experiences", i, { description: ev.target.value })} rows={4} placeholder="Pilotage d'équipes, livrables, impact mesurable…" />
              </div>
            </ItemCard>
          ))}
        </Section>
      ),
    },
    {
      title: "Votre formation",
      subtitle: "Diplômes, écoles et universités.",
      canNext: () => cv.education.every((e) => !e.degree || (e.degree && e.school && e.startDate)),
      optional: true,
      render: () => (
        <Section title="Formation" onAdd={() => addItem("education", emptyEdu)}>
          {cv.education.map((e, i) => (
            <ItemCard key={i} index={i} onRemove={cv.education.length > 1 ? () => removeItem("education", i) : undefined}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Diplôme" value={e.degree} onChange={(v) => updateArrayItem<Edu>("education", i, { degree: v })} placeholder="Master Marketing" />
                <Field label="École / Université" value={e.school} onChange={(v) => updateArrayItem<Edu>("education", i, { school: v })} placeholder="HEC Paris" />
                <Field label="Ville" value={e.location ?? ""} onChange={(v) => updateArrayItem<Edu>("education", i, { location: v })} placeholder="Jouy-en-Josas" />
                <Field label="Date début" value={e.startDate} onChange={(v) => updateArrayItem<Edu>("education", i, { startDate: v })} placeholder="2019" />
                <Field label="Date fin" value={e.endDate ?? ""} onChange={(v) => updateArrayItem<Edu>("education", i, { endDate: v })} placeholder="2021" className="sm:col-span-2" />
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-xs">Mention / spécialité</Label>
                  <AIHelpButton
                    {...aiBtnProps(`edu-${i}`)}
                    label="Aide IA"
                    onSuggest={async () => {
                      const s = await requestSuggestion(`edu-${i}`, "educationDescription", { currentItemIndex: i });
                      if (s) updateArrayItem<Edu>("education", i, { description: s });
                    }}
                  />
                </div>
                <Textarea value={e.description ?? ""} onChange={(ev) => updateArrayItem<Edu>("education", i, { description: ev.target.value })} rows={2} placeholder="Mention bien, spécialisation digital…" />
              </div>
            </ItemCard>
          ))}
        </Section>
      ),
    },
    {
      title: "Vos compétences",
      subtitle: "Séparez chaque compétence par une virgule.",
      canNext: () => true,
      optional: true,
      render: () => (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-sm font-medium">Compétences</Label>
            <AIHelpButton
              {...aiBtnProps("skills")}
              label="Pas d'inspi ? Demander à l'IA"
              onSuggest={async () => {
                const s = await requestSuggestion("skills", "skills");
                if (s) updateCV("skillsText", s);
              }}
            />
          </div>
          <Textarea autoFocus value={cv.skillsText} onChange={(e) => updateCV("skillsText", e.target.value)} rows={4} placeholder="Gestion de projet, Figma, SQL, Leadership, Anglais courant…" />
          <p className="text-xs text-muted-foreground mt-2">Astuce : 6 à 12 compétences donnent le meilleur rendu.</p>
        </div>
      ),
    },
    {
      title: "Quelles langues parlez-vous ?",
      subtitle: "Ajoutez chaque langue et son niveau.",
      canNext: () => true,
      optional: true,
      render: () => (
        <Section title="Langues" onAdd={() => addItem("languages", emptyLang)}>
          {cv.languages.map((l, i) => (
            <ItemCard key={i} index={i} onRemove={cv.languages.length > 1 ? () => removeItem("languages", i) : undefined}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Langue" value={l.name} onChange={(v) => updateArrayItem<Lang>("languages", i, { name: v })} placeholder="Anglais" />
                <Field label="Niveau" value={l.level} onChange={(v) => updateArrayItem<Lang>("languages", i, { level: v })} placeholder="C1 — courant" />
              </div>
            </ItemCard>
          ))}
        </Section>
      ),
    },
    {
      title: "Vos certifications",
      subtitle: "Facultatif — cliquez sur Ajouter pour en inclure.",
      canNext: () => true,
      optional: true,
      render: () => (
        <Section title="Certifications" onAdd={() => addItem("certifications", emptyCert)}>
          {cv.certifications.length === 0 ? <EmptyHint text="Aucune certification pour l'instant. Cliquez sur Ajouter pour en inclure." /> :
            cv.certifications.map((c, i) => (
              <ItemCard key={i} index={i} onRemove={() => removeItem("certifications", i)}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Field label="Nom" value={c.name} onChange={(v) => updateArrayItem<Cert>("certifications", i, { name: v })} placeholder="PMP" />
                  <Field label="Organisme" value={c.issuer ?? ""} onChange={(v) => updateArrayItem<Cert>("certifications", i, { issuer: v })} placeholder="PMI" />
                  <Field label="Année" value={c.year ?? ""} onChange={(v) => updateArrayItem<Cert>("certifications", i, { year: v })} placeholder="2023" />
                </div>
              </ItemCard>
            ))
          }
        </Section>
      ),
    },
    {
      title: "Vos projets",
      subtitle: "Facultatif — projets personnels, open source, side-projects.",
      canNext: () => true,
      optional: true,
      render: () => (
        <Section title="Projets" onAdd={() => addItem("projects", emptyProj)}>
          {cv.projects.length === 0 ? <EmptyHint text="Aucun projet pour l'instant. Cliquez sur Ajouter pour en inclure." /> :
            cv.projects.map((p, i) => (
              <ItemCard key={i} index={i} onRemove={() => removeItem("projects", i)}>
                <div className="space-y-3">
                  <Field label="Nom" value={p.name} onChange={(v) => updateArrayItem<Proj>("projects", i, { name: v })} placeholder="Application de suivi sportif" />
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-xs">Description</Label>
                      <AIHelpButton
                        {...aiBtnProps(`proj-${i}`)}
                        label="Aide IA"
                        onSuggest={async () => {
                          const s = await requestSuggestion(`proj-${i}`, "projectDescription", { currentProject: { name: p.name } });
                          if (s) updateArrayItem<Proj>("projects", i, { description: s });
                        }}
                      />
                    </div>
                    <Textarea value={p.description ?? ""} onChange={(e) => updateArrayItem<Proj>("projects", i, { description: e.target.value })} rows={3} />
                  </div>
                  <Field label="Lien" value={p.link ?? ""} onChange={(v) => updateArrayItem<Proj>("projects", i, { link: v })} placeholder="github.com/…" />
                </div>
              </ItemCard>
            ))
          }
        </Section>
      ),
    },
    {
      title: "Vos références",
      subtitle: "Facultatif — personnes pouvant recommander votre profil.",
      canNext: () => true,
      optional: true,
      render: () => (
        <Section title="Références" onAdd={() => addItem("references", emptyRef)}>
          {cv.references.length === 0 ? <EmptyHint text="Aucune référence pour l'instant. Cliquez sur Ajouter pour en inclure." /> :
            cv.references.map((r, i) => (
              <ItemCard key={i} index={i} onRemove={() => removeItem("references", i)}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Field label="Nom" value={r.name} onChange={(v) => updateArrayItem<Ref>("references", i, { name: v })} placeholder="Jean Martin" />
                  <Field label="Rôle / lien" value={r.role ?? ""} onChange={(v) => updateArrayItem<Ref>("references", i, { role: v })} placeholder="Ancien manager" />
                  <Field label="Contact" value={r.contact ?? ""} onChange={(v) => updateArrayItem<Ref>("references", i, { contact: v })} placeholder="jean@…" />
                </div>
              </ItemCard>
            ))
          }
        </Section>
      ),
    },
    {
      title: "Vos centres d'intérêt",
      subtitle: "Séparez chaque centre d'intérêt par une virgule (facultatif).",
      canNext: () => true,
      optional: true,
      render: () => (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-sm font-medium">Centres d'intérêt</Label>
            <AIHelpButton
              {...aiBtnProps("interests")}
              label="Pas d'inspi ? Demander à l'IA"
              onSuggest={async () => {
                const s = await requestSuggestion("interests", "interests");
                if (s) updateCV("interestsText", s);
              }}
            />
          </div>
          <Textarea autoFocus value={cv.interestsText} onChange={(e) => updateCV("interestsText", e.target.value)} rows={3} placeholder="Course à pied, photographie, lecture…" />
        </div>
      ),
    },
    {
      title: "Tout est prêt !",
      subtitle: "Vérifiez votre commande avant le paiement.",
      canNext: () => true,
      render: () => (
        <div className="space-y-6">
          <div className="bg-secondary/40 border border-border rounded-xl p-5">
            <p className="text-sm font-semibold mb-3">Récapitulatif</p>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• Photo professionnelle générée par IA (style {STYLES.find((s) => s.id === selectedStyle)?.label})</li>
              <li>• CV PDF prêt à télécharger avec votre photo intégrée</li>
              <li>• Téléchargement immédiat après génération</li>
            </ul>
          </div>
          <div className="text-center pt-2">
            <p className="text-3xl font-bold font-serif">4,99 €</p>
            <p className="text-xs text-muted-foreground mt-1">Paiement unique. Tout compris.</p>
          </div>
        </div>
      ),
    },
  ];

  const total = steps.length;
  const current = steps[step];
  const isLast = step === total - 1;

  const next = () => {
    if (!current.canNext()) {
      toast({ title: "Champs manquants", description: "Complétez les champs requis avant de continuer.", variant: "destructive" });
      return;
    }
    setStep((s) => Math.min(total - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => { setStep((s) => Math.max(0, s - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const progressPct = Math.round(((step + 1) / total) * 100);

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      <nav className="border-b border-border/40 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <button onClick={() => setLocation("/")} className="flex items-center hover:opacity-80">
            <img src={`${import.meta.env.BASE_URL}logo-icon.png`} alt="HeadshotCV" className="h-11 w-11 rounded-lg object-cover" />
          </button>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-10 flex flex-col items-center max-w-2xl w-full">
        {/* Progress */}
        <div className="w-full mb-8">
          <div className="flex items-center justify-between text-xs font-medium mb-2">
            <span className="text-muted-foreground">Étape {step + 1} sur {total}</span>
            <span className="text-primary">{progressPct} %</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="w-full bg-background rounded-2xl shadow-sm border border-border p-6 md:p-10 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-2">{current.title}</h2>
            {current.subtitle && <p className="text-sm text-muted-foreground">{current.subtitle}</p>}
          </div>

          <div className="pt-2">{current.render()}</div>

          {/* Footer nav */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="ghost" onClick={prev} disabled={step === 0 || isProcessing}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour
            </Button>
            {!isLast ? (
              <div className="flex items-center gap-2">
                {current.optional && (
                  <Button variant="ghost" onClick={next} disabled={isProcessing} className="text-muted-foreground hover:text-foreground">
                    Passer
                  </Button>
                )}
                <Button onClick={next} disabled={isProcessing}>
                  Suivant <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ) : (
              <Button onClick={handleSubmit} disabled={isProcessing} className="h-12 px-6">
                {isProcessing ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Préparation…</>) : (<>Payer et générer <ArrowRight className="ml-2 h-4 w-4" /></>)}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ---------- Small UI helpers ----------
function Field({ label, value, onChange, placeholder, type = "text", className = "", autoFocus = false }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string; autoFocus?: boolean;
}) {
  return (
    <div className={className}>
      <Label className="text-xs font-medium">{label}</Label>
      <Input autoFocus={autoFocus} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1" />
    </div>
  );
}

function Section({ title, onAdd, children }: { title: string; onAdd: () => void; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Ajouter
        </Button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ItemCard({ index, onRemove, children }: { index: number; onRemove?: () => void; children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl border border-border bg-secondary/20 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-muted-foreground">#{index + 1}</span>
        {onRemove && (
          <button onClick={onRemove} className="text-muted-foreground hover:text-destructive transition" title="Supprimer">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return <p className="text-xs text-muted-foreground italic">{text}</p>;
}
