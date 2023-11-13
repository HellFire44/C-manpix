let previousCategory = document.getElementById('category-select').value;

document.getElementById('category-select').addEventListener('change', function() {
    document.getElementById('results').innerHTML = '';
    previousCategory = this.value;
});

document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateProximity();
    }
});

function calculateProximity() {
    const category = document.getElementById('category-select').value;

    // Vérifier si la catégorie a changé
    if (category !== previousCategory) {
        document.getElementById('results').innerHTML = '';
        previousCategory = category;
    }

    const targetWord = targetWords[category];
    const userInput = document.getElementById('user-input').value.toLowerCase();

    let proximityScore = calculateScore(userInput, targetWord);
    displayResult(userInput, proximityScore);
}

const targetWords = {
    "Technologie": "ordinateur",
    "Nature": "forêt",
    "Science": "chimie",
    "Littérature": "roman",
    "Musique": "mélodie",
    "Géographie": "montagne",
    "Cuisine": "recette",
    "Sport": "football"
};

function calculateScore(input, target) {
    let commonChars = 0;
    for (let char of input) {
        if (target.includes(char)) {
            commonChars++;
        }
    }
    
    return (commonChars / target.length * 100).toFixed(2);
}

function displayResult(word, score) {
    const resultsList = document.getElementById('results');
    const color = `hsl(${120 * (score / 100)}, 100%, 50%)`; // Vert à 100%, rouge à 0%
    const listItem = `<li style="color: ${color}">${word}: ${score}% de proximité</li>`;
    resultsList.innerHTML = listItem + resultsList.innerHTML;
}
