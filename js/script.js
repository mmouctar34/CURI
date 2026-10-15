document.addEventListener('DOMContentLoaded', () => {

  // ── BURGER MENU ──
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger) burger.onclick = () => nav.classList.toggle('open');

  // ── FADE-IN ──
  //const obs = new IntersectionObserver(es => es.forEach(e => {
  //  if (e.isIntersecting) { e.target.classList.add('v'); obs.unobserve(e.target); }
  //}), { threshold: 0.1 });
  //document.querySelectorAll('.fi').forEach(el => obs.observe(el));

  // Remplacez la section FADE-IN de script.js
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('v'); obs.unobserve(e.target); }
}), { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fi, .fi-up, .fi-left, .fi-right, .fi-zoom').forEach(el => obs.observe(el));

  // ── TABS FORMATIONS ──
  document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('on'));
    document.querySelectorAll('.tab-c').forEach(x => x.classList.remove('on'));
    t.classList.add('on');
    document.getElementById(t.dataset.t).classList.add('on');
  });

  // ── FILIÈRES ──
  document.querySelectorAll('.fil-tab').forEach(t => t.onclick = () => {
    document.querySelectorAll('.fil-tab').forEach(x => x.classList.remove('on'));
    document.querySelectorAll('.fil-c').forEach(x => x.classList.remove('on'));
    t.classList.add('on');
    document.getElementById(t.dataset.f).classList.add('on');
  });

  // ── HEADER HIDE/SHOW AU SCROLL ──
let dernierScroll = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  const scrollActuel = window.scrollY;
  if (scrollActuel <= 80) {
    header.classList.remove('cachee');
    header.classList.add('visible');
  } else if (scrollActuel > dernierScroll) {
    // On descend → cacher
    header.classList.add('cachee');
    header.classList.remove('visible');
  } else {
    // On remonte → montrer
    header.classList.remove('cachee');
    header.classList.add('visible');
  }
  dernierScroll = scrollActuel;
});

// ── COMPTEURS ANIMÉS ──
const compteurs = document.querySelectorAll('.stat-n[data-target]');
let compteursLances = false;

function lancerCompteurs() {
  if (compteursLances) return;
  compteursLances = true;
  compteurs.forEach(el => {
    const cible = parseInt(el.dataset.target);
    const suffixe = el.dataset.suffix || '';
    const duree = 2000;
    const pas = cible / (duree / 16);
    let valeur = 0;
    const timer = setInterval(() => {
      valeur += pas;
      if (valeur >= cible) {
        valeur = cible;
        clearInterval(timer);
      }
      el.textContent = Math.floor(valeur).toLocaleString('fr-FR') + suffixe;
    }, 16);
  });
}

