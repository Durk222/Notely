// ==================================================================
// ANIMACIONES DEL LADO DERECHO (Feed, Botones Secundarios, etc.)
// ==================================================================

/**
 * Dibuja el botón de "Iniciar Sesión o Crear Cuenta" en la esquina superior derecha.
 * Asume que el usuario está "desconectado" (datos de sesión = 0).
 */
function drawAuthButton() {
    // ... (canvas, rc, ctx, strokeColor, fillColor)

    // AHORA LAS REFERENCIAMOS DIRECTAMENTE YA QUE ESTÁN CON 'var' en animation.js
    
    // --- Posicionamiento y Dimensiones ---
    const btnWidth = 230; // Ancho ajustado
    const btnHeight = 40;
    
    // Usamos las variables globales directamente:
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
