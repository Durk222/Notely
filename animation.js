// --- VARIABLES GLOBALES Y DE ANIMACIÓN ---
//const STROKE_COLOR = '#21211D';
//const FILL_COLOR = '#F3F2EE';
//Eliminadas porque son valores estáticos, usar variables dinámicas de color en su lugar.
// --- NUEVAS VARIABLES PARA EL BOTÓN DE TEMA (cuadrado) ---
const THEME_BTN_SIZE = 40; // Tamaño del botón cuadrado del tema
const THEME_BTN_MARGIN = 20; // Margen desde la esquina inferior izquierda

// Configuraciones para la animación de 4 FPS
const FPS = 4;
const FRAME_INTERVAL = 1000 / FPS; // Intervalo en milisegundos entre cuadros (1000ms / 4 = 250ms)
let lastTime = 0;

// --- NUEVA VARIABLE GLOBAL ---
const ICON_SIZE = 30; // Tamaño del ícono Sol/Luna
const ICON_MARGIN = 20; // Margen desde la esquina inferior izquierda

// ------------------------------------------------------------------
// 1. DIBUJO DEL FONDO (Textura)
// ------------------------------------------------------------------
function drawBackgroundTexture() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Obtener los colores dinámicos:
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    
    // Ajustamos el canvas al tamaño completo de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rc = rough.canvas(canvas);
    
    // El fondo se redibujará aleatoriamente cada frame
    rc.rectangle(0, 0, canvas.width, canvas.height, {
        roughness: 2.8, 
        strokeWidth: 3,
        stroke: strokeColor, 
        fill: strokeColor, 
        fillStyle: 'dashed' 
    });
}

// ------------------------------------------------------------------
// 2. DIBUJO DEL MARCO PRINCIPAL (Relleno Sólido)
// ------------------------------------------------------------------
function drawNotelyFrame() {
    const canvas = document.getElementById('notelyCanvas');
    const container = document.getElementById('frame-container');

    // Obtener los colores dinámicos:
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    // Aseguramos que el Canvas tome el tamaño de su contenedor
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const rc = rough.canvas(canvas);
    
    // El marco se redibujará aleatoriamente cada frame
    rc.rectangle(5, 5, canvas.width - 10, canvas.height - 10, {
        roughness: 2.8, 
        stroke: strokeColor, 
        strokeWidth: 1, 
        fill: fillColor, 
        fillStyle: 'solid' 
    });
}


// ------------------------------------------------------------------
// 3. DIBUJO DEL BOTÓN DE TEMA (Cuadrado con Icono)
// ------------------------------------------------------------------
function drawThemeButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    // Obtener los colores dinámicos:
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    const themeMode = getComputedStyle(document.body).getPropertyValue('--theme-mode').trim();
    
    // Posición: Inferior Izquierda, con un margen
    const x = THEME_BTN_MARGIN;
    const y = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE;
    
    // Dibujar el fondo del botón cuadrado (el contenedor visible)
    rc.rectangle(x, y, THEME_BTN_SIZE, THEME_BTN_SIZE, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor, // Relleno con el color de fondo para que se vea como un botón
        fillStyle: 'solid'
    });

    // --- Dibujar el Icono (Sol o Luna) DENTRO del cuadrado ---
    const centerX = x + THEME_BTN_SIZE / 2;
    const centerY = y + THEME_BTN_SIZE / 2;
    const radius = 10; // Radio más pequeño para que quepa

    if (themeMode === 'light') {
        // Modo Claro: Dibujar un Sol
        rc.circle(centerX, centerY, radius, {
            roughness: 2.5,
            stroke: strokeColor,
            strokeWidth: 1,
            fill: strokeColor, // El sol es oscuro
            fillStyle: 'solid'
        });

    } else {
        // Modo Oscuro: Dibujar una Luna Creciente
        rc.circle(centerX, centerY, radius, {
            roughness: 2.5,
            stroke: strokeColor,
            strokeWidth: 1,
            fill: strokeColor, // La luna es clara
            fillStyle: 'solid'
        });
        
        // Círculo de "mordida"
        rc.circle(centerX + radius / 3, centerY - radius / 3, radius, {
            roughness: 2.5,
            stroke: fillColor,
            strokeWidth: 0, 
            fill: fillColor, 
            fillStyle: 'solid'
        });
    }
}

