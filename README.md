# Live Coding : Node Typescript

> 15/03/2023

## Description

Dans ce live coding, nous convertissons notre application NodeJS existante en Typescript.

J'ai ici fait le choix des classes, mais vous pouvez très bien utiliser des fonctions dans un objet.

Dans le cas de l'utilisation des classes, vous noterez que nous sommes obligés d'utiliser le mot clé `new` pour instancier nos classes et la méthode `bind` pour lier le contexte de nos fonctions.

En outre, on conserve beaucoup de répétition dans cette correction, notamment dans les contrôleurs. Nous pourrions refactoriser le code pour éviter cette répétition.

## Installation

```bash
git clone https://github.com/alexisbouchez/livecoding-node-typescript.git
cd livecoding-node-typescript
npm install
```

## Lancement en mode développement

```bash
npm run dev
```

## Lancement en mode production

```bash
npm run start
```
