const axios = require('axios');
const fs = require('fs');

// Obtenir la date actuelle
const date = new Date();
const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// Obtenir une citation inspirante
axios.get('https://zenquotes.io/api/random')
  .then(response => {
    const quote = response.data[0].q;
    const author = response.data[0].a;

    // Lire le contenu actuel du README.md
    let readme = fs.readFileSync('README.md', 'utf8');

    // Ajouter la date, la citation et l'auteur à la fin du README.md
    readme += `\n\n${dateString}: "${quote}" - ${author}`;

    // Écrire le nouveau contenu dans le fichier README.md
    fs.writeFileSync('README.md', readme, 'utf8');

    console.log('README.md a été mis à jour avec succès.');
  })
  .catch(error => {
    console.error(error);
  });