// ------------------------------------------------------------------
// 4. LÓGICA DE ALTERNANCIA DEL TEMA
// ------------------------------------------------------------------
function toggleTheme() {
    const body = document.body;
    // Alternar el atributo data-theme, que activa las reglas CSS de arriba
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme'); // Volver al modo light (sin atributo)
    } else {
        body.setAttribute('data-theme', 'dark'); // Activar modo dark
    }
    // Forzar el redibujado de todos los elementos para que usen los nuevos colores
    initialDraw(); 
}

// ------------------------------------------------------------------
// 3. BUCLE DE ANIMACIÓN (Limitado a 4 FPS)
// ------------------------------------------------------------------
function animate(timestamp) {
    // timestamp es el tiempo que ha pasado desde que el navegador cargó la página

    // Pedimos el siguiente frame de inmediato para asegurar que Rough.js se redibuje
    requestAnimationFrame(animate);

    // Lógica para limitar la tasa de cuadros (Frame Throttling)
    const elapsed = timestamp - lastTime;

    if (elapsed > FRAME_INTERVAL) {
        // Guardamos el nuevo tiempo de referencia
        lastTime = timestamp - (elapsed % FRAME_INTERVAL);

        // --- DIBUJAR LOS ELEMENTOS QUE NECESITAN SER REGENERADOS ---
        drawBackgroundTexture();
        drawNotelyFrame();
        drawThemeButton(); // 🚀 ¡NUEVO! Dibuja el botón del tema
    }
}

// ------------------------------------------------------------------
// 6. DETECCIÓN DE CLIC EN EL BOTÓN
// ------------------------------------------------------------------
function handleCanvasClick(event) {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Coordenadas del área del botón de tema (Cuadrado 40x40px, margen 20px)
    const buttonXMin = THEME_BTN_MARGIN;
    const buttonXMax = THEME_BTN_MARGIN + THEME_BTN_SIZE;
    const buttonYMin = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE;
    const buttonYMax = canvas.height - THEME_BTN_MARGIN;

    // Chequeamos si el clic ocurrió dentro del área del botón del tema
    if (x >= buttonXMin && x <= buttonXMax && y >= buttonYMin && y <= buttonYMax) {
        toggleTheme();
    }
    // NOTA: Si añades más botones en el futuro, irían aquí con su propia lógica de coordenadas.
}
// ------------------------------------------------------------------
// 7. CONFIGURACIÓN DE EVENTOS (Se ejecuta UNA SOLA VEZ)
// ------------------------------------------------------------------
function setupEventListeners() {
// Añadir el listener de clic solo al cargar, no en cada redibujado
document.getElementById('notelyCanvas').addEventListener('click', handleCanvasClick);

// Escuchar evento de redimensionamiento (opcional, pero buena práctica)
window.addEventListener('resize', initialDraw);

// Escuchar evento de carga de página para iniciar el dibujo y la animación
window.addEventListener('load', initialDraw);
}
// ------------------------------------------------------------------
// 4. INICIALIZACIÓN
// ------------------------------------------------------------------
function initialDraw() {
    // Dibujar una vez para que Rough.js calcule la primera semilla
    drawBackgroundTexture();
    drawNotelyFrame(); 
    drawThemeButton();
    
    // Iniciar el bucle de animación
    requestAnimationFrame(animate);

}

// ------------------------------------------------------------------
// 8. PUNTO DE ENTRADA (Llamar a la configuración de eventos)
// ------------------------------------------------------------------
setupEventListeners(); // Llamamos a la función para configurar todos los listeners.
