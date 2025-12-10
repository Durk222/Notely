// ==================================================================
// LOADING SCREEN (Pantalla de Carga Animada con Rough.js)
// ==================================================================
// Nota: Aquí se carga la imágen del logo
const logoImage = new Image();
logoImage.src = 'assets/notely_memeicon.png'; // El logo
logoImage.onload = () => {
    // La imagen está lista.
    // Aquí podrías disparar la animación
};
// --- CONSTANTES GLOBALES DEL LOADING ---
const FRAME_DURATION = 1000 / 60; // 60 FPS (para la animación fluida de los puntos)

// Puntos de carga
const DOT_BASE_RADIUS = 7;
const DOT_MAX_PULSE = 5; // Cuánto crece el radio al pulsar
const DOT_SPACING = 30; // Espacio entre centros de los puntos
const PULSE_SPEED = 0.005; // Velocidad de la onda de pulsación

// Bandera de estado para la animación
let loadingAnimationID = null;

/**
 * Dibuja la pantalla de carga completa: Marco, Logo, Puntos animados y Texto.
 * Es llamado dentro de un bucle de animación a alta frecuencia (60 FPS) para los puntos.
 * @param {number} timestamp - Tiempo transcurrido (proporcionado por requestAnimationFrame).
 * @param {string} fadeColor - Color para el efecto de "flash" (usualmente 'var(--color-fg)').
 */
function drawLoadingScreen(timestamp, fadeColor = null) {
    const canvas = document.getElementById('loadingCanvas');
    // Aseguramos que el canvas ocupe el tamaño de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Obtenemos los colores (los colores dinámicos deberían ser accesibles globalmente)
    const strokeColor = fadeColor || getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // --- 1. DIBUJAR EL MARCO (Decorativo) ---
    const margin = 20;
    rc.rectangle(margin, margin, canvas.width - 2 * margin, canvas.height - 2 * margin, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor,
        fillStyle: 'solid'
    });

    // --- 2. CONTENEDOR DEL LOGO (Área de 150x150 px) ---
    const logoSize = 150;
    const logoY = centerY - 150; // Posicionamos el logo arriba del centro
    
// ✅ LÍNEA CORREGIDA: Definir logoX (centrado horizontalmente)
const logoX = centerX - logoSize / 2; 

// ✅ NUEVO: Dibuja la imagen del logo si ya ha cargado
if (logoImage.complete) {
    ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
} else {
    // Opcional: Si la imagen no ha cargado, puedes dibujar un placeholder temporal aquí.
    // Por ejemplo, dibujar un círculo de Rough.js.
}
    
    // --- 3. ANIMACIÓN DE LOS PUNTOS DE CARGA (ELLIPSIS) ---
    const dotCenterY = centerY + 20; // Un poco abajo del centro
    
    // Iterar sobre los 3 puntos (índices: -1, 0, 1)
    [-1, 0, 1].forEach(index => {
        const dotCenterX = centerX + index * DOT_SPACING;
        
        // CÁLCULO DE LA PULSACIÓN: Usamos Seno para el movimiento de onda
        // El desplazamiento de fase (index * Math.PI / 3) asegura que pulsen secuencialmente.
        // Convertimos el timestamp a un valor más manejable multiplicando por PULSE_SPEED
        const phaseShift = index * Math.PI / 3;
        const currentRadius = DOT_BASE_RADIUS + 
            DOT_MAX_PULSE * Math.sin(timestamp * PULSE_SPEED + phaseShift);
            
        // Dibujar el círculo animado
        rc.circle(dotCenterX, dotCenterY, currentRadius, {
            roughness: 1.5,
            stroke: strokeColor,
            strokeWidth: 1,
            fill: strokeColor,
            fillStyle: 'solid'
        });
    });

    // --- 4. DIBUJAR TEXTO (Powered by Notely) ---
    const textY = dotCenterY + 60; // Debajo de los puntos
    
    // Estilo para "Desarrollado por" (Exin Regular)
    ctx.font = `20px 'Exin Regular', sans-serif`; 
    ctx.fillStyle = strokeColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const textPowered = "DESARROLLADO POR";
    ctx.fillText(textPowered, centerX, textY);
    
    // Estilo para "Notely" (Flabby Bums)
    ctx.font = `bold 30px 'Flabby Bums', cursive`;
    const textNameY = textY + 25; 
    ctx.fillText("NOTELY", centerX, textNameY);
}


/**
 * Inicia el bucle requestAnimationFrame para animar los puntos.
 */
function startLoadingAnimation() {
    // Definimos el bucle de animación para los puntos
    function animate(timestamp) {
        drawLoadingScreen(timestamp);
        loadingAnimationID = requestAnimationFrame(animate);
    }
    loadingAnimationID = requestAnimationFrame(animate);
}

/**
 * Detiene el bucle de requestAnimationFrame.
 */
function stopLoadingAnimation() {
    if (loadingAnimationID !== null) {
        cancelAnimationFrame(loadingAnimationID);
        loadingAnimationID = null;
    }
}

/**
 * Gestiona la transición de salida de la página (Outro).
 * La pantalla se llena gradualmente con el color de fondo y luego navega.
 * @param {string} targetUrl - URL a la que se debe navegar.
 */
function startOutroTransition(targetUrl) {
    const body = document.body;
    const overlay = document.getElementById('loading-screen-overlay');

    if (!overlay) {
        // En caso de que el overlay haya sido eliminado, navegamos directamente
        window.location.href = targetUrl;
        return;
    }

    // 1. Aplicar el tema actual al overlay para la transición
    const currentTheme = body.getAttribute('data-theme') || 'light';
    body.setAttribute('data-theme', currentTheme);

    // 2. Insertar el overlay si fue removido (para la transición de salida)
    if (!document.body.contains(overlay)) {
         document.body.appendChild(overlay);
    }
    
    // Forzar el overlay a estar completamente visible (opacidad 1)
    overlay.style.opacity = '1';
    
    // Opcional: Asegurar que el fondo del overlay coincida con el tema actual.
    overlay.style.backgroundColor = getComputedStyle(body).getPropertyValue('--color-bg').trim();

    // 3. Simular un ligero "flash" del color de tinta antes del fade out
    if (window.drawLoadingScreen) {
        const strokeColor = getComputedStyle(body).getPropertyValue('--color-fg').trim();
        window.drawLoadingScreen(performance.now(), strokeColor); 
    }

    // 4. Esperar un momento (200ms) para el "flash" y luego navegar.
    setTimeout(() => {
        // La navegación abrupta produce el efecto de "relleno sólido" instantáneo.
        window.location.href = targetUrl; 
    }, 200); 
    
    // Nota: El efecto de "fade gradual" al cargar la NUEVA página se logra
    // gracias a la propiedad CSS 'transition: opacity 0.5s'
    // que se activa en la página de destino (el intro transition).
}
// EXPORTACIONES GLOBALES
window.drawLoadingScreen = drawLoadingScreen;
window.startLoadingAnimation = startLoadingAnimation;
window.stopLoadingAnimation = stopLoadingAnimation;
window.startOutroTransition = startOutroTransition;
