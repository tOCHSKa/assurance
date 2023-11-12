let couleurDiv = document.getElementById('bouton');

function verifierAssurance() {
    // Récupérer les valeurs des champs
    let age = document.getElementById('age').value;
    let permis = document.getElementById('permis').value;
    let acc = document.getElementById('acc').value;
    let anneeFidelite = document.getElementById('anneeFidelite').value;

    // Construire un objet avec les données
    let donnees = {
        age: age,
        permis: permis,
        acc: acc,
        anneeFidelite: anneeFidelite
    };

    // Effectuer une requête Fetch POST pour envoyer les données au serveur
    effectuerRequete('http://localhost/Assurance/back/process.php', donnees);
}

window.addEventListener('load', () => {
    // Vous pouvez initialiser les valeurs ici si nécessaire
    // ...

    // Effectuer une requête Fetch POST au chargement de la page (exemple)
    // effectuerRequete('http://localhost/Assurance/back/process.php', {});
});

// Fonction réutilisable pour effectuer une requête Fetch POST
function effectuerRequete(url, data) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Réagir à la réponse du serveur
            if (data.color) {
                couleurDiv.style.background = data.color;
            } else {
                couleurDiv.innerHTML = data.message || "Erreur inattendue";
                couleurDiv.style.background = data.color;
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}
