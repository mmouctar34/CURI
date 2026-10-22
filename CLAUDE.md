# Notes pour Claude Code

Ce fichier est le point d'entrée pour toute session de travail sur ce dépôt.
Lis-le en entier avant de modifier quoi que ce soit.

---

## 1. Le projet

Site institutionnel du **CURI** — Centre Universitaire de Recherche et de
Formation aux Technologies de l'Internet, Université Cheikh Anta Diop de
Dakar.

- **Pile technique :** HTML, CSS et JavaScript simples. **Aucune compilation,
  aucune dépendance, aucun gestionnaire de paquets.** C'est un choix assumé :
  le site doit rester reprenable par des étudiants du centre, promotion après
  promotion.
- **Hébergement :** GitHub Pages, depuis la branche par défaut.
- **Langue :** tout est en français — le contenu, les commentaires, et les
  noms de classes CSS et de variables JavaScript.

Le propriétaire du dépôt est un étudiant du CURI. Le site est un héritage
laissé aux promotions suivantes.

---

## 2. État des branches — à lire avant de pousser

| Branche | Contenu | Statut |
| --- | --- | --- |
| `main` | L'ancien site, celui qui est déployé en ligne aujourd'hui | **Ne pas y toucher sans accord explicite** |
| `refonte-2026` | La refonte complète, en attente de validation | Branche de travail |

La refonte n'est **pas** fusionnée. Le propriétaire veut relire et valider
avant que `main` ne bouge. Travaille sur `refonte-2026` ou sur une branche
qui en part.

Trois commits composent la refonte :

1. `2812134` — refonte complète : structure, accessibilité, performance
2. `fbba1a0` — direction visuelle reprise de uam.sn
3. `3561dad` — contenus réels des événements, recentrage sur le CURI

---

## 3. Ce qui s'est passé avant toi

Trois propositions visuelles ont été faites. Les deux premières ont été
rejetées. Ce qui a été appris, et qu'il vaut mieux ne pas refaire :

- **Ne pas inventer une direction visuelle « originale ».** Les deux premières
  tentatives partaient d'un parti pris personnel ; le retour a été « ça ne
  ressemble vraiment pas à ce que je veux » et « c'est trop en arrière ».
