import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';

// Obtenir la date actuelle
const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const year = date.getFullYear();

const dateString = `${year}-${month}-${day}`;

// Obtenir une citation inspirante
axios.get('https://zenquotes.io/api/random')
  .then(response => {
    const quote = response.data[0].q;
    const author = response.data[0].a;

    // Lire le contenu actuel du README.md
    let readme = readFileSync('README.md', 'utf8');

    // Supprimer la citation précédente
    const regex = /\n\n\d{4}-\d{2}-\d{2}: ".*" - .*$/;
    readme = readme.replace(regex, '');

    // Ajouter la date, la citation et l'auteur à la fin du README.md
    readme += `\n\n${dateString}: "${quote}" - ${author}`;

    // Écrire le nouveau contenu dans le fichier README.md
    writeFileSync('README.md', readme, 'utf8');

    console.log('README.md a été mis à jour avec succès.');
  })
  .catch(error => {
    console.error(error);
  });