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
};
// ------------------------------------------------------------------
// NUEVA FUNCIÓN: Generación del Código QR
// ------------------------------------------------------------------
function generateQRCode() {
    // Para asegurar que el DOM esté listo
    setTimeout(() => {
        const qrContainerId = "actual-qr-code";
        const qrContainer = document.getElementById(qrContainerId);
        
        if (!qrContainer) {
            console.warn("Contenedor QR no encontrado.");
            return;
        }

        // Definir el contenido que tendrá el QR (ejemplo de la URL de tu repo)
        const qrContent = "https://durk222.github.io/Notely/2.0/";
        
        // Colores dinámicos para el modo Brutalista (tinta y fondo)
        const colorFg = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
        const colorBg = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();

        var qrcode = new QRCode(qrContainerId, {
            text: qrContent,
            width: 50,  // Reducimos el tamaño para ajustarlo al diseño de 30px
            height: 50,
            colorDark : colorFg,   // Tinta Brutalista
            colorLight : colorBg,  // Fondo Brutalista
            correctLevel : QRCode.CorrectLevel.H
        });
        
        // Opcional: ajustar el tamaño final vía CSS si 50px es muy grande
        qrContainer.style.width = '30px';
        qrContainer.style.height = '30px';

    }, 100); // Pequeño retraso para asegurar que el DOM esté completamente renderizado
}
// Exponer initNav globalmente para que app.js lo llame
window.initNav = initNav;
