/* Mock data for the Ryvo demo dashboard.
   Single source of truth — views read from here so numbers stay consistent. */

export const COMPANY = {
  name: "Bâtiments Morel SAS",
  plan: "Growth",
  sector: "BTP / Construction",
  generatedAt: "20/05/2026",
};

export const KPIS = {
  solde: 87420,
  soldeChange: 12300,
  runwayMonths: 8.4,
  santeScore: 72,
  creancesEnRetard: 21300,
  creancesTotal: 72000,
  previsionJ30: 62100,
  previsionDelta: -25320,
  dsoMoyen: 38,
  dsoSecteur: 72,
  margeNette: 20,
  margeDelta: 2,
};

export const SANTE_BREAKDOWN = [
  { label: "Liquidité",   score: 85, color: "#2A5240" },
  { label: "Recouvrement", score: 62, color: "#B8935A" },
  { label: "Rentabilité",  score: 78, color: "#2A5240" },
  { label: "Stabilité",    score: 65, color: "#B8935A" },
];

/* 6 mois — encaissements / décaissements */
export const CASHFLOW_6M = [
  { label: "Sep", in: 118, out: 122 },
  { label: "Oct", in: 126, out: 119 },
  { label: "Nov", in: 122, out: 125 },
  { label: "Déc", in: 138, out: 132 },
  { label: "Jan", in: 134, out: 138 },
  { label: "Fév", in: 147, out: 153 },
];

/* Prévision 90 jours — courbe (axe : Auj, J+7, J+15, J+30, J+60, J+90) */
export const FORECAST_90D = {
  realiste:   [87, 56, 28, 41, 72, 105],
  optimiste:  [87, 70, 52, 68, 96, 124],
  pessimiste: [87, 42, 12, 18, 38, 64],
};

/* Répartition des charges */
export const CHARGES = [
  { label: "Salaires",       value: 66, color: "#2A5240" },
  { label: "Fournisseurs",   value: 28, color: "#3D6B54" },
  { label: "Sous-traitance", value: 18, color: "#5A4326" },
  { label: "Loyer & charges", value: 15, color: "#8A9E97" },
  { label: "Assurances",     value: 6,  color: "#B8935A" },
  { label: "Autres",         value: 19, color: "#D4B98A" },
];

/* Créances clients (utilisé par Accueil, Analyses, Créances) */
export type Creance = {
  client: string;
  facture: string;
  montant: number;
  echeance: string;
  retard: number; // jours
  statut: "URGENT" | "RETARD" | "OK" | "PAYEE";
};

export const CREANCES: Creance[] = [
  { client: "Durand & Fils BTP",       facture: "F2024-087", montant: 12400, echeance: "15/01", retard: 47, statut: "URGENT" },
  { client: "Constructions Martin",    facture: "F2024-091", montant: 8900,  echeance: "28/01", retard: 31, statut: "RETARD" },
  { client: "Groupe Leroux SA",        facture: "F2024-102", montant: 13000, echeance: "08/03", retard: 0,  statut: "OK" },
  { client: "SAS Transports du Sud",   facture: "F2024-105", montant: 7500,  echeance: "12/03", retard: 0,  statut: "OK" },
  { client: "Bâtiments Lafarge",       facture: "F2024-108", montant: 19200, echeance: "20/03", retard: 0,  statut: "OK" },
  { client: "SARL Electricité Pro",    facture: "F2024-112", montant: 4800,  echeance: "25/03", retard: 0,  statut: "OK" },
  { client: "Plâtres & Cie",           facture: "F2024-098", montant: 6300,  echeance: "10/02", retard: 0,  statut: "PAYEE" },
  { client: "Maçonnerie Auvergne",     facture: "F2024-101", montant: 11200, echeance: "18/02", retard: 0,  statut: "PAYEE" },
  { client: "Toiture & Sécurité SARL", facture: "F2024-104", montant: 5400,  echeance: "01/03", retard: 0,  statut: "PAYEE" },
];

export const MOUVEMENTS = [
  { date: "14/03", label: "Encaissement Leroux SA",     amount: 13000 },
  { date: "13/03", label: "Facture MétalPro",           amount: -3111 },
  { date: "12/03", label: "Prélèvement Brevo",          amount: -89 },
  { date: "09/03", label: "Assurance RC Pro",           amount: -640 },
  { date: "08/03", label: "Encaissement Dubois",        amount: 4800 },
  { date: "07/03", label: "Salaires Février",           amount: -42300 },
  { date: "05/03", label: "TVA T4",                     amount: -18920 },
];

export const ALERTES = [
  {
    title: "Creux prévu le 15/03 — TVA + salaires : −70 200 €",
    detail: "Solde projeté −31 200 € · Découvert insuffisant (20 K€)",
    severity: "critical" as const,
  },
  {
    title: "Durand & Fils — 47 jours de retard",
    detail: "12 400 € non encaissés · Relance n°3 recommandée",
    severity: "warning" as const,
  },
  {
    title: "Constructions Martin — 31 jours de retard",
    detail: "8 900 € non encaissés · Relance courtoise suggérée",
    severity: "warning" as const,
  },
  {
    title: "Sync bancaire active",
    detail: "BNP Pro + Qonto · 142 transactions · Dernière sync il y a 2h",
    severity: "info" as const,
  },
];

