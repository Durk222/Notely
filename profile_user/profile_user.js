// ==================================================================
// PROFILE.JS - Dibujos y Animaciones de la página
// ==================================================================
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

// --- VARIABLES GLOBALES DEL MARCO Y ANIMACIÓN ---
var MARGIN = 5;
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
// 2. DIBUJO DEL MARCO PRINCIPAL (Relleno Sólido) - ¡CORREGIDO Y REFORZADO!
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
    
    // 💡 PASO 3: Limpiar el Canvas Completo
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    const rc = rough.canvas(canvas);
    
    // --- 1. CAPA INFERIOR: Relleno anti-bowing (Ligeramente más grande y menos rugoso) ---
    const ANTI_BOWING_OFFSET = 8; // Mover 8px más allá del límite para asegurar cobertura

    rc.rectangle(
        MARGIN - ANTI_BOWING_OFFSET,  // Más a la izquierda
        MARGIN - ANTI_BOWING_OFFSET,  // Más arriba
        canvas.width - 2 * MARGIN + 2 * ANTI_BOWING_OFFSET, // Más ancho
        canvas.height - 2 * MARGIN + 2 * ANTI_BOWING_OFFSET, // Más alto
        {
            // Baja rugosidad para parecer más sólido y limpio
            roughness: 0.5, 
            strokeWidth: 2, // Sin borde, solo relleno
            fill: fillColor, 
            fillStyle: 'solid'
        }
    );

    // --- 2. CAPA SUPERIOR: El Marco Principal (Con Alto Bowing y Roughness) ---
    rc.rectangle(
        MARGIN, 
        MARGIN, 
        canvas.width - 2 * MARGIN, 
        canvas.height - 2 * MARGIN, 
        {
            roughness: 2.8, 
            stroke: strokeColor, 
            strokeWidth: 3, 
            bowing: 2, // Alto bowing para el efecto "arrugado"
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
// ------------------------------------------------------------------
// 3. DIBUJO DE CONTENIDO ESPECÍFICO DEL PERFIL (NUEVO Y CORREGIDO)
// ------------------------------------------------------------------
function drawProfileContent() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    
    const container = document.getElementById('frame-container');
    const profileContent = document.getElementById('profile-content');
    
    if (!profileContent || !container) {
        return;
    }
    
    // --- 1. Calcular Centro Horizontal (Centrado) ---
    const contentXStart = NAV_BAR_WIDTH + 2 * THEME_BTN_MARGIN; 
    const contentWidth = container.clientWidth - contentXStart - 2 * MARGIN; // Ancho del marco menos el margen derecho

    // Centro real del contenido
    const centerX = contentXStart + contentWidth / 2;
    
    // --- 2. Calcular Posición Vertical (Debajo del Texto) ---    
    // Usamos el contenedor del marco como referencia para el Top.
    const containerTop = container.offsetTop; // Posición Y donde empieza el marco
    
    // Altura total del contenido HTML, ajustada por el scroll
    const contentBottomY = containerTop + profileContent.offsetTop + profileContent.offsetHeight;

    // Queremos que el separador esté 20px debajo del contenido de perfil
    const separatorY = contentBottomY + 20; 
    
    // --- 3. DIBUJAR: Separador Horizontal Centrado ---
    const LINE_LENGTH = 150; // Longitud total del separador (300px)
    
    rc.line(
        centerX - LINE_LENGTH, 
        separatorY, 
        centerX + LINE_LENGTH, 
        separatorY, 
        {
            roughness: 1.5,
            stroke: strokeColor,
            strokeWidth: 2
        }
    );
}
// ------------------------------------------------------------------
// 11. DIBUJO DE LA BARRA DE SCROLL (Rough.js Sketchy) - ¡COMPLETA!
// ------------------------------------------------------------------
var SCROLL_BAR_WIDTH = 10;
var SCROLL_BAR_MARGIN = 12;

function drawSketchyScrollbar(scrollRatio) {
    const canvas = document.getElementById('notelyCanvas');
    // Comprobar si el canvas existe antes de continuar
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    // Altura del botón de Autenticación (Sección 12): 40px
    const btnHeight = 40;
    // Margen superior (Sección 12): NAV_BAR_MARGIN_TOP (20px)
    const navBarMarginTop = NAV_BAR_MARGIN_TOP;
    
    //      Altura y margen del área de contenido (donde debe ir el scroll)
    const contentYStart = navBarMarginTop + btnHeight + MARGIN + 35; // 20 + 40 + 5 + 35 = 100px    
    // FIN: Hasta antes del botón de tema
    const contentYEnd = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE - BUTTON_SPACING;
    const contentHeight = contentYEnd - contentYStart;
    
    // Posición X (borde derecho, margen interior del marco)
    const x = canvas.width - SCROLL_BAR_MARGIN - SCROLL_BAR_WIDTH - MARGIN;
    
    // --- 1. Dibujar el TRACK (Fondo de la barra) ---
    const trackHeight = contentHeight;
    const trackY = contentYStart;
    
    // Dibujamos el track completo con el color de fondo para que se vea como un "riego"
    rc.rectangle(x, trackY, SCROLL_BAR_WIDTH, trackHeight, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 1, 
        fill: fillColor,
        fillStyle: 'solid'
    });
    
    // --- 2. Calcular el tamaño y posición del "pulgar" (thumb) ---
    const thumbMinHeight = 40; 
    
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
// 11. DIBUJO DEL BOTÓN DE ESTADO DE SESIÓN (Candado / Icono de Avatar)
// ------------------------------------------------------------------
function drawSessionStateButton() { // <-- ¡Nuevo nombre de función!
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // Coordenadas del centro de la CELDA: ÍNDICE 5
    const centerX = THEME_BTN_MARGIN + NAV_BAR_WIDTH / 2;
    const centerY = NAV_BAR_MARGIN_TOP + (BUTTON_HEIGHT * 5) + (BUTTON_HEIGHT / 2); 
    
    // Parámetros del Candado
    const lockWidth = 16;
    const lockHeight = 12;
    const handleRadius = 6;
    
    const x = centerX - lockWidth / 2;
    const y = centerY - lockHeight / 2 + handleRadius * 0.5; // Ajuste Y para el asa
    
    // --- 1. Cuerpo del Candado (Rectángulo) ---
    rc.rectangle(x, y, lockWidth, lockHeight, {
        roughness: 1,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: strokeColor, // Relleno sólido
        fillStyle: 'solid'
    });
    
    // --- 2. Asa del Candado (Arco) ---
    // Posición: Centrada sobre el cuerpo del candado
    const arcX = centerX;
    const arcY = y; // Comienza en el tope del rectángulo
    
    // Dibujamos un círculo con el color de fondo para 'vaciar' el asa.
    rc.arc(arcX, arcY, handleRadius, handleRadius, Math.PI, 2 * Math.PI, false, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 2.5, 
        fill: fillColor, 
        fillStyle: 'solid'
    });
    
    // --- 3. Hueco de la cerradura (Círculo pequeño) ---
    rc.circle(centerX, y + lockHeight * 0.7, 2, {
        roughness: 1,
        stroke: strokeColor,
        strokeWidth: 1,
        fill: fillColor, // Relleno de fondo para simular hueco
        fillStyle: 'solid'
    });
}
// ------------------------------------------------------------------
// 12. DIBUJO DEL BOTÓN DE AUTENTICACIÓN GRANDE (Esquina Superior Derecha)
// ------------------------------------------------------------------
function drawAuthButton() { // <-- ¡Esta es la función de animation_right.js!
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // --- Posicionamiento y Dimensiones ---
    const btnWidth = 230; // Ancho ajustado
    const btnHeight = 40;
    
    // Usamos las variables globales de profile_user.js:
    const margin = THEME_BTN_MARGIN; // Margen de 20px
    const navBarMarginTop = NAV_BAR_MARGIN_TOP; // Margen de 20px

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
// 7B. DETECCIÓN DE CLICS ESPECÍFICOS DE PROFILE_USER (CON NAVEGACIÓN CORREGIDA)
// ------------------------------------------------------------------
function handleProfilePageClicks(x, y, canvas) {
    // Definiciones de área (copiadas de animation.js para HOME y PROFILE)
    const navXMin = THEME_BTN_MARGIN;
    const navXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH;

    // --- 1. DETECCIÓN DEL BOTÓN DE CASA (Home) (Index 1) ---
    const buttonHomeYMin = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 1;
    const buttonHomeYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 2;

    if (x >= navXMin && x <= navXMax && y >= buttonHomeYMin && y <= buttonHomeYMax) {
        console.log("Clic en el botón de Casa (Home).");
        if (window.startOutroTransition) {
            // ✅ CORRECCIÓN CLAVE: Sube un nivel para ir al index.html
            window.startOutroTransition('../index.html'); 
        }
        return true;
    }

    // --- 2. DETECCIÓN DEL BOTÓN DE PERFIL (Profile) (Index 3) ---
    const buttonProfileYMin = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 3;
    const buttonProfileYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 4;

    if (x >= navXMin && x <= navXMax && y >= buttonProfileYMin && y <= buttonProfileYMax) {
        console.log("Clic en el botón de Perfil (Recargar).");
        if (window.startOutroTransition) {
            // ✅ CORRECCIÓN CLAVE: Recargar la página actual.
            // Esto evita que se añada otra carpeta a la ruta: profile_user/profile.html
            window.startOutroTransition('profile.html'); 
        }
        return true;
    }
    
    // --- 3. DETECCIÓN DEL BOTÓN GRANDE DE AUTENTICACIÓN (Superior Derecha) ---
    // (Mantengo tu lógica anterior para este botón)
    const btnWidth = 230; 
    const btnHeight = 40;
    const margin = THEME_BTN_MARGIN; 
    const navBarMarginTop = NAV_BAR_MARGIN_TOP; 

    const buttonAuthXMin = canvas.width - margin - btnWidth; 
    const buttonAuthXMax = canvas.width - margin; 
    const buttonAuthYMin = navBarMarginTop;
    const buttonAuthYMax = navBarMarginTop + btnHeight;

    if (x >= buttonAuthXMin && x <= buttonAuthXMax && y >= buttonAuthYMin && y <= buttonAuthYMax) {
        console.log("Clic en el Botón GRANDE de Autenticación.");
        // Lógica futura para iniciar el proceso de login/registro
        return true; 
    }
        // --- 4. DETECCIÓN DEL BOTÓN DE ESTADO DE SESIÓN (Candado/Índice 5) ---
    const buttonSessionYMin = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 5; 
    const buttonSessionYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 6; 

    if (x >= navXMin && x <= navXMax && y >= buttonSessionYMin && y <= buttonSessionYMax) {
        console.log("Clic en el botón de Estado de Sesión (Candado).");
        // Lógica de acción aquí (e.g., window.toggleSessionModal())
        return true; 
    }
    
    // Si el clic no coincide con ningún botón de perfil ni navegación
    return false;
}
// --- DIBUJO DE ICONOS (asumiendo que son copias exactas de animation.js) ---
// ------------------------------------------------------------------
// 5. DIBUJO DEL BOTÓN DE BÚSQUEDA (Lupa)
// ------------------------------------------------------------------
function drawSearchButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // Coordenadas del centro del botón (parte superior de la barra):
    const centerX = THEME_BTN_MARGIN + NAV_BAR_WIDTH / 2;
    const centerY = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT / 2; 

    // --- 1. Círculo de la Lupa ---
    const circleRadius = SEARCH_ICON_SIZE;
    rc.circle(centerX, centerY - 2, circleRadius, { // -2 para centrar verticalmente mejor
        roughness: 2,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor, // La lupa debe estar hueca
        fillStyle: 'solid'
    });
    
    // --- 2. Mango de la Lupa (rc.line) ---
    const lineLength = circleRadius * 0.8; 
    
    // Posición de inicio (en el borde inferior derecho del círculo)
    const x1 = centerX + circleRadius * Math.cos(Math.PI / 4); // x + r*cos(45deg)
    const y1 = centerY - 2 + circleRadius * Math.sin(Math.PI / 4); // y + r*sin(45deg)

    // Posición final (abajo a la derecha)
    const x2 = x1 + lineLength * Math.cos(Math.PI / 4);
    const y2 = y1 + lineLength * Math.sin(Math.PI / 4);
    
    rc.line(x1, y1, x2, y2, {
        roughness: 2,
        stroke: strokeColor,
        strokeWidth: 2
    });
}

