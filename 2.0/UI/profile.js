// ui/profile.js

console.log("Notely 2.0: Módulo de Perfil cargado.");

/**
 * Genera el HTML para la vista de perfil (Profile).
 * @param {Object} profileData - Datos del usuario (por ahora, ficticios).
 */
window.createProfileHTML = function(profileData = {}) {
    
    // 1. Contenedor Principal
    const profileContainer = document.createElement('div');
    profileContainer.id = 'profile-viewer-container';
    profileContainer.className = 'module-view-content';


    // 2. Banner con Cortes (El elemento que recibirá el clip-path)
    const profileBanner = `
        <div id="banner-frame-wrapper">
            <div class="banner-background-frame"></div>
            
            <div id="profile-banner-container">
                <div class="banner-content">
                    <h1 class="banner-title">PROFILE: USER_777</h1>
                    
                    <div class="banner-deco top-left-fill"></div>
                    <div class="banner-deco top-right-fill"></div>
                    <div class="banner-deco bottom-left-fill"></div>
                    <div class="banner-deco bottom-right-fill"></div>
                </div>
            </div>
        </div>
    `;
    
    // 3. Montar el contenido (TODOS los bloques en el orden correcto)
    profileContainer.innerHTML = `
        ${profileBanner}
        
        <div id="profile-id-card">
            </div>
        
        <div id="profile-cover-photo-zone">
            </div>
        
        <div id="profile-info-block">
            </div>
        
        <div id="profile-tab-nav">
            <button class="tab-button active-tab" data-view="boards">
                TABLEROS
            </button>
            <button class="tab-button" data-view="user-posts">
                POSTS DEL USUARIO
            </button>
        </div>

        <div id="boards-container">
            
            <div id="board-bg-filler"></div>

            <div id="board-cover-card">
                <img id="board-cover-img" src="assets/images/placeholder_board_cover.jpg" alt="Portada del Tablero" draggable="false"/>
            </div>
            
            <div id="board-info-L-frame">
                <div class="l-content-wrapper">
                    <div class="l-rotated-text">
                        <span>// T A B L E R O S //</span>
                    </div>
                    <div class="l-section section-1">
                        <h4 class="board-title-label">TÍTULO DEL TABLERO</h4>
                        <p id="board-title-display">Mi Cumpleaños 2026</p>
                        <div class="vertical-line-deco"></div>
                    </div>
                    <div class="l-section section-2">
                        <p class="board-data-log">Última edición: 2025/12/15</p>
                        <p class="board-data-log">Posts vinculados: 12</p>
                        <div class="vertical-line-deco"></div>
                    </div>
                    <div class="l-section section-3">
                        <div class="board-image-placeholder"></div>
                    </div>
                </div>
            </div>
            
            <div id="board-side-data-closer">
                <h4 class="closer-title">// DATOS ADICIONALES //</h4>
                <p>Espacio para estadísticas o metadatos del tablero.</p>
            </div>
            
            <div id="board-posts-area">
                <div class="placeholder-post-item">Post 1</div>
                <div class="placeholder-post-item">Post 2</div>
                <div class="placeholder-post-item">Post 3</div>
                <div class="placeholder-post-item">Post 4</div>
            </div>
        </div>

        <div class="board-action-zone">
            <button class="brutalist-button action-create-board">
                <i class="fas fa-plus"></i> CREAR NUEVO TABLERO
            </button>
        </div>
    `;
    
    return profileContainer;
};
