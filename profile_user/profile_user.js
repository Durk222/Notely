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
    // 💡 PASO 1: Inicialización de variables
    const canvas = document.getElementById('notelyCanvas');
    const container = document.getElementById('frame-container');

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // 💡 PASO 2: Obtener el contexto 2D (ctx) y ajustar el tamaño del canvas
    const ctx = canvas.getContext('2d');
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // 💡 PASO 3: Limpiar el Canvas Completo (Línea 53 ahora es segura)
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    const rc = rough.canvas(canvas);
    
    // Usamos el margen interior de 5px (como en la original)
    const MARGIN = 5; 
    
    rc.rectangle(
        MARGIN, 
        MARGIN, 
        canvas.width - 2 * MARGIN, 
        canvas.height - 2 * MARGIN, 
        {
            roughness: 2.8, 
            stroke: strokeColor, 
            strokeWidth: 6, 
            bowing: 6, 
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
// 11. DIBUJO DE LA BARRA DE SCROLL (Rough.js Sketchy) - ¡COMPLETA!
// ------------------------------------------------------------------
var SCROLL_BAR_WIDTH = 5;
var SCROLL_BAR_MARGIN = 5;

function drawSketchyScrollbar(scrollRatio) {
    const canvas = document.getElementById('notelyCanvas');
    // Comprobar si el canvas existe antes de continuar
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // Altura y margen del área de contenido (donde debe ir el scroll)
    // 💡 CORRECCIÓN DEL ÁREA DEL TRACK: Va desde el margen superior (5px)
    const FRAME_MARGIN = 5;
    const contentYStart = FRAME_MARGIN;
    // Hasta antes del botón de tema
    const contentYEnd = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE - BUTTON_SPACING;
    const contentHeight = contentYEnd - contentYStart;
    
    // Posición X (borde derecho, margen interior del marco)
    const x = canvas.width - SCROLL_BAR_MARGIN - SCROLL_BAR_WIDTH - FRAME_MARGIN; // - FRAME_MARGIN para alinearse al marco

    // --- 1. Dibujar el TRACK (Fondo de la barra) ---
    const trackHeight = contentHeight;
    const trackY = contentYStart;
    
    // Dibujamos el track completo con el color de fondo para que se vea como un "riego"
    rc.rectangle(x, trackY, SCROLL_BAR_WIDTH, trackHeight, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 1, 
        fill: fillColor, // Relleno con el color de fondo
        fillStyle: 'solid'
    });
    
    // --- 2. Calcular el tamaño y posición del "pulgar" (thumb) ---
    const thumbMinHeight = 40; 
    
    // ⚠️ RE-CALCULAR LA ALTURA DEL THUMB basado en el contenido del feed
    const feedContainer = document.getElementById('feed-container');
    const scrollMax = feedContainer.scrollHeight;
    const scrollVisible = feedContainer.clientHeight;
    
    // Proporción de contenido visible: (scrollVisible / scrollMax) * trackHeight
    let thumbHeight = trackHeight;
    if (scrollMax > scrollVisible) {
        thumbHeight = (scrollVisible / scrollMax) * trackHeight;
    }
    thumbHeight = Math.max(thumbMinHeight, thumbHeight); // Altura mínima

    // La posición superior del pulgar se calcula con el ratio
    const yMaxTravel = trackHeight - thumbHeight;
    const y = contentYStart + (yMaxTravel * scrollRatio);

    // Si no hay suficiente contenido para scroll, no dibujamos el pulgar.
    if (feedContainer.scrollHeight <= feedContainer.clientHeight) { 
        return;
    }
    
    // --- 3. Dibujar el Pulgar (Rough.js Rectangle) ---
    rc.rectangle(x, y, SCROLL_BAR_WIDTH, thumbHeight, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: strokeColor, // Color de la tinta
        fillStyle: 'solid'
    });
}
// ------------------------------------------------------------------
// 8B. MANEJADOR DE SCROLL NATIVO (NUEVO)
// ------------------------------------------------------------------
function handleNativeScroll() {
    // 💡 NOTA: Ya no necesitamos llamar a drawSketchyScrollbar aquí
    // El bucle `animate` se encargará de dibujar la posición actualizada
    // en el próximo frame de 4 FPS. Solo necesitamos que el scroll ocurra.
    // El código actual está bien, ya que solo calcula el ratio y no hace nada más.
    
    const feedContainer = document.getElementById('feed-container');
    
    // Solo proceder si el scroll es posible
    const maxScroll = feedContainer.scrollHeight - feedContainer.clientHeight;
    
    if (maxScroll <= 0) {
        // No se necesita código aquí.
        return;
    }
        // No se necesita ninguna acción aquí, la función animate() hará el trabajo.
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
    drawBackgroundTexture();
    drawThemeButton();
    drawVerticalNavBar();
    drawSearchButton();
    drawHomeButton(); 
    drawSettingsButton();
    drawProfileButton(); 
    drawAddNoteButton(); 
    drawProfileContent(); // Elementos específicos del perfil
    // 3. DIBUJAR ELEMENTOS SOBRE EL ÁREA DE CONTENIDO
    // El botón de autenticación debe ir AQUÍ, para estar SOBRE el marco principal.
    // drawAuthButton(); // ⬅️ Si no está definida, coméntala.
   // ✅ CÓDIGO DE SCROLL SKETCHY
const feedContainer = document.getElementById('feed-container');
let scrollbarYRatio = 0; 

if (feedContainer && feedContainer.scrollHeight > feedContainer.clientHeight) {
    scrollbarYRatio = feedContainer.scrollTop / (feedContainer.scrollHeight - feedContainer.clientHeight);
}

drawSketchyScrollbar(scrollbarYRatio);
    
    // 3. Solicitar el próximo frame
    requestAnimationFrame(animate);
}
// ------------------------------------------------------------------
// 5. INICIALIZACIÓN Y PUNTO DE ENTRADA - ¡CORREGIDO EL CIERRE DE CARGA!
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
    
    // Aquí iría el dibujo inicial del scrollbar si es necesario
    const feedContainer = document.getElementById('feed-container');
    let scrollbarYRatio = 0;
    if (feedContainer && feedContainer.scrollHeight > feedContainer.clientHeight) {
        scrollbarYRatio = feedContainer.scrollTop / (feedContainer.scrollHeight - feedContainer.clientHeight);
    }
    drawSketchyScrollbar(scrollbarYRatio);
}

