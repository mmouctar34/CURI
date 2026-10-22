/* ==========================================================================
   CURI — Scripts du site
   Centre Universitaire de Recherche et de Formation aux Technologies
   de l'Internet — Université Cheikh Anta Diop de Dakar

   JavaScript simple, sans bibliothèque, pour qu'un étudiant puisse le
   reprendre et le modifier.

   Sommaire
     1.  Index de recherche    — le seul endroit à modifier pour la recherche
     2.  Outils communs
     3.  En-tête collant
     4.  Menu mobile
     5.  Recherche dans l'en-tête
     6.  Diaporama d'accueil
     7.  Carrousels
     8.  Apparition au défilement
     9.  Accordéon
     10. Galerie et visionneuse
     11. Formulaire de contact
     12. Année du pied de page
     13. Chiffres qui défilent  (accueil)
     14. Vidéo de présentation  (accueil)
     15. Galerie défilante      (accueil)
     16. Onglets                (programme des formations)
     17. Aller exactement à l'endroit demandé (ancres, recherche)
   ========================================================================== */

(function () {
  "use strict";

  /* ========================================================================
     1. Index de recherche

     Pour ajouter une entrée : copier une ligne et modifier les champs.
       titre   — ce qui s'affiche en gras
       extrait — une phrase de description
       page    — le fichier vers lequel aller (avec une ancre si besoin)
       section — le nom affiché de la page
       mots    — mots-clés supplémentaires, séparés par des espaces
     ===================================================================== */

  var INDEX = [
    /* --- Formations ---------------------------------------------------- */
    {
      titre: "Nos formations",
      extrait: "Deux ans : un tronc commun, puis une spécialisation parmi trois filières.",
      page: "formation.html",
      section: "Formations",
      mots: "des filiere filière specialite spécialité cursus diplome diplôme etudier étudier etudes études formation"
    },
    {
      titre: "Les trois spécialités",
      extrait: "Développement web et mobile, technologie web et multimédia, e-commerce et marketing digital.",
      page: "formation.html#specialites",
      section: "Formations",
      mots: "specialites spécialités filieres filières choisir parcours"
    },
    {
      titre: "Développement web et mobile",
      extrait: "Android, frameworks mobiles, UX design, géolocalisation, jeux vidéo, projet de fin d'études.",
      page: "formation.html#developpement",
      section: "Formations",
      mots: "code coder programmation programmer application appli mobile android framework backend front javascript developpeur développeur dev web"
    },
    {
      titre: "Technologie web et multimédia",
      extrait: "Infographie, pages web, UX design et interactivité, jeux vidéo.",
      page: "formation.html#multimedia",
      section: "Formations",
      mots: "multimedia multimédia design graphisme graphiste infographie video vidéo audiovisuel creation création interface webdesign"
    },
    {
      titre: "E-commerce et marketing digital",
      extrait: "Stratégie éditoriale, vente en ligne, réseaux sociaux, référencement (SEO), CRM.",
      page: "formation.html#ecommerce",
      section: "Formations",
      mots: "ecommerce e-commerce commerce vente marketing digital numerique numérique reseaux réseaux sociaux publicite publicité seo boutique"
    },
    {
      titre: "Formation initiale, continue, certifiante",
      extrait: "Trois manières de se former au CURI selon votre situation.",
      page: "formation.html#types",
      section: "Formations",
      mots: "initiale continue certifiante certification professionnelle adulte salarie salarié reconversion travailleur"
    },
    {
      titre: "Le programme, semestre par semestre",
      extrait: "Toutes les unités d'enseignement et les matières, du semestre 1 au semestre 4.",
      page: "formation.html#programme",
      section: "Formations › Programme",
      mots: "programme maquette cours matieres matières modules ue unite unité enseignement semestre emploi du temps"
    },
    {
      titre: "1re année : le tronc commun",
      extrait: "Tous les étudiants suivent les mêmes cours en première année (semestres 1 et 2).",
      page: "formation.html#panneau-an1",
      section: "Formations › Programme",
      mots: "premiere première annee année tronc commun l1 debut début"
    },
    {
      titre: "Semestre 1",
      extrait: "Systèmes d'exploitation, bureautique, algorithmique, programmation, bases de données, droit, économie, anglais.",
      page: "formation.html#s1",
      section: "Formations › Programme › 1re année",
      mots: "s1 semestre1 environnement informatique systemes systèmes exploitation bureautique algorithme algorithmique algo programmation outils conception logiciel bases donnees données sql merise projet professionnel personnel droit economie économie techniques expression anglais communication"
    },
    {
      titre: "Semestre 2",
      extrait: "Cloud et réseaux sociaux, HTML/CSS, langage de script, infographie, programmation avancée, marketing, gestion de projet.",
      page: "formation.html#s2",
      section: "Formations › Programme › 1re année",
      mots: "s2 semestre2 bureautique cloud reseaux réseaux sociaux langages mise forme pages web statiques html css script javascript infographie traitement images photoshop dessin vectoriel illustrator programmation avancee avancée algorithme avance avancé management marketing fondamental communication entreprise gestion projet"
    },
    {
      titre: "2e année : les spécialisations",
      extrait: "Deux filières, un projet par semestre, puis le projet de fin d'études et le mémoire.",
      page: "formation.html#panneau-an2",
      section: "Formations › Programme",
      mots: "deuxieme deuxième annee année specialisation spécialisation filiere filière projet semestre fin etudes études pfe memoire mémoire soutenance jury"
    },
    {
      titre: "Semestre 3 · Développement web, mobile et multimédia",
      extrait: "Géolocalisation, UX design, développement Android et frameworks, jeux vidéo, création d'entreprise.",
      page: "formation.html#s3-dw",
      section: "Formations › Programme › 2e année",
      mots: "s3 semestre3 geolocalisation géolocalisation cartographie donnees données ux design programmation avancee avancée android frameworks mobile jeux video vidéo jeu creation création entreprise entrepreneuriat anglais developpement développement"
    },
    {
      titre: "Semestre 4 · Développement web, mobile et multimédia",
      extrait: "Programme en cours de mise à jour : contactez l'administration.",
      page: "formation.html#s4-dw",
      section: "Formations › Programme › 2e année",
      mots: "s4 semestre4 developpement développement web mobile multimedia multimédia"
    },
    {
      titre: "Semestre 3 · E-commerce et marketing digital",
      extrait: "Stratégie éditoriale, rédaction web, marché numérique, vente en ligne, médias sociaux et e-réputation.",
      page: "formation.html#s3-mk",
      section: "Formations › Programme › 2e année",
      mots: "s3 semestre3 strategie stratégie editoriale éditoriale redaction rédaction articles web marche marché numerique numérique vente ligne distribution merchandising reglementation réglementation statistiques medias médias sociaux reputation réputation omnicanalite omni-canalité cahier charges marketing ecommerce"
    },
    {
      titre: "Semestre 4 · E-commerce et marketing digital",
      extrait: "Référencement (SEO), stratégie digitale, CRM, force de vente, sécurité des paiements, propriété intellectuelle.",
      page: "formation.html#s4-mk",
      section: "Formations › Programme › 2e année",
      mots: "s4 semestre4 referencement référencement seo strategie stratégie digitale marketing programmatique management decision décision crm relation client force vente systeme système information securite sécurité donnees données paiements propriete propriété intellectuelle industrielle ecommerce"
    },
    {
      titre: "Les diplômes (DES)",
      extrait: "Diplômes d'Études Supérieures reconnus par l'UCAD : tronc commun, puis trois spécialités.",
      page: "formation.html#panneau-dipl",
      section: "Formations › Programme",
      mots: "diplome diplôme diplomes diplômes des etudes études superieures supérieures reconnu ucad internet management technologie web multimedia multimédia creation création applications ecommerce"
    },
    {
      titre: "Une année au CURI : comment ça se passe ?",
      extrait: "Cours et TP, encadrement, laboratoires, projets de semestre, vie sociale, projet de fin d'études.",
      page: "formation.html#vie-au-centre",
      section: "Formations",
      mots: "vie etudiante étudiante campus cours tp travaux pratiques encadrement suivi tutorat permanence laboratoire labo ordinateur salle informatique projet vie sociale clubs associations pfe memoire mémoire"
    },
    {
      titre: "Comment candidater",
      extrait: "Avoir le BAC (toutes séries), puis postuler sur CampuSen. Pas de concours.",
      page: "formation.html#candidater",
      section: "Formations › Candidater",
      mots: "admission admis inscription inscrire candidature candidater dossier postuler rejoindre entrer integrer intégrer orientation conditions bac baccalaureat baccalauréat series séries concours"
    },
    {
      titre: "CampuSen",
      extrait: "La plateforme nationale d'orientation par laquelle on postule au CURI après le BAC.",
      page: "formation.html#candidater",
      section: "Formations › Candidater",
      mots: "campusen campus sen orientation plateforme bachelier nouveau bachelier postuler"
    },
    {
      titre: "Faut-il savoir programmer avant d'entrer ?",
      extrait: "Non : le BAC suffit, la première année commence par les bases.",
      page: "formation.html#faq-1",
      section: "Formations › Questions fréquentes",
      mots: "faq question prerequis prérequis niveau debutant débutant programmer savoir connaissances"
    },
    {
      titre: "Les cours se tiennent-ils en présentiel ?",
      extrait: "Oui, sur le campus à UCAD 3, avec une plateforme en ligne pour les ressources.",
      page: "formation.html#faq-2",
      section: "Formations › Questions fréquentes",
      mots: "faq question presentiel présentiel distance en ligne hybride campus fad"
    },
    {
      titre: "Peut-on se former tout en travaillant ?",
      extrait: "Oui, grâce à la formation continue et aux formations certifiantes.",
      page: "formation.html#faq-3",
      section: "Formations › Questions fréquentes",
      mots: "faq question travailler travail emploi salarie salarié continue certifiante soir"
    },
    {
      titre: "Combien coûte la formation ?",
      extrait: "Les frais de scolarité sont à confirmer auprès de la direction.",
      page: "formation.html#faq-4",
      section: "Formations › Questions fréquentes",
      mots: "faq question prix cout coût frais scolarite scolarité inscription payer argent tarif"
    },

    /* --- Accueil -------------------------------------------------------- */
    {
      titre: "Le CURI en vidéo",
      extrait: "Présentation du centre : une institution au service du numérique africain.",
      page: "index.html#a-propos",
      section: "Accueil › À propos",
      mots: "video vidéo youtube presentation présentation decouvrir découvrir a propos à propos mission recherche partenariats"
    },
    {
      titre: "Le CURI en chiffres",
      extrait: "100+ étudiants par an, 20+ enseignants, 2 000+ diplômés, 2 ans de formation.",
      page: "index.html#chiffres",
      section: "Accueil",
      mots: "chiffres statistiques combien nombre etudiants étudiants enseignants diplomes diplômés duree durée ans selectif sélectif"
    },
    {
      titre: "NIC Sénégal et le domaine .sn",
      extrait: "La gestion du domaine national .sn est confiée à l'UCAD depuis 1993.",
      page: "index.html#missions",
      section: "Accueil",
      mots: "nic registre domaine sn dns dnssec internet gouvernance nom de domaine"
    },
    {
      titre: "Nos partenaires",
      extrait: "NIC Sénégal, ICANN, AFNIC et AFTLD.",
      page: "index.html#partenaires",
      section: "Accueil",
      mots: "partenaire partenaires nic icann afnic aftld organisations"
    },
    {
      titre: "Ce que disent nos étudiants",
      extrait: "Les témoignages de Ruqqaya Faye, Fatou Dior et Ousmane Sane.",
      page: "index.html#temoignages",
      section: "Accueil",
      mots: "temoignage témoignage temoignages témoignages avis anciens alumni diplomes diplômés ruqqaya faye fatou dior ousmane sane"
    },
    {
      titre: "La vie sur le campus en images",
      extrait: "Photos des ateliers, conférences et promotions du centre.",
      page: "evenements.html#galerie",
      section: "Événements › Galerie",
      mots: "photo photos image images galerie album campus"
    },

    /* --- Débouchés ------------------------------------------------------ */
    {
      titre: "Débouchés après le CURI",
      extrait: "Métiers visés, secteurs qui recrutent, poursuite d'études et insertion.",
      page: "debouches.html",
      section: "Débouchés",
      mots: "debouches débouchés metier métier emploi travail carriere carrière embauche avenir apres après"
    },
    {
      titre: "Les métiers accessibles",
      extrait: "Développeur web, développeur mobile, designer UX/UI, marketing digital, e-commerce, entrepreneur.",
      page: "debouches.html#metiers",
      section: "Débouchés",
      mots: "metiers métiers emploi poste profession"
    },
    {
      titre: "Développeur web full-stack",
      extrait: "Conception et développement d'applications web complètes.",
      page: "debouches.html#metier-developpeur-web-full-stack",
      section: "Débouchés › Métiers",
      mots: "developpeur développeur web fullstack full stack front back"
    },
    {
      titre: "Développeur mobile",
      extrait: "Applications Android et multiplateformes.",
      page: "debouches.html#metier-developpeur-mobile",
      section: "Débouchés › Métiers",
      mots: "developpeur développeur mobile android application appli"
    },
    {
      titre: "Designer UX/UI",
      extrait: "Création d'interfaces intuitives et d'expériences utilisateur.",
      page: "debouches.html#metier-designer-ux-ui",
      section: "Débouchés › Métiers",
      mots: "designer design ux ui interface experience expérience utilisateur"
    },
    {
      titre: "Responsable marketing digital",
      extrait: "Stratégies de communication et de vente en ligne.",
      page: "debouches.html#metier-responsable-marketing-digital",
      section: "Débouchés › Métiers",
      mots: "responsable marketing digital community manager communication"
    },
    {
      titre: "Chef de projet e-commerce",
      extrait: "Gestion de boutiques en ligne et de l'activité commerciale sur internet.",
      page: "debouches.html#metier-chef-de-projet-e-commerce",
      section: "Débouchés › Métiers",
      mots: "chef projet ecommerce e-commerce boutique en ligne"
    },
    {
      titre: "Entrepreneur numérique",
      extrait: "Créer sa propre jeune entreprise dans les technologies de l'internet.",
      page: "debouches.html#metier-entrepreneur-numerique",
      section: "Débouchés › Métiers",
      mots: "entrepreneur entreprise startup creer créer creation création"
    },
    {
      titre: "Secteurs qui recrutent",
      extrait: "Entreprises tech, banque, e-commerce, santé, éducation, énergie, ONG, agences.",
      page: "debouches.html#secteurs",
      section: "Débouchés",
      mots: "secteur secteurs recrutent recrutement banque finance sante santé education éducation energie énergie ong institutions agences"
    },
    {
      titre: "Poursuite d'études",
      extrait: "Licence, master, MBA ou certification, sur recommandation du CURI.",
      page: "debouches.html#opportunites",
      section: "Débouchés › Opportunités",
      mots: "poursuite etudes études continuer licence master mba certification universite université partenaire recommandation"
    },
    {
      titre: "Stages",
      extrait: "Non obligatoires : le CURI peut recommander l'étudiant à une entreprise partenaire.",
      page: "debouches.html#opportunites",
      section: "Débouchés › Opportunités",
      mots: "stage stages stagiaire entreprise recommandation obligatoire experience expérience"
    },
    {
      titre: "Insertion professionnelle",
      extrait: "Un accompagnement vers l'emploi, hautement sélectif.",
      page: "debouches.html#opportunites",
      section: "Débouchés › Opportunités",
      mots: "insertion emploi travail embauche reseau réseau alumni anciens accompagnement"
    },

    /* --- Équipe --------------------------------------------------------- */
    {
      titre: "L'équipe du CURI",
      extrait: "Administration et enseignants du centre.",
      page: "equipe.html",
      section: "Équipe",
      mots: "equipe équipe enseignant enseignants professeur prof personnel encadrement staff"
    },
    {
      titre: "Pourquoi le centre existe",
      extrait: "Créé en février 2021 pour renforcer le capital humain du numérique au Sénégal.",
      page: "equipe.html#mission",
      section: "Équipe",
      mots: "histoire creation création cree créé fevrier février 2021 raison etre être mission"
    },
    {
      titre: "Les trois missions du centre",
      extrait: "Formations diplômantes et certifiantes, recherche et innovation, gestion du .sn.",
      page: "equipe.html#poles",
      section: "Équipe",
      mots: "missions poles pôles recherche innovation formation service communaute communauté sn"
    },
    {
      titre: "L'équipe administrative",
      extrait: "Direction, département, études et scolarité.",
      page: "equipe.html#administration",
      section: "Équipe",
      mots: "administration administratif direction bureau secretariat secrétariat"
    },
    {
      titre: "Pr Idrissa Sarr",
      extrait: "Directeur du CURI.",
      page: "equipe.html#membre-idrissa-sarr",
      section: "Équipe › Administration",
      mots: "directeur direction idrissa sarr afretec chef"
    },
    {
      titre: "M. Diandy",
      extrait: "Chef de département, gestion du CURI.",
      page: "equipe.html#membre-diandy",
      section: "Équipe › Administration",
      mots: "diandy chef departement département gestion"
    },
    {
      titre: "Mme Mareme Aidara",
      extrait: "Chargée d'études : suivi pédagogique et stages.",
      page: "equipe.html#membre-mareme-aidara",
      section: "Équipe › Administration",
      mots: "mareme marème aidara aïdara chargee chargée etudes études suivi pedagogique pédagogique stages"
    },
    {
      titre: "M. Kebe",
      extrait: "Scolarité : inscriptions et dossiers étudiants.",
      page: "equipe.html#membre-kebe",
      section: "Équipe › Administration",
      mots: "kebe kébé scolarite scolarité inscriptions dossiers etudiants étudiants"
    },
    {
      titre: "Enseignants et intervenants",
      extrait: "Les enseignants du centre et leurs matières.",
      page: "equipe.html#enseignants",
      section: "Équipe",
      mots: "enseignants intervenants professeurs profs corps enseignant cours matieres matières"
    },
    { titre: "M. Thiam", extrait: "Algorithmes et structures de données.", page: "equipe.html#membre-thiam", section: "Équipe › Enseignants", mots: "thiam algorithme algorithmique algo structures donnees données" },
    { titre: "Mme K. T. Dansokho", extrait: "Outils de développement logiciel.", page: "equipe.html#membre-k-t-dansokho", section: "Équipe › Enseignants", mots: "dansokho outils developpement développement logiciel conception bases donnees données" },
    { titre: "M. Alex Corentin", extrait: "Systèmes d'exploitation et réseaux.", page: "equipe.html#membre-alex-corentin", section: "Équipe › Enseignants", mots: "corentin corenthin alex systemes systèmes exploitation reseaux réseaux linux" },
    { titre: "M. Moctar Diop", extrait: "Communication d'entreprise.", page: "equipe.html#membre-moctar-diop", section: "Équipe › Enseignants", mots: "moctar mactar diop communication entreprise" },
    { titre: "M. Bassirou Kasse", extrait: "Langages de mise en forme (HTML, CSS, JavaScript).", page: "equipe.html#membre-bassirou-kasse", section: "Équipe › Enseignants", mots: "bassirou kasse kassé langages mise forme html css javascript web" },
    { titre: "M. Diouf", extrait: "Anglais.", page: "equipe.html#membre-diouf", section: "Équipe › Enseignants", mots: "diouf anglais english langue" },
    { titre: "Mme Ndoye", extrait: "Gestion de projets.", page: "equipe.html#membre-ndoye", section: "Équipe › Enseignants", mots: "ndoye gestion projets projet" },
    { titre: "M. Lo", extrait: "Traitement d'images.", page: "equipe.html#membre-lo", section: "Équipe › Enseignants", mots: "lo traitement images infographie photoshop dessin vectoriel" },
    { titre: "M. Diasse", extrait: "Bases de données.", page: "equipe.html#membre-diasse", section: "Équipe › Enseignants", mots: "diasse diassy bases donnees données sql programmation" },
    { titre: "M. Ndiaye", extrait: "Marketing.", page: "equipe.html#membre-ndiaye", section: "Équipe › Enseignants", mots: "ndiaye marketing" },
    { titre: "M. Niane", extrait: "Réseaux sociaux.", page: "equipe.html#membre-niane", section: "Équipe › Enseignants", mots: "niane reseaux réseaux sociaux cloud" },
    { titre: "M. Dia", extrait: "Bureautique.", page: "equipe.html#membre-dia", section: "Équipe › Enseignants", mots: "dia bureautique word excel" },

    /* --- Événements ----------------------------------------------------- */
    {
      titre: "Événements et actualités",
      extrait: "Ateliers, hackathons, conférences et formations du centre.",
      page: "evenements.html#liste",
      section: "Événements",
      mots: "evenement événement evenements événements actualite actualité actualites actualités news hackathon atelier conference conférence"
    },
    {
      titre: "Portes ouvertes sur les technologies immersives",
      extrait: "Juin 2025 — des lycéens de Dakar en immersion dans la réalité virtuelle au centre.",
      page: "evenement-colab-2025.html",
      section: "Événements",
      mots: "colab portes ouvertes jpo lycee lycée lyceens lycéens realite réalité virtuelle vr casque afretec asedu mariama ba keur rokhaya 2025"
    },
    {
      titre: "Formation au leadership et à la communication",
      extrait: "Avril 2025 — vingt doctorants de l'EDMI formés au leadership et à l'entrepreneuriat.",
      page: "evenement-leadership-2025.html",
      section: "Événements",
      mots: "leadership communication doctorant doctorants edmi afretec idrissa sarr nalla mbaye lamine sane attestation entrepreneuriat cohorte 2025"
    },
    {
      titre: "Lancement du laboratoire des technologies immersives",
      extrait: "Septembre 2024 — le centre ouvre son laboratoire de réalité étendue avec Imisi3D.",
      page: "evenement-laboratoire-2024.html",
      section: "Événements",
      mots: "laboratoire labo ar vr arvr immersif immersive realite réalité etendue étendue virtuelle augmentee augmentée casque imisi3d nigeria 2024"
    },
    {
      titre: "Atelier SenAgro",
      extrait: "Avril 2024 — intelligence artificielle et science des données au service de l'agriculture.",
      page: "evenement-senagro-2024.html",
      section: "Événements",
      mots: "senagro agriculture intelligence artificielle ia donnees données sorbonne cnrs mil phosphore opensimroot these thèse 2024"
    },
    {
      titre: "Formation hybride DNS et DNSSEC",
      extrait: "Novembre 2022 — conférence publique puis atelier avec NIC Sénégal, l'ICANN, l'AFNIC et l'AFTLD.",
      page: "evenement-dnssec-2022.html",
      section: "Événements",
      mots: "dns dnssec atelier hybride icann afnic aftld nic senegal sénégal domaine securite sécurité 2022"
    },
    {
      titre: "Hackathon du Parc de Technologies Numériques",
      extrait: "Novembre 2021 — un week-end de travail collaboratif organisé par le CURI avec le PTN et Wutiko.",
      page: "evenement-hackathon-2021.html",
      section: "Événements",
      mots: "hackathon ptn wutiko parc technologies numeriques numériques pitch concours bad 2021 novembre"
    },

    /* --- Contact -------------------------------------------------------- */
    {
      titre: "Écrire au centre",
      extrait: "Le formulaire de contact pour poser vos questions.",
      page: "contact.html#formulaire-contact",
      section: "Contact",
      mots: "contact contacter ecrire écrire message formulaire question joindre"
    },
    {
      titre: "Téléphone et e-mail",
      extrait: "+221 33 821 91 90 · curi@ucad.edu.sn",
      page: "contact.html#coordonnees",
      section: "Contact",
      mots: "telephone téléphone tel appeler numero numéro email e-mail mail courriel adresse coordonnees coordonnées"
    },
    {
      titre: "Horaires d'accueil",
      extrait: "Du lundi au vendredi de 8 h à 17 h, le samedi de 8 h à 12 h.",
      page: "contact.html#horaires",
      section: "Contact",
      mots: "horaire horaires heure heures ouvert ouverture ferme fermé accueil quand samedi lundi vendredi"
    },
    {
      titre: "Où se trouve le CURI",
      extrait: "UCAD 3, Cité Claudel, allées Bougainvillées, Dakar.",
      page: "contact.html#acces",
      section: "Contact",
      mots: "adresse localisation lieu ou où situe situé trouver claudel bougainvillees bougainvillées dakar ucad3 ucad acces accès plan carte venir itineraire itinéraire"
    },
    {
      titre: "Plateforme de cours (FAD)",
      extrait: "Les cours, ressources et résultats des étudiants du centre.",
      page: "https://fad.curi.ucad.sn",
      section: "Lien externe",
      mots: "fad moodle cours en ligne distance ressources notes resultats résultats plateforme connexion"
    }
  ];

  /* ========================================================================
     2. Outils communs
     ===================================================================== */

  function $(selecteur, racine) {
    return (racine || document).querySelector(selecteur);
  }

  function $$(selecteur, racine) {
    return Array.prototype.slice.call(
      (racine || document).querySelectorAll(selecteur)
    );
  }

  /** Retire les accents et la casse pour comparer des mots. */
  function normaliser(texte) {
    return texte
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  /** Protège une chaîne avant insertion en HTML. */
  function echapper(texte) {
    var div = document.createElement("div");
    div.textContent = texte;
    return div.innerHTML;
  }

  var mouvementReduit = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ========================================================================
     3. En-tête collant
     ===================================================================== */

  var entete = $(".entete");

  if (entete) {
    var majEntete = function () {
      entete.classList.toggle("est-collee", window.scrollY > 8);
    };
    majEntete();
    window.addEventListener("scroll", majEntete, { passive: true });
  }

  /* ========================================================================
     4. Menu mobile
     ===================================================================== */

  var bascule = $(".bascule-menu");
  var tiroir = $(".tiroir");

  function fermerMenu() {
    if (!bascule || !tiroir) return;
    bascule.setAttribute("aria-expanded", "false");
    bascule.setAttribute("aria-label", "Ouvrir le menu");
    tiroir.classList.remove("est-ouvert");
    document.body.classList.remove("sans-defilement");
  }

  if (bascule && tiroir) {
    bascule.addEventListener("click", function () {
      if (bascule.getAttribute("aria-expanded") === "true") {
        fermerMenu();
        return;
      }
      bascule.setAttribute("aria-expanded", "true");
      bascule.setAttribute("aria-label", "Fermer le menu");
      tiroir.classList.add("est-ouvert");
      document.body.classList.add("sans-defilement");
    });

    $$("a", tiroir).forEach(function (lien) {
      lien.addEventListener("click", fermerMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) fermerMenu();
    });
  }

  /* ========================================================================
     5. Recherche fondue dans l'en-tête
     ===================================================================== */

  // Petits mots ignorés : « comment candidater au curi » cherche « candidater »
  var MOTS_VIDES = (
    "a au aux avec ce ces comment dans de des du elle en est et il je la le les " +
    "leur ma mes mon ne ou par pas pour quand que quel quelle quels qui sa se ses " +
    "son sur ta te tu un une vos votre y l d j c qu s t curi"
  ).split(" ");

  /** Découpe une recherche en termes utiles, sans accents. */
  function decouper(requete) {
    var termes = normaliser(requete)
      .replace(/[’'`.,;:!?()«»"\-\/]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
    var utiles = termes.filter(function (terme) {
      return MOTS_VIDES.indexOf(terme) === -1;
    });
    // Si l'élève n'a tapé que des petits mots (« le curi »), on les garde
    return utiles.length ? utiles : termes;
  }

  /** Forme sans pluriel : « formations » → « formation », « réseaux » → « reseau ». */
  function racine(terme) {
    if (terme.length > 4 && /aux$/.test(terme)) return terme.slice(0, -3) + "al";
    if (terme.length > 3 && /[sx]$/.test(terme)) return terme.slice(0, -1);
    return terme;
  }

  /** Vrai si a et b diffèrent d'une seule lettre (faute de frappe). */
  function presque(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    var i = 0;
    var j = 0;
    var ecarts = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) {
        i++;
        j++;
        continue;
      }
      if (++ecarts > 1) return false;
      if (a.length > b.length) i++;
      else if (b.length > a.length) j++;
      else {
        i++;
        j++;
      }
    }
    return ecarts + (a.length - i) + (b.length - j) <= 1;
  }

  /** Points gagnés par un terme dans un texte (0 s'il n'y est pas). */
  function pointsTerme(terme, texte, mots, valeurs) {
    var forme = racine(terme);
    if (texte.indexOf(terme) === 0) return valeurs[0];
    if (mots.some(function (mot) { return mot.indexOf(forme) === 0; })) return valeurs[1];
    if (forme.length > 2 && texte.indexOf(forme) > -1) return valeurs[2];
    // Faute de frappe : seulement pour des mots d'au moins 5 lettres
    if (terme.length >= 5 && mots.some(function (mot) { return presque(racine(mot), forme); })) {
      return valeurs[3];
    }
    return 0;
  }

  /** Score de pertinence d'une entrée, et nombre de termes trouvés. */
  function scorer(entree, termes) {
    var champs = [
      { texte: normaliser(entree.titre), valeurs: [12, 10, 7, 4] },
      { texte: normaliser(entree.mots || ""), valeurs: [6, 6, 4, 2] },
      { texte: normaliser(entree.section || ""), valeurs: [3, 3, 2, 1] },
      { texte: normaliser(entree.extrait), valeurs: [3, 3, 2, 1] }
    ];
    champs.forEach(function (champ) {
      champ.mots = champ.texte.split(/[^a-z0-9]+/).filter(Boolean);
    });

    var total = 0;
    var trouves = 0;
    termes.forEach(function (terme) {
      var meilleur = 0;
      champs.forEach(function (champ) {
        meilleur = Math.max(meilleur, pointsTerme(terme, champ.texte, champ.mots, champ.valeurs));
      });
      if (meilleur > 0) trouves++;
      total += meilleur;
    });
    return { score: total, trouves: trouves };
  }

  /**
   * Renvoie { resultats, approchant }. On montre d'abord les entrées qui
   * contiennent tous les termes ; s'il n'y en a aucune, les entrées qui en
   * contiennent le plus (« résultats approchants »).
   */
  function chercher(requete) {
    var termes = decouper(requete);
    if (!termes.length) return { resultats: [], approchant: false };

    var lignes = INDEX.map(function (entree) {
      var r = scorer(entree, termes);
      return { entree: entree, score: r.score, trouves: r.trouves };
    }).filter(function (ligne) {
      return ligne.trouves > 0;
    });

    var complets = lignes.filter(function (ligne) {
      return ligne.trouves === termes.length;
    });
    var approchant = complets.length === 0;
    var retenus = approchant ? lignes : complets;

    retenus.sort(function (a, b) {
      return b.trouves - a.trouves || b.score - a.score;
    });

    return {
      resultats: retenus.slice(0, 8).map(function (ligne) {
        return ligne.entree;
      }),
      approchant: approchant
    };
  }

  /** Met en évidence les termes trouvés, sans tenir compte des accents. */
  function surligner(texte, termes) {
    var sansAccent = normaliser(texte);
    if (sansAccent.length !== texte.length) return echapper(texte);

    var plages = [];
    termes.forEach(function (terme) {
      if (terme.length < 2) return;
      var depart = 0;
      var index;
      while ((index = sansAccent.indexOf(terme, depart)) !== -1) {
        plages.push([index, index + terme.length]);
        depart = index + terme.length;
      }
    });

    if (!plages.length) return echapper(texte);

    plages.sort(function (a, b) {
      return a[0] - b[0];
    });

    var fusion = [plages[0]];
    for (var i = 1; i < plages.length; i++) {
      var derniere = fusion[fusion.length - 1];
      if (plages[i][0] <= derniere[1]) {
        derniere[1] = Math.max(derniere[1], plages[i][1]);
      } else {
        fusion.push(plages[i]);
      }
    }

    var sortie = "";
    var position = 0;
    fusion.forEach(function (plage) {
      sortie +=
        echapper(texte.slice(position, plage[0])) +
        "<mark>" +
        echapper(texte.slice(plage[0], plage[1])) +
        "</mark>";
      position = plage[1];
    });
    return sortie + echapper(texte.slice(position));
  }

  var ICONE_RESULTAT =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';

  function installerRecherche(conteneur, champ, panneau) {
    if (!champ || !panneau) return;

    function fermerPanneau() {
      panneau.classList.remove("est-visible");
      champ.setAttribute("aria-expanded", "false");
    }

    function dessiner(requete) {
      var termes = decouper(requete).map(racine);
      var recherche = chercher(requete);
      var resultats = recherche.resultats;

      if (!requete.trim()) {
        fermerPanneau();
        panneau.innerHTML = "";
        return;
      }

      if (!resultats.length) {
        panneau.innerHTML =
          '<p class="recherche__vide">Aucun résultat pour <strong>' +
          echapper(requete) +
          "</strong>.<br>Essayez « inscription », « semestre 2 », « horaires » ou le nom d'un enseignant.</p>";
      } else {
        panneau.innerHTML = (recherche.approchant
          ? '<p class="recherche__approchant">Résultats approchants</p>'
          : "") + resultats
          .map(function (entree) {
            var externe = entree.page.indexOf("http") === 0;
            return (
              '<a class="recherche__resultat" href="' +
              echapper(entree.page) +
              '"' +
              (externe ? ' target="_blank" rel="noopener"' : "") +
              '><span class="recherche__icone">' +
              ICONE_RESULTAT +
              '</span><span><span class="recherche__titre">' +
              surligner(entree.titre, termes) +
              '</span><span class="recherche__extrait">' +
              echapper(entree.extrait) +
              '</span><span class="recherche__page">' +
              echapper(entree.section) +
              "</span></span></a>"
            );
          })
          .join("");
      }

      panneau.classList.add("est-visible");
      champ.setAttribute("aria-expanded", "true");
    }

    champ.addEventListener("input", function () {
      if (conteneur) {
        conteneur.classList.toggle("a-du-texte", champ.value.length > 0);
      }
      dessiner(champ.value);
    });

    champ.addEventListener("focus", function () {
      if (champ.value.trim()) dessiner(champ.value);
    });

    champ.addEventListener("keydown", function (evenement) {
      var liens = $$(".recherche__resultat", panneau);
      if (evenement.key === "ArrowDown" && liens.length) {
        evenement.preventDefault();
        liens[0].focus();
      } else if (evenement.key === "Escape") {
        fermerPanneau();
        champ.blur();
      } else if (evenement.key === "Enter" && liens.length) {
        evenement.preventDefault();
        liens[0].click();
      }
    });

    panneau.addEventListener("keydown", function (evenement) {
      var liens = $$(".recherche__resultat", panneau);
      var position = liens.indexOf(document.activeElement);
      if (evenement.key === "ArrowDown") {
        evenement.preventDefault();
        (liens[position + 1] || liens[0]).focus();
      } else if (evenement.key === "ArrowUp") {
        evenement.preventDefault();
        if (position <= 0) champ.focus();
        else liens[position - 1].focus();
      } else if (evenement.key === "Escape") {
        fermerPanneau();
        champ.focus();
      }
    });

    document.addEventListener("click", function (evenement) {
      var racine = conteneur || panneau.parentNode;
      if (racine && !racine.contains(evenement.target)) fermerPanneau();
    });

    var vider = conteneur ? $(".recherche__vider", conteneur) : null;
    if (vider) {
      vider.addEventListener("click", function () {
        champ.value = "";
        conteneur.classList.remove("a-du-texte");
        fermerPanneau();
        champ.focus();
      });
    }
  }

  installerRecherche(
    $(".recherche"),
    $(".recherche input"),
    $(".recherche__panneau")
  );

  installerRecherche(
    $(".tiroir__recherche"),
    $(".tiroir__recherche input"),
    $(".tiroir__panneau")
  );

  // Raccourci clavier « / » pour atteindre la recherche
  document.addEventListener("keydown", function (evenement) {
    if (evenement.key !== "/" || evenement.metaKey || evenement.ctrlKey) return;
    var actif = document.activeElement;
    var nom = actif ? actif.tagName : "";
    if (nom === "INPUT" || nom === "TEXTAREA") return;
    var champ = $(".recherche input");
    if (champ && champ.offsetParent !== null) {
      evenement.preventDefault();
      champ.focus();
    }
  });

  /* ========================================================================
     6. Diaporama d'accueil

     Pour ajouter une diapositive : copier un bloc .diapo__ecran dans
     index.html et ajouter un bouton dans .diapo__points. Le script
     s'occupe du reste.
     ===================================================================== */

  var diapo = $(".diapo");

  if (diapo) {
    var ecrans = $$(".diapo__ecran", diapo);
    var points = $$(".diapo__point", diapo);
    var texteDiapo = $(".diapo__contenu", diapo);
    var position = 0;
    var minuterie = null;
    var finVolet = null;
    // Doit correspondre à --duree-diapo dans css/style.css
    var DUREE = 7000;

    // Relance une animation CSS : on retire la classe, on force le
    // navigateur à recalculer, puis on la remet.
    var rejouer = function (element, classe) {
      if (!element) return;
      element.classList.remove(classe);
      void element.offsetWidth;
      element.classList.add(classe);
    };

    var montrer = function (index, premiereFois) {
      var ancienne = position;
      position = (index + ecrans.length) % ecrans.length;

      ecrans.forEach(function (ecran, i) {
        var active = i === position;
        ecran.classList.remove("est-precedente", "sans-volet");
        ecran.classList.toggle("est-active", active);
        ecran.setAttribute("aria-hidden", active ? "false" : "true");
        // Les liens des photos cachées ne doivent pas recevoir le focus
        if (active) ecran.removeAttribute("inert");
        else ecran.setAttribute("inert", "");
      });

      if (premiereFois || ancienne === position) {
        ecrans[position].classList.add("sans-volet");
      } else {
        // L'ancienne photo reste dessous le temps que le volet passe
        ecrans[ancienne].classList.add("est-precedente");
        window.clearTimeout(finVolet);
        finVolet = window.setTimeout(function () {
          ecrans[ancienne].classList.remove("est-precedente");
        }, 1200);
      }

      points.forEach(function (point, i) {
        point.setAttribute("aria-selected", i === position ? "true" : "false");
      });

      // Le texte d'accueil apparaît une seule fois, au chargement de la page,
      // puis reste fixe : seules les photos changent derrière lui.
      if (premiereFois && !mouvementReduit) rejouer(texteDiapo, "est-anime");
      if (minuterie) rejouer(diapo, "est-en-lecture");
    };

    var lancer = function () {
      if (mouvementReduit || ecrans.length < 2) return;
      arreter();
      minuterie = window.setInterval(function () {
        montrer(position + 1);
      }, DUREE);
      rejouer(diapo, "est-en-lecture");
    };

    var arreter = function () {
      if (minuterie) window.clearInterval(minuterie);
      minuterie = null;
      diapo.classList.remove("est-en-lecture");
    };

    points.forEach(function (point, i) {
      point.addEventListener("click", function () {
        montrer(i);
        lancer();
      });
    });

    var avant = $(".diapo__fleche--avant", diapo);
    var apres = $(".diapo__fleche--apres", diapo);

    if (avant) {
      avant.addEventListener("click", function () {
        montrer(position - 1);
        lancer();
      });
    }
    if (apres) {
      apres.addEventListener("click", function () {
        montrer(position + 1);
        lancer();
      });
    }

    // On met en pause quand la personne survole un élément cliquable
    // (boutons, carte « À la une », points, flèches) ou navigue au clavier.
    // Survoler simplement la photo ne l'arrête pas.
    $$(".diapo__actions, .diapo__une, .diapo__points, .diapo__fleche", diapo).forEach(
      function (zone) {
        zone.addEventListener("mouseenter", arreter);
        zone.addEventListener("mouseleave", lancer);
      }
    );
    diapo.addEventListener("focusin", arreter);
    diapo.addEventListener("focusout", lancer);

    // On met aussi en pause quand l'onglet n'est pas visible
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) arreter();
      else lancer();
    });

    montrer(0, true);
    lancer();
  }

  /* ========================================================================
     7. Carrousels
     ===================================================================== */

  $$(".carrousel").forEach(function (carrousel) {
    var piste = $(".carrousel__piste", carrousel);
    var precedent = $(".carrousel__bouton--precedent", carrousel);
    var suivant = $(".carrousel__bouton--suivant", carrousel);
    if (!piste) return;

    var pas = function () {
      var premier = piste.firstElementChild;
      if (!premier) return piste.clientWidth;
      return premier.getBoundingClientRect().width + 20;
    };

    if (precedent) {
      precedent.addEventListener("click", function () {
        piste.scrollBy({ left: -pas(), behavior: "smooth" });
      });
    }
    if (suivant) {
      suivant.addEventListener("click", function () {
        piste.scrollBy({ left: pas(), behavior: "smooth" });
      });
    }

    // Désactive les boutons aux extrémités
    var majBoutons = function () {
      var max = piste.scrollWidth - piste.clientWidth - 2;
      if (precedent) precedent.disabled = piste.scrollLeft <= 2;
      if (suivant) suivant.disabled = piste.scrollLeft >= max;
      if (precedent) precedent.style.opacity = precedent.disabled ? "0.4" : "1";
      if (suivant) suivant.style.opacity = suivant.disabled ? "0.4" : "1";
    };

    piste.addEventListener("scroll", majBoutons, { passive: true });
    window.addEventListener("resize", majBoutons);
    majBoutons();
  });

  /* ========================================================================
     8. Apparition au défilement
     ===================================================================== */

  var aAnimer = $$(".apparait");

  if (aAnimer.length) {
    if (mouvementReduit || !("IntersectionObserver" in window)) {
      aAnimer.forEach(function (element) {
        element.classList.add("est-visible");
      });
    } else {
      var observateur = new IntersectionObserver(
        function (entrees) {
          entrees.forEach(function (entree) {
            if (!entree.isIntersecting) return;
            entree.target.classList.add("est-visible");
            observateur.unobserve(entree.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      aAnimer.forEach(function (element) {
        observateur.observe(element);
      });
    }
  }

  /* ========================================================================
     9. Accordéon
     ===================================================================== */

  $$(".accordeon__bouton").forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      var ouvert = bouton.getAttribute("aria-expanded") === "true";
      var panneau = document.getElementById(
        bouton.getAttribute("aria-controls")
      );
      bouton.setAttribute("aria-expanded", ouvert ? "false" : "true");
      if (panneau) panneau.classList.toggle("est-ouvert", !ouvert);
    });
  });

  /* ========================================================================
     10. Galerie : filtres et visionneuse
     ===================================================================== */

  var galerie = $(".galerie");
  var visionneuse = $(".visionneuse");

  if (galerie) {
    $$(".filtre").forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        var categorie = bouton.getAttribute("data-filtre");

        $$(".filtre").forEach(function (autre) {
          autre.setAttribute("aria-pressed", String(autre === bouton));
        });

        $$(".galerie__element", galerie).forEach(function (element) {
          var sienne = element.getAttribute("data-categorie");
          element.hidden = categorie !== "tout" && sienne !== categorie;
        });
      });
    });
  }

  if (galerie && visionneuse) {
    var imageVue = $(".visionneuse img", visionneuse);
    var legendeVue = $(".visionneuse__legende", visionneuse);
    var positionVue = 0;
    var declencheur = null;

    var elementsVisibles = function () {
      return $$(".galerie__element", galerie).filter(function (element) {
        return !element.hidden;
      });
    };

    var afficher = function (index) {
      var liste = elementsVisibles();
      if (!liste.length) return;
      positionVue = (index + liste.length) % liste.length;
      var image = $("img", liste[positionVue]);
      if (!image) return;
      imageVue.src = image.getAttribute("data-grand") || image.src;
      imageVue.alt = image.alt;
      if (legendeVue) legendeVue.textContent = image.alt;
    };

    var ouvrirVisionneuse = function (index, source) {
      declencheur = source || null;
      afficher(index);
      visionneuse.classList.add("est-ouverte");
      visionneuse.removeAttribute("aria-hidden");
      document.body.classList.add("sans-defilement");
      var fermer = $(".visionneuse__fermer", visionneuse);
      if (fermer) fermer.focus();
    };

    var fermerVisionneuse = function () {
      visionneuse.classList.remove("est-ouverte");
      visionneuse.setAttribute("aria-hidden", "true");
      document.body.classList.remove("sans-defilement");
      if (declencheur) declencheur.focus();
    };

    $$(".galerie__element", galerie).forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        ouvrirVisionneuse(elementsVisibles().indexOf(bouton), bouton);
      });
    });

    var precedentV = $(".visionneuse__precedent", visionneuse);
    var suivantV = $(".visionneuse__suivant", visionneuse);
    var fermerBouton = $(".visionneuse__fermer", visionneuse);

    if (precedentV) {
      precedentV.addEventListener("click", function () {
        afficher(positionVue - 1);
      });
    }
    if (suivantV) {
      suivantV.addEventListener("click", function () {
        afficher(positionVue + 1);
      });
    }
    if (fermerBouton) {
      fermerBouton.addEventListener("click", fermerVisionneuse);
    }

    visionneuse.addEventListener("click", function (evenement) {
      if (evenement.target === visionneuse) fermerVisionneuse();
    });

    document.addEventListener("keydown", function (evenement) {
      if (!visionneuse.classList.contains("est-ouverte")) return;
      if (evenement.key === "Escape") fermerVisionneuse();
      if (evenement.key === "ArrowLeft") afficher(positionVue - 1);
      if (evenement.key === "ArrowRight") afficher(positionVue + 1);
    });
  }

  /* Fermer le menu mobile avec Échap */
  document.addEventListener("keydown", function (evenement) {
    if (evenement.key === "Escape") fermerMenu();
  });

  /* ========================================================================
     11. Formulaire de contact

     Le site est hébergé en pages statiques : il n'y a pas de serveur pour
     recevoir les messages. Le formulaire vérifie les champs puis ouvre le
     logiciel de messagerie avec le message pré-rempli. Pour un envoi
     direct, brancher ici un service d'envoi (Formspree, Web3Forms…).
     ===================================================================== */

  var formulaire = $("#formulaire-contact");

  if (formulaire) {
    var ADRESSE_DESTINATAIRE = "curi@ucad.edu.sn";

    var regles = {
      nom: function (valeur) {
        return valeur.trim() ? "" : "Indiquez votre nom.";
      },
      email: function (valeur) {
        if (!valeur.trim()) return "Indiquez votre adresse e-mail.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur.trim()))
          return "Cette adresse e-mail ne semble pas valide.";
        return "";
      },
      message: function (valeur) {
        if (!valeur.trim()) return "Écrivez votre message.";
        if (valeur.trim().length < 10) return "Votre message est un peu court.";
        return "";
      }
    };

    var verifierChamp = function (champ) {
      var regle = regles[champ.name];
      if (!regle) return true;
      var erreur = regle(champ.value);
      var zone = document.getElementById(champ.name + "-erreur");
      if (zone) zone.textContent = erreur;
      champ.setAttribute("aria-invalid", erreur ? "true" : "false");
      return !erreur;
    };

    $$("input, textarea", formulaire).forEach(function (champ) {
      champ.addEventListener("blur", function () {
        if (champ.value) verifierChamp(champ);
      });
      champ.addEventListener("input", function () {
        if (champ.getAttribute("aria-invalid") === "true") verifierChamp(champ);
      });
    });

    formulaire.addEventListener("submit", function (evenement) {
      evenement.preventDefault();

      var valide = true;
      var premierFautif = null;

      Object.keys(regles).forEach(function (nom) {
        var champ = formulaire.elements[nom];
        if (!champ) return;
        if (!verifierChamp(champ)) {
          valide = false;
          if (!premierFautif) premierFautif = champ;
        }
      });

      var etat = $("#formulaire-etat");

      if (!valide) {
        if (etat) {
          etat.hidden = false;
          etat.setAttribute("data-ton", "erreur");
          etat.textContent =
            "Le formulaire n'est pas complet. Corrigez les champs signalés.";
        }
        if (premierFautif) premierFautif.focus();
        return;
      }

      var sujetChamp = formulaire.elements.sujet;
      var sujet =
        sujetChamp && sujetChamp.value.trim()
          ? sujetChamp.value.trim()
          : "Message depuis le site du CURI";

      var corps =
        formulaire.elements.message.value.trim() +
        "\n\n— — —\n" +
        formulaire.elements.nom.value.trim() +
        "\n" +
        formulaire.elements.email.value.trim() +
        "\nMessage envoyé depuis le site du CURI.";

      if (etat) {
        etat.hidden = false;
        etat.setAttribute("data-ton", "info");
        etat.textContent =
          "Votre logiciel de messagerie va s'ouvrir avec le message prêt à envoyer. S'il ne s'ouvre pas, écrivez à " +
          ADRESSE_DESTINATAIRE +
          ".";
      }

      window.location.href =
        "mailto:" +
        ADRESSE_DESTINATAIRE +
        "?subject=" +
        encodeURIComponent(sujet) +
        "&body=" +
        encodeURIComponent(corps);
    });
  }

  /* ========================================================================
     12. Année du pied de page
     ===================================================================== */

  $$("[data-annee]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  /* ========================================================================
     13. Chiffres qui défilent
     Chaque <span data-cible="2000"> part de 0 et monte jusqu'à sa valeur
     quand il entre à l'écran. Le HTML contient déjà la valeur finale :
     sans JavaScript, ou si l'utilisateur a demandé moins d'animations,
     rien ne bouge et le bon nombre s'affiche.
     ===================================================================== */

  var compteurs = $$("[data-cible]");

  function formaterNombre(nombre) {
    // 2000 -> « 2 000 », à la française (espace fine insécable)
    return String(nombre).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function faireDefiler(compteur) {
    var cible = parseInt(compteur.getAttribute("data-cible"), 10);
    var duree = 1600;
    var depart = null;

    var etape = function (instant) {
      if (depart === null) depart = instant;
      var avancement = Math.min((instant - depart) / duree, 1);
      // Démarre vite et ralentit à l'arrivée
      var adouci = 1 - Math.pow(1 - avancement, 3);
      compteur.textContent = formaterNombre(Math.round(cible * adouci));
      if (avancement < 1) window.requestAnimationFrame(etape);
    };

    window.requestAnimationFrame(etape);
  }

  if (compteurs.length && !mouvementReduit && "IntersectionObserver" in window) {
    var observateurChiffres = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (entree) {
          if (!entree.isIntersecting) return;
          faireDefiler(entree.target);
          observateurChiffres.unobserve(entree.target);
        });
      },
      { threshold: 0.6 }
    );
    compteurs.forEach(function (compteur) {
      compteur.textContent = "0";
      observateurChiffres.observe(compteur);
    });
  }

  /* ========================================================================
     14. Vidéo de présentation
     Le lien .video mène à YouTube. Avec JavaScript, le clic remplace la
     miniature par le lecteur, sans quitter la page. youtube-nocookie.com
     évite de déposer des cookies tant que la vidéo n'est pas lancée.
     ===================================================================== */

  $$(".video[data-video]").forEach(function (lien) {
    lien.addEventListener("click", function (evenement) {
      evenement.preventDefault();
      var lecteur = document.createElement("iframe");
      lecteur.src =
        "https://www.youtube-nocookie.com/embed/" +
        encodeURIComponent(lien.getAttribute("data-video")) +
        "?autoplay=1&rel=0";
      lecteur.title = "Vidéo de présentation du CURI";
      lecteur.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      lecteur.allowFullscreen = true;

      var cadre = document.createElement("div");
      cadre.className = "video";
      cadre.appendChild(lecteur);
      lien.parentNode.replaceChild(cadre, lien);
      lecteur.focus();
    });
  });

  /* ========================================================================
     15. Galerie défilante (accueil)
     On recopie une fois les photos à la suite des originales pour que la
     bande boucle sans trou. Les copies sont cachées aux lecteurs d'écran et
     au clavier ; un clic sur une copie ouvre la photo d'origine dans la
     visionneuse.
     ===================================================================== */

  $$(".galerie--defilante").forEach(function (bande) {
    var piste = $(".galerie__piste", bande);
    if (!piste || mouvementReduit) return;

    var originaux = $$(".galerie__element", piste);
    originaux.forEach(function (original) {
      var copie = original.cloneNode(true);
      // Pas de classe galerie__element : la visionneuse ne doit compter
      // que les originaux quand on passe d'une photo à l'autre.
      copie.className = "galerie__copie";
      copie.setAttribute("aria-hidden", "true");
      copie.setAttribute("tabindex", "-1");
      copie.addEventListener("click", function () {
        original.click();
      });
      piste.appendChild(copie);
    });

    // Vitesse constante quel que soit le nombre de photos : environ 5 s par photo
    bande.style.setProperty("--duree-defilement", originaux.length * 5 + "s");
    bande.classList.add("est-animee");
  });

  /* ========================================================================
     16. Onglets (programme des formations)
     Un bloc [data-onglets] contient une liste de boutons role="tab", chacun
     relié à son panneau par aria-controls. Les blocs peuvent s'imbriquer
     (années, puis filières). Sans JavaScript, tous les panneaux restent
     visibles. Flèches gauche/droite pour passer d'un onglet à l'autre.
     ===================================================================== */

  $$("[data-onglets]").forEach(function (bloc) {
    var liste = $(".onglets__liste", bloc);
    if (!liste) return;
    // Seulement les onglets de CE bloc, pas ceux d'un bloc imbriqué
    var onglets = $$('[role="tab"]', liste);

    var choisir = function (onglet, donnerFocus) {
      onglets.forEach(function (autre) {
        var actif = autre === onglet;
        autre.setAttribute("aria-selected", actif ? "true" : "false");
        autre.setAttribute("tabindex", actif ? "0" : "-1");
        var panneau = document.getElementById(autre.getAttribute("aria-controls"));
        if (!panneau) return;
        panneau.hidden = !actif;
        if (actif && !mouvementReduit) {
          panneau.classList.remove("est-entree");
          void panneau.offsetWidth;
          panneau.classList.add("est-entree");
        }
      });
      if (donnerFocus) onglet.focus();
    };

    onglets.forEach(function (onglet, i) {
      onglet.addEventListener("click", function () {
        choisir(onglet, false);
      });
      onglet.addEventListener("keydown", function (evenement) {
        var cible = null;
        if (evenement.key === "ArrowRight") cible = onglets[(i + 1) % onglets.length];
        if (evenement.key === "ArrowLeft") cible = onglets[(i - 1 + onglets.length) % onglets.length];
        if (evenement.key === "Home") cible = onglets[0];
        if (evenement.key === "End") cible = onglets[onglets.length - 1];
        if (!cible) return;
        evenement.preventDefault();
        choisir(cible, true);
      });
    });

    var depart = onglets.filter(function (onglet) {
      return onglet.getAttribute("aria-selected") === "true";
    })[0] || onglets[0];
    choisir(depart, false);
  });

  /* ========================================================================
     17. Aller exactement à l'endroit demandé
     Quand on arrive sur une page avec une ancre (#s2, #faq-4, #membre-thiam…),
     par la recherche ou par un lien :
       - si la cible est dans un onglet fermé, on ouvre le bon onglet ;
       - si c'est une question fréquente, on la déplie ;
       - on fait défiler jusqu'à elle et on l'encadre brièvement en bleu.
     ===================================================================== */

  function allerA(id, instantane) {
    if (!id) return;
    var cible = document.getElementById(id);
    if (!cible) return;

    // 1. Ouvrir les onglets qui contiennent la cible, du plus extérieur au plus intérieur
    var panneaux = [];
    var noeud = cible;
    while (noeud && noeud !== document.body) {
      if (noeud.classList && noeud.classList.contains("onglets__panneau")) panneaux.unshift(noeud);
      noeud = noeud.parentNode;
    }
    panneaux.forEach(function (panneau) {
      var onglet = $('[role="tab"][aria-controls="' + panneau.id + '"]');
      if (onglet && onglet.getAttribute("aria-selected") !== "true") onglet.click();
    });

    // 2. Déplier une question fréquente
    var aEncadrer = cible;
    if (cible.classList.contains("accordeon__panneau")) {
      var bouton = $('[aria-controls="' + id + '"]');
      if (bouton && bouton.getAttribute("aria-expanded") !== "true") bouton.click();
      aEncadrer = cible.closest(".accordeon__element") || cible;
    }

    // 3. Montrer la section si elle attend encore son apparition au défilement
    var apparait = cible.closest(".apparait");
    if (apparait) apparait.classList.add("est-visible");
    $$(".apparait", cible).forEach(function (bloc) {
      bloc.classList.add("est-visible");
    });

    // 4. Défiler puis encadrer (petit délai : le temps que l'onglet ouvert
    //    ait pris sa place dans la page)
    window.setTimeout(function () {
      aEncadrer.scrollIntoView({
        behavior: instantane || mouvementReduit ? "instant" : "smooth",
        block: "start"
      });
      aEncadrer.classList.remove("est-cible");
      void aEncadrer.offsetWidth;
      aEncadrer.classList.add("est-cible");
      window.setTimeout(function () {
        aEncadrer.classList.remove("est-cible");
      }, 2400);
      garderCale(aEncadrer);
    }, 40);
  }

  /**
   * Pendant 2,5 s, si la page bouge sous nos pieds (police ou images qui
   * finissent de charger au-dessus), on recale la cible en haut de l'écran.
   * Dès que la personne fait défiler elle-même, on la laisse faire.
   */
  function garderCale(element) {
    if (!("ResizeObserver" in window)) return;
    var libre = false;
    var liberer = function () {
      libre = true;
    };
    ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (type) {
      window.addEventListener(type, liberer, { once: true, passive: true });
    });
    var premierAppel = true;
    var observateur = new ResizeObserver(function () {
      // Le premier appel arrive tout de suite, sans changement réel : on l'ignore
      if (premierAppel) {
        premierAppel = false;
        return;
      }
      if (libre) return;
      var haut = element.getBoundingClientRect().top;
      var attendu = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
      if (Math.abs(haut - attendu) > 30) {
        element.scrollIntoView({ behavior: "instant", block: "start" });
      }
    });
    observateur.observe(document.body);
    window.setTimeout(function () {
      observateur.disconnect();
    }, 2500);
  }

  // À l'arrivée sur la page. Le navigateur peut replacer la page après
  // nous (position mémorisée, images qui finissent de charger) : on
  // désactive sa mémoire de position et on recale une fois tout chargé.
  if (window.location.hash) {
    var idArrivee = decodeURIComponent(window.location.hash.slice(1));
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.setTimeout(function () {
      allerA(idArrivee, true);
    }, 80);
    window.addEventListener("load", function () {
      var cible = document.getElementById(idArrivee);
      if (!cible) return;
      var ecart = Math.abs(cible.getBoundingClientRect().top);
      if (ecart > 200) {
        cible.scrollIntoView({ behavior: "instant", block: "start" });
      }
    });
  }

  // Liens vers un endroit de la même page (résultats de recherche compris)
  document.addEventListener("click", function (evenement) {
    var lien = evenement.target.closest ? evenement.target.closest("a[href*='#']") : null;
    // Le lien d'évitement « Aller au contenu » garde son fonctionnement normal
    if (!lien || lien.target === "_blank" || lien.classList.contains("saut-contenu")) return;
    var url = new URL(lien.href, window.location.href);
    var memePage =
      url.pathname.replace(/\/index\.html$/, "/") ===
      window.location.pathname.replace(/\/index\.html$/, "/");
    if (!memePage || !url.hash || url.hash === "#") return;
    var id = decodeURIComponent(url.hash.slice(1));
    if (!document.getElementById(id)) return;

    evenement.preventDefault();
    fermerMenu();
    $$(".recherche__panneau").forEach(function (panneau) {
      panneau.classList.remove("est-visible");
    });
    if (window.history && window.history.pushState) window.history.pushState(null, "", url.hash);
    allerA(id);
  });

  window.addEventListener("popstate", function () {
    allerA(decodeURIComponent(window.location.hash.slice(1)));
  });
})();
