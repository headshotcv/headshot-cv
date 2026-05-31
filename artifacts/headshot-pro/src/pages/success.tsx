import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useConfirmJobPayment } from "@workspace/api-client-react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Success() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const confirmPayment = useConfirmJobPayment();
  const isConfirming = useRef(false);

  useEffect(() => {
    const handleSuccess = async () => {
      if (isConfirming.current) return;
      isConfirming.current = true;

      const searchParams = new URLSearchParams(window.location.search);
      const sessionId = searchParams.get('session_id');
      const jobId = searchParams.get('job_id');

      if (!sessionId || !jobId) {
        toast({
          title: "Informations de paiement manquantes",
          description: "Impossible de vérifier votre paiement. Veuillez contacter le support.",
          variant: "destructive"
        });
        setLocation('/');
        return;
      }

      try {
        await confirmPayment.mutateAsync({
          id: jobId,
          data: { stripePaymentIntentId: sessionId }
        });
        
        setLocation(`/result/${jobId}`);
      } catch (error) {
        toast({
          title: "Vérification du paiement échouée",
          description: "Nous avons eu du mal à vérifier votre paiement. Essayez de rafraîchir la page.",
          variant: "destructive"
        });
        setLocation(`/result/${jobId}`);
      }
    };

    handleSuccess();
  }, [confirmPayment, setLocation, toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
      <h1 className="text-2xl font-bold mb-2 font-serif">Vérification du paiement...</h1>
      <p className="text-muted-foreground">Veuillez patienter pendant que nous confirmons votre commande et lançons la magie.</p>
    </div>
  );
}
