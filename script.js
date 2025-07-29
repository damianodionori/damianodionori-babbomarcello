// Array di proverbi tipici italiani (versione goliardica)
const proverbi = [
    "Chi va piano, va sano e va lontano... ma chi va forte, va in ospedale!",
    "Meglio un uovo oggi che una gallina domani... ma meglio ancora una pizza oggi!",
    "Chi dorme non piglia pesci... ma almeno riposa bene!",
    "L'erba del vicino è sempre più verde... finché non la devi tagliare tu!",
    "Chi la dura la vince... ma chi la piglia la perde!",
    "Non c'è trippa per gatti... ma c'è sempre pasta per tutti!",
    "Chi va con lo zoppo impara a zoppicare... ma almeno ha una scusa per essere lento!",
    "Meglio tardi che mai... ma meglio ancora puntuale!",
    "Chi non risica non rosica... ma chi risica troppo finisce in ospedale!",
    "L'unione fa la forza... ma la divisione fa la pace!",
    "Chi troppo vuole nulla stringe... ma chi nulla vuole dorme tranquillo!",
    "A caval donato non si guarda in bocca... ma si controlla se ha i documenti!",
    "Chi va a Roma perde la poltrona... ma almeno vede il Colosseo!",
    "Meglio soli che male accompagnati... ma meglio ancora con una birra!",
    "Chi ha tempo non aspetti tempo... ma chi non ha tempo aspetti pure!",
    "L'occasione fa l'uomo ladro... ma la polizia fa l'uomo onesto!",
    "Chi non lavora non mangia... ma chi lavora troppo non dorme!",
    "Meglio un amico vicino che un parente lontano... ma meglio ancora entrambi!",
    "Chi la fa l'aspetti... ma chi l'aspetta si annoia!",
    "Non c'è rosa senza spine... ma c'è sempre la pizza senza problemi!",
    "Chi va piano va sano... ma chi va veloce va al pronto soccorso!",
    "Meglio un uovo oggi che una gallina domani... ma meglio ancora un hamburger oggi!",
    "Chi dorme non piglia pesci... ma almeno non paga il dentista!",
    "L'erba del vicino è sempre più verde... finché non piove!",
    "Chi la dura la vince... ma chi la piglia la perde... e chi la perde piange!",
    "Non c'è trippa per gatti... ma c'è sempre il gelato per tutti!",
    "Chi va con lo zoppo impara a zoppicare... ma almeno ha una scusa per essere lento!",
    "Meglio tardi che mai... ma meglio ancora mai!",
    "Chi non risica non rosica... ma chi risica troppo finisce in galera!",
    "L'unione fa la forza... ma la divisione fa la pace... e la pace fa dormire!",
    "Chi troppo vuole nulla stringe... ma chi nulla vuole dorme tranquillo... e risparmia!",
    "A caval donato non si guarda in bocca... ma si controlla se ha l'assicurazione!",
    "Chi va a Roma perde la poltrona... ma almeno vede il Papa!",
    "Meglio soli che male accompagnati... ma meglio ancora con Netflix!",
    "Chi ha tempo non aspetti tempo... ma chi non ha tempo aspetti pure... e si arrabbia!",
    "L'occasione fa l'uomo ladro... ma la polizia fa l'uomo onesto... e povero!",
    "Chi non lavora non mangia... ma chi lavora troppo non vive!",
    "Meglio un amico vicino che un parente lontano... ma meglio ancora entrambi... e una pizza!",
    "Chi la fa l'aspetti... ma chi l'aspetta si annoia... e guarda il telefono!",
    "Non c'è rosa senza spine... ma c'è sempre la pizza senza problemi... e con la mozzarella!"
];

// Elementi DOM
const proverbText = document.getElementById('proverbText');
const generateBtn = document.getElementById('generateBtn');
const proverbCount = document.getElementById('proverbCount');
const favoriteCount = document.getElementById('favoriteCount');
const proverbCard = document.querySelector('.proverb-card');

// Variabili di stato
let currentProverb = '';
let proverbCounter = 0;
let favoriteCounter = 0;
let usedProverbs = new Set();
let favoriteProverbs = [];

// Funzione per generare un proverbio casuale
function generateRandomProverb() {
    let newProverb;
    
    // Se abbiamo usato tutti i proverbi, resettiamo
    if (usedProverbs.size >= proverbi.length) {
        usedProverbs.clear();
    }
    
    // Genera un proverbio non ancora usato
    do {
        newProverb = proverbi[Math.floor(Math.random() * proverbi.length)];
    } while (usedProverbs.has(newProverb));
    
    usedProverbs.add(newProverb);
    return newProverb;
}

// Funzione per aggiornare il display
function updateDisplay(proverb) {
    // Aggiungi animazione
    proverbCard.classList.remove('animate');
    void proverbCard.offsetWidth; // Trigger reflow
    proverbCard.classList.add('animate');
    
    // Aggiorna il testo con effetto di digitazione
    proverbText.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < proverb.length) {
            proverbText.textContent += proverb.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };
    typeWriter();
    
    // Aggiorna contatore
    proverbCounter++;
    proverbCount.textContent = proverbCounter;
}

// Funzione per aggiungere effetti sonori (simulati)
function playButtonSound() {
    // Simula un suono di click
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.volume = 0.1;
    audio.play().catch(() => {}); // Ignora errori se il browser non supporta
}