// Lancer quand la stats-bar est visible
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) lancerCompteurs(); });
}, { threshold: 0.3 });
const statsBar = document.getElementById('statsBar');
if (statsBar) statsObs.observe(statsBar);

  // ── SLIDER ──
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.s-dot');
  if (slides.length) {
    let cur = 0;
    const goTo = n => {
      slides[cur].classList.remove('on'); dots[cur]?.classList.remove('on');
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('on'); dots[cur]?.classList.add('on');
    };
    document.getElementById('slPrev')?.addEventListener('click', () => goTo(cur - 1));
    document.getElementById('slNext')?.addEventListener('click', () => goTo(cur + 1));
    dots.forEach(d => d.onclick = () => goTo(+d.dataset.i));
    setInterval(() => goTo(cur + 1), 4500);
  }

  // ── FORMULAIRE CONTACT ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.onsubmit = e => {
      e.preventDefault();
      let ok = true;
      ['nom','email','message'].forEach(id => {
        const el = document.getElementById(id);
        const err = document.getElementById(id + 'Err');
        if (el && !el.value.trim()) {
          if (err) err.textContent = 'Ce champ est requis.';
          ok = false;
        } else if (err) err.textContent = '';
      });
      if (ok) {
        document.getElementById('formOk').style.display = 'block';
        form.reset();
        setTimeout(() => { document.getElementById('formOk').style.display = 'none'; }, 5000);
      }
    };
  }

  // ════════════════════════════════════════
  // ── BARRE DE RECHERCHE COMPLÈTE ──
  // ════════════════════════════════════════
  const DATA = [
    // ── ACCUEIL / À PROPOS ──
    { t:'À propos du CURI', d:'Le Centre Universitaire de Recherche et de Formation aux Technologies de l\'Internet est rattaché à l\'Université Cheikh Anta Diop de Dakar.', p:'index.html', i:'fa-university', tags:['curi','à propos','présentation','centre','universitaire','recherche','formation','internet','ucad','dakar'] },
    { t:'Pourquoi choisir le CURI ?', d:'Le CURI forme en 2 ans des spécialistes du numérique reconnus par l\'UCAD, avec des débouchés professionnels concrets en Afrique et à l\'international.', p:'index.html', i:'fa-star', tags:['pourquoi','choisir','avantage','intérêt','bénéfice','meilleur','qualité','excellence'] },
    { t:'Où se trouve le CURI ?', d:'Le CURI est situé sur le Campus de l\'Université Cheikh Anta Diop, Fann Résidence, Dakar, Sénégal.', p:'contact.html', i:'fa-map-marker-alt', tags:['où','localisation','lieu','adresse','campus','fann','résidence','dakar','sénégal','trouver','situation'] },
    { t:'Statistiques du CURI', d:'Plus de 500 étudiants formés par an, 15+ enseignants-chercheurs, 2 ans de formation, 2000+ diplômés depuis la création.', p:'index.html', i:'fa-chart-bar', tags:['chiffre','statistique','nombre','étudiants','enseignants','diplômés','500','2000','15'] },

    // ── ORIENTATION / ADMISSION ──
    { t:'Comment s\'orienter au CURI ?', d:'L\'accès au CURI se fait uniquement via la plateforme CampuSen après l\'obtention du BAC. Il n\'y a pas de concours ni d\'admission directe.', p:'index.html', i:'fa-compass', tags:['orientation','orienter','comment','accès','entrer','intégrer','rejoindre','postuler','candidature'] },
    { t:'Plateforme CampuSen', d:'Pour intégrer le CURI, vous devez postuler sur www.campusen.sn après votre BAC et choisir la formation Développement Web Mobile et Multimédia à l\'Université de Dakar.', p:'index.html', i:'fa-laptop', tags:['campusen','campus','plateforme','sn','site','www','lien','postuler','choix'] },
    { t:'Conditions d\'admission', d:'Être titulaire du BAC (toutes séries). Choisir sur CampuSen : Développement Web Mobile et Multimédia — Université Cheikh Anta Diop de Dakar. Aucun concours requis.', p:'index.html', i:'fa-file-alt', tags:['condition','admission','bac','bachelier','bachelière','titulaire','diplôme','lycée','terminale','accès','prérequis','requis'] },
    { t:'Inscription au CURI', d:'Les inscriptions se font via CampuSen après le BAC. Aucun dossier direct n\'est accepté. Choisissez Développement Web Mobile et Multimédia sur la plateforme.', p:'contact.html', i:'fa-pen', tags:['inscription','inscrire','dossier','candidater','déposer','formulaire','rentrée','intégrer','rejoindre'] },
    { t:'BAC et orientation numérique', d:'Après votre BAC, vous pouvez vous orienter au CURI via CampuSen en choisissant la filière Développement Web Mobile et Multimédia ou Marketing Digital.', p:'index.html', i:'fa-graduation-cap', tags:['bac','obtention','terminale','lycéen','lycéenne','après le bac','bachelier','résultat','orientation numérique'] },

    // ── FORMATIONS ──
    { t:'Nos Formations — Vue d\'ensemble', d:'Le CURI propose 2 ans de formation : 1ère année en tronc commun, 2ème année en spécialisation (Développement Web ou Marketing Digital).', p:'formation.html', i:'fa-graduation-cap', tags:['formation','programme','filière','parcours','cursus','étude','apprendre','cours','enseignement'] },
    { t:'1ère Année — Tronc Commun', d:'Tous les étudiants suivent les mêmes cours en 1ère année : algorithmique, bases de données, technologies web, infographie, marketing, communication.', p:'formation.html', i:'fa-users', tags:['première','1ère','année','tronc','commun','semestre 1','semestre 2','première année','débutant'] },
    { t:'Semestre 1', d:'Environnement informatique, algorithmique et programmation, bases de données, droit, économie, techniques d\'expression, anglais.', p:'formation.html', i:'fa-book', tags:['semestre','s1','semestre 1','premier','algorithme','informatique','bureautique','droit','économie','anglais'] },
    { t:'Semestre 2', d:'Technologies web, infographie, dessin vectoriel, programmation avancée, marketing fondamental, communication d\'entreprise, gestion de projet.', p:'formation.html', i:'fa-book', tags:['semestre','s2','semestre 2','deuxième','web','infographie','vectoriel','marketing','communication','projet'] },
    { t:'2ème Année — Spécialisations', d:'En 2ème année, deux filières : Développement Web Mobile et Multimédia, ou Marketing Digital et E-commerce.', p:'formation.html', i:'fa-code-branch', tags:['deuxième','2ème','spécialisation','filière','choisir','orientation','semestre 3','semestre 4'] },
    { t:'Filière Développement Web Mobile et Multimédia', d:'Géolocalisation, UX design, développement Android, frameworks mobiles, jeux vidéo, entrepreneuriat, anglais.', p:'formation.html', i:'fa-code', tags:['développement','web','mobile','multimédia','android','framework','ux','design','jeux','vidéo','géolocalisation','données'] },
    { t:'Filière Marketing Digital et E-commerce', d:'Stratégies digitales, publicité en ligne, e-business, communication digitale, gestion de boutiques en ligne.', p:'formation.html', i:'fa-chart-line', tags:['marketing','digital','e-commerce','commerce','vente','publicité','ligne','stratégie','boutique','communication'] },
    { t:'Semestre 3 — Développement Web', d:'Géolocalisation et cartographie, manipulation de données, UX design, programmation avancée, développement mobile Android et frameworks, jeux vidéo.', p:'formation.html', i:'fa-laptop-code', tags:['semestre 3','s3','géolocalisation','cartographie','données','android','jeux vidéo','frameworks','ux'] },
    { t:'Projet de Fin d\'Études', d:'En fin de 2ème année, chaque étudiant soutient un Projet de Fin d\'Études (PFE) devant jury et rédige un mémoire complet.', p:'formation.html', i:'fa-file-alt', tags:['pfe','projet','fin','études','mémoire','soutenance','jury','rédiger','écrire','défendre'] },
    { t:'Algorithmique et Programmation', d:'Cours d\'algorithmique en S1 et S2 : notions de base, structures de données, programmation avancée, algorithme avancé.', p:'formation.html', i:'fa-code', tags:['algo','algorithme','algorithmique','programmation','code','coder','programme','logique','pseudocode'] },
    { t:'Bases de données', d:'Conception de bases de données, outils de conception logiciel, Merise, SQL, modélisation MCD/MLD.', p:'formation.html', i:'fa-database', tags:['base','données','bdd','sql','merise','mcd','mld','base de données','conception','modélisation'] },
    { t:'Technologies Web', d:'HTML, CSS, JavaScript, langages de mise en forme, langage de script, pages web statiques et dynamiques.', p:'formation.html', i:'fa-globe', tags:['html','css','javascript','js','web','page','site','technologie','langage','script','statique','dynamique'] },
    { t:'Infographie et Design', d:'Traitement d\'images, dessin vectoriel, Photoshop, Illustrator, création graphique, charte graphique.', p:'formation.html', i:'fa-paint-brush', tags:['infographie','image','vectoriel','photoshop','illustrator','design','graphique','créatif','visuel','dessin'] },
    { t:'Gestion de projet', d:'Méthodologie Agile, Scrum, UML, conduite de projet informatique, planification, livrables.', p:'formation.html', i:'fa-project-diagram', tags:['gestion','projet','agile','scrum','uml','méthode','planification','organisation','équipe','chef'] },

    // ── DIPLÔMES ──
    { t:'Diplômes délivrés par le CURI', d:'Le CURI délivre des Diplômes d\'Études Supérieures (DES) reconnus par l\'Université Cheikh Anta Diop de Dakar.', p:'formation.html', i:'fa-award', tags:['diplôme','des','obtenir','reconnu','valide','certifié','ucad','titre','qualification'] },
    { t:'DES Internet Management et Technologies Web', d:'Diplôme tronc commun délivré à la fin de la 1ère année, reconnu par l\'UCAD.', p:'formation.html', i:'fa-award', tags:['des','internet','management','technologies','web','multimédia','tronc','commun'] },
    { t:'DES Web et Création Multimédia', d:'Diplôme spécialité Web et Création Multimédia, filière Développement Web Mobile.', p:'formation.html', i:'fa-award', tags:['des','web','création','multimédia','spécialité','filière 1'] },
    { t:'DES Développement d\'Applications Web et Mobile', d:'Diplôme spécialité Développement d\'Applications, filière Développement Web Mobile.', p:'formation.html', i:'fa-award', tags:['des','développement','applications','mobile','web','app','android'] },
    { t:'DES E-commerce et Marketing Digital', d:'Diplôme spécialité E-commerce et Marketing Digital, filière Marketing.', p:'formation.html', i:'fa-award', tags:['des','e-commerce','marketing','digital','commerce','vente','filière 3'] },

    // ── DÉBOUCHÉS ──
    { t:'Débouchés professionnels', d:'Après le CURI : Développeur Web, Développeur Mobile, Designer UX/UI, Marketing Digital, Chef de projet, Entrepreneur numérique.', p:'debouches.html', i:'fa-briefcase', tags:['débouché','métier','emploi','travail','carrière','profession','avenir','sortie','après','opportunité'] },
    { t:'Développeur Web Full-Stack', d:'Conception et développement d\'applications web complètes, front-end et back-end, HTML/CSS/JS, frameworks.', p:'debouches.html', i:'fa-code', tags:['développeur','web','full-stack','front','back','end','application','site','html','css','js','react','vue'] },
    { t:'Développeur Mobile', d:'Développement d\'applications mobiles Android et cross-platform avec les frameworks modernes (React Native, Flutter).', p:'debouches.html', i:'fa-mobile-alt', tags:['développeur','mobile','android','ios','app','application','react native','flutter','cross','platform'] },
    { t:'Designer UX/UI', d:'Création d\'interfaces intuitives, prototypage, Figma, expériences utilisateur mémorables, accessibilité.', p:'debouches.html', i:'fa-paint-brush', tags:['designer','ux','ui','design','interface','prototype','figma','utilisateur','expérience','maquette'] },
    { t:'Responsable Marketing Digital', d:'Stratégies de communication digitale, SEO, réseaux sociaux, publicité en ligne, Google Ads, analyse de données.', p:'debouches.html', i:'fa-chart-line', tags:['marketing','digital','responsable','seo','réseaux','sociaux','publicité','google','ads','communication'] },
    { t:'Chef de Projet E-commerce', d:'Gestion de boutiques en ligne, marketplace, logistique, stratégie commerciale sur internet.', p:'debouches.html', i:'fa-shopping-cart', tags:['chef','projet','e-commerce','boutique','ligne','marketplace','commerce','vente','internet','logistique'] },
    { t:'Entrepreneur Numérique', d:'Création de startup dans les technologies internet, innovation, levée de fonds, écosystème numérique africain.', p:'debouches.html', i:'fa-rocket', tags:['entrepreneur','startup','créer','entreprise','innovation','numérique','propre','indépendant','auto','emploi'] },
    { t:'Secteurs d\'activité accessibles', d:'Entreprises tech, finance, e-commerce, santé numérique, éducation, ONG, énergie, aéronautique, médias.', p:'debouches.html', i:'fa-building', tags:['secteur','activité','industrie','domaine','entreprise','banque','finance','santé','éducation','ong','media'] },
    { t:'Insertion professionnelle', d:'Le CURI accompagne ses diplômés vers l\'emploi grâce à un réseau de partenaires et au réseau Alumni.', p:'debouches.html', i:'fa-handshake', tags:['insertion','emploi','trouver','travail','réseau','alumni','partenaire','recrutement','stage','job'] },
    { t:'Stages professionnels', d:'Des partenariats avec des entreprises permettent aux étudiants du CURI d\'effectuer des stages rémunérés.', p:'debouches.html', i:'fa-briefcase', tags:['stage','rémunéré','entreprise','partenaire','expérience','pratique','professionnel','immersion'] },
    { t:'Poursuite d\'études', d:'Après le CURI, vous pouvez poursuivre en Licence, Master, MBA ou certifications professionnelles au Sénégal et à l\'international.', p:'debouches.html', i:'fa-graduation-cap', tags:['poursuite','études','licence','master','mba','doctorat','après','continuer','université','international'] },

    // ── ÉQUIPE ──
    { t:'Équipe pédagogique du CURI', d:'Plus de 15 enseignants-chercheurs : professeurs, maîtres de conférences et chargés de cours spécialisés.', p:'equipe.html', i:'fa-users', tags:['équipe','pédagogique','enseignant','professeur','staff','personnel','corps','académique'] },
    { t:'M. THIAM — Algorithmique', d:'Enseignant spécialisé en Algorithmique et Structures de Données au CURI.', p:'equipe.html', i:'fa-user-tie', tags:['thiam','algorithmique','structures','données','enseignant','professeur'] },
    { t:'Mme DANSOKHO — Bases de données', d:'Enseignante spécialisée en Modélisation et Systèmes d\'Information, Merise, bases de données.', p:'equipe.html', i:'fa-user-tie', tags:['dansokho','bases','données','modélisation','systèmes','information','merise','enseignante'] },
    { t:'M. DIASSY — Systèmes et Réseaux', d:'Enseignant spécialisé en Systèmes d\'Exploitation et Réseaux informatiques.', p:'equipe.html', i:'fa-user-tie', tags:['diassy','systèmes','exploitation','réseaux','réseau','linux','windows','enseignant'] },

    // ── ÉVÉNEMENTS ──
    { t:'Événements et Actualités', d:'Le CURI organise des hackathons, conférences, ateliers, journées portes ouvertes et cérémonies de remise des diplômes.', p:'evenements.html', i:'fa-calendar', tags:['événement','actualité','agenda','calendrier','activité','programme','vie','campus'] },
    { t:'Photos des événements', d:'Les photos et galeries des événements du CURI se trouvent dans la section Événements du site.', p:'evenements.html', i:'fa-images', tags:['photo','image','galerie','photos','images','album','cliché','souvenirs','événement','photo','voir'] },
    { t:'Hackathon CURI', d:'Le Hackathon CURI est un événement de 48h où les étudiants développent des solutions numériques pour les services publics sénégalais.', p:'evenements.html', i:'fa-trophy', tags:['hackathon','concours','compétition','48h','innovation','créer','équipe','projet','prix','récompense'] },
    { t:'Remise des diplômes 2025', d:'La cérémonie de remise des diplômes de la Promotion 2025 a réuni plus de 200 lauréats en présence du recteur de l\'UCAD.', p:'evenements.html', i:'fa-award', tags:['remise','diplômes','cérémonie','promotion','2025','lauréat','recteur','graduation'] },
    { t:'Journée Portes Ouvertes', d:'La JPO permet de découvrir les formations du CURI, rencontrer l\'équipe pédagogique et visiter les laboratoires.', p:'evenements.html', i:'fa-door-open', tags:['portes','ouvertes','jpo','visite','découverte','rencontre','laboratoire','venir','voir'] },
    { t:'Conférence IA et Numérique', d:'Le CURI organise des conférences internationales sur l\'intelligence artificielle et le développement numérique africain.', p:'evenements.html', i:'fa-microphone', tags:['conférence','intelligence','artificielle','ia','numérique','africain','international','expert','intervenant'] },
    { t:'Atelier Développement Web', d:'Ateliers pratiques de développement web HTML/CSS/JavaScript ouverts aux lycéens et bacheliers.', p:'evenements.html', i:'fa-laptop', tags:['atelier','pratique','html','css','javascript','lycéen','bachelier','initiation','débutant','apprendre'] },
    { t:'Ouverture des inscriptions 2025–2026', d:'Les dossiers de candidature pour les formations du CURI sont disponibles via CampuSen. Clôture le 31 juillet 2025.', p:'evenements.html', i:'fa-bell', tags:['inscription','2025','2026','ouverture','candidature','dossier','rentrée','juillet','clôture'] },

    // ── CONTACT ──
    { t:'Nous contacter', d:'Contactez le CURI par email à contact@curi.ucad.sn ou venez directement sur le campus UCAD, Fann Résidence, Dakar.', p:'contact.html', i:'fa-envelope', tags:['contact','contacter','email','mail','écrire','message','joindre','communiquer','atteindre'] },
    { t:'Adresse du CURI', d:'Campus UCAD, Fann Résidence, Dakar, République du Sénégal. À proximité de la faculté des sciences.', p:'contact.html', i:'fa-map-marker-alt', tags:['adresse','localisation','lieu','campus','fann','résidence','dakar','sénégal','où','trouver','situé','route'] },
    { t:'Email officiel', d:'contact@curi.ucad.sn — Réponse garantie sous 48 heures ouvrables.', p:'contact.html', i:'fa-envelope', tags:['email','mail','contact@','curi.ucad.sn','adresse','mail','courriel','électronique'] },
    { t:'Téléphone du CURI', d:'+221 33 XXX XX XX — Disponible du lundi au vendredi de 8h à 17h.', p:'contact.html', i:'fa-phone', tags:['téléphone','phone','appeler','numéro','tél','appel','joindre','ligne'] },
    { t:'Horaires d\'accueil', d:'Lundi – Vendredi : 8h00 – 17h00 | Samedi : 8h00 – 12h00. Fermé le dimanche et jours fériés.', p:'contact.html', i:'fa-clock', tags:['horaire','heure','ouverture','fermeture','accueil','disponible','quand','lundi','vendredi','samedi'] },
    { t:'Formulaire de contact', d:'Remplissez le formulaire en ligne pour envoyer un message directement à l\'équipe du CURI.', p:'contact.html', i:'fa-paper-plane', tags:['formulaire','form','remplir','envoyer','message','question','demande','renseignement','ligne'] },
    { t:'Site UCAD', d:'Le site institutionnel de l\'Université Cheikh Anta Diop de Dakar est accessible sur www.ucad.sn', p:'contact.html', i:'fa-globe', tags:['ucad','site','www','ucad.sn','université','institutionnel','officiel','lien'] },
  ];

  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchBtn = document.getElementById('searchBtn');

  if (!searchInput) return;

  function hl(txt, q) {
    if (!q) return txt;
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return txt.replace(re, '<span style="background:#fef3c7;border-radius:3px;padding:0 2px;font-weight:700;color:#1a2233">$1</span>');
  }

  function doSearch() {
    const raw = searchInput.value.trim();
    const q = raw.toLowerCase();
    if (!q || q.length < 2) { searchResults.classList.remove('show'); return; }

    const scores = DATA.map(item => {
      let score = 0;
      const tl = item.t.toLowerCase();
      const dl = item.d.toLowerCase();
      if (tl.includes(q)) score += 10;
      if (dl.includes(q)) score += 5;
      item.tags.forEach(tag => {
        if (tag.includes(q) || q.includes(tag)) score += 3;
        if (tag === q) score += 8;
      });
      return { ...item, score };
    }).filter(i => i.score > 0).sort((a, b) => b.score - a.score).slice(0, 7);

    if (!scores.length) {
      searchResults.innerHTML = `<div style="padding:20px;text-align:center;color:#6b7c93;font-size:.84rem"><i class="fas fa-search" style="display:block;font-size:1.8rem;margin-bottom:8px;color:#dde3ed"></i>Aucun résultat pour <strong>"${raw}"</strong><br/><span style="font-size:.75rem;margin-top:6px;display:block">Essayez : formation, contact, orientation, débouché...</span></div>`;
    } else {
      const pages = { 'index.html':'Accueil', 'formation.html':'Formations', 'debouches.html':'Débouchés', 'equipe.html':'Équipe', 'evenements.html':'Événements', 'contact.html':'Contact' };
      searchResults.innerHTML = scores.map(item => `
        <div onclick="window.location.href='${item.p}'" style="display:flex;align-items:flex-start;gap:12px;padding:11px 16px;cursor:pointer;border-bottom:1px solid #dde3ed;transition:background .18s" onmouseover="this.style.background='#f4f6fa'" onmouseout="this.style.background='#fff'">
          <div style="width:34px;height:34px;border-radius:7px;background:#e8f0fb;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#2e6ec4;font-size:.85rem"><i class="fas ${item.i}"></i></div>
          <div style="flex:1;min-width:0">
            <div style="font-size:.85rem;font-weight:600;color:#0b3060;margin-bottom:2px">${hl(item.t, q)}</div>
            <div style="font-size:.76rem;color:#6b7c93;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${hl(item.d.substring(0, 90), q)}...</div>
            <div style="font-size:.68rem;color:#c8921a;font-weight:600;margin-top:3px"><i class="fas fa-arrow-right" style="margin-right:3px"></i>${pages[item.p] || item.p}</div>
          </div>
        </div>`).join('');
    }
    searchResults.classList.add('show');
  }

  searchInput.addEventListener('input', doSearch);
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') { const f = searchResults.querySelector('[onclick]'); if (f) f.click(); }
    if (e.key === 'Escape') searchResults.classList.remove('show');
  });
  // Dans le DOMContentLoaded, après doSearch
