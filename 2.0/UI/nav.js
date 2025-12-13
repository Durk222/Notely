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
    // A. DIBUJAR BARRA DE NAVEGACIÓN SUPERIOR (Ejemplo)
    // ------------------------------------------------------------------
    // Esta parte la llenaremos después con botones funcionales
    navBar.innerHTML = `<span class="logo-area">NOTELY 2.0</span>
                        <div class="nav-buttons-group">
                            <button class="nav-icon-button" onclick="window.toggleTheme()">
                                <i class="fas fa-palette"></i>
                            </button>
                        </div>`;
                        
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

    generateQRCode();
    generateFunctionalQR();
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
        const functionalSize = 128; 

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
        
    }, 100);
}
// Exponer initNav globalmente para que app.js lo llame
window.initNav = initNav;
