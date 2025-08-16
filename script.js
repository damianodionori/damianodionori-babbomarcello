// Array di proverbi tipici italiani (versione goliardica)
const proverbi = [
    "Se non fosse per la stirpe di coloro, non si chiamerebbe Monte Argentario ma Monte D'Oro!",
    "Presto che è tardi!",
    "Tutto risparmiato!",
    "Lo diceva sempre il mi poro babbo!",
    "Io non mi ammalo dal 1981!",
    "So contento per mi zi Peppe che non ci credeva!",
    "Chi balla balla, chi non balla..alle prode!",
    "Nel più ci sta anche il meno",
    "Con il tempo e con la paglia, si matura la sorba e la canagli",
    "Il meglio fico del paniere quando dormi",
    "Chi va piano va sano e va lontano, chi va forte va incontro alla morte",
    "Già che sei in piedi..",
    "Già che non fai niente..",
    "Ma è proprio una donna",
    "Nulla c'avevi e nulla porti",
    "Tanto paga pantalone",
    "Soldi, meglio pochi e subito che tanti e maledetti",
    "Come faremo a morì che non ci siamo abituati",
    "Te sì che hai visto un bel mondo",
    "Il caldo fa brutti scherzi",
    "Chi non paga pigione, fuori di casa",
    "A pagà e a morì c'è sempre tempo",
    "Mica ce l'ho conte, ma con chi ti scioglie la mattina presto",
    "Mica ce l'ho conte, ma con chi ti dà da mangiare",
    "C'hai una voglia di lavorare come una giubba attaccata",
    "Speriamo un sia nulla",
    "La legge per i nemici si applica e per gli amici si interpreta",
    "Voglia di lavorare saltami addosso, fammi lavorare meno che posso",
    "Compagno compagno, te lavora che io magno",
    "Tra averceli e non averceli so sei punti",
    "Mangia, che giù è tutto buio",
    "La ragione è dei fessi"
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
        proverbText.textContent = proverb.substring(0, i + 1);
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