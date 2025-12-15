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
        <div id="profile-banner-container">
            <div class="banner-content">
                <h1 class="banner-title">PROFILE: USER_777</h1>
                
                <div class="banner-deco top-left-fill"></div>
                <div class="banner-deco top-right-fill"></div>
                <div class="banner-deco bottom-left-fill"></div>
                <div class="banner-deco bottom-right-fill"></div>
            </div>
        </div>
    `;

    // 3. Montar el contenido (Por ahora, solo el banner)
    profileContainer.innerHTML = profileBanner;

    return profileContainer;
};

// Necesitarás una función para cargar esta vista en app.js cuando sea necesario.
// (Asumo que window.loadUI('profile') ya llama a esta función.)