// Event listener per il pulsante
generateBtn.addEventListener('click', () => {
    // Effetti sonori
    playButtonSound();
    
    // Genera nuovo proverbio
    currentProverb = generateRandomProverb();
    
    // Aggiorna display
    updateDisplay(currentProverb);
    
    // Effetto di vibrazione sul pulsante
    generateBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        generateBtn.style.transform = 'scale(1)';
    }, 150);
});

// Event listener per il doppio click sul proverbio (per aggiungere ai preferiti)
proverbCard.addEventListener('dblclick', () => {
    if (currentProverb) {
        // Controlla se il proverbio è già nei preferiti
        const isAlreadyFavorite = favoriteProverbs.some(fav => fav.text === currentProverb);
        
        if (!isAlreadyFavorite) {
            favoriteCounter++;
            favoriteCount.textContent = favoriteCounter;
            
            // Aggiungi ai preferiti
            favoriteProverbs.push({
                text: currentProverb,
                id: Date.now()
            });
            
            // Effetto visivo
            proverbCard.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
            proverbCard.style.color = 'white';
            
            setTimeout(() => {
                proverbCard.style.background = 'rgba(255, 255, 255, 0.95)';
                proverbCard.style.color = '#333';
            }, 500);
            
            // Mostra messaggio
            const message = document.createElement('div');
            message.textContent = '✨ Aggiunto ai preferiti!';
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #16a085;
                color: white;
                padding: 10px 20px;
                border-radius: 10px;
                font-weight: 600;
                z-index: 1000;
                animation: slideIn 0.5s ease-out;
            `;
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 2000);
        } else {
            // Messaggio se già nei preferiti
            const message = document.createElement('div');
            message.textContent = '⚠️ Già nei preferiti!';
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #f39c12;
                color: white;
                padding: 10px 20px;
                border-radius: 10px;
                font-weight: 600;
                z-index: 1000;
                animation: slideIn 0.5s ease-out;
            `;
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 2000);
        }
    }
});

// Animazione per il messaggio
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);



// Aggiungi animazione fadeOut
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeStyle);

// Effetti di particelle quando si genera un proverbio
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: linear-gradient(45deg, #e74c3c, #c0392b);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: particle 1s ease-out forwards;
    `;
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// Animazione per le particelle
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Aggiungi particelle quando si genera un proverbio
generateBtn.addEventListener('click', () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createParticle(), i * 100);
    }
}); 

// Funzioni per gestire i preferiti
function showFavorites() {
    const favoritesSection = document.getElementById('favoritesSection');
    const favoritesList = document.getElementById('favoritesList');
    
    // Pulisci la lista
    favoritesList.innerHTML = '';
    
    if (favoriteProverbs.length === 0) {
        favoritesList.innerHTML = '<p style="text-align: center; color: #6c757d; font-style: italic;">Nessun proverbio nei preferiti ancora. Doppio click su un proverbio per aggiungerlo!</p>';
    } else {
        // Aggiungi ogni proverbio preferito
        favoriteProverbs.forEach((favorite, index) => {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            favoriteItem.innerHTML = `
                <div class="favorite-text">${favorite.text}</div>
                <div class="favorite-author">— Babbo Marcello</div>
                <button class="remove-favorite" onclick="removeFavorite(${favorite.id})">×</button>
            `;
            favoritesList.appendChild(favoriteItem);
        });
    }
    
    // Mostra la sezione
    favoritesSection.style.display = 'block';
    favoritesSection.classList.add('show');
}

function hideFavorites() {
    const favoritesSection = document.getElementById('favoritesSection');
    favoritesSection.classList.remove('show');
    setTimeout(() => {
        favoritesSection.style.display = 'none';
    }, 500);
}

function removeFavorite(id) {
    // Rimuovi dal array
    favoriteProverbs = favoriteProverbs.filter(fav => fav.id !== id);
    
    // Aggiorna contatore
    favoriteCounter = favoriteProverbs.length;
    favoriteCount.textContent = favoriteCounter;
    
    // Ricarica la lista
    showFavorites();
    
    // Messaggio di conferma
    const message = document.createElement('div');
    message.textContent = '🗑️ Rimosso dai preferiti!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Event listeners per i preferiti
document.addEventListener('DOMContentLoaded', () => {
    // Event listener per aprire i preferiti
    const favoritesCard = document.getElementById('favoritesCard');
    favoritesCard.addEventListener('click', showFavorites);
    
    // Event listener per chiudere i preferiti
    const closeFavoritesBtn = document.getElementById('closeFavoritesBtn');
    closeFavoritesBtn.addEventListener('click', hideFavorites);
    
    // Genera il primo proverbio
    currentProverb = generateRandomProverb();
    updateDisplay(currentProverb);
    
    // Aggiungi hint per il doppio click
    setTimeout(() => {
        const hint = document.createElement('div');
        hint.textContent = '💡 Doppio click sul proverbio per aggiungerlo ai preferiti!';
        hint.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 0.9rem;
            z-index: 1000;
            animation: fadeIn 1s ease-out;
        `;
        document.body.appendChild(hint);
        
        setTimeout(() => {
            hint.style.animation = 'fadeOut 1s ease-out';
            setTimeout(() => hint.remove(), 1000);
        }, 3000);
    }, 2000);
}); 