- **La référence est [uam.sn](https://uam.sn)**, le site de l'Université
  Amadou Mahtar Mbow. Le propriétaire l'a désigné explicitement, y compris
  pour sa police. La troisième version relève les valeurs réelles de ce site
  et les applique avec les couleurs du CURI. C'est cette version qui a été
  retenue.
- **Ce qui manquait le plus n'était pas le style mais le contenu.** Le retour
  décisif : « quand je vois un événement, je dois pouvoir lire ce qui s'est
  passé ». Des cartes qui ne mènent nulle part et des dates « à confirmer »
  font paraître un site faux, même bien dessiné. D'où les six pages
  d'articles.

**Si le propriétaire demande un changement de direction visuelle, demande-lui
un ou deux sites de référence avant de coder.** Les descriptions verbales
(« moderne », « fluide ») ont mené à deux impasses.

---

## 4. Direction visuelle (valeurs relevées sur uam.sn)

| Élément | Valeur |
| --- | --- |
| Texte courant | **Rubik**, 16 px, interligne 1,7 |
| Titres | **Georgia**, graisse 600/700, interlettrage **−1 px** |
| Conteneur | **1140 px** (`--conteneur`) |
| Titres de section | **centrés**, précédés d'une ligne en capitales (`.tete__sur`) |
| Formes | aplats de couleur pleine, **angles droits**, pas d'ombres portées |

Georgia est une police système : rien à télécharger, repli serif propre là où
elle manque. Rubik vient de Google Fonts.

Les couleurs sont dans `:root`, en haut de `css/style.css`. **Depuis le
22 oct. 2026, ce sont celles du logo de l'UCAD : bleu ciel, noir, blanc.
Plus d'or ni d'orange** (demande du propriétaire).

```css
--marine: #0a1a2c;        /* fonds sombres, pied de page */
--bleu: #1b6ea8;          /* couleur principale, boutons */
--bleu-clair: #2892cc;    /* le bleu exact du logo UCAD */
--accent: #2892cc;        /* accent (remplace l'ancien or) */
--accent-clair: #7cc4ee;  /* accent sur fond sombre */
--accent-texte: #17679b;  /* accent lisible sur fond blanc */
```

Le bleu vif du logo n'est **jamais** utilisé comme couleur de texte sur
blanc : le contraste est insuffisant. Utilise `--accent-texte`.

**Logo de l'en-tête :** `images/web/logo-ucad-curi.png`, le logo UCAD + CURI
du site en ligne. Le propriétaire veut exactement celui-là, ne pas le changer.

**Seule exception au bleu :** le bouton de lecture de la vidéo est rouge
(rouge « YouTube », triangle blanc), à la demande du propriétaire.

---

## 5. Organisation des fichiers

```
index.html                      Accueil (diaporama, chiffres, formations, actualités…)
formation.html                  Les trois spécialités, candidater, questions fréquentes
debouches.html                  Métiers et secteurs
equipe.html                     Mission, direction, enseignants, pôles
evenements.html                 Liste des événements + galerie
contact.html                    Coordonnées, formulaire, plan d'accès

evenement-colab-2025.html       \
evenement-leadership-2025.html   |
evenement-laboratoire-2024.html  |  Un article par événement
evenement-senagro-2024.html      |
evenement-hackathon-2024.html    |
evenement-dnssec-2022.html      /

css/style.css                   Toute la mise en forme, un seul fichier commenté par section
js/script.js                    Tout le comportement, un seul fichier commenté par section

images/                         Photos d'origine, telles que reçues du centre
images/web/                     Versions optimisées en WebP, utilisées par le site

README.md                       Guide pour les étudiants qui reprendront le site
robots.txt, sitemap.xml         Référencement
```

### Piège principal : l'en-tête et le pied de page sont dupliqués

Il n'y a pas de système de gabarits. La barre du haut, l'en-tête, le menu
mobile et le pied de page sont **recopiés à l'identique dans les 12 pages**.

Si tu modifies un lien de menu, le pied de page ou les coordonnées, tu dois
le faire **dans les 12 fichiers**. Un script de synchronisation serait utile
mais n'existe pas encore ; les pages ont été générées une fois par un script
jeté après usage.

Vérifie toujours après coup :

```bash
grep -c 'barre-haut__interieur' *.html   # doit valoir 1 partout
```

---

## 6. Ce que fait `js/script.js`

Le fichier est découpé en sections numérotées et commentées :

1. **Index de recherche** — un tableau `INDEX` en haut du fichier. C'est le
   seul endroit à modifier pour que la recherche trouve une nouvelle page.
2. Outils communs (`$`, `$$`, `normaliser`, `echapper`)
3. En-tête collant
4. Menu mobile
5. Recherche fondue dans l'en-tête (insensible aux accents, navigable au
   clavier, raccourci `/`)
6. Diaporama d'accueil (quatre vues, pause au survol et hors onglet)
7. Carrousels (défilement par `scroll-snap`, boutons désactivés aux extrémités)
8. Apparition au défilement
9. Accordéon
10. Galerie et visionneuse
11. Formulaire de contact
12. Année du pied de page

---

## 7. Règles à ne pas casser

**Le contenu ne doit jamais dépendre du JavaScript pour s'afficher.**
Les blocs `.apparait` ne sont masqués que si une classe `js` a été posée sur
`<html>` par le script en ligne présent dans chaque `<head>`. Sans
JavaScript, tout reste visible. Ne supprime ni ce script en ligne, ni le
sélecteur `.js .apparait` dans le CSS.

**Ne jamais inventer un chiffre, une date, un nom ou un module.**
Quand une information manque, elle s'écrit :

```html
<span class="a-confirmer">Donnée à confirmer</span>
```

