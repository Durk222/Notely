// --- VARIABLES PARA EL BOTÓN DE TEMA (cuadrado) ---
var THEME_BTN_SIZE = 40; // Tamaño del botón cuadrado del tema
var THEME_BTN_MARGIN = 20; // Margen desde la esquina inferior izquierda

// BARRA DE NAVEGACIÓN ---
var NAV_BAR_WIDTH = THEME_BTN_SIZE; // Usaremos el mismo ancho que el botón de tema (40px)
var NAV_BAR_MARGIN_TOP = 20; // Margen superior de la barra
var BUTTON_SPACING = 15; // Espacio entre el fondo de la barra y el siguiente elemento (Botón de Tema)
var BUTTON_HEIGHT = THEME_BTN_SIZE + 25; // Altura de la celda de cada botón (40 + 10 = 50px)

// --- VARIABLES PARA EL BOTÓN DE BÚSQUEDA ---
var SEARCH_ICON_SIZE = 12; // Radio del círculo de la lupa

// Configuraciones para la animación de 4 FPS
var FPS = 4;
var FRAME_INTERVAL = 1000 / FPS; // Intervalo en milisegundos entre cuadros (1000ms / 4 = 250ms)
let lastTime = 0;
// ------------------------------------------------------------------
// 1. DIBUJO DEL FONDO (Textura)
// ------------------------------------------------------------------
function drawBackgroundTexture() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Obtener los colores dinámicos:
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    
    // Ajustamos el canvas al tamaño completo de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rc = rough.canvas(canvas);
    
    // El fondo se redibujará aleatoriamente cada frame
    rc.rectangle(0, 0, canvas.width, canvas.height, {
        roughness: 2.8, 
        strokeWidth: 3,
        stroke: strokeColor, 
        fill: strokeColor, 
        fillStyle: 'dashed' 
    });
}

// ------------------------------------------------------------------
// 2. DIBUJO DEL MARCO PRINCIPAL (Relleno Sólido)
// ------------------------------------------------------------------
function drawNotelyFrame() {
    const canvas = document.getElementById('notelyCanvas');
    const container = document.getElementById('frame-container');

    // Obtener los colores dinámicos:
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    // Aseguramos que el Canvas tome el tamaño de su contenedor
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const rc = rough.canvas(canvas);
    
    // El marco se redibujará aleatoriamente cada frame
    rc.rectangle(5, 5, canvas.width - 10, canvas.height - 10, {
        roughness: 2.8, 
        stroke: strokeColor, 
        strokeWidth: 1, 
        fill: fillColor, 
        fillStyle: 'solid' 
    });
}


// ------------------------------------------------------------------
// 3. DIBUJO DEL BOTÓN DE TEMA (Cuadrado con Icono)
// ------------------------------------------------------------------
function drawThemeButton() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    // Obtener los colores dinámicos:
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
    const themeMode = getComputedStyle(document.body).getPropertyValue('--theme-mode').trim();
    
    // Posición: Inferior Izquierda, con un margen
    const x = THEME_BTN_MARGIN;
    const y = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE;
    
    // Dibujar el fondo del botón cuadrado (el contenedor visible)
    rc.rectangle(x, y, THEME_BTN_SIZE, THEME_BTN_SIZE, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor, // Relleno con el color de fondo para que se vea como un botón
        fillStyle: 'solid'
    });

    // --- Dibujar el Icono (Sol o Luna) DENTRO del cuadrado ---
    const centerX = x + THEME_BTN_SIZE / 2;
    const centerY = y + THEME_BTN_SIZE / 2;
    const radius = 10; // Radio más pequeño para que quepa

    if (themeMode === 'light') {
        // Modo Claro: Dibujar un Sol
        rc.circle(centerX, centerY, radius, {
            roughness: 2.5,
            stroke: strokeColor,
            strokeWidth: 1,
            fill: strokeColor, // El sol es oscuro
            fillStyle: 'solid'
        });

    } else {
        // Modo Oscuro: Dibujar una Luna Creciente
        rc.circle(centerX, centerY, radius, {
            roughness: 2.5,
            stroke: strokeColor,
            strokeWidth: 1,
            fill: strokeColor, // La luna es clara
            fillStyle: 'solid'
        });
        
        // Círculo de "mordida"
        rc.circle(centerX + radius / 3, centerY - radius / 3, radius, {
            roughness: 2.5,
            stroke: fillColor,
            strokeWidth: 0, 
            fill: fillColor, 
            fillStyle: 'solid'
        });
    }
}

