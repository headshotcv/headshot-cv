import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80">
            <img src={`${import.meta.env.BASE_URL}logo-icon.png`} alt="HeadshotCV" className="h-11 w-11 rounded-lg object-cover" />
          </Link>
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground mb-12">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <article className="prose prose-slate max-w-none text-foreground/90 leading-relaxed [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:my-4 [&_p]:text-[15px] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_li]:my-1.5 [&_li]:text-[15px] [&_strong]:font-semibold">
          {children}
        </article>
      </main>

      <footer className="py-12 border-t border-border/40 text-center text-muted-foreground text-sm mt-16">
        <div className="container mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link href="/legal/mentions" className="hover:text-foreground transition-colors">Mentions Légales</Link>
            <Link href="/legal/cgv" className="hover:text-foreground transition-colors">CGU / CGV</Link>
            <Link href="/legal/confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link>
          </div>
          <p>© {new Date().getFullYear()} HeadshotCV. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export function MentionsLegales() {
  return (
    <LegalLayout title="Mentions Légales">
      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>HeadshotCV</strong> est édité par l'auto-entreprise HeadshotCV,
        domiciliée en France.
      </p>
      <ul>
        <li><strong>Nom commercial :</strong> HeadshotCV</li>
        <li><strong>Forme juridique :</strong> Auto-entrepreneur</li>
        <li><strong>Adresse e-mail de contact :</strong> contact@headshotcv.fr</li>
        <li><strong>Directeur de la publication :</strong> Le représentant légal de l'éditeur</li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Replit, Inc.</strong>, 767 Bryant St #203,
        San Francisco, CA 94107, États-Unis.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments présents sur ce site (textes, graphismes, logos, icônes,
        images, modèles de CV, code source) sont la propriété exclusive de HeadshotCV,
        sauf mentions contraires. Toute reproduction, représentation, modification,
        publication, transmission ou exploitation non expressément autorisée est interdite
        et peut donner lieu à des poursuites.
      </p>
      <p>
        Les photos générées par notre service et les CV produits restent la propriété
        de l'utilisateur qui les a commandés.
      </p>

      <h2>Responsabilité</h2>
      <p>
        HeadshotCV met tout en œuvre pour fournir des informations exactes et un service
        de qualité, mais ne saurait être tenu responsable des erreurs ou omissions, ni
        d'éventuelles indisponibilités du service.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes mentions légales sont soumises au droit français. Tout litige
        relatif à leur interprétation ou à leur exécution relève des tribunaux français
        compétents.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site, vous pouvez nous écrire à :{" "}
        <strong>contact@headshotcv.fr</strong>
      </p>
    </LegalLayout>
  );
}

export function CGV() {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation et de Vente">
      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales d'Utilisation et de Vente (ci-après « CGU/CGV »)
        régissent l'utilisation du site <strong>HeadshotCV</strong> et la vente du service
        de génération de photo professionnelle assistée par intelligence artificielle et de
        CV au format PDF.
      </p>

      <h2>2. Acceptation</h2>
      <p>
        L'utilisation du service implique l'acceptation pleine et entière des présentes
        CGU/CGV par l'utilisateur. Les CGU/CGV applicables sont celles en vigueur au moment
        de la commande.
      </p>

      <h2>3. Description du service</h2>
      <p>
        HeadshotCV propose un service en ligne permettant à l'utilisateur de :
      </p>
      <ul>
        <li>téléverser un selfie afin de générer une photo professionnelle par IA ;</li>
        <li>renseigner ses informations CV et choisir un modèle de mise en page ;</li>
        <li>télécharger sa photo et son CV au format PDF, photo intégrée.</li>
      </ul>

      <h2>4. Prix et paiement</h2>
      <p>
        Le prix du service est de <strong>4,99 € TTC</strong> en paiement unique. Le paiement
        est effectué en ligne via notre prestataire <strong>Stripe</strong>, qui assure la
        sécurité de la transaction. Aucune donnée bancaire n'est conservée par HeadshotCV.
      </p>

      <h2>5. Livraison</h2>
      <p>
        La photo et le CV PDF sont générés et mis à disposition de l'utilisateur dans un
        délai indicatif de 2 à 4 minutes après le paiement. L'utilisateur peut les
        télécharger immédiatement depuis la page de résultat.
      </p>

      <h2>6. Droit de rétractation</h2>
      <p>
        Conformément à l'article L221-28 du Code de la consommation, le droit de
        rétractation ne peut être exercé pour les contenus numériques fournis sur un
        support immatériel dont l'exécution a commencé avec l'accord préalable exprès du
        consommateur. En validant son paiement, l'utilisateur reconnaît expressément
        renoncer à son droit de rétractation pour les commandes ainsi livrées.
      </p>

      <h2>7. Garantie de satisfaction</h2>
      <p>
        Si le résultat ne vous convient pas, contactez-nous à{" "}
        <strong>contact@headshotcv.fr</strong>. Chaque demande est étudiée individuellement
        afin de trouver une solution adaptée.
      </p>

      <h2>8. Obligations de l'utilisateur</h2>
      <p>L'utilisateur s'engage à :</p>
      <ul>
        <li>ne téléverser que des photos sur lesquelles il dispose des droits ;</li>
        <li>ne pas utiliser le service à des fins frauduleuses, diffamatoires ou illégales ;</li>
        <li>fournir des informations exactes lors de la création de son CV.</li>
      </ul>

      <h2>9. Propriété intellectuelle</h2>
      <p>
        L'utilisateur reste propriétaire des photos et données qu'il téléverse. Les
        livrables (photo générée, CV PDF) lui appartiennent. HeadshotCV conserve les
        droits sur ses modèles de CV, son interface et son code.
      </p>

      <h2>10. Responsabilité</h2>
      <p>
        HeadshotCV ne saurait être tenu responsable d'éventuelles différences entre le
        rendu attendu et le rendu obtenu, ces derniers dépendant de la qualité du selfie
        fourni et des limites du modèle d'IA. La responsabilité de HeadshotCV est, en
        tout état de cause, limitée au montant payé par l'utilisateur.
      </p>

      <h2>11. Modification des CGU/CGV</h2>
      <p>
        HeadshotCV se réserve le droit de modifier les présentes CGU/CGV à tout moment.
        Les nouvelles conditions s'appliquent à toute commande passée postérieurement à
        leur publication.
      </p>

      <h2>12. Droit applicable et juridiction</h2>
      <p>
        Les présentes CGU/CGV sont soumises au droit français. À défaut de résolution
        amiable, tout litige sera porté devant les tribunaux français compétents.
      </p>
    </LegalLayout>
  );
}

