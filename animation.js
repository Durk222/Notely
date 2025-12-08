// --- VARIABLES GLOBALES Y DE ANIMACIÓN ---
const STROKE_COLOR = '#21211D';
const FILL_COLOR = '#F3F2EE';

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
    
    // Ajustamos el canvas al tamaño completo de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rc = rough.canvas(canvas);
    
    // El fondo se redibujará aleatoriamente cada frame
    rc.rectangle(0, 0, canvas.width, canvas.height, {
        roughness: 2.8, 
        strokeWidth: 3,
        stroke: STROKE_COLOR, 
        fill: STROKE_COLOR, 
        fillStyle: 'dashed' 
    });
}

// ------------------------------------------------------------------
// 2. DIBUJO DEL MARCO PRINCIPAL (Relleno Sólido)
// ------------------------------------------------------------------
function drawNotelyFrame() {
    const canvas = document.getElementById('notelyCanvas');
    const container = document.getElementById('frame-container');
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    // Aseguramos que el Canvas tome el tamaño de su contenedor
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const rc = rough.canvas(canvas);
    
    // El marco se redibujará aleatoriamente cada frame
    rc.rectangle(5, 5, canvas.width - 10, canvas.height - 10, {
        roughness: 2.8, 
        stroke: STROKE_COLOR, 
        strokeWidth: 1, 
        fill: FILL_COLOR, 
        fillStyle: 'solid' 
    });
}


// ------------------------------------------------------------------
// 3. DIBUJO DEL BOTÓN DE TEMA (Sol/Luna)
// ------------------------------------------------------------------
function drawThemeButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    // Obtener el modo actual desde la hoja de estilos
    const themeMode = getComputedStyle(document.body).getPropertyValue('--theme-mode').trim();
    
    // Posición: Inferior Izquierda, con un margen
    const x = ICON_MARGIN + ICON_SIZE / 2;
    const y = canvas.height - ICON_MARGIN - ICON_SIZE / 2;
    const radius = ICON_SIZE / 2;

    // Colores basados en el modo actual
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();

    if (themeMode === 'light') {
        // Modo Claro: Dibujar un Sol (Círculo lleno)
        rc.circle(x, y, radius, {
            roughness: 2.5,
            stroke: strokeColor,
            strokeWidth: 1,
            fill: strokeColor, // El sol es oscuro
            fillStyle: 'solid'
        });
        // Opcional: Dibujar rayos alrededor del círculo. (Por simplicidad, lo dejamos como un círculo por ahora).

    } else {
        // Modo Oscuro: Dibujar una Luna Creciente (Dos círculos)
        // Círculo base (Luna)
        rc.circle(x, y, radius, {
            roughness: 2.5,
            stroke: strokeColor,
            strokeWidth: 1,
            fill: strokeColor, // La luna es clara
            fillStyle: 'solid'
        });
        
        // Círculo de "mordida" (Relleno con el color de fondo para crear la forma de luna)
        rc.circle(x + radius / 3, y - radius / 3, radius, {
            roughness: 2.5,
            stroke: fillColor,
            strokeWidth: 0, // Sin trazo para la mordida
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

    // Coordenadas del área del botón (para el NotelyCanvas que lo contiene)
    const buttonXMin = ICON_MARGIN;
    const buttonXMax = ICON_MARGIN + ICON_SIZE;
    const buttonYMin = canvas.height - ICON_MARGIN - ICON_SIZE;
    const buttonYMax = canvas.height - ICON_MARGIN;

    // Chequeamos si el clic ocurrió dentro del área del botón
    if (x >= buttonXMin && x <= buttonXMax && y >= buttonYMin && y <= buttonYMax) {
        toggleTheme();
    }
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
