// --- MODELO ---
let hambre = 0;
let felicidad = 10;  
let comiendo = false; // ¿Está ocupado comiendo?
let jugando = false;  // ¿Está ocupado jugando?

// --- VISTA ---
function vista() {
    // 1. Generamos el HTML
// Primero calculamos si está vivo o muerto
    let estaMuerto = (hambre >= 10 || felicidad <= 0);

    // Creamos una variable para la cara
    // Si estaMuerto es true -> calavera. Si es false -> alien.
    let cara = estaMuerto ? "💀" : "👾";
    
    // OPCIONAL: Mensaje de fin de juego
    let mensaje = estaMuerto ? "<div class='game-over'>GAME OVER</div>" : "";

     let urlCorazon = felicidad < 4 
        ? "https://assets9.lottiefiles.com/private_files/lf30_434185.json" // Corazón roto
        : "https://assets10.lottiefiles.com/packages/lf20_7z8wtyb0.json"; // Corazón latiendo

    document.getElementById("app").innerHTML = `
        <div class="pet-screen">
            <h1>PIXEL PET</h1>
            
            <div class="pet-face">
                ${cara}
            </div>
            
            ${mensaje}

            <div class="stats">
        <div style="display:flex; align-items:center; flex-direction:column">
            <lottie-player src="Fried Egg.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" loop autoplay></lottie-player>
            <span>Hambre: ${hambre}</span>
        </div>

        <div style="display:flex; align-items:center; flex-direction:column">
            <lottie-player src="Hypertension Alert.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" loop autoplay></lottie-player>
            <span>Felicidad: ${felicidad}</span>
        </div>
    </div>


    <div class="controls">
        <button class="boton" id="btn-comer" ${ comiendo ? "disabled" : "" }>
            ${ comiendo ? "Masticando..." : "Dar Comida" }
        </button>

        <button class="boton" id="btn-jugar" ${ jugando ? "disabled" : "" }>
            ${ jugando ? "Cansado..." : "Jugar" }
        </button>
    </div>
        </div>
    `;

    // --- ACTUALIZACIÓN (Eventos) ---
    
        document.getElementById("btn-comer").onclick = () => {
        if (hambre > 0) {
            hambre--;
            
            // 1. Bloqueamos el botón
            comiendo = true;
            vista(); // Pintamos el botón gris ("Masticando...")

            // 2. Iniciamos el temporizador de 1 segundo (1000ms)
            setTimeout(() => {
                comiendo = false; // Desbloqueamos
                vista(); // Pintamos el botón amarillo otra vez
            }, 1000);
        }
    }

    document.getElementById("btn-jugar").onclick = () => {
        if (felicidad < 10) {
            felicidad++;
            
            // 1. Bloqueamos el botón
            jugando = true;
            vista(); // Pintamos el botón gris ("Masticando...")

            // 2. Iniciamos el temporizador de 1 segundo (1000ms)
            setTimeout(() => {
                jugando = false; // Desbloqueamos
                vista(); // Pintamos el botón amarillo otra vez
            }, 1000);
        }
    }

}
// Llamamos a la vista por primera vez para que aparezca algo
vista();

// --- LOOP DEL TIEMPO ---

function pasoDelTiempo() {
    // Cada 2 segundos (2000ms), la mascota empeora
    setTimeout(() => {
        
        // 1. Empeoramos las estadísticas
        hambre++;      // Le entra hambre
        felicidad--;   // Se pone triste

        // 2. Limitamos los valores (para que no sean infinitos)
        if (hambre > 10) hambre = 10;
        if (felicidad < 0) felicidad = 0;

        // 3. Actualizamos la pantalla
        vista();

        // 4. Volvemos a llamar al temporizador (Bucle infinito)
        pasoDelTiempo();

    }, 2000);
}

// INICIAR EL TIEMPO
pasoDelTiempo();
