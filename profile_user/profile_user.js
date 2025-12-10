// ==================================================================
// PROFILE.JS - Lógica de Dibujo y Animación para la Página de Perfil
// ==================================================================

// NOTA: Este archivo contiene el código reciclado de animación y dibujo de Rough.js 
// para mantener el look and feel de Notely en la página de perfil.

// --- VARIABLES RECICLADAS ---
var THEME_BTN_SIZE = 40; 
var THEME_BTN_MARGIN = 20; 

var NAV_BAR_WIDTH = THEME_BTN_SIZE; 
var NAV_BAR_MARGIN_TOP = 20; 
var BUTTON_SPACING = 15; 
var BUTTON_HEIGHT = THEME_BTN_SIZE + 25; 

var SEARCH_ICON_SIZE = 12; 

// Configuraciones para la animación de 4 FPS
var FPS = 4;
var FRAME_INTERVAL = 1000 / FPS; 
// ------------------------------------------------------------------
// 1. DIBUJO DEL FONDO (Textura) - ¡MODIFICADO!
// ------------------------------------------------------------------
function drawBackgroundTexture() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rc = rough.canvas(canvas);
    
    rc.rectangle(0, 0, canvas.width, canvas.height, {
        roughness: 2.8, 
        strokeWidth: 3,
        stroke: strokeColor, 
        fill: strokeColor, 
        fillStyle: 'cross-hatch' // ⬅️ CAMBIO: Nueva textura de fondo
    });
}

// ------------------------------------------------------------------
// 2. DIBUJO DEL MARCO PRINCIPAL (Relleno Sólido) - ¡CORREGIDO!
// ------------------------------------------------------------------
function drawNotelyFrame() {
    const canvas = document.getElementById('notelyCanvas');
    const container = document.getElementById('frame-container');

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // 💡 PASO 2a: Limpiar el Canvas Completo (de 0,0 a width, height)
    // Esto asegura que cualquier rastro anterior de Rough.js sea eliminado.
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    const rc = rough.canvas(canvas);
    
    // Definimos el margen interior para el dibujo del marco (seguridad > bowing de 6)
    const MARGIN_SAFETY = 8; 
    
    // 💡 PASO 2b: Dibujar el rectángulo con el margen de seguridad
    // Hacemos el rectángulo MÁS PEQUEÑO para que el efecto 'bowing: 6' no
    // se salga de los límites visibles del contenedor.
    rc.rectangle(
        MARGIN_SAFETY, 
        MARGIN_SAFETY, 
        canvas.width - 2 * MARGIN_SAFETY, // Reducir el ancho
        canvas.height - 2 * MARGIN_SAFETY, // Reducir la altura
        {
            roughness: 2.8, 
            stroke: strokeColor, 
            strokeWidth: 6, 
            bowing: 6, // Máximo desbordamiento ~6px
            fill: fillColor, 
            fillStyle: 'solid' 
        }
    );
}

// --- FUNCIONES DE DIBUJO DE BOTONES (Copias sin cambios internos, solo para dibujar) ---

function drawThemeButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    const themeMode = getComputedStyle(document.body).getPropertyValue('--theme-mode').trim();
    
    const x = THEME_BTN_MARGIN;
    const y = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE;
    
    rc.rectangle(x, y, THEME_BTN_SIZE, THEME_BTN_SIZE, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor, 
        fillStyle: 'solid'
    });

    const centerX = x + THEME_BTN_SIZE / 2;
    const centerY = y + THEME_BTN_SIZE / 2;
    const radius = 10; 

    if (themeMode === 'light') {
        rc.circle(centerX, centerY, radius, {
            roughness: 2.5, stroke: strokeColor, strokeWidth: 1, fill: strokeColor, fillStyle: 'solid'
        });
    } else {
        rc.circle(centerX, centerY, radius, {
            roughness: 2.5, stroke: strokeColor, strokeWidth: 1, fill: strokeColor, fillStyle: 'solid'
        });
        rc.circle(centerX + radius / 3, centerY - radius / 3, radius, {
            roughness: 2.5, stroke: fillColor, strokeWidth: 0, fill: fillColor, fillStyle: 'solid'
        });
    }
}

function drawVerticalNavBar() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();

    const x = THEME_BTN_MARGIN;
    const y = NAV_BAR_MARGIN_TOP;
    const width = NAV_BAR_WIDTH;
    
    const buttonThemeY = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE;
    const height = buttonThemeY - NAV_BAR_MARGIN_TOP - BUTTON_SPACING;
    
    rc.rectangle(x, y, width, height, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor,
        fillStyle: 'solid'
    });
}

