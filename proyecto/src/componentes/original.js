async function Digimon_fight() {
    hide_welcome();
    hide_search_card();
    hide_all();
    hide_profile();
    
    // Reproducir música de batalla
    playTheme();
    
    const main = document.getElementById('app');
    // Crear el contenedor si no existe
    let container = document.getElementById('fight_container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'fight_container';
        container.className = 'fight_flex';
        main.appendChild(container);
    }
    container.style.display = 'flex';
    container.innerHTML = ''; // Limpiar el contenedor
    try {
        const response = await fetch('https://digimon-api.vercel.app/api/digimon');
        if (!response.ok) {
            throw new Error('Error al obtener los Digimons');
        }
        const digimons = await response.json();
        // Seleccionar un Digimon aleatorio
        const random = Math.floor(Math.random() * digimons.length);
        const randomDigimon = digimons[random];
        
        // Crear y mostrar la tarjeta del Digimon
        const fight_card = document.createElement('div');
        fight_card.className = 'fight_card';
        fight_card.innerHTML = `
            <h2>${randomDigimon.name}</h2>
            <img id="digi_shake" src="${randomDigimon.img}" alt="Imagen de ${randomDigimon.name}">
            <p>Nivel: ${randomDigimon.level}</p>
            <p>Vida: <span id="digimon_health">100</span></p>
            <button id="attack-btn">Atacar</button>
        `;
        container.appendChild(fight_card);
        window.DigimonHealth = 100; // Inicializar la vida del Digimon
        
        // Agregar event listener al botón
        const attackBtn = document.getElementById("attack-btn");
        if (attackBtn) {
            attackBtn.addEventListener("click", punch);
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function playTheme() {
    let audio = document.getElementById('fight_theme');
    if (audio) {
        // Usar el audio ya definido en el HTML
        audio.volume = 0.35;
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('Error al reproducir audio:', error);
            });
        }
    }
}

function playHitSound() {
    let audioHit = document.getElementById('hit_sound');
    if (audioHit) {
        // Usar el audio ya definido en el HTML
        audioHit.currentTime = 0;
        
        const playPromise = audioHit.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('Error al reproducir audio de golpe:', error);
            });
        }
    }
}

function shakeElement(digi_shake) {
    const element_shake = document.getElementById(digi_shake);
    if (element_shake) {
        // Agregar animación
        element_shake.classList.add('shake');
        // Eliminar la clase después de que termine la animación (0.5s en este caso)
        setTimeout(() => {
            element_shake.classList.remove('shake');
        }, 500);
    }
}

function punch() {
    // Reproducir sonido de golpe
    playHitSound();
    
    window.DigimonHealth -= 10; 
    const health = document.getElementById('digimon_health');
    if (health) {
        health.innerText = window.DigimonHealth;
    }
    
    // Agitar la tarjeta del Digimon
    shakeElement('digi_shake');
    
    if (window.DigimonHealth <= 0) {
        const container = document.getElementById('fight_container');
        if (container) {
            container.innerHTML = `<p>¡Has ganado! El Digimon ha sido derrotado.</p>`;
            setTimeout(() => {
                Digimon_fight();
            }, 1500);
        }
    }
}

// Funciones auxiliares (defínelas si no existen)
function hide_welcome() {
    const welcome = document.getElementById('welcome_container');
    if (welcome) welcome.style.display = 'none';
}

function hide_search_card() {
    const search = document.getElementById('search_container');
    if (search) search.style.display = 'none';
}

function hide_all() {
    const all = document.getElementById('all_container');
    if (all) all.style.display = 'none';
}

function hide_profile() {
    const profile = document.getElementById('profile_container');
    if (profile) profile.style.display = 'none';
}

// Detener música al salir de la página
function stopTheme() {
    const audio = document.getElementById('fight_theme');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

// Exportación por defecto que se llamará desde main.js
export default function mostrarOriginal() {
    // Detener cualquier audio que pueda estar reproduciéndose
    stopTheme();
    
    // Limpiar el contenido existente
    const app = document.getElementById("app");
    app.innerHTML = `
        <div>
            <h2>Batalla Digimon</h2>
        </div>
    `;
    
    // Iniciar la batalla
    Digimon_fight();
}