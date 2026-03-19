Contexte du Projet
Je développe le dashboard administratif "EKOLO Admin" pour la gestion environnementale urbaine en Afrique. C'est la plateforme de commande municipale qui permet aux autorités de gérer les signalements environnementaux en temps réel.

Design System
Style : Glassmorphism premium avec interface dark Palette de couleurs :

Background principal : #050e08 (dark green)
Accent principal : #1FAF5A (vert EKOLO)
Glassmorphism : rgba(255,255,255,0.03) avec backdrop-filter: blur(10px)
Borders : rgba(255,255,255,0.07)
Texte : Blanc avec opacité variable (white/50, white/45, etc.)
Typographie : Utiliser les tokens définis dans le theme.css, font-weight 700-800 pour les titres

Images : Utiliser Unsplash avec des contextes africains authentiques (villes africaines modernes, technologie, environnement)

Fonctionnalités Essentielles du Dashboard
1. Page d'accueil / Vue d'ensemble
Statistiques en temps réel (nombre de signalements actifs, résolus, en cours)
Carte interactive avec marqueurs de signalements géolocalisés
Graphiques et tendances (types de déchets, zones problématiques)
Alertes prioritaires
2. Gestion des signalements
Liste complète avec filtres (statut, type de déchet, date, zone, fiabilité)
Vue détaillée de chaque signalement avec :
Photo/vidéo du citoyen
Géolocalisation exacte
Type de déchet (identifié par IA)
Score de fiabilité IA (0-100%)
Informations du signaleur
Historique et actions
Actions : Assigner à une équipe, changer le statut, ajouter des notes
3. Analyse IA
Dashboard dédié à l'intelligence artificielle
Précision de classification des types de déchets
Évaluation de fiabilité des signalements (scoring IA)
Patterns et prédictions (zones à risque, périodes critiques)
Métriques de performance de l'IA
4. Gestion des équipes terrain
Liste des équipes et leurs membres
Statut en temps réel (disponible, en mission, hors service)
Attribution automatisée/manuelle des missions
Suivi GPS des équipes
Performance et statistiques par équipe
5. Système multilingue
Sélecteur de langue avec support de toutes les langues locales africaines
Interface adaptable (français, anglais, langues locales)
6. Rapports et analytics
Génération de rapports personnalisés
Export de données (CSV, PDF)
Statistiques avancées et KPIs
Visualisations de données (recharts)
7. Paramètres et configuration
Gestion des utilisateurs administratifs
Configuration des zones géographiques
Paramètres de l'IA
Notifications et alertes
Architecture Technique
Stack :

React avec TypeScript
React Router (Data Mode) pour la navigation multi-pages
Tailwind CSS v4
Motion (framer-motion) pour les animations
Recharts pour les graphiques
Lucide React pour les icônes
Structure suggérée :

/src/app/
  App.tsx (RouterProvider)
  routes.ts (configuration des routes)
  /pages/
    Dashboard.tsx (vue d'ensemble)
    Signalements.tsx (liste et gestion)
    AnalyseIA.tsx (dashboard IA)
    Equipes.tsx (gestion terrain)
    Rapports.tsx (analytics)
    Parametres.tsx (config)
  /components/
    /layout/
      Sidebar.tsx
      Header.tsx
      Layout.tsx
    /dashboard/
      StatsCard.tsx
      MapView.tsx
      RecentAlerts.tsx
    /charts/
      (différents types de graphiques)
Points Importants
❌ Éviter absolument :

Données fictives ou statistiques inventées
Mentions de partenaires existants
Informations non vérifiables
✅ Utiliser :

Données d'exemple clairement identifiées comme telles
Placeholders réalistes pour démo
Interfaces prêtes à connecter à une vraie API
Objectif
Créer un dashboard administratif ultra-complet, professionnel et élégant avec toutes les fonctionnalités listées ci-dessus, navigation fluide, animations subtiles, et design glassmorphism cohérent avec la landing page EKOLO principale.

Commençons par la structure de base avec React Router, le layout (sidebar + header), et la page Dashboard principale avec les statistiques clés et la carte interactive.