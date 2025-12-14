// ui/nav.js
console.log("Notely 2.0: Módulo de Navegación cargado.");

// Definición de las secciones de navegación (ejemplo)
const NAV_BUTTON_CONFIG = [
    { id: 'search', icon: 'fa-search', view: 'search' },
    { id: 'home', icon: 'fa-home', view: 'feed' },
    { id: 'profile', icon: 'fa-user', view: 'profile' },
    { id: 'settings', icon: 'fa-cog', view: 'settings' },
    // ... otros ...
    { id: 'theme', icon: 'fa-sun', action: window.toggleTheme }
];

window.initNav = function() {
    const mainContainer = document.getElementById('main-container');
    const navBar = document.getElementById('horizontal-nav');
    const footerRoot = document.getElementById('footer-bar-root');
    
    if (!mainContainer || !navBar || !footerRoot) return;
    
    // ------------------------------------------------------------------
    // A. ESTRUCTURA DE TRES COLUMNAS (Logo | Barra de Búsqueda | Tema)
    // ------------------------------------------------------------------
    // 1. Logo (Izquierda)
    const logoHTML = `<span class="logo-area">NOTELY 2.0</span>`;

   // 2. Barra de Búsqueda (Centro)
    const searchBarHTML = `
        <div id="search-bar">
            <div class="search-deco left-deco">
                <span class="glitch-text">🙾🙾</span>
            </div>

            <input 
                type="text" 
                placeholder="INGRESA CÓDIGO DE ACCESO" 
                class="search-input"
            />
            
            <div class="search-deco right-deco">
                <div class="scanlines-placeholder"></div>
                <span class="small-text">N O T E L Y</span>
            </div>
        </div>
    `;
    
       // 3. Botón de Tema (Derecha)
      const themeButtonHTML = `
      <div class="nav-buttons-group">
        <button class="nav-icon-button theme-toggle-btn" onclick="window.toggleTheme()">
            <i class="fas fa-palette"></i>
        </button>
    </div>
    `;         
    // DIBUJAMOS LA BARRA
    navBar.innerHTML = logoHTML + searchBarHTML + themeButtonHTML;
    // ------------------------------------------------------------------
    // B. DIBUJAR BARRA DE DECORATIVA (FOOTER)
    // ------------------------------------------------------------------
    
    const footerBarHTML = `
        <div id="footer-bar-content">
            <div class="product-label-group">
                <div class="rounded-badge">
                    <span>SPECIAL EDITION</span>
                    <span>2026</span>
                </div>
                <div class="barcode-area">
                    <span class="part-no">PART NO: 0090</span>
                </div>
            </div>

            <div class="issue-title">
                <span>ISSUE</span>
                <span class="issue-number">777</span>
            </div>

            <div class="qr-and-utility-group">
                <div id="actual-qr-code" class="qr-code-placeholder">
                    </div>
                <div class="utility-icons">
                    <i class="far fa-recycle"></i>
                    <i class="fab fa-bluetooth-b"></i>
                    <i class="far fa-trash-alt"></i>
                </div>
            </div>
        </div>
    `;

    // 1. Crear el elemento contenedor (se inyecta en main-container, no en navBar)
    const footerBar = document.createElement('footer');
    footerBar.id = 'footer-bar';
    footerBar.innerHTML = footerBarHTML;
    
    // 2. Insertar el footerBar justo antes de cerrar el main-container
    footerRoot.appendChild(footerBar);

    generateDecorativeQR();
    generateFunctionalQR();
    generateBarcodes();
};
// ------------------------------------------------------------------
// 1. FUNCIÓN DECORATIVA (Reutilizada de antes, solo renombrada)
// ------------------------------------------------------------------
function generateDecorativeQR() {
    const qrContainerId = "actual-qr-code";
    setTimeout(() => {
        const qrContainer = document.getElementById(qrContainerId);
        if (!qrContainer || typeof QRCode === 'undefined') return;

        const colorFg = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
        const colorBg = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
        const qrContent = "https://durk222.github.io/Notely/2.0/";

        var qrcode = new QRCode(qrContainerId, {
            text: qrContent,
            width: 50,  // Tamaño de generación
            height: 50,
            colorDark : colorFg,
            colorLight : colorBg,
            correctLevel : QRCode.CorrectLevel.H
        });
        
        // Ajustar el tamaño para que se vea diminuto dentro del marco de 30px del CSS
        qrContainer.style.width = '30px';
        qrContainer.style.height = '30px';
        
    }, 100);
}