Le site en compte plusieurs. C'est volontaire, et c'est préférable à une
invention plausible.

**Le formulaire de contact n'envoie rien par lui-même.**
Le site est statique : il n'y a pas de serveur. Le formulaire valide les
champs puis ouvre le logiciel de messagerie avec le message pré-rempli.
C'est assumé — l'ancienne version affichait « message envoyé avec succès »
sans rien envoyer. Pour un envoi réel, brancher un service (Formspree,
Web3Forms, EmailJS) à la place du `mailto:` dans la section 11 du script.

**Accessibilité.**
Vrais `<a>` et `<button>`, jamais de `div` cliquable. `alt` descriptif sur
les images de contenu, `alt=""` sur les décoratives. Ne retire pas le
contour de `:focus-visible`. Le réglage « réduire les animations » du système
est respecté.

**Performance.**
Images en WebP avec `srcset`, `loading="lazy"` et `width`/`height` déclarés.
Le fichier `images/accueil.mp4` (près de 10 Mo) n'est plus utilisé : ne le
remets pas.

**Photos de personnes.**
Demander l'accord de la personne avant de publier son nom ou son portrait.

---

## 8. Informations vérifiées, et leurs sources

Ces éléments sont sourcés. Ne les modifie pas sans raison.

| Information | Source |
| --- | --- |
| Création du centre : **février 2021** | [curi.sn](https://www.curi.sn) et l'article SenAgro du site actuel |
| Adresse : **UCAD 3, Cité Claudel, allées Bougainvillées, Dakar** | affiche officielle `images/affiche.jpg` et curi.sn |
| Téléphone : **+221 33 821 91 90** | affiche officielle et curi.sn |
| E-mail : **curi@ucad.edu.sn** | curi.sn |
| Trois spécialités : développement web et mobile, technologie web et multimédia, e-commerce et marketing digital | curi.sn |
| Trois types de formation : initiale, continue, certifiante | curi.sn |
| Directeur : **Pr Idrissa Sarr** | articles du site actuel du CURI |
| Domaine national `.sn` confié à l'UCAD **depuis 1993**, via NIC Sénégal | curi.sn |
| Partenaires des ateliers DNS : **NIC Sénégal, ICANN, AFNIC, AFTLD** | affiche officielle |
| **100+** étudiants par an (admission sélective), **20+** enseignants, **2 000+** diplômés, **2 ans** de formation | décision du propriétaire, 22 oct. 2026 (remplace les 200+ de l'ancien site) |
| Programme S1 à S4, diplômes (DES), admission par CampuSen après le BAC (toutes séries, sans concours), horaires d'accueil, équipe, métiers, témoignages | site actuellement déployé (branche `main`), repris à la demande du propriétaire |
| Trois missions : formations diplômantes et certifiantes, recherche et innovation, service à la communauté / gestion du .sn | page LinkedIn officielle du CURI |
| Les six événements : dates, lieux, partenaires, citations | articles du site actuellement déployé |

Une incohérence a été tranchée en cours de route : l'ancien site indiquait
« Campus UCAD, Fann Résidence ». Deux sources officielles donnent **Cité
Claudel**. C'est Cité Claudel qui a été retenu.

---

## 9. Ce qui reste à faire

### Session du 22 oct. 2026 (fusion avec le site en ligne)

Le propriétaire aime la **structure et les contenus** du site en ligne
(`main`) et le **style** de la refonte. On reprend donc tous les contenus de
`main` dans la refonte, avec le style uam.sn et les couleurs UCAD. Fait :
logo UCAD/CURI, accueil « Bienvenue au CURI » (diaporama plein écran animé
façon uam.sn, chiffres qui défilent, vidéo YouTube, témoignages, partenaires
en bas, galerie défilante), encart « en savoir plus » retiré de toutes les
pages, programme complet en onglets sur Formations, Débouchés / Équipe /
Contact complétés. Le texte d'accueil du diaporama reste fixe (seules les
photos changent). Poursuite d'études, stages et insertion : **sur
recommandation du CURI, hautement sélectif, stages non obligatoires**
(précision du propriétaire). Pas d'« équipe technique » : M. Corentin et
M. Kasse figurent parmi les enseignants. Sauvegarde du site en ligne : étiquette git
`sauvegarde-site-en-ligne-2026-10-22`.

En attente d'une réponse du propriétaire :
- **Équipe** : la page `curi.sn/personnels` (site officiel) donne une liste
  plus complète et parfois différente de celle du site en ligne (fonctions
  de M. Kebe et de Mme/Mlle Aïdara, M. Diandy absent). Demander laquelle
  publier.
- Articles du site en ligne absents de la refonte : « Ouverture des
  inscriptions 2025–2026 » (date limite passée) et « Hackathon CICES 2026 ».
- Section « Former, et faire tourner le .sn » de l'accueil : garder ou non.
- Événements à trouver sur Facebook / LinkedIn / X : ces pages ne montrent
  rien sans connexion ; il faut que le propriétaire fournisse les contenus.

### Liste d'origine

Par ordre d'importance :

1. **Obtenir les informations marquées « à confirmer »** auprès de la
   direction du centre : modules de chaque spécialité, conditions
   d'admission et pièces du dossier, frais de scolarité, calendrier
   universitaire, horaires d'accueil, noms et photos de l'équipe,
   témoignages d'anciens, chiffres d'insertion.
2. **Trancher la question de l'hébergement.** Le dépôt est public, donc le
   site l'est aussi. GitHub Pages en version gratuite n'accepte que les
   dépôts publics. Si le projet doit rester non exposé, il faut un autre
   hébergeur (Cloudflare Pages, par exemple).
3. **Brancher le formulaire de contact** sur un service d'envoi.
4. **Vérifier la carte Google Maps** : elle pointe la Cité Claudel, pas le
   bâtiment exact. Remplacer par le lien d'intégration officiel du centre.
5. **Héberger Rubik en local** plutôt que via Google Fonts, pour la vitesse
   et l'indépendance.
6. **Écrire un script de synchronisation** de l'en-tête et du pied de page
   entre les 12 pages.
7. **Fusionner vers `main`** une fois la validation obtenue.

Un audit détaillé du site d'origine (design, performance, accessibilité,
référencement, qualité du code) a été produit en amont de ce travail ; le
propriétaire peut le fournir.

