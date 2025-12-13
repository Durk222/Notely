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
    
    if (!mainContainer || !navBar) return;
    
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
                    <span>2024</span>
                </div>
                <div class="barcode-area">
                    <span class="part-no">PART NO: 0090</span>
                </div>
            </div>

            <div class="issue-title">
                <span>ISSUE</span>
                <span class="issue-number">888</span>
            </div>

            <div class="qr-and-utility-group">
                <div class="qr-code-placeholder">
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
    mainContainer.appendChild(footerBar);
};

// Exponer initNav globalmente para que app.js lo llame
window.initNav = initNav;