const suggestions = ['Formation', 'Orientation', 'Débouché', 'Contact', 'Hackathon', 'Bourse'];
searchInput.addEventListener('focus', () => {
  if (!searchInput.value) {
    searchResults.innerHTML = `
      <div style="padding:14px 16px">
        <div style="font-size:.7rem;font-weight:700;color:#6b7c93;text-transform:uppercase;margin-bottom:10px">Recherches populaires</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${suggestions.map(s => `<button onclick="document.getElementById('searchInput').value='${s}';document.getElementById('searchInput').dispatchEvent(new Event('input'))" style="background:#e8f0fb;color:#1a5296;border:none;padding:5px 12px;border-radius:14px;font-size:.75rem;cursor:pointer;font-weight:600">${s}</button>`).join('')}
        </div>
      </div>`;
    searchResults.classList.add('show');
  }
});
  // ── MODALS ACTUALITÉS ──
function ouvrirModal(id) {
  const m = document.getElementById(id);
  if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function fermerModal(e, el) {
  if (e.target === el) { el.style.display = 'none'; document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-bg').forEach(m => {
      m.style.display = 'none'; document.body.style.overflow = '';
    });
  }
});
  document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) searchResults.classList.remove('show'); });
  if (searchBtn) searchBtn.addEventListener('click', doSearch);

});


