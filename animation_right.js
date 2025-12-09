// ==================================================================
// ANIMACIONES DEL LADO DERECHO (Feed, Botones Secundarios, etc.)
// ==================================================================

/**
 * Dibuja el botón de "Iniciar Sesión o Crear Cuenta" en la esquina superior derecha.
 * Asume que el usuario está "desconectado" (datos de sesión = 0).
 */
function drawAuthButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d'); // Necesario para dibujar texto

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // --- Posicionamiento y Dimensiones ---
    // Aumentamos el ancho de 180 a 230px para dar margen al texto largo
    const btnWidth = 230; 
    const btnHeight = 40;

    // Calcula la posición X (desde la derecha)
    const x = canvas.width - margin - btnWidth;
    // Calcula la posición Y (desde arriba, alineada con la barra de navegación)
    const y = NAV_BAR_MARGIN_TOP; 

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
