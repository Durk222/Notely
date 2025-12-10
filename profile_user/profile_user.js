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
let lastTime = 0;
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
// 2. DIBUJO DEL MARCO PRINCIPAL (Relleno Sólido) - ¡MODIFICADO!
// ------------------------------------------------------------------
function drawNotelyFrame() {
    const canvas = document.getElementById('notelyCanvas');
    const container = document.getElementById('frame-container');

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const rc = rough.canvas(canvas);
    
    rc.rectangle(5, 5, canvas.width - 10, canvas.height - 10, {
        roughness: 2.8, 
        stroke: strokeColor, 
        strokeWidth: 6, // ⬅️ CAMBIO: Doble de grosor (2)
        bowing: 6,      // ⬅️ CAMBIO: Más tembloroso (6)
        fill: fillColor, 
        fillStyle: 'solid' 
    });
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
// 4. BUCLE DE ANIMACIÓN (Limitado a 4 FPS) - ¡RECICLADO!
// ------------------------------------------------------------------
function animate(timestamp) {
    requestAnimationFrame(animate);

    const elapsed = timestamp - lastTime;

    if (elapsed > FRAME_INTERVAL) {
        lastTime = timestamp - (elapsed % FRAME_INTERVAL);

        // --- DIBUJAR LOS ELEMENTOS QUE NECESITAN SER REGENERADOS ---
        drawBackgroundTexture();
        drawNotelyFrame();
        
        // Dibujo de los botones de la barra lateral
        drawThemeButton();
        drawVerticalNavBar(); 
        drawSearchButton();
        drawHomeButton(); 
        drawSettingsButton();
        drawProfileButton(); 
        drawAddNoteButton(); 
        
        // Dibujo de los elementos del perfil (el contenido de la página)
        drawProfileContent(); 

        // Actualizar el scrollbar
        const feedContainer = document.getElementById('feed-container');
        let scrollbarYRatio = 0;
        
        if (feedContainer && feedContainer.scrollHeight > feedContainer.clientHeight) {
            scrollbarYRatio = feedContainer.scrollTop / (feedContainer.scrollHeight - feedContainer.clientHeight);
        }
        
        if (window.drawSketchyScrollbar) { 
            drawSketchyScrollbar(scrollbarYRatio);
        }
    }
}

// ------------------------------------------------------------------
// 5. MANEJADORES DE EVENTOS
// ------------------------------------------------------------------
function toggleTheme() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
    initialDraw(); 
}

function handleCanvasMouseDown(event) {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // --- 1. Botón de Tema ---
    const buttonXMin = THEME_BTN_MARGIN;
    const buttonXMax = THEME_BTN_MARGIN + THEME_BTN_SIZE;
    const buttonYMin = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE;
    const buttonYMax = canvas.height - THEME_BTN_MARGIN;

    if (x >= buttonXMin && x <= buttonXMax && y >= buttonYMin && y <= buttonYMax) {
        toggleTheme();
        return; 
    }

    // --- 2. Detección del Botón de Casa (Index 1) - ¡MODIFICADO! ---
    const buttonHomeXMin = THEME_BTN_MARGIN;
    const buttonHomeXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH;
    const buttonHomeYMin = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 1; 
    const buttonHomeYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 2; 

    if (x >= buttonHomeXMin && x <= buttonHomeXMax && y >= buttonHomeYMin && y <= buttonHomeYMax) {
        if (window.startOutroTransition) {
            // ⬅️ CAMBIO: La URL para volver es "../index.html"
            window.startOutroTransition('../index.html'); 
        }
        return;
    }

    // --- 3. Detección del Botón de Perfil (Index 3) - ¡MODIFICADO! ---
    // (En la página de perfil, el botón de perfil no debe hacer nada)
    const buttonProfileXMin = THEME_BTN_MARGIN;
    const buttonProfileXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH;
    const buttonProfileYMin = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 3; 
    const buttonProfileYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 4; 

    if (x >= buttonProfileXMin && x <= buttonProfileXMax && y >= buttonProfileYMin && y <= buttonProfileYMax) {
        console.log("Ya estás en la página de Perfil.");
        return;
    }
    
    // --- 4. Ignorar el Área de la Barra Izquierda ---
    const navAreaXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH + 10;
    if (x <= navAreaXMax) {
        return;
    }
}

function handleNativeScroll() {
    const feedContainer = document.getElementById('feed-container');
    const maxScroll = feedContainer.scrollHeight - feedContainer.clientHeight;
    
    if (maxScroll <= 0) {
         if (window.drawSketchyScrollbar) {
             window.drawSketchyScrollbar(0);
         }
         return;
    }
    const scrollRatio = feedContainer.scrollTop / maxScroll;
    if (window.drawSketchyScrollbar) {
        window.drawSketchyScrollbar(scrollRatio);
    }
}


// ------------------------------------------------------------------
// 6. INICIALIZACIÓN Y PUNTO DE ENTRADA
// ------------------------------------------------------------------
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
    
    // Lógica de desvanecimiento (Intro Transition)
    const loadingOverlay = document.getElementById('loading-screen-overlay');

    if (loadingOverlay) {
        if (window.stopLoadingAnimation) { window.stopLoadingAnimation(); }

        if (window.drawLoadingScreen) {
             const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
             window.drawLoadingScreen(performance.now(), strokeColor); 
        }

        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 600); 

        }, 200);
    }

    requestAnimationFrame(animate); // Iniciar el bucle de animación
}

function setupEventListeners() {
    document.getElementById('notelyCanvas').addEventListener('mousedown', handleCanvasMouseDown);
    window.addEventListener('resize', initialDraw);

    // Iniciar la transición de entrada al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        if (window.startLoadingAnimation) {
            window.startLoadingAnimation(); 
        }
    });
    window.addEventListener('load', initialDraw);

    const feedContainer = document.getElementById('feed-container');
    if (feedContainer) {
        feedContainer.addEventListener('scroll', handleNativeScroll); 
    }
}

// Punto de Entrada Principal
setupEventListeners();
