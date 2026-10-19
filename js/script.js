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
    {
      titre: "Nos formations",
      extrait: "Développement web et mobile, technologies web et multimédia, e-commerce et marketing digital.",
      page: "formation.html",
      section: "Formations",
      mots: "dess filiere filière specialite spécialité cursus diplome diplôme etudier étudier"
    },
    {
      titre: "Développement web et mobile",
      extrait: "Concevoir et mettre en production des applications complètes, du serveur au téléphone.",
      page: "formation.html#developpement",
      section: "Formations",
      mots: "code programmation application mobile android backend front javascript"
    },
    {
      titre: "Technologie web et multimédia",
      extrait: "Création de contenus et d'interfaces : graphisme, audiovisuel, publication en ligne.",
      page: "formation.html#multimedia",
      section: "Formations",
      mots: "design graphisme video vidéo audiovisuel creation création interface"
    },
    {
      titre: "E-commerce et marketing digital",
      extrait: "Piloter une activité en ligne : stratégie, acquisition, contenus et mesure des résultats.",
      page: "formation.html#ecommerce",
      section: "Formations",
      mots: "commerce vente marketing digital reseaux réseaux sociaux publicité"
    },
    {
      titre: "Formation initiale, continue, certifiante",
      extrait: "Trois manières de se former au CURI selon votre situation.",
      page: "formation.html#types",
      section: "Formations",
      mots: "initiale continue certifiante professionnelle adulte salarié reconversion"
    },
    {
      titre: "Comment candidater",
      extrait: "Les étapes pour déposer un dossier et rejoindre le centre.",
      page: "formation.html#candidater",
      section: "Formations",
      mots: "admission inscription candidature dossier postuler rejoindre entrer"
    },
    {
      titre: "NIC Sénégal et le domaine .sn",
      extrait: "La gestion du domaine national .sn est confiée à l'UCAD depuis 1993.",
      page: "index.html#missions",
      section: "Accueil",
      mots: "nic registre domaine dns dnssec internet gouvernance icann afnic aftld"
    },
    {
      titre: "Débouchés après le CURI",
      extrait: "Les métiers visés à la sortie et les secteurs qui recrutent.",
      page: "debouches.html",
      section: "Débouchés",
      mots: "metier métier emploi travail carriere carrière embauche stage insertion"
    },
    {
      titre: "L'équipe du CURI",
      extrait: "Direction, enseignants-chercheurs et équipe administrative du centre.",
      page: "equipe.html",
      section: "Équipe",
      mots: "enseignant professeur directeur personnel encadrement responsable pole pôle"
    },
    {
      titre: "Événements et actualités",
      extrait: "Ateliers, hackathons, conférences et remises de diplômes du centre.",
      page: "evenements.html",
      section: "Événements",
      mots: "actualite actualité news hackathon atelier conference conférence ceremonie cérémonie"
    },
    {
      titre: "Portes ouvertes sur les technologies immersives",
      extrait: "Juin 2025 — des lycéens de Dakar en immersion dans la réalité virtuelle au centre.",
      page: "evenement-colab-2025.html",
      section: "Événements",
      mots: "colab portes ouvertes lycee lycée lyceens lycéens realite réalité virtuelle vr afretec asedu mariama ba keur rokhaya 2025"
    },
    {
      titre: "Formation au leadership et à la communication",
      extrait: "Avril 2025 — vingt doctorants de l'EDMI formés au leadership et à l'entrepreneuriat.",
      page: "evenement-leadership-2025.html",
      section: "Événements",
      mots: "leadership communication doctorant doctorants edmi afretec idrissa sarr nalla mbaye lamine sane attestation entrepreneuriat 2025"
    },
    {
      titre: "Lancement du laboratoire des technologies immersives",
      extrait: "Septembre 2024 — le centre ouvre son laboratoire de réalité étendue avec Imisi3D.",
      page: "evenement-laboratoire-2024.html",
      section: "Événements",
      mots: "laboratoire labo immersif immersive realite réalité etendue étendue virtuelle augmentee augmentée imisi3d nigeria 2024"
    },
    {
      titre: "Atelier SenAgro",
      extrait: "Avril 2024 — intelligence artificielle et science des données au service de l'agriculture.",
      page: "evenement-senagro-2024.html",
      section: "Événements",
      mots: "senagro agriculture intelligence artificielle ia donnees données sorbonne cnrs mil phosphore opensimroot these thèse 2024"
    },
    {
      titre: "Hackathon du Parc de Technologies Numériques",
      extrait: "Septembre 2024 — 72 heures de travail collaboratif avec la plateforme Wutiko.",
      page: "evenement-hackathon-2024.html",
      section: "Événements",
      mots: "hackathon ptn wutiko parc technologies numeriques numériques pitch concours bad 2024"
    },
    {
      titre: "Formation hybride DNS et DNSSEC",
      extrait: "Novembre 2022 — conférence publique puis atelier avec NIC Sénégal, l'ICANN, l'AFNIC et l'AFTLD.",
      page: "evenement-dnssec-2022.html",
      section: "Événements",
      mots: "dns dnssec atelier hybride icann afnic aftld nic senegal sénégal domaine securite sécurité 2022"
    },
    {
      titre: "Nous écrire",
      extrait: "Formulaire de contact, adresse du centre et plan d'accès.",
      page: "contact.html",
      section: "Contact",
      mots: "contact adresse telephone téléphone email mail ecrire écrire joindre venir plan carte"
    },
    {
      titre: "Où se trouve le CURI",
      extrait: "UCAD 3, Cité Claudel, allées Bougainvillées, Dakar.",
      page: "contact.html#acces",
      section: "Contact",
      mots: "adresse localisation lieu ou où situé claudel bougainvillees bougainvillées dakar ucad3 acces accès"
    },
    {
      titre: "Plateforme de cours",
      extrait: "Les cours, ressources et résultats des étudiants du centre.",
      page: "https://fad.curi.ucad.sn",
      section: "Lien externe",
      mots: "moodle cours en ligne ressources notes resultats résultats plateforme connexion"
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

  /** Score de pertinence ; 0 signifie « pas de correspondance ». */
  function scorer(entree, termes) {
    var titre = normaliser(entree.titre);
    var extrait = normaliser(entree.extrait);
    var mots = normaliser(entree.mots || "");
    var section = normaliser(entree.section || "");
    var total = 0;

    for (var i = 0; i < termes.length; i++) {
      var terme = termes[i];
      var point = 0;
      if (titre.indexOf(terme) === 0) point = 10;
      else if (titre.indexOf(terme) > -1) point = 7;
      else if (mots.indexOf(terme) > -1) point = 5;
      else if (section.indexOf(terme) > -1) point = 3;
      else if (extrait.indexOf(terme) > -1) point = 2;

      if (point === 0) return 0; // tous les termes doivent correspondre
      total += point;
    }
    return total;
  }

  function chercher(requete) {
    var termes = normaliser(requete).split(/\s+/).filter(Boolean);
    if (!termes.length) return [];

    return INDEX.map(function (entree) {
      return { entree: entree, score: scorer(entree, termes) };
    })
      .filter(function (ligne) {
        return ligne.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      })
      .slice(0, 6)
      .map(function (ligne) {
        return ligne.entree;
      });
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
      var termes = normaliser(requete).split(/\s+/).filter(Boolean);
      var resultats = chercher(requete);

      if (!requete.trim()) {
        fermerPanneau();
        panneau.innerHTML = "";
        return;
      }

      if (!resultats.length) {
        panneau.innerHTML =
          '<p class="recherche__vide">Aucun résultat pour <strong>' +
          echapper(requete) +
          "</strong>.<br>Essayez « formation », « contact » ou « dnssec ».</p>";
      } else {
        panneau.innerHTML = resultats
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
    var position = 0;
    var minuterie = null;
    var DUREE = 6500;

    var montrer = function (index) {
      position = (index + ecrans.length) % ecrans.length;
      ecrans.forEach(function (ecran, i) {
        ecran.classList.toggle("est-active", i === position);
        ecran.setAttribute("aria-hidden", i === position ? "false" : "true");
      });
      points.forEach(function (point, i) {
        point.setAttribute("aria-selected", i === position ? "true" : "false");
      });
    };

    var lancer = function () {
      if (mouvementReduit || ecrans.length < 2) return;
      arreter();
      minuterie = window.setInterval(function () {
        montrer(position + 1);
      }, DUREE);
    };

    var arreter = function () {
      if (minuterie) window.clearInterval(minuterie);
      minuterie = null;
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

    // On met en pause quand la personne survole ou navigue au clavier
    diapo.addEventListener("mouseenter", arreter);
    diapo.addEventListener("mouseleave", lancer);
    diapo.addEventListener("focusin", arreter);
    diapo.addEventListener("focusout", lancer);

    // On met aussi en pause quand l'onglet n'est pas visible
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) arreter();
      else lancer();
    });

    montrer(0);
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
})();