// ── FONCTIONS MODALS ÉVÉNEMENTS ──

function ouvrirArticle(id) {
  const modal = document.getElementById('modal-' + id);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function fermerModal(e, overlay) {
  if (e.target === overlay) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function ouvrirGalerie() {
  document.getElementById('modalGalerie').classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Filtre galerie par catégorie
function filtrerGalerie(categorie, btnEl) {
  // Mettre à jour les boutons
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  // Filtrer les items
  document.querySelectorAll('.galerie-item').forEach(item => {
    if (categorie === 'tous' || item.dataset.categorie === categorie) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Fermer avec Échap
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show').forEach(m => {
      m.classList.remove('show');
    });
    document.body.style.overflow = '';
  }
});

// ── GALERIE AUTOMATIQUE ──
// Cette fonction cherche toutes les images des cartes événements
// et les ajoute automatiquement dans la galerie
function alimenterGalerieAuto() {
  const galerieGrid = document.getElementById('galerieGrid');
  if (!galerieGrid) return;

  // Cherche toutes les images dans les cartes événements
  const cartesImages = document.querySelectorAll('.ev-photo');

  cartesImages.forEach(function(img) {
    // Récupère les infos de la carte parente
    const carte = img.closest('.ev-card');
    if (!carte) return;

    const tagEl = carte.querySelector('.ev-tag');
    const dateEl = carte.querySelector('.ev-date-badge');
    const titreEl = carte.querySelector('h3');

    const tag = tagEl ? tagEl.textContent.toLowerCase().trim() : 'autre';
    const date = dateEl ? dateEl.textContent.trim() : '2025';
    const titre = titreEl ? titreEl.textContent.trim() : '';

    // Détermine la catégorie automatiquement selon le tag
    let categorie = 'autre';
    if (tag.includes('atelier'))           categorie = 'atelier';
    else if (tag.includes('compétition') || tag.includes('hackathon')) categorie = 'hackathon';
    else if (tag.includes('conférence'))   categorie = 'conference';
    else if (tag.includes('porte') || tag.includes('jpo') || tag.includes('cohorte') || tag.includes('salon')) categorie = 'jpo';
    else if (tag.includes('cérémonie') || tag.includes('remise')) categorie = 'remise';

    // Vérifie si cette image n'est pas déjà dans la galerie
    const dejaPresent = galerieGrid.querySelector(`[data-src="${img.src}"]`);
    if (dejaPresent) return;

    // Crée l'item galerie
    const item = document.createElement('div');
    item.className = 'galerie-item';
    item.dataset.categorie = categorie;
    item.dataset.date = date;
    item.dataset.src = img.src;

    item.innerHTML = `
      <img src="${img.src}" alt="${titre}" style="width:100%;height:100%;object-fit:cover;display:block"/>
      <div class="galerie-item-label">${titre}</div>
    `;

    // Clic pour agrandir
    item.addEventListener('click', function() {
      agrandirPhoto(img.src, titre);
    });

    galerieGrid.appendChild(item);
  });
}

// Agrandir une photo au clic
function agrandirPhoto(src, titre) {
  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      background:rgba(0,0,0,.92);
      display:flex;align-items:center;justify-content:center;
      padding:20px;cursor:pointer;
      animation:fadeIn .2s ease;
    `;
    lightbox.onclick = () => lightbox.remove();
    document.body.appendChild(lightbox);
  }
  lightbox.innerHTML = `
    <div style="position:relative;max-width:900px;width:100%">
      <img src="${src}" alt="${titre}"
           style="width:100%;border-radius:12px;max-height:85vh;object-fit:contain;display:block"/>
      <div style="color:#fff;text-align:center;margin-top:10px;font-size:.88rem;opacity:.8">${titre}</div>
      <button onclick="document.getElementById('lightbox').remove()"
              style="position:absolute;top:-14px;right:-14px;background:#fff;border:none;border-radius:50%;width:34px;height:34px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,.3)">✕</button>
    </div>
  `;
  document.body.appendChild(lightbox);
}

// Compteur de visiteurs simulé (démo vivante)
const v = document.getElementById('visiteurs');
const tv = document.getElementById('totalVues');
if (v) setInterval(() => { v.textContent = 35 + Math.floor(Math.random() * 20); }, 3000);
if (tv) setInterval(() => {
  let n = parseInt(tv.textContent.replace(/\s/g,'')) + 1;
  tv.textContent = n.toLocaleString('fr-FR');
}, 8000);


// Remplacez la fonction agrandirPhoto par cette version enrichie
let galerieIndex = 0;
function agrandirPhoto(src, titre) {
  const items = [...document.querySelectorAll('.galerie-item img')];
  const index = items.findIndex(i => i.src === src);
  galerieIndex = index >= 0 ? index : 0;
  afficherLightbox();
}
function afficherLightbox() {
  const imgs = [...document.querySelectorAll('.galerie-item img')];
  if (!imgs.length) return;
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.95);display:flex;align-items:center;justify-content:center;padding:20px';
    lb.onclick = e => { if (e.target === lb) lb.remove(); };
    document.body.appendChild(lb);
  }
  const img = imgs[galerieIndex];
  lb.innerHTML = `
    <button onclick="document.getElementById('lightbox').remove()" style="position:absolute;top:20px;right:20px;background:#fff;border:none;border-radius:50%;width:40px;height:40px;cursor:pointer;font-size:1.1rem">✕</button>
    <button onclick="galerieIndex=(galerieIndex-1+${imgs.length})%${imgs.length};afficherLightbox()" style="position:absolute;left:20px;background:rgba(255,255,255,.9);border:none;border-radius:50%;width:44px;height:44px;cursor:pointer;font-size:1.3rem">‹</button>
    <img src="${img.src}" style="max-width:90%;max-height:85vh;border-radius:12px;object-fit:contain"/>
    <button onclick="galerieIndex=(galerieIndex+1)%${imgs.length};afficherLightbox()" style="position:absolute;right:20px;background:rgba(255,255,255,.9);border:none;border-radius:50%;width:44px;height:44px;cursor:pointer;font-size:1.3rem">›</button>
    <div style="position:absolute;bottom:30px;color:#fff;font-size:.85rem;opacity:.8">${galerieIndex + 1} / ${imgs.length}</div>
  `;
}
// Navigation clavier
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const imgs = [...document.querySelectorAll('.galerie-item img')];
  if (e.key === 'ArrowRight') { galerieIndex = (galerieIndex + 1) % imgs.length; afficherLightbox(); }
  if (e.key === 'ArrowLeft') { galerieIndex = (galerieIndex - 1 + imgs.length) % imgs.length; afficherLightbox(); }
  if (e.key === 'Escape') lb.remove();
});

// Lance la galerie auto au chargement
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(alimenterGalerieAuto, 300);
});