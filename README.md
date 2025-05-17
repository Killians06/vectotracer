# Dibond Caisson 3D Preview

Une application React pour la prévisualisation 3D interactive d’un caisson Dibond avec plis et perçages, basée sur [React Three Fiber](https://github.com/pmndrs/react-three-fiber).

---

## Fonctionnalités

- Visualisation 3D d’une face Dibond avec retours pliés sur la profondeur du pli.
- Épaisseur réaliste fixée à 3 mm.
- Perçages de 3 mm de diamètre aux coins et bords pour montage.
- Contrôle de la caméra avec orbite (rotation, zoom, déplacement).
- Affichage dynamique selon les dimensions et profondeur spécifiées.
- Exportation des graphiques vectoriels au format **SVG** et **DXF**.
- Interface utilisateur moderne et réactive grâce à **Tailwind CSS**.

---

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/ton-utilisateur/dibond-caisson-3d.git
   cd dibond-caisson-3d
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Lancer l'application en mode développement :
   ```bash
   npm start
   ```

4. Ouvrir l'application dans votre navigateur à l'adresse suivante :
   ```
   http://localhost:3000
   ```

---

## Structure du projet

- **`src/components`** : Contient les composants React principaux, comme `VectorDrawer`, `ExportButtons` et `Previsualisation3D`.
- **`src/utils`** : Contient les utilitaires pour l'exportation des fichiers SVG et DXF.
- **`src/styles`** : Fichiers de style configurés avec **Tailwind CSS**.

---

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer :

1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité ou correction de bug :
   ```bash
   git checkout -b ma-fonctionnalite
   ```
3. Faites vos modifications et validez-les :
   ```bash
   git commit -m "Ajout de ma fonctionnalité"
   ```
4. Poussez vos modifications :
   ```bash
   git push origin ma-fonctionnalite
   ```
5. Ouvrez une Pull Request.

---

## Licence

Ce projet est sous licence [MIT](LICENSE).

---

## Auteur

Développé par **[Votre Nom ou Pseudo]**. N'hésitez pas à me contacter pour toute question ou suggestion !