export const RELANCES_PENDING = [
  {
    client: "Durand & Fils BTP",
    facture: "F2024-087",
    montant: 12400,
    retard: 47,
    type: "Relance 3 — Mise en demeure",
    typeColor: "#C0392B",
    contact: "M. Durand",
    email: "Objet : Mise en demeure — Facture F2024-087\n\nMonsieur Durand,\n\nMalgré nos relances des 12/02 et 05/03, nous constatons que la facture F2024-087 d'un montant de 12 400 € HT, échue depuis le 15/01/2026, demeure impayée.\n\nNous vous mettons en demeure de régler cette somme sous 8 jours à compter de la réception du présent courrier, à défaut de quoi nous nous verrons contraints d'engager une procédure de recouvrement contentieux.\n\nNous restons à votre disposition pour convenir d'un échéancier.\n\nCordialement,\nService comptabilité — Bâtiments Morel SAS",
  },
  {
    client: "Constructions Martin",
    facture: "F2024-091",
    montant: 8900,
    retard: 31,
    type: "Relance 1 — Courtoise",
    typeColor: "#B8935A",
    contact: "Mme Martin",
    email: "Objet : Rappel — Facture F2024-091\n\nBonjour Mme Martin,\n\nSauf erreur de notre part, la facture F2024-091 du 28/12/2025 d'un montant de 8 900 € HT semble être restée impayée à ce jour.\n\nPeut-être s'agit-il d'un simple oubli. Pourriez-vous vérifier de votre côté et nous confirmer la date de règlement ?\n\nN'hésitez pas à nous contacter si vous avez la moindre question.\n\nBien cordialement,\nService comptabilité — Bâtiments Morel SAS",
  },
];

export const RELANCES_HISTORY = [
  { client: "SARL Dubois",          montant: 4800,  status: "PAYÉE",    delay: "3j après relance 1", date: "08/03" },
  { client: "Maçonnerie Auvergne",  montant: 11200, status: "PAYÉE",    delay: "5j après relance 2", date: "26/02" },
  { client: "Plâtres & Cie",        montant: 6300,  status: "PAYÉE",    delay: "12j après relance 1", date: "22/02" },
  { client: "Toiture & Sécurité",   montant: 5400,  status: "PAYÉE",    delay: "2j après relance 1", date: "10/02" },
];

export const RELANCES_STATS = {
  pending: 2,
  recovered: 50300,
  successRate: 75,
};

export const INTEGRATIONS = [
  { id: "pennylane", name: "Pennylane", tag: "RECOMMANDÉ", desc: "Comptabilité moderne pour PME françaises", connected: true,  invoices: 1247, color: "#7B5BFF" },
  { id: "sage",      name: "Sage",      tag: "POPULAIRE",  desc: "ERP comptable historique",                connected: false, invoices: 0,   color: "#2D7A4F" },
  { id: "cegid",     name: "Cegid",     tag: null,         desc: "Suite comptable enterprise",              connected: false, invoices: 0,   color: "#C0392B" },
  { id: "quickbooks", name: "QuickBooks", tag: null,       desc: "Comptabilité internationale",             connected: false, invoices: 0,   color: "#2D7A4F" },
];

export const BANK_ACCOUNTS = [
  { name: "BNP Pro",       balance: 62300, type: "Compte courant" },
  { name: "Qonto",          balance: 18750, type: "Compte secondaire" },
  { name: "Livret Pro",     balance: 6370,  type: "Épargne" },
];

export const SUGGESTED_QUESTIONS = [
  "Briefing du jour",
  "Les salaires passent vendredi ?",
  "Puis-je embaucher un commercial ?",
  "Acheter une voiture en société ?",
  "Mon DSO vs secteur ?",
  "Rédiger relance Durand",
  "Anomalie détectée ?",
  "Analyser mes abonnements",
];

export const RECENT_INVOICES = [
  { client: "Durand & Fils",       date: "12/03", montant: 12400, status: "EN RETARD",  color: "#C0392B" },
  { client: "Constructions Martin", date: "14/03", montant: 8900,  status: "EN ATTENTE", color: "#B8935A" },
  { client: "BTP Léger",            date: "15/03", montant: 23150, status: "PAYÉE",     color: "#2D7A4F" },
];

/* ── Briefing du jour ── */
export const BRIEFING = {
  date: "15 mars 2026 · 07:30",
  blocks: [
    { label: "SOLDE",    value: "87 420 €",  sub: "↗ +12 300 €" },
    { label: "RUNWAY",   value: "8.4 mois",   sub: "stable" },
    { label: "CRÉANCES", value: "36 600 €",   sub: "2 en retard" },
  ],
  movements: [
    { label: "Encaissement Leroux SA",         amount: 13000 },
    { label: "Prélèvement assurance flotte",   amount: -1240 },
    { label: "Achat fournitures MétalPro",     amount: -3111 },
  ],
};
