import { useState } from "react";
import { Star, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateFeedback } from "@workspace/api-client-react";

type PriceFeeling = "cheap" | "fair" | "expensive";

interface Props {
  jobId: string;
  open: boolean;
  onClose: () => void;
}

function Stars({ value, onChange, size = "lg" }: { value: number; onChange: (n: number) => void; size?: "md" | "lg" }) {
  const sz = size === "lg" ? "w-10 h-10" : "w-7 h-7";
  return (
    <div className="flex items-center justify-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            className="transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <Star
              className={`${sz} transition-colors ${active ? "fill-amber-400 text-amber-400" : "fill-transparent text-muted-foreground/40"}`}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function FeedbackModal({ jobId, open, onClose }: Props) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [rating, setRating] = useState(0);
  const [easeOfUse, setEaseOfUse] = useState(0);
  const [photoQuality, setPhotoQuality] = useState(0);
  const [cvQuality, setCvQuality] = useState(0);
  const [priceFeeling, setPriceFeeling] = useState<PriceFeeling | "">("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [hadIssue, setHadIssue] = useState<boolean | null>(null);
  const [issueText, setIssueText] = useState("");
  const [comment, setComment] = useState("");
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { mutate, isPending } = useCreateFeedback();

  const handleSubmit = () => {
    setSubmitError(null);
    mutate(
      {
        data: {
          jobId,
          rating,
          easeOfUse: easeOfUse || undefined,
          photoQuality: photoQuality || undefined,
          cvQuality: cvQuality || undefined,
          priceFeeling: priceFeeling || undefined,
          wouldRecommend: wouldRecommend ?? undefined,
          hadIssue: hadIssue ?? undefined,
          issueText: issueText.trim() || undefined,
          comment: comment.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          try {
            localStorage.setItem(`feedback-${jobId}`, "1");
          } catch {}
          setDone(true);
        },
        onError: (err) => {
          setSubmitError(
            err instanceof Error
              ? "L'envoi a échoué. Vérifiez votre connexion et réessayez."
              : "L'envoi a échoué. Réessayez dans un instant."
          );
        },
      }
    );
  };

  // User dismissal (Passer / X) — remember dismissal so the modal does not nag.
  const handleClose = () => {
    try {
      localStorage.setItem(`feedback-${jobId}`, "1");
    } catch {}
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        {done ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold font-serif mb-2">Merci pour votre retour !</DialogTitle>
            <DialogDescription className="text-base">
              Votre avis nous aide énormément à améliorer HeadshotCV.
            </DialogDescription>
            <Button onClick={onClose} className="mt-6 h-11 px-8">Fermer</Button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-8 pt-8 pb-6 border-b">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold font-serif text-center">
                  Évaluer le site
                </DialogTitle>
                <DialogDescription className="text-center text-base mt-2">
                  Étape {step + 1} sur 3 — 30 secondes pour nous aider à nous améliorer.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex gap-1.5 max-w-xs mx-auto">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="px-8 py-7 max-h-[60vh] overflow-y-auto">
              {step === 0 && (
                <div className="space-y-7 text-center">
                  <div>
                    <Label className="text-lg font-semibold block mb-4">
                      Quelle note globale donneriez-vous au site ?
                    </Label>
                    <Stars value={rating} onChange={setRating} />
                    {rating > 0 && (
                      <p className="text-sm text-muted-foreground mt-3">
                        {["", "Très décevant", "Décevant", "Correct", "Très bien", "Excellent !"][rating]}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold block mb-3 text-center">
                      Le site était-il facile à utiliser ?
                    </Label>
                    <Stars value={easeOfUse} onChange={setEaseOfUse} size="md" />
                  </div>
                  <div className="border-t pt-5">
                    <Label className="text-base font-semibold block mb-3 text-center">
                      Qualité de la photo générée par l'IA ?
                    </Label>
                    <Stars value={photoQuality} onChange={setPhotoQuality} size="md" />
                  </div>
                  <div className="border-t pt-5">
                    <Label className="text-base font-semibold block mb-3 text-center">
                      Qualité du CV PDF ?
                    </Label>
                    <Stars value={cvQuality} onChange={setCvQuality} size="md" />
                  </div>
                  <div className="border-t pt-5">
                    <Label className="text-base font-semibold block mb-3 text-center">
                      Le prix de 4,99 € vous semble…
                    </Label>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {([
                        ["cheap", "Bon marché"],
                        ["fair", "Juste"],
                        ["expensive", "Trop cher"],
                      ] as const).map(([v, label]) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setPriceFeeling(v)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                            priceFeeling === v
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background hover:bg-secondary border-input"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold block mb-3 text-center">
                      Recommanderiez-vous HeadshotCV à un ami ?
                    </Label>
                    <div className="flex gap-2 justify-center">
                      {[
                        [true, "👍 Oui"],
                        [false, "👎 Non"],
                      ].map(([v, label]) => (
                        <button
                          key={String(v)}
                          type="button"
                          onClick={() => setWouldRecommend(v as boolean)}
                          className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                            wouldRecommend === v
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background hover:bg-secondary border-input"
                          }`}
                        >
                          {label as string}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-5">
                    <Label className="text-base font-semibold block mb-3 text-center">
                      Avez-vous rencontré un problème ?
                    </Label>
                    <div className="flex gap-2 justify-center mb-3">
                      {[
                        [false, "Non, tout s'est bien passé"],
                        [true, "Oui"],
                      ].map(([v, label]) => (
                        <button
                          key={String(v)}
                          type="button"
                          onClick={() => setHadIssue(v as boolean)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                            hadIssue === v
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background hover:bg-secondary border-input"
                          }`}
                        >
                          {label as string}
                        </button>
                      ))}
                    </div>
                    {hadIssue === true && (
                      <Textarea
                        value={issueText}
                        onChange={(e) => setIssueText(e.target.value)}
                        placeholder="Décrivez le problème rencontré…"
                        rows={3}
                        className="resize-none"
                      />
                    )}
                  </div>

                  <div className="border-t pt-5">
                    <Label htmlFor="comment" className="text-base font-semibold block mb-3">
                      Un commentaire ou une suggestion ? (facultatif)
                    </Label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Ce que vous avez aimé, ce qu'on pourrait améliorer…"
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="px-8 py-5 border-t bg-secondary/30 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Passer
              </button>
              <div className="flex gap-2">
                {step > 0 && (
                  <Button variant="outline" onClick={() => setStep((step - 1) as 0 | 1)}>
                    Retour
                  </Button>
                )}
                {step < 2 && (
                  <Button
                    onClick={() => setStep((step + 1) as 1 | 2)}
                    disabled={step === 0 && rating === 0}
                    className="min-w-28"
                  >
                    Suivant
                  </Button>
                )}
                {step === 2 && (
                  <Button onClick={handleSubmit} disabled={isPending} className="min-w-32">
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Envoi…
                      </>
                    ) : submitError ? (
                      "Réessayer"
                    ) : (
                      "Envoyer"
                    )}
                  </Button>
                )}
              </div>
            </div>
            {submitError && (
              <div className="px-8 pb-4 -mt-2 flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
