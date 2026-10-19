# Site du CURI

Site du **Centre Universitaire de Recherche et de Formation aux Technologies
de l'Internet**, Université Cheikh Anta Diop de Dakar.

Ce dépôt est pensé pour être repris par les étudiants des promotions
suivantes. Tout est en HTML, CSS et JavaScript simples : **aucun outil à
installer**, aucune compilation. On ouvre un fichier, on modifie, on
enregistre.

---

## Démarrer en deux minutes

1. Télécharger ou cloner le dépôt.
2. Ouvrir `index.html` dans un navigateur.

Pour travailler plus confortablement (et que les liens entre pages marchent
comme en ligne), lancer un petit serveur local depuis le dossier du projet :

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000>.

---

## Les fichiers

```
index.html          Accueil
formation.html      Formations (3 spécialités, candidater, questions fréquentes)
debouches.html      Métiers et secteurs après le centre
equipe.html         Direction, enseignants, pôles
evenements.html     Événements et galerie photo
contact.html        Coordonnées, formulaire, plan d'accès

css/style.css       Toute la mise en forme (un seul fichier, commenté par section)
js/script.js        Tout le comportement (un seul fichier, commenté par section)

images/             Photos d'origine, telles que reçues
images/web/         Versions optimisées en WebP, utilisées par le site

robots.txt          Pour les moteurs de recherche
sitemap.xml         Liste des pages, pour les moteurs de recherche
```

---

## Les gestes courants

### Changer une couleur

Tout est en haut de `css/style.css`, dans le bloc `:root`. Par exemple le
bleu principal :

```css
--bleu: #17539c;
```

Changez la valeur une fois, elle s'applique partout.

### Ajouter une diapositive à l'accueil

Dans `index.html`, copier un bloc `<div class="diapo__ecran">` et ajouter un
bouton `<button class="diapo__point">` dans `.diapo__points`. Le script fait
défiler automatiquement et se met en pause au survol.

### Ajouter un événement

Dans `evenements.html`, copier un bloc `<article class="actu">` existant et
remplacer la date, le titre, le texte et l'image.

### Ajouter une photo à la galerie

1. Mettre la photo d'origine dans `images/`.
2. En créer une version web (voir « Préparer une image » plus bas).
3. Dans `evenements.html`, copier un bloc `<button class="galerie__element">`
   et remplacer `src`, `data-grand`, `alt`, `width`, `height` et
   `data-categorie`.

`data-categorie` doit valoir `atelier`, `promotion` ou `conference` pour que
les filtres fonctionnent.

### Ajouter une entrée dans la recherche

La recherche de l'en-tête lit un tableau en haut de `js/script.js`, appelé
`INDEX`. Copier une entrée et modifier les champs :

```js
{
  titre: "Nom affiché en gras",
  extrait: "Une phrase de description.",
  page: "formation.html#candidater",
  section: "Formations",
  mots: "mots clés supplémentaires séparés par des espaces"
}
```

Les accents ne comptent pas : chercher « evenement » trouve « événement ».

### Changer un texte dans l'en-tête ou le pied de page

L'en-tête et le pied de page sont **recopiés dans les six pages** : c'est la
contrepartie d'un site sans outil de compilation. Si vous modifiez un lien du
menu ou du pied de page, faites-le dans les six fichiers, sinon les pages ne
seront plus cohérentes.

### Préparer une image

Les photos d'appareil photo sont trop lourdes pour le web. Pour en créer une
version légère, depuis le dossier du projet :

```bash
python3 -c "
from PIL import Image
im = Image.open('images/ma-photo.jpg').convert('RGB')
im.thumbnail((1200, 1200))
im.save('images/web/ma-photo-1200.webp', 'WEBP', quality=80)
"
```

Règle simple : **viser moins de 200 Ko par image**.

---

## Le formulaire de contact

Le site est hébergé en pages statiques (GitHub Pages) : il n'y a pas de
serveur pour recevoir les messages. Le formulaire vérifie les champs puis
ouvre le logiciel de messagerie du visiteur avec le message déjà écrit.

