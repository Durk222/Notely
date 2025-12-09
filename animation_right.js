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
// --- NUEVA FUNCIÓN EN animation_right.js ---
function drawSketchyScrollbar(scrollbarYRatio) {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();

    // 1. DIMENSIONES Y POSICIÓN DEL TRACK (Contenedor de la barra)
    const SCROLL_WIDTH = 8; // Ancho de la barra
    const MARGIN = 20; // Margen usado en toda la app

    // Altura y posición Y del track (igual que la zona de feed)
    const trackYStart = 70; // 20 (Margin Top) + 50 (Altura Botón Auth)
    const trackHeight = canvas.height - trackYStart - MARGIN; // Altura hasta el margen inferior
    const trackXStart = canvas.width - MARGIN - SCROLL_WIDTH; // Lado derecho, con margen

    // Dibujar el TRACK (Fondo de la barra)
    rc.rectangle(trackXStart, trackYStart, SCROLL_WIDTH, trackHeight, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 1,
        fill: fillColor, // Color de fondo (blanco/oscuro)
        fillStyle: 'solid'
    });

    // 2. DIBUJO DEL THUMB (El 'pulgar' que se mueve)
    const thumbMinHeight = 20; // Altura mínima para que sea visible
    
    // Asumimos un thumb que ocupa el 10% del track
    let thumbHeight = Math.max(thumbMinHeight, trackHeight * 0.15); 
    
    // Aseguramos que el thumb no sea más alto que el track
    if (thumbHeight > trackHeight) thumbHeight = trackHeight;

    // Calcular la posición Y del thumb (Limitado por los bordes)
    const maxThumbMovement = trackHeight - thumbHeight;
    const thumbY = trackYStart + maxThumbMovement * scrollbarYRatio;

    // Dibujar el THUMB
    rc.rectangle(trackXStart, thumbY, SCROLL_WIDTH, thumbHeight, {
        roughness: 2.0,
        stroke: strokeColor,
        strokeWidth: 1,
        fill: strokeColor, // Relleno con color de tinta
        fillStyle: 'solid'
    });
}