// ------------------------------------------------------------------
// 7. DIBUJO DEL BOTÓN DE CASA (Home)
// ------------------------------------------------------------------
function drawHomeButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // Coordenadas del centro: 
    const centerX = THEME_BTN_MARGIN + NAV_BAR_WIDTH / 2;
    const centerY = NAV_BAR_MARGIN_TOP + (BUTTON_HEIGHT * 1) + (BUTTON_HEIGHT / 2);

    const baseWidth = 22;
    const baseHeight = 15;
    const roofHeight = 8;
    
    const x = centerX - baseWidth / 2;
    const y = centerY - baseHeight / 2 + roofHeight / 2; // Ajuste para el tejado

    // --- 1. Cuerpo de la Casa (Rectángulo) ---
    rc.rectangle(x, y, baseWidth, baseHeight, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor, 
        fillStyle: 'solid'
    });
    
    // --- 2. Tejado (rc.path o rc.polygon) ---
    const roofPoints = [
        [x, y],
        [centerX, y - roofHeight],
        [x + baseWidth, y]
    ];
    
    // Convertir los puntos a una cadena de path SVG y dibujarlos
    const pathData = `M ${roofPoints[0][0]} ${roofPoints[0][1]} L ${roofPoints[1][0]} ${roofPoints[1][1]} L ${roofPoints[2][0]} ${roofPoints[2][1]} Z`;
    
    rc.path(pathData, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor,
        fillStyle: 'solid'
    });
    
    // --- 3. Puerta (Pequeño rectángulo con relleno sólido) ---
    const doorWidth = 6;
    const doorHeight = 8;
    rc.rectangle(centerX - doorWidth / 2, y + baseHeight - doorHeight, doorWidth, doorHeight, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 1,
        fill: strokeColor, // Relleno con el color de la tinta para que se vea sólido
        fillStyle: 'solid'
    });
}

