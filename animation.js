// --- VARIABLES GLOBALES Y DE ANIMACIÓN ---
const STROKE_COLOR = '#21211D';
const FILL_COLOR = '#F3F2EE';

// Configuraciones para la animación de 4 FPS
const FPS = 4;
const FRAME_INTERVAL = 1000 / FPS; // Intervalo en milisegundos entre cuadros (1000ms / 4 = 250ms)
let lastTime = 0;

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
    }
}

// ------------------------------------------------------------------
// 4. INICIALIZACIÓN
// ------------------------------------------------------------------
function initialDraw() {
    // Dibujar una vez para que Rough.js calcule la primera semilla
    drawBackgroundTexture();
    drawNotelyFrame(); 
    
    // Iniciar el bucle de animación
    requestAnimationFrame(animate);
}

// Escuchar evento de redimensionamiento (opcional, pero buena práctica)
window.addEventListener('resize', initialDraw);

// Escuchar evento de carga de página para iniciar el dibujo y la animación
window.addEventListener('load', initialDraw);
