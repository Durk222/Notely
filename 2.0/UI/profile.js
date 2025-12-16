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
    // NOTA: Usa 'top-left-fill-block' si has actualizado tus clases CSS para usar la versión "-block"
    const profileBanner = `
        <div id="banner-frame-wrapper">
            <div class="banner-background-frame"></div>
            
            <div id="profile-banner-container">
                <div class="banner-content">
                    <h1 class="banner-title">PROFILE: USER_777</h1>
                    
                    <div class="banner-deco top-left-fill-block"></div>
                    <div class="banner-deco top-right-fill-block"></div>
                    <div class="banner-deco bottom-left-fill-block"></div>
                    </div>
            </div>
        </div>
    `;
    
    // 3. Montar el contenido (TODOS los bloques en el orden correcto)
    profileContainer.innerHTML = `
        ${profileBanner}
        
        <div id="profile-id-card">
            <div class="id-card-avatar-zone">
                <div id="user-avatar-frame">
                    <img id="user-avatar-img" src="assets/images/default_avatar.png" alt="Avatar del usuario" draggable="false"/>
                </div>
            </div>
            
            <div class="id-card-data-zone">
                <h2 id="username-display" class="glitch-text">USER_777 // AGENT_NOTELY</h2>
                
                <div class="user-stats-bar">
                    <span class="stat-item">ID: 0090</span> |
                    <span class="stat-item">STATUS: ONLINE</span> |
                    <span class="stat-item">RATING: 9.8</span>
                </div>
                
                <p id="user-status-message">
                    "ESTE TEXTO DEBE TENER UN ESTILO DE MONOFUENTE Y SIMULAR UN LOG DE ESTADO CON EL BORDE INFERIOR"
                </p>
                
                <button class="brutalist-button action-edit-profile">
                    <i class="fas fa-edit"></i> EDITAR PERFIL
                </button>
            </div>
        </div>
        
        <div id="profile-cover-photo-zone">
            <img 
                id="user-cover-img" 
                src="assets/images/placeholder_cover.jpg" 
                alt="Foto de portada del perfil"
                draggable="false"
            />
            <div class="cover-photo-overlay">
                <span class="cover-deco-text">// S E C U R I T Y L O G //</span>
            </div>
        </div>
        
        <div id="profile-info-block">
            
            <div class="info-block-header">
                <span class="header-deco">[</span>
                <h3 class="info-title">DATOS DE REGISTRO // BIO-LOG</h3>
                <span class="header-deco">]</span>
            </div>
            
            <div class="info-block-content">
                <div class="bio-zone">
                    <h4>// BIOGRAFÍA DEL AGENTE //</h4>
                    <p id="user-bio">
                        Esta zona contendrá una descripción detallada del agente o usuario. Es esencial usar una fuente de terminal y asegurarse de que el texto parezca haber sido tecleado o extraído de un archivo de sistema. Se pueden usar efectos de texto tipo 'glitch' o 'scanline' en el contenedor principal.
                    </p>
                </div>
                
                <div class="classified-data-zone">
                    <h4>// ARCHIVOS CLASIFICADOS //</h4>
                    <ul class="data-list">
                        <li><span class="data-label">Último Login:</span> <span class="data-value">2025/12/15 - 09:55 PST</span></li>
                        <li><span class="data-label">Ubicación:</span> <span class="data-value">CACHE_ZONE_001</span></li>
                        <li><span class="data-label">Permisos:</span> <span class="data-value">ROOT_ACCESS</span></li>
                        <li><span class="data-label">Cargado:</span> <span class="data-value">1,240 ARCHIVOS</span></li>
                    </ul>
                </div>
            </div>
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
    
    // 4. Inicializar la lógica de las pestañas aquí (futuro paso)
    // addTabNavigationListeners(); 
    
    return profileContainer;
};

// ... Función addTabNavigationListeners (se definirá en el siguiente paso) ...
