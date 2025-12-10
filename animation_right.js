// ==================================================================
// ANIMACIONES DEL LADO DERECHO (Feed, Botones Secundarios, etc.)
// ==================================================================

/**
 * Dibuja el botón de "Iniciar Sesión o Crear Cuenta" en la esquina superior derecha.
 * Asume que el usuario está "desconectado" (datos de sesión = 0).
 */
function drawAuthButton() {
    // ✅ INICIALIZACIÓN DE VARIABLES LOCALES (¡CORREGIDO!)
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // --- Posicionamiento y Dimensiones ---
    const btnWidth = 230; // Ancho ajustado
    const btnHeight = 40;
    
    // Usamos las variables globales de animation.js:
    const margin = THEME_BTN_MARGIN; 
    const navBarMarginTop = NAV_BAR_MARGIN_TOP; 

    // Calcula la posición X (desde la derecha)
    const x = canvas.width - margin - btnWidth; 
    
    // Calcula la posición Y (desde arriba)
    const y = navBarMarginTop;

    // 1. Dibujar el marco del botón (Rectángulo) con Rough.js
    rc.rectangle(x, y, btnWidth, btnHeight, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor, 
        fillStyle: 'solid'
    });

    // 2. Dibujar el texto (usando el contexto 2D estándar)
    const text = "Inicia Sesión o Crea una Cuenta";

    // *** LÍNEA CLAVE CORREGIDA: Usando 'Flabby Bums' ***
    ctx.font = `bold 14px 'Flabby Bums', cursive`; 
    ctx.fillStyle = strokeColor;
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle';

    // Posición del texto (centro del botón)
    const textX = x + btnWidth / 2;
    const textY = y + btnHeight / 2;

    ctx.fillText(text, textX, textY);
}

// ------------------------------------------------------------------
// (Las funciones futuras como drawPostFrame irán aquí)
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// --- NUEVA FUNCIÓN CORREGIDA EN animation_right.js ---
function drawSketchyScrollbar(scrollbarYRatio) {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();

    // ✅ OBTENEMOS LAS CONSTANTES GLOBALES DE animation.js
    const AUTH_BTN_HEIGHT = 40; // Altura del botón de autentificación (fijo)
    const NAV_BAR_MARGIN_TOP = window.NAV_BAR_MARGIN_TOP || 20; // Margen superior
    const THEME_BTN_MARGIN = window.THEME_BTN_MARGIN || 20; // Margen inferior

    const SCROLL_WIDTH = 8; // Ancho del track y del thumb

    // 1. CÁLCULO DE DIMENSIONES Y POSICIÓN DEL TRACK (Contenedor de la barra)
    // trackYStart: NAV_BAR_MARGIN_TOP + AUTH_BTN_HEIGHT + ESPACIO (10px).
    const trackYStart = NAV_BAR_MARGIN_TOP + AUTH_BTN_HEIGHT + 10;
    
    // trackHeight: canvas.height - (Todo lo de arriba) - (Margen de abajo).
    const trackHeight = canvas.height - trackYStart - THEME_BTN_MARGIN;
    
    // trackXStart: Posición X desde la derecha.
    const trackXStart = canvas.width - THEME_BTN_MARGIN - SCROLL_WIDTH;

    // Dibujar el TRACK (Fondo de la barra)
    rc.rectangle(trackXStart, trackYStart, SCROLL_WIDTH, trackHeight, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 1,
        fill: fillColor, 
        fillStyle: 'solid'
    });

    // 2. CÁLCULO Y DIBUJO DEL THUMB (El 'pulgar' que se mueve)
    const thumbMinHeight = 20; 
    
    // Calcula la altura inicial del thumb (15% del track o minHeight)
    let thumbHeight = Math.max(thumbMinHeight, trackHeight * 0.15); 
    if (thumbHeight > trackHeight) thumbHeight = trackHeight; // Asegura que no exceda el track

    const maxThumbMovement = trackHeight - thumbHeight;
    // La posición Y se calcula aplicando el ratio al máximo movimiento posible
    const thumbY = trackYStart + maxThumbMovement * scrollbarYRatio;

    // Dibujar el THUMB
    rc.rectangle(trackXStart, thumbY, SCROLL_WIDTH, thumbHeight, {
        roughness: 2.0,
        stroke: strokeColor,
        strokeWidth: 1,
        fill: strokeColor, 
        fillStyle: 'solid'
    });
}

/**
 * Anima (redibuja) todos los placeholders existentes en el feed.
 * Se llama 4 veces por segundo desde animation.js para dar vida a los posts.
 */
function animateAllPlaceholders() {
    const placeholders = document.querySelectorAll('.post-placeholder');
    placeholders.forEach(postDiv => {
        const postCanvas = postDiv.querySelector('canvas');
        if (postCanvas) {
            // 1. Limpiar el canvas antes de dibujar el nuevo rough
            const ctx = postCanvas.getContext('2d');
            ctx.clearRect(0, 0, postCanvas.width, postCanvas.height);
            
            // 2. Redibujar el placeholder (que incluye el marco y los puntos)
            // drawPlaceholderCanvas debe ser accesible globalmente o importado/copiado aquí.
            // ASUMIMOS que drawPlaceholderCanvas está declarado globalmente en scroll_handler.js
            window.drawPlaceholderCanvas(postCanvas); 
        }
    });
}
// EXPORTS LIMPIOS
window.drawSketchyScrollbar = drawSketchyScrollbar;
window.animateAllPlaceholders = animateAllPlaceholders;