// ------------------------------------------------------------------
// 8. DIBUJO DEL BOTÓN DE AÑADIR NOTA (Hoja con +) - AHORA POSICIÓN FIJA (Índice 4)
// ------------------------------------------------------------------
function drawAddNoteButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // Coordenadas del centro de la CELDA: Índice 4 (Fijo)
    const centerX = THEME_BTN_MARGIN + NAV_BAR_WIDTH / 2;
    const centerY = NAV_BAR_MARGIN_TOP + (BUTTON_HEIGHT * 4) + (BUTTON_HEIGHT / 2); // CÁLCULO FIJO
    
    const sheetWidth = 20;
    const sheetHeight = 25;
    
    const x = centerX - sheetWidth / 2;
    const y = centerY - sheetHeight / 2; // Simplemente centrado en el segmento
    
    // --- 1. Base de la Hoja (Rectángulo) ---
    rc.rectangle(x, y, sheetWidth, sheetHeight, {
        roughness: 2,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor, 
        fillStyle: 'solid'
    });
    
    // --- 2. Pliegue de la Esquina Superior Derecha (rc.path) ---
    const foldSize = 6;
    const foldPath = `M ${x + sheetWidth - foldSize} ${y} L ${x + sheetWidth} ${y + foldSize} L ${x + sheetWidth - foldSize} ${y + foldSize} Z`;
    
    rc.path(foldPath, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 1,
        fill: fillColor,
        fillStyle: 'solid'
    });
    
    rc.line(x + sheetWidth - foldSize, y, x + sheetWidth, y + foldSize, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 1
    });

    // --- 3. Símbolo de + (rc.line) ---
    const plusSize = 10;
    const plusMargin = 5;
    const plusX = x + plusMargin;
    const plusY = y + sheetHeight - plusSize - plusMargin; 
    
    rc.line(plusX, plusY + plusSize / 2, plusX + plusSize, plusY + plusSize / 2, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 2
    });
    rc.line(plusX + plusSize / 2, plusY, plusX + plusSize / 2, plusY + plusSize, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 2
    });
}
// ------------------------------------------------------------------
// 9. DIBUJO DEL BOTÓN DE CONFIGURACIÓN (Engranaje)
// ------------------------------------------------------------------
function drawSettingsButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
// Coordenadas del centro de la CELDA: Ahora es el Índice 2
    const centerX = THEME_BTN_MARGIN + NAV_BAR_WIDTH / 2;
    const centerY = NAV_BAR_MARGIN_TOP + (BUTTON_HEIGHT * 2) + (BUTTON_HEIGHT / 2); // CÁLCULO CORREGIDO

    // Parámetros del Engranaje
    const gearRadius = 13;
    const gearInnerRadius = 5;
    
    // --- 1. Dibujar la Forma Externa del Engranaje (rc.path) ---
    const pathSegments = [];
    const numTeeth = 8;
    
    for (let i = 0; i < numTeeth * 2; i++) {
        const radius = (i % 2 === 0) ? gearRadius : gearRadius * 0.7; 
        const angle = Math.PI / numTeeth * i - Math.PI / 8;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        if (i === 0) {
            pathSegments.push(`M ${x} ${y}`);
        } else {
            pathSegments.push(`L ${x} ${y}`);
        }
    }
    pathSegments.push('Z'); 
    const gearPath = pathSegments.join(' ');

    rc.path(gearPath, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: strokeColor, 
        fillStyle: 'solid'
    });
    
    // --- 2. Crear el Hueco (rc.circle con fill: fillColor) ---
    rc.circle(centerX, centerY, gearInnerRadius, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 1,
        fill: fillColor,
        fillStyle: 'solid'
    });
}