// --- DIBUJO DE ICONOS (Se omiten para brevedad, asumiendo que son copias exactas) ---
function drawSearchButton() { /* ... Código del botón de Búsqueda ... */ }
function drawHomeButton() { /* ... Código del botón de Casa ... */ }
function drawSettingsButton() { /* ... Código del botón de Configuración ... */ }
function drawAddNoteButton() { /* ... Código del botón de Añadir Nota ... */ }
function drawProfileButton() { /* ... Código del botón de Perfil ... */ }
// Agrega aquí todas las funciones de dibujo de botones (copia de animation.js)

// ------------------------------------------------------------------
// 3. DIBUJO DE CONTENIDO ESPECÍFICO DEL PERFIL (NUEVO)
// ------------------------------------------------------------------
function drawProfileContent() {
    // NOTA: Aquí iría el dibujo Rough.js de los elementos visuales del perfil
    // (Ejemplo: un avatar, una línea divisoria, un marcador de posts)
    
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    
    const centerX = canvas.width / 2;
    const containerTop = document.getElementById('frame-container').offsetTop;
    const contentYStart = containerTop + NAV_BAR_MARGIN_TOP;
    
    // Ejemplo: Dibujar un separador horizontal debajo de donde iría la info de usuario
    rc.line(centerX - 150, contentYStart + 100, centerX + 150, contentYStart + 100, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 2
    });

    // Añadir el código específico del dibujo de tu perfil aquí.
}

// ------------------------------------------------------------------
// 4. BUCLE DE ANIMACIÓN (Limitado a 4 FPS) - ¡RECICLADO COMPLETO!
// ------------------------------------------------------------------
//let lastTime = 0; // Comentada para evitar conflictos con animation.js

function animate(timestamp) {
    // 1. Manejo del Frame Rate (4 FPS)
    if (timestamp < lastTime + FRAME_INTERVAL) {
        requestAnimationFrame(animate);
        return;
    }
    
    // Actualizar el tiempo del último frame dibujado
    lastTime = timestamp;

    // 2. Ejecutar las funciones de dibujo
    // Nota: drawBackgroundTexture() se llama fuera del bucle para mejor rendimiento,
    // pero si necesita animación (p.ej. ruido), debe ir aquí.
    
    // Limpiamos el notelyCanvas
    const canvas = document.getElementById('notelyCanvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('frame-container');
    
    // Necesario para que los dibujos no se superpongan
    ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);
    
    // Redibujar el Marco y los Elementos que requieren animación (ej. Rough.js)
    drawNotelyFrame();
    
    // DIBUJAR TODOS LOS BOTONES Y ELEMENTOS DE LA INTERFAZ
    drawThemeButton();
    drawVerticalNavBar();
    drawSearchButton();
    drawHomeButton(); 
    drawSettingsButton();
    drawProfileButton(); 
    drawAddNoteButton(); 
    drawProfileContent(); // Elementos específicos del perfil
    
    // 3. Solicitar el próximo frame
    requestAnimationFrame(animate);
}

// ------------------------------------------------------------------
// 5. INICIALIZACIÓN Y PUNTO DE ENTRADA - ¡MODIFICADO!
// ------------------------------------------------------------------
// Esta función ahora solo dibuja. La lógica de la intro la manejará el loading_screen.js.
function initialDraw() {
    // Dibujo inicial de los elementos de Rough.js
    drawBackgroundTexture();
    drawNotelyFrame();
    drawThemeButton();
    drawVerticalNavBar();
    drawSearchButton();
    drawHomeButton(); 
    drawSettingsButton();
    drawProfileButton(); 
    drawAddNoteButton(); 
    drawProfileContent(); // Elementos específicos del perfil
}

// ------------------------------------------------------------------
// 6. MANEJADORES DE EVENTOS Y ARRANQUE - ¡MODIFICADO!
// ------------------------------------------------------------------

function setupEventListeners() {
    document.getElementById('notelyCanvas').addEventListener('mousedown', handleCanvasMouseDown);
    window.addEventListener('resize', initialDraw);

    const feedContainer = document.getElementById('feed-container');
    if (feedContainer) {
        feedContainer.addEventListener('scroll', handleNativeScroll); 
    }
}

// Punto de Entrada Principal
function startApp() {
    // 1. Dibuja todos los elementos de la interfaz la primera vez
    initialDraw();
    
    // 2. Inicia el bucle de animación para el redibujado de 4 FPS
    requestAnimationFrame(animate); 
    
    // 3. Inicia la animación de la pantalla de carga (si existe en loading_screen.js)
    // Dejamos que loading_screen.js se encargue de detenerse
    if (window.startLoadingAnimation) {
        window.startLoadingAnimation(); 
    }
}

// Aseguramos que los eventos se configuren lo antes posible
setupEventListeners();

// Llamar a startApp cuando la ventana esté completamente cargada (incluyendo Rough.js y fuentes)
window.addEventListener('load', startApp);
