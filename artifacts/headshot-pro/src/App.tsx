import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Upload from "@/pages/upload";
import Result from "@/pages/result";
import Success from "@/pages/success";
import { MentionsLegales, CGV, Confidentialite } from "@/pages/legal";
import ExemplesTikTok, { ExempleTikTokFullscreen, ExemplesTikTokEN, ExempleTikTokFullscreenEN } from "@/pages/exemples-tiktok";
import CvVitrine from "@/pages/cv-vitrine";
import { I18nProvider } from "@/lib/i18n";
import { LanguageBadge } from "@/components/LanguageBadge";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/upload" component={Upload} />
      <Route path="/result/:jobId" component={Result} />
      <Route path="/success" component={Success} />
      <Route path="/legal/mentions" component={MentionsLegales} />
      <Route path="/legal/cgv" component={CGV} />
      <Route path="/legal/confidentialite" component={Confidentialite} />
      <Route path="/exemples-tiktok" component={ExemplesTikTok} />
      <Route path="/exemples-tiktok/:id" component={ExempleTikTokFullscreen} />
      <Route path="/exemples-tiktok-en" component={ExemplesTikTokEN} />
      <Route path="/exemples-tiktok-en/:id" component={ExempleTikTokFullscreenEN} />
      <Route path="/cv-vitrine" component={CvVitrine} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <LanguageBadge />
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