// ------------------------------------------------------------------
// 10. DIBUJO DEL BOTÓN DE PERFIL (Usuario) - AJUSTE FINAL (Silueta Sólida)
// ------------------------------------------------------------------
function drawProfileButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    // Coordenadas del centro de la CELDA: Índice 3
    const centerX = THEME_BTN_MARGIN + NAV_BAR_WIDTH / 2;
    const centerY = NAV_BAR_MARGIN_TOP + (BUTTON_HEIGHT * 3) + (BUTTON_HEIGHT / 2); 
    
    // Parámetros del Icono
    const headRadius = 7;
    const bodyHeight = 10;
    
    // --- 1. Cuerpo/Hombros (Path) ---
    const bodyWidth = 2 * headRadius + 8;
    const bodyY = centerY + headRadius * 0.4; // Posición Y baja
    
    const bodyPath = `
        M ${centerX - bodyWidth / 2} ${bodyY} 
        A ${bodyWidth / 2} ${bodyHeight * 0.8}, 0, 0, 1, ${centerX + bodyWidth / 2} ${bodyY}
    `;
    
    rc.path(bodyPath, {
        roughness: 2,
        stroke: strokeColor,
        strokeWidth: 1.5,
        fill: strokeColor, // ✅ CAMBIO CRÍTICO: Relleno con color de tinta (SILUETA SÓLIDA)
        fillStyle: 'solid'
    });
    
    // --- 2. Cabeza (Círculo) ---
    const headY = bodyY - bodyHeight * 1.1; 
    
    rc.circle(centerX, headY, headRadius, {
        roughness: 2,
        stroke: strokeColor,
        strokeWidth: 1.5,
        fill: strokeColor,
        fillStyle: 'solid'
    });
}
window.handleProfilePageClicks = handleProfilePageClicks;
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
    drawProfileContent();
    drawSessionStateButton();
    drawAuthButton();
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
    drawProfileContent();
    drawSessionStateButton();
    drawAuthButton();
    
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

    // 2. Inicia el bucle de animación para el redibujado de 4 FPS
    requestAnimationFrame(animate); 
    
    // 3. Inicia la animación de la pantalla de carga (si existe en loading_screen.js)
    if (window.startLoadingAnimation) {
        window.startLoadingAnimation(); 
    }
}

// Aseguramos que los eventos se configuren lo antes posible
setupEventListeners();
// Llamar a startApp cuando la ventana esté completamente cargada (incluyendo Rough.js y fuentes)
window.addEventListener('load', startApp);
