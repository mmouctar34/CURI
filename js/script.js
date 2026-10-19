/* ==========================================================================
   CURI — Scripts du site
   Centre Universitaire de Recherche et de Formation aux Technologies
   de l'Internet — Université Cheikh Anta Diop de Dakar

   Ce fichier est volontairement écrit en JavaScript simple, sans
   bibliothèque, pour qu'un étudiant puisse le reprendre et le modifier.

   Sommaire :
     1.  Index de recherche          — le seul endroit à modifier pour la recherche
     2.  Outils communs
     3.  En-tête collant
     4.  Menu mobile
     5.  Recherche dans l'en-tête
     6.  Compteurs de chiffres
     7.  Accordéon
     8.  Galerie et visionneuse
     9.  Formulaire de contact
     10. Année du pied de page
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
      mots: "metier métier emploi travail carriere carrière salaire embauche stage insertion"
    },
    {
      titre: "L'équipe du CURI",
      extrait: "Direction, enseignants-chercheurs et équipe administrative du centre.",
      page: "equipe.html",
      section: "Équipe",
      mots: "enseignant professeur directeur personnel encadrement contact responsable"
    },
    {
      titre: "Événements et actualités",
      extrait: "Ateliers, hackathons, conférences et remises de diplômes du centre.",
      page: "evenements.html",
      section: "Événements",
      mots: "actualite actualité news hackathon atelier conference conférence ceremonie cérémonie"
    },
    {
      titre: "Atelier DNS et DNSSEC",
      extrait: "Formation hybride organisée avec NIC Sénégal, l'ICANN, l'AFNIC et l'AFTLD.",
      page: "evenements.html#dnssec",
      section: "Événements",
      mots: "dns dnssec atelier formation hybride icann afnic aftld nic securite sécurité"
    },
    {
      titre: "Laboratoire réalité virtuelle et augmentée",
      extrait: "Le centre dispose d'un laboratoire AR/VR utilisé en atelier.",
      page: "evenements.html#labo",
      section: "Événements",
      mots: "vr ar realite réalité virtuelle augmentee augmentée casque laboratoire labo immersif"
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
      mots: "moodle cours en ligne ressources notes resultats résultats plateforme etudiant étudiant connexion"
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
     3. En-tête collant : ombre une fois la page défilée
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
    document.body.classList.remove("menu-ouvert");
  }

  if (bascule && tiroir) {
    bascule.addEventListener("click", function () {
      var ouvert = bascule.getAttribute("aria-expanded") === "true";
      if (ouvert) {
        fermerMenu();
        return;
      }
      bascule.setAttribute("aria-expanded", "true");
      bascule.setAttribute("aria-label", "Fermer le menu");
      tiroir.classList.add("est-ouvert");
      document.body.classList.add("menu-ouvert");
    });

    // Fermer en cliquant un lien du tiroir
    $$("a", tiroir).forEach(function (lien) {
      lien.addEventListener("click", fermerMenu);
    });

    // Fermer si la fenêtre repasse en version bureau
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1000) fermerMenu();
    });
  }

  /* ========================================================================
     5. Recherche fondue dans l'en-tête
     ===================================================================== */

  /** Calcule un score de pertinence ; 0 signifie « pas de correspondance ». */
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

  /**
   * Met en évidence les termes trouvés, sans tenir compte des accents.
   * On cherche les positions sur la version sans accent, puis on découpe
   * le texte d'origine aux mêmes positions.
   */
  function surligner(texte, termes) {
    var sansAccent = normaliser(texte);

    // Sécurité : si la normalisation a changé la longueur, on renonce au
    // surlignage plutôt que de couper le texte au mauvais endroit.
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

    // Fusionne les plages qui se chevauchent
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
    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';

  function installerRecherche(conteneur, champ, panneau) {
    if (!champ || !panneau) return;

    var resultats = [];

    function fermerPanneau() {
      panneau.classList.remove("est-visible");
      champ.setAttribute("aria-expanded", "false");
    }

    function dessiner(requete) {
      var termes = normaliser(requete).split(/\s+/).filter(Boolean);
      resultats = chercher(requete);

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

    // Navigation au clavier dans la liste
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
     6. Compteurs de chiffres — une seule fois, à l'entrée dans l'écran
     ===================================================================== */

  var compteurs = $$("[data-compteur]");

  if (compteurs.length && "IntersectionObserver" in window) {
    var animerCompteur = function (element) {
      var cible = parseFloat(element.getAttribute("data-compteur"));
      if (isNaN(cible)) return;
      if (mouvementReduit) {
        element.textContent = cible.toLocaleString("fr-FR");
        return;
      }
      var duree = 1100;
      var depart = performance.now();

      var pas = function (maintenant) {
        var avancement = Math.min((maintenant - depart) / duree, 1);
        // Courbe douce en fin de course
        var douceur = 1 - Math.pow(1 - avancement, 3);
        element.textContent = Math.round(cible * douceur).toLocaleString("fr-FR");
        if (avancement < 1) requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
    };

    var observateur = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (entree) {
          if (!entree.isIntersecting) return;
          animerCompteur(entree.target);
          observateur.unobserve(entree.target);
        });
      },
      { threshold: 0.4 }
    );

    compteurs.forEach(function (element) {
      observateur.observe(element);
    });
  } else {
    compteurs.forEach(function (element) {
      var cible = parseFloat(element.getAttribute("data-compteur"));
      if (!isNaN(cible)) element.textContent = cible.toLocaleString("fr-FR");
    });
  }

  /* ========================================================================
     7. Accordéon
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
     8. Galerie : filtres et visionneuse
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

    var afficher = function (position) {
      var liste = elementsVisibles();
      if (!liste.length) return;
      positionVue = (position + liste.length) % liste.length;
      var bouton = liste[positionVue];
      var image = $("img", bouton);
      if (!image) return;
      imageVue.src = image.getAttribute("data-grand") || image.src;
      imageVue.alt = image.alt;
      if (legendeVue) legendeVue.textContent = image.alt;
    };

    var ouvrirVisionneuse = function (position, source) {
      declencheur = source || null;
      afficher(position);
      visionneuse.classList.add("est-ouverte");
      visionneuse.removeAttribute("aria-hidden");
      document.body.classList.add("menu-ouvert");
      var fermer = $(".visionneuse__fermer", visionneuse);
      if (fermer) fermer.focus();
    };

    var fermerVisionneuse = function () {
      visionneuse.classList.remove("est-ouverte");
      visionneuse.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-ouvert");
      if (declencheur) declencheur.focus();
    };

    $$(".galerie__element", galerie).forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        var liste = elementsVisibles();
        ouvrirVisionneuse(liste.indexOf(bouton), bouton);
      });
    });

    var precedent = $(".visionneuse__precedent", visionneuse);
    var suivant = $(".visionneuse__suivant", visionneuse);
    var fermerBouton = $(".visionneuse__fermer", visionneuse);

    if (precedent) {
      precedent.addEventListener("click", function () {
        afficher(positionVue - 1);
      });
    }
    if (suivant) {
      suivant.addEventListener("click", function () {
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
     9. Formulaire de contact

     Le site est hébergé en pages statiques : il n'y a pas de serveur pour
     recevoir les messages. Le formulaire vérifie les champs puis ouvre le
     logiciel de messagerie de la personne avec le message pré-rempli.
     Pour un envoi direct, il faudra brancher un service d'envoi (Formspree,
     Web3Forms, EmailJS…) à la place de la fonction envoyer() ci-dessous.
     ===================================================================== */

  var formulaire = $("#formulaire-contact");

  if (formulaire) {
    var ADRESSE_DESTINATAIRE = "curi@ucad.edu.sn";

    var regles = {
      nom: function (valeur) {
        if (!valeur.trim()) return "Indiquez votre nom.";
        return "";
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

      var nom = formulaire.elements.nom.value.trim();
      var email = formulaire.elements.email.value.trim();
      var sujetChamp = formulaire.elements.sujet;
      var sujet = sujetChamp && sujetChamp.value.trim()
        ? sujetChamp.value.trim()
        : "Message depuis le site du CURI";
      var message = formulaire.elements.message.value.trim();

      var corps =
        message +
        "\n\n— — —\n" +
        nom +
        "\n" +
        email +
        "\nMessage envoyé depuis le site du CURI.";

      var lien =
        "mailto:" +
        ADRESSE_DESTINATAIRE +
        "?subject=" +
        encodeURIComponent(sujet) +
        "&body=" +
        encodeURIComponent(corps);

      if (etat) {
        etat.hidden = false;
        etat.setAttribute("data-ton", "info");
        etat.textContent =
          "Votre logiciel de messagerie va s'ouvrir avec le message prêt à envoyer. S'il ne s'ouvre pas, écrivez directement à " +
          ADRESSE_DESTINATAIRE +
          ".";
      }

      window.location.href = lien;
    });
  }

  /* ========================================================================
     10. Année du pied de page
     ===================================================================== */

  $$("[data-annee]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
})();