// ------------------------------------------------------------------
// 2. FUNCIÓN FUNCIONAL (El QR Grande y Útil)
// ------------------------------------------------------------------
function generateFunctionalQR() {
    const qrContainerId = "qr-code-functional-root";
    setTimeout(() => {
        const qrContainer = document.getElementById(qrContainerId);
        if (!qrContainer || typeof QRCode === 'undefined') return;
        
        // 🚨 TAMAÑO FUNCIONAL: 128px es un buen tamaño para escanear
        const functionalSize = 100; 

        const colorFg = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
        const colorBg = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
        const qrContent = "https://durk222.github.io/Notely/2.0/"; // Mismo contenido

        var qrcode = new QRCode(qrContainerId, {
            text: qrContent,
            width: functionalSize,
            height: functionalSize,
            colorDark : colorFg,
            colorLight : colorBg,
            correctLevel : QRCode.CorrectLevel.H
        });
        
        // Ajustar el contenedor para que el tamaño coincida con la generación
        qrContainer.style.width = `${functionalSize + 16}px`; // 128px + 2x(8px padding)
        qrContainer.style.height = `${functionalSize + 16}px`;
        // ARRASTRE DESACTIVADO
        const qrElement = qrContainer.querySelector('canvas, img');
        if (qrElement) {
            qrElement.setAttribute('draggable', 'false');
        }
        
    }, 100);
}
// 2.0/UI/nav.js (Tu código final para las barras de escaneo)

function generateBarcodes() {
    // Obtener colores dinámicos
    const style = getComputedStyle(document.body);
    const colorMedio = style.getPropertyValue('--color-md').trim();
    const colorMedioOscuro = style.getPropertyValue('--color-dd').trim();
    
    // 1. BARCODE IZQUIERDA (CODE39)
    const codeLeft = "DX7729RS4"; 
    const rootLeft = document.getElementById("barcode-root-left");
    
    if (rootLeft) {
        // La clave es que setAttribute recibe el VALOR (DX7729RS4) como una cadena.
        rootLeft.setAttribute("jsbarcode-value", codeLeft); 
        rootLeft.setAttribute("jsbarcode-format", "CODE39"); // Tolerante con alfanuméricos
        rootLeft.setAttribute("jsbarcode-linecolor", colorMedioOscuro);
        rootLeft.setAttribute("jsbarcode-background", "transparent");
        rootLeft.setAttribute("jsbarcode-width", "1.2");
        rootLeft.setAttribute("jsbarcode-height", "25");
        rootLeft.setAttribute("jsbarcode-fontsize", "10");
        rootLeft.setAttribute("jsbarcode-textmargin", "0");
        rootLeft.setAttribute("jsbarcode-displayvalue", "true");
    }
    
    // 2. BARCODE DERECHA (ITF)
    const codeRight = "483756";
    const rootRight = document.getElementById("barcode-root-right");

    if (rootRight) {
        rootRight.setAttribute("jsbarcode-value", codeRight);
        rootRight.setAttribute("jsbarcode-format", "ITF");
        rootRight.setAttribute("jsbarcode-linecolor", colorMedioOscuro);
        rootLeft.setAttribute("jsbarcode-background", "transparent");
        rootRight.setAttribute("jsbarcode-width", "1.2");
        rootRight.setAttribute("jsbarcode-height", "25");
        rootRight.setAttribute("jsbarcode-displayvalue", "false"); 
        rootRight.setAttribute("jsbarcode-textmargin", "0");
    }

    // 🚨 LLAMADA FINAL: Inicializa leyendo los atributos 🚨
    try {
        // Selecciona todos los SVGs con la clase para la inicialización
        JsBarcode(".barcode-svg").init();
    } catch(e) {
        // En caso de fallo de inicialización (ej. la librería aún no cargó)
        console.error("Error al inicializar JsBarcode. Asegúrate de que la librería esté cargada.", e);
    }
}
// Exponer initNav globalmente para que app.js lo llame
window.initNav = initNav;