**C'est volontaire et c'est honnête** : l'ancienne version affichait
« message envoyé avec succès » sans rien envoyer.

Pour un envoi direct depuis la page, il faut brancher un service d'envoi
gratuit (Formspree, Web3Forms, EmailJS…). Tout se passe dans la section 9 de
`js/script.js` : remplacer la construction du lien `mailto:` par un appel au
service choisi.

---

## Ce qui reste à confirmer

Ces éléments apparaissent sur le site avec la mention « à confirmer ». Ils
doivent être validés par la direction du centre avant d'être publiés :

- les modules de chaque spécialité ;
- les conditions d'admission, les pièces du dossier et la période de dépôt ;
- les frais de scolarité ;
- le calendrier universitaire ;
- les horaires d'accueil ;
- les noms et photos de l'équipe ;
- les dates et comptes rendus des événements ;
- les témoignages d'anciens étudiants ;
- les chiffres d'insertion professionnelle.

### Sources des informations déjà publiées

- Adresse, téléphone, partenaires et atelier DNSSEC : affiche officielle du
  centre (`images/affiche.jpg`) et site <https://www.curi.sn>.
- Spécialités, date de création (février 2021), gestion du `.sn` confiée à
  l'UCAD depuis 1993 : <https://www.curi.sn>.
- Plateforme de cours : <https://fad.curi.ucad.sn>.

---

## Règles à garder

Ces règles ont guidé la refonte. Les respecter évite de casser ce qui marche.

**Accessibilité**

- Chaque image de contenu a un `alt` qui décrit ce qu'on voit. Les images
  décoratives ont `alt=""`.
- Les éléments cliquables sont de vrais `<a>` ou `<button>`, jamais des
  `<div>`. Sinon le clavier ne peut pas les atteindre.
- Ne jamais supprimer le contour de focus (`:focus-visible`) : c'est ce qui
  permet de naviguer au clavier.
- Le site respecte le réglage « réduire les animations » du système.

**Performance**

- Les images utilisent `loading="lazy"` et des `width`/`height` : cela évite
  que la page saute pendant le chargement.
- Pas de vidéo en lecture automatique sur l'accueil. Le fichier
  `images/accueil.mp4` pèse près de 10 Mo et n'est plus utilisé.

**Contenu**

- Ne jamais inventer un chiffre, une date ou un nom. S'il manque une
  information, utiliser la mention :
  `<span class="a-confirmer">Donnée à confirmer</span>`.
- Demander l'accord d'une personne avant de publier sa photo ou son nom.

**Polices**

Le texte est en **Rubik**, chargée depuis Google Fonts. Les titres sont en
**Georgia**, une police déjà présente sur la plupart des appareils : rien à
télécharger, et un repli serif propre là où elle manque. C'est le même choix
que le site de l'UAM, qui a servi de référence.

Pour un site qui fonctionne sans dépendance extérieure, on peut télécharger
Rubik (licence libre SIL OFL), la placer dans un dossier `fonts/` et la
déclarer avec `@font-face` dans `css/style.css`.

**Mise en page**

Les titres de section sont centrés, précédés d'une petite ligne en capitales
(`.tete__sur`). Le contenu tient dans un conteneur de 1140 px (`.enveloppe`).
Les sections alternent fond blanc, fond gris clair (`.section--gris`) et fond
bleu nuit (`.section--marine`).

Les blocs marqués `.apparait` se révèlent au défilement. L'effet ne
s'applique que si le JavaScript a pu marquer la page : sans JavaScript, tout
reste visible. Ne retirez pas cette sécurité.

---

## Publier les modifications

Le site est déployé depuis la branche principale. Le travail se fait sur une
branche séparée, puis on fusionne une fois la relecture faite.

```bash
git checkout -b ma-branche
# ... modifications ...
git add .
git commit -m "Décrire le changement"
git push origin ma-branche
```

Ensuite, ouvrir une pull request sur GitHub et demander une relecture.