// ------------------------------------------------------------------
// 4. DIBUJO DE LA BARRA DE NAVEGACIÓN VERTICAL
// ------------------------------------------------------------------
function drawVerticalNavBar() {
    const canvas = document.getElementById('notelyCanvas');
    const rc = rough.canvas(canvas);

    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();

    // Posición X: Igual que el botón de tema (THEME_BTN_MARGIN)
    const x = THEME_BTN_MARGIN;
    // Posición Y: Parte superior (NAV_BAR_MARGIN_TOP)
    const y = NAV_BAR_MARGIN_TOP;
    // Ancho: Igual que el botón de tema (NAV_BAR_WIDTH)
    const width = NAV_BAR_WIDTH;
    
    // Altura: Desde el margen superior hasta el margen superior del botón de tema, menos el espacio.
    const buttonThemeY = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE;
    const height = buttonThemeY - NAV_BAR_MARGIN_TOP - BUTTON_SPACING;
    
    // Dibujar el fondo rectangular
    rc.rectangle(x, y, width, height, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor,
        fillStyle: 'solid'
    });
}

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
    // Ahora es el Índice 1: NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 1 + BUTTON_HEIGHT / 2
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
    // Usaremos rc.path para mayor control sobre los puntos del triángulo
    const roofPoints = [
        [x, y], // Esquina izquierda (comienzo del rectángulo)
        [centerX, y - roofHeight], // Pico superior
        [x + baseWidth, y] // Esquina derecha (comienzo del rectángulo)
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
    // ... (El resto del código de dibujo de la hoja, pliegue y '+')
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
    // Este path define una forma rudimentaria de 8 puntas. 
    // Los puntos se calculan en base a gearRadius, rotados.
    const pathSegments = [];
    const numTeeth = 8;
    
    for (let i = 0; i < numTeeth * 2; i++) {
        const radius = (i % 2 === 0) ? gearRadius : gearRadius * 0.7; // Alterna radio para los dientes
        const angle = Math.PI / numTeeth * i - Math.PI / 8; // Ajuste de rotación
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        if (i === 0) {
            pathSegments.push(`M ${x} ${y}`);
        } else {
            pathSegments.push(`L ${x} ${y}`);
        }
    }
    pathSegments.push('Z'); // Cierra el path
    const gearPath = pathSegments.join(' ');

    rc.path(gearPath, {
        roughness: 2.5,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: strokeColor, // Rellenamos con el color de la tinta
        fillStyle: 'solid'
    });
    
    // --- 2. Crear el Hueco (rc.circle con fill: fillColor) ---
    // Dibujamos un círculo central del color de fondo para simular un hueco.
    rc.circle(centerX, centerY, gearInnerRadius, {
        roughness: 1.5,
        stroke: strokeColor,
        strokeWidth: 1, // Borde para definir el hueco
        fill: fillColor, // Relleno con el color del fondo
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
    // Posicionamos la cabeza más arriba (bodyY - bodyHeight * 1.1) para separarla del cuerpo
    const headY = bodyY - bodyHeight * 1.1; 
    
    rc.circle(centerX, headY, headRadius, {
        roughness: 2,
        stroke: strokeColor,
        strokeWidth: 1.5,
        fill: strokeColor, // ✅ CAMBIO CRÍTICO: Relleno con color de tinta (SILUETA SÓLIDA)
        fillStyle: 'solid'
    });
}
// ------------------------------------------------------------------
// 5. LÓGICA DE ALTERNANCIA DEL TEMA
// ------------------------------------------------------------------
function toggleTheme() {
    const body = document.body;
    // Alternar el atributo data-theme, que activa las reglas CSS de arriba
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme'); // Volver al modo light (sin atributo)
    } else {
        body.setAttribute('data-theme', 'dark'); // Activar modo dark
    }
    // Forzar el redibujado de todos los elementos para que usen los nuevos colores
    initialDraw(); 
}

// ------------------------------------------------------------------
// 6. BUCLE DE ANIMACIÓN (Limitado a 4 FPS)
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
        drawThemeButton(); // Dibuja el botón del tema
        drawVerticalNavBar(); // Dibuja la barra de navegación
        drawSearchButton(); // La lupa
        drawHomeButton(); // El botón de casa
        drawAddNoteButton(); // añadir publicación, botón
        drawSettingsButton(); // Botón de configuraciones
        drawProfileButton(); // Ingresar al perfil de usuario
        // 3. DIBUJAR ELEMENTOS SOBRE EL ÁREA DE CONTENIDO
        // El botón de autenticación debe ir AQUÍ, para estar SOBRE el marco principal.
        drawAuthButton(); // ⬅️ ¡Asegúrate de que esta llamada vaya aquí!

// ✅ CÓDIGO DE SCROLL SKETCHY (DEBE SER CORREGIDO)
    const feedContainer = document.getElementById('feed-container');
    let scrollbarYRatio = 0; 
    
    if (feedContainer && feedContainer.scrollHeight > feedContainer.clientHeight) {
        scrollbarYRatio = feedContainer.scrollTop / (feedContainer.scrollHeight - feedContainer.clientHeight);
    }
    
// 💡 APLICAR LA COMPROBACIÓN AQUÍ:
    if (window.drawSketchyScrollbar) { 
        drawSketchyScrollbar(scrollbarYRatio); // ⬅️ Dibuja con el ratio actualizado
    }

    // ✅ LLAMADA A LA ANIMACIÓN DE LOS POSTS (SE MANTIENE IGUAL)
    if (window.animateAllPlaceholders) {
        animateAllPlaceholders(); // ⬅️ Mantiene los posts "vivos"
        }
        //Aquí irían otros draw
    }
}