---

## 10. Comment vérifier ton travail

Il n'y a pas de tests automatisés. Avant de livrer :

```bash
# Servir le site localement
python3 -m http.server 8000

# Images référencées mais absentes
for f in *.html; do
  grep -oE '(src|data-grand)="images/[^"]+"' "$f" | sed -E 's/.*="//;s/"$//' | sort -u |
  while read -r i; do [ -e "$i" ] || echo "$f -> $i"; done
done

# Liens internes cassés
for f in *.html; do
  grep -oE 'href="[^":#]+\.html' "$f" | sed 's/href="//' | sort -u |
  while read -r l; do [ -e "$l" ] || echo "$f -> $l"; done
done

# Syntaxe du JavaScript
node --check js/script.js
```

À contrôler ensuite dans un navigateur, sur chaque page touchée :

- aucune erreur dans la console ;
- **aucun débordement horizontal à 360 px de large** ;
- le menu mobile s'ouvre et se ferme, y compris avec Échap ;
- la recherche de l'en-tête trouve « evenement » sans accent ;
- le diaporama défile et se met en pause au survol ;
- la galerie s'agrandit au clic et se navigue aux flèches du clavier.

---

## 11. Travailler avec le propriétaire

- Il s'exprime en français, souvent à la voix : les messages peuvent contenir
  des approximations de transcription (« le curé » pour « le CURI », « Nick
  Sénégal » pour « NIC Sénégal »).
- Il valide visuellement. Un aperçu déployé vaut mieux qu'une description.
- Il a demandé explicitement que rien ne soit publié ni fusionné sans son
  accord.