export function Confidentialite() {
  return (
    <LegalLayout title="Politique de Confidentialité">
      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données collectées sur le site HeadshotCV est
        l'éditeur du site (voir Mentions Légales). Pour toute question relative à vos
        données, contactez : <strong>contact@headshotcv.fr</strong>
      </p>

      <h2>2. Données collectées</h2>
      <p>Dans le cadre de l'utilisation du service, nous collectons :</p>
      <ul>
        <li><strong>La photo (selfie)</strong> que vous téléversez ;</li>
        <li><strong>Les informations de votre CV</strong> (nom, e-mail, téléphone, parcours, compétences, etc.) ;</li>
        <li><strong>Les données de paiement</strong> (gérées exclusivement par Stripe, jamais stockées par nous) ;</li>
        <li><strong>Des données techniques</strong> (logs serveur, adresse IP) pour la sécurité du service.</li>
      </ul>

      <h2>3. Finalités du traitement</h2>
      <p>Vos données sont utilisées exclusivement pour :</p>
      <ul>
        <li>générer votre photo professionnelle et votre CV PDF ;</li>
        <li>traiter votre paiement ;</li>
        <li>vous fournir un support client si vous nous contactez ;</li>
        <li>respecter nos obligations légales (comptabilité notamment).</li>
      </ul>

      <h2>4. Base légale</h2>
      <p>
        Le traitement repose sur l'exécution du contrat qui vous lie à HeadshotCV
        (réalisation de la prestation commandée) et sur le respect d'obligations légales.
      </p>

      <h2>5. Durée de conservation</h2>
      <ul>
        <li><strong>Selfie d'origine :</strong> conservé le temps de la génération, puis supprimé sous 30 jours.</li>
        <li><strong>Photo générée et CV PDF :</strong> conservés 90 jours pour vous permettre de les retélécharger, puis supprimés.</li>
        <li><strong>Données de facturation :</strong> conservées 10 ans conformément aux obligations comptables.</li>
      </ul>

      <h2>6. Sous-traitants</h2>
      <p>Pour fonctionner, notre service s'appuie sur les prestataires suivants :</p>
      <ul>
        <li><strong>Stripe</strong> (Irlande / États-Unis) — traitement des paiements ;</li>
        <li><strong>OpenAI</strong> (États-Unis) — génération de la photo par IA ;</li>
        <li><strong>Replit</strong> (États-Unis) — hébergement.</li>
      </ul>
      <p>
        Les transferts hors UE sont encadrés par les clauses contractuelles types de la
        Commission européenne.
      </p>

      <h2>7. Partage avec des tiers</h2>
      <p>
        Vos données ne sont jamais vendues, louées ni cédées à des tiers à des fins
        commerciales.
      </p>

      <h2>8. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez à tout moment des droits suivants :</p>
      <ul>
        <li>droit d'accès à vos données ;</li>
        <li>droit de rectification ;</li>
        <li>droit à l'effacement (« droit à l'oubli ») ;</li>
        <li>droit à la limitation du traitement ;</li>
        <li>droit à la portabilité ;</li>
        <li>droit d'opposition.</li>
      </ul>
      <p>
        Pour exercer ces droits, écrivez-nous à <strong>contact@headshotcv.fr</strong>. Vous
        pouvez également introduire une réclamation auprès de la CNIL (
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">www.cnil.fr</a>).
      </p>

      <h2>9. Cookies</h2>
      <p>
        Le site utilise uniquement des cookies techniques nécessaires à son
        fonctionnement (session de paiement, préférences). Aucun cookie publicitaire ou
        de tracking tiers n'est déposé sans votre consentement.
      </p>

      <h2>10. Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables
        pour protéger vos données : chiffrement des échanges (HTTPS), accès restreint,
        stockage sécurisé.
      </p>

      <h2>11. Modifications</h2>
      <p>
        La présente politique peut être mise à jour. La date de dernière mise à jour
        figure en tête de cette page.
      </p>
    </LegalLayout>
  );
}