// Punto de Entrada Principal
function startApp() {
    // 1. Dibuja todos los elementos de la interfaz la primera vez (para tener tamaños correctos)
    initialDraw();

    // 💡 SOLUCIÓN RÁPIDA PARA ANULAR EL FEED (SE MANTIENE)
    const feedContainer = document.getElementById('feed-container');
    const profileContent = document.getElementById('profile-content');
    
    if (feedContainer && profileContent) {
        const profileContentElement = feedContainer.removeChild(profileContent);
        feedContainer.innerHTML = '';
        feedContainer.appendChild(profileContentElement);
    }
    // FIN DE SOLUCIÓN RÁPIDA

    // 2. Inicia el bucle de animación para el redibujado de 4 FPS
    requestAnimationFrame(animate); 

    // ==========================================================
    // ✅ GESTIÓN DE LA DESAPARICIÓN DE LA PANTALLA DE CARGA (Añadido)
    // ==========================================================
    const loadingOverlay = document.getElementById('loading-screen-overlay');

    if (loadingOverlay) {
        // 1. Detener la animación de los puntos
        if (window.stopLoadingAnimation) {
            window.stopLoadingAnimation();
        }

        // 2. Efecto Flash Blanco (Llama a drawLoadingScreen con color de tinta por 200ms)
        if (window.drawLoadingScreen) {
            const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
            window.drawLoadingScreen(performance.now(), strokeColor); 
        }

        setTimeout(() => {
            // 3. Iniciar el desvanecimiento gradual (cambiando la opacidad CSS)
            loadingOverlay.style.opacity = '0';

            // 4. Eliminar del DOM después de que termine la transición (600ms total)
            setTimeout(() => {
                loadingOverlay.remove();
            }, 600); 

        }, 200); // Duración del "flash"
    } else {
        // Si no hay pantalla de carga, solo iniciamos la animación de la app
        // (Aunque ya se inició arriba, esto es un fallback)
        // requestAnimationFrame(animate); // Ya llamado, se deja solo la lógica de carga
    }
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

    // 💡 SOLUCIÓN RÁPIDA PARA ANULAR EL FEED
    const feedContainer = document.getElementById('feed-container');
    const profileContent = document.getElementById('profile-content');
    
    if (feedContainer && profileContent) {
        // 1. Guarda el contenido del perfil (lo saca del DOM, pero mantiene el elemento)
        const profileContentElement = feedContainer.removeChild(profileContent);
        
        // 2. Limpia el contenedor (esto elimina cualquier post inyectado por otro script)
        feedContainer.innerHTML = '';
        
        // 3. Reinserta solo el contenido del perfil
        feedContainer.appendChild(profileContentElement);
    }
    // FIN DE SOLUCIÓN RÁPIDA
    
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