// ------------------------------------------------------------------
// 7. DETECCIÓN DE CLIC EN EL BOTÓN
// ------------------------------------------------------------------
function handleCanvasMouseDown(event) {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Coordenadas del área del botón de tema (Cuadrado 40x40px, margen 20px)
    const buttonXMin = THEME_BTN_MARGIN;
    const buttonXMax = THEME_BTN_MARGIN + THEME_BTN_SIZE;
    const buttonYMin = canvas.height - THEME_BTN_MARGIN - THEME_BTN_SIZE;
    const buttonYMax = canvas.height - THEME_BTN_MARGIN;

    // Chequeamos si el clic ocurrió dentro del área del botón del tema
    if (x >= buttonXMin && x <= buttonXMax && y >= buttonYMin && y <= buttonYMax) {
        toggleTheme();
        return; // Detenemos la ejecución después de un clic exitoso
    }
    // --- 2. Detección del Botón de Búsqueda (Parte superior) ---
    const buttonSearchXMin = THEME_BTN_MARGIN;
    const buttonSearchXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH;
    const buttonSearchYMin = NAV_BAR_MARGIN_TOP;
    const buttonSearchYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT;

    if (x >= buttonSearchXMin && x <= buttonSearchXMax && y >= buttonSearchYMin && y <= buttonSearchYMax) {
        // Lógica futura para la búsqueda:
        console.log("Clic en el botón de búsqueda.");
        // Por ahora no hacemos nada, solo registramos el clic.
        return;
    }
// --- 3. Detección del Botón de Casa (Home) (Index 1) ---
    const buttonHomeXMin = THEME_BTN_MARGIN;
    const buttonHomeXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH;
    const buttonHomeYMin = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 1; // CORREGIDO
    const buttonHomeYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 2; // CORREGIDO

if (x >= buttonHomeXMin && x <= buttonHomeXMax && y >= buttonHomeYMin && y <= buttonHomeYMax) {
    console.log("Clic en el botón de Casa (Home).");
    if (window.startOutroTransition) {
        // Si ya estamos en la página principal, simplemente recargar.
        // Si estuviéramos en perfil_user, la URL sería "../index.html"
        window.startOutroTransition('index.html'); 
    }
    return;
}

    // --- 4. Detección del Botón de Configuración (Settings) (Index 2) ---
    const buttonSettingsXMin = THEME_BTN_MARGIN;
    const buttonSettingsXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH;
    const buttonSettingsYMin = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 2; // CORREGIDO
    const buttonSettingsYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 3; // CORREGIDO

    if (x >= buttonSettingsXMin && x <= buttonSettingsXMax && y >= buttonSettingsYMin && y <= buttonSettingsYMax) {
        console.log("Clic en el botón de Configuración.");
        return;
    }

    // --- 5. Detección del Botón de Perfil (Profile) (Index 3) ---
    const buttonProfileXMin = THEME_BTN_MARGIN;
    const buttonProfileXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH;
    const buttonProfileYMin = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 3; // CORREGIDO
    const buttonProfileYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 4; // CORREGIDO

if (x >= buttonProfileXMin && x <= buttonProfileXMax && y >= buttonProfileYMin && y <= buttonProfileYMax) {
    console.log("Clic en el botón de Perfil.");
    if (window.startOutroTransition) {
        // Navegar a la nueva carpeta
        window.startOutroTransition('profile_user/profile.html'); 
    }
    return;
}

// --- 6. Detección del Botón de Añadir Nota (Ahora Index 4) ---
    const buttonAddXMin = THEME_BTN_MARGIN;
    const buttonAddXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH;
    // Quinto segmento de la barra:
    const buttonAddYMin = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 4; // CORREGIDO (Comienza después del Perfil)
    const buttonAddYMax = NAV_BAR_MARGIN_TOP + BUTTON_HEIGHT * 5; // CORREGIDO

    if (x >= buttonAddXMin && x <= buttonAddXMax && y >= buttonAddYMin && y <= buttonAddYMax) {
        console.log("Clic en el botón de Añadir Nota.");
        return;
    }    
    // --------------------------------------------------------
    // ✅ PASO ADICIONAL: IGNORAR EL ÁREA DE LA BARRA IZQUIERDA
    // --------------------------------------------------------
    
    // Si llegaste hasta aquí y el clic está en el área donde están los botones
    // (pero falló la detección porque cayó entre ellos o en un margen muerto),
    // debemos retornar para evitar la detección del Scrollbar.
    
    const navAreaXMin = 0; // Desde el borde izquierdo
    const navAreaXMax = THEME_BTN_MARGIN + NAV_BAR_WIDTH + 10; // Hasta el final de la barra (+ un poco de margen)
    
    // Si el clic está en el área de la barra izquierda (X < 70, aproximadamente), ignóralo.
    if (x >= navAreaXMin && x <= navAreaXMax) {
        console.log("Clic ignorado: dentro del área de la barra de navegación inactiva.");
        return; // Detenemos la función AQUÍ para que NO LLEGUE al Scrollbar.
    }
}
// ------------------------------------------------------------------
// 8B. MANEJADOR DE SCROLL NATIVO (NUEVO)
// ------------------------------------------------------------------
function handleNativeScroll() {
    const feedContainer = document.getElementById('feed-container');
    
    // Solo proceder si el scroll es posible
    const maxScroll = feedContainer.scrollHeight - feedContainer.clientHeight;
    
    if (maxScroll <= 0) {
        // No hay scroll, el ratio es 0. 
        if (window.drawSketchyScrollbar) {
             window.drawSketchyScrollbar(0);
        }
        return;
    }

    // Calcula la proporción de scroll nativa (0.0 a 1.0)
    const scrollRatio = feedContainer.scrollTop / maxScroll;
    
    // Llama a la función de dibujo del sketchy scrollbar con el ratio real
    if (window.drawSketchyScrollbar) {
        window.drawSketchyScrollbar(scrollRatio);
    }
}
// ------------------------------------------------------------------
// 8. CONFIGURACIÓN DE EVENTOS (Se ejecuta UNA SOLA VEZ)
// ------------------------------------------------------------------
function setupEventListeners() {
    // 1. Detección de clic en el canvas para botones interactivos (Tema, Nav)
    document.getElementById('notelyCanvas').addEventListener('mousedown', handleCanvasMouseDown);

    // 2. Escuchar evento de redimensionamiento
    window.addEventListener('resize', initialDraw);

    // 3. Escuchar evento de carga de página para iniciar el dibujo y la animación
    //window.addEventListener('load', initialDraw);
    
    // NUEVO: Usamos DOMContentLoaded para asegurar que el loading screen esté activo antes de cargar JS
    document.addEventListener('DOMContentLoaded', () => {
        if (window.startLoadingAnimation) {
            window.startLoadingAnimation(); // Inicia la animación de los puntos inmediatamente
        }
    });

    window.addEventListener('load', initialDraw); // initialDraw ahora solo se encarga de iniciar el ciclo de la app

    const notelyCanvas = document.getElementById('notelyCanvas');

// 4. 👂 LISTENER CRÍTICO: Escuchar el scroll nativo del contenedor de posts
    const feedContainer = document.getElementById('feed-container');
    if (feedContainer) {
        // Ejecutamos la función de manejo del scroll
        feedContainer.addEventListener('scroll', handleNativeScroll); 
    }
}
// ------------------------------------------------------------------
// 9. INICIALIZACIÓN
// ------------------------------------------------------------------
function initialDraw() {
    // Dibujar una vez para que Rough.js calcule la primera semilla
    drawBackgroundTexture();
    drawNotelyFrame(); 
    drawThemeButton();
    drawVerticalNavBar();
    drawSearchButton();
    drawHomeButton(); // el botón de casa
    drawAddNoteButton(); // añadir nota (publicación)
    drawSettingsButton(); // botón de configuraciones
    drawProfileButton(); // botón de perfil
    drawAuthButton(); // Botón de autentificación
    
    // ✅ CÓDIGO DE SCROLL SKETCHY (SIMPLIFICADO)
    // Ya no necesitamos calcular el ratio aquí. Solo aseguramos que se redibuje.
    
    const feedContainer = document.getElementById('feed-container');
    
    if (feedContainer && window.drawSketchyScrollbar) {
        // Recalculamos el ratio solo para el redibujado de 4 FPS (para animar el roughness)
        let scrollbarYRatio = 0; 
        const maxScroll = feedContainer.scrollHeight - feedContainer.clientHeight;

        if (maxScroll > 0) {
            scrollbarYRatio = feedContainer.scrollTop / maxScroll;
        }
        drawSketchyScrollbar(scrollbarYRatio); // ⬅️ Dibuja con el ratio actualizado
    }
    
    // Iniciar el bucle de animación
    requestAnimationFrame(animate);

    // ==========================================================
    // ✅ GESTIÓN DE LA DESAPARICIÓN DE LA PANTALLA DE CARGA
    // ==========================================================
    const loadingOverlay = document.getElementById('loading-screen-overlay');

    if (loadingOverlay) {
        // 1. Detener la animación de los puntos (para ahorrar recursos)
        if (window.stopLoadingAnimation) {
            window.stopLoadingAnimation();
        }

        // 2. Efecto Flash Blanco (Poner la capa en el color de tinta por 200ms)
        // Llama a drawLoadingScreen con fadeColor para simular el flash.
        if (window.drawLoadingScreen) {
            const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
            window.drawLoadingScreen(performance.now(), strokeColor); 
        }

        setTimeout(() => {
            // 3. Iniciar el desvanecimiento gradual (cambiando la opacidad CSS)
            loadingOverlay.style.opacity = '0';

            // 4. Eliminar del DOM después de que termine la transición (500ms + 100ms extra)
            setTimeout(() => {
                loadingOverlay.remove();
                // Opcional: Liberar la memoria del canvas si es necesario
            }, 600); 

        }, 200); // Duración del "flash"
    }

}

// ------------------------------------------------------------------
// 10. PUNTO DE ENTRADA (Llamar a la configuración de eventos)
// ------------------------------------------------------------------
setupEventListeners(); // Llamamos a la función para configurar todos los listeners.
