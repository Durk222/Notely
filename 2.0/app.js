// 2.0/app.js
console.log("Notely 2.0: App principal iniciada.");

// Define la función básica de alternancia de tema (que nav.js necesita)
window.toggleTheme = function() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = (currentTheme === 'dark' || !currentTheme) ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    console.log(`Tema cambiado a: ${newTheme}`);
};

// Define la función de carga de UI (routing) que los botones de nav usarán
window.loadUI = function(viewName) {
    console.log(`Cargando vista: ${viewName}`);
// 🚨 Lógica de Carga de Contenido 🚨
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    // Limpiar contenido anterior
    contentArea.innerHTML = ''; 

    // Aquí llamaríamos a la función de renderizado específica
    if (viewName === 'feed') {
        if (window.renderFeed) {
            window.renderFeed(contentArea); // Llamar a la función que definiremos en feed.js
        } else {
            contentArea.innerHTML = '<h1 class="error-text">ERROR: Módulo feed.js no cargado.</h1>';
        }
    } 
    // ... futuras vistas (profile, settings, etc.) ...
    
    // Actualizar URL y título si es necesario
    history.pushState({ view: viewName }, viewName.toUpperCase(), `#${viewName}`);
};


// 🚨 EL PUNTO CRÍTICO: LLAMAR A LAS FUNCIONES AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar la barra de navegación (Llamando a la función de nav.js)
    if (window.initNav) {
        window.initNav();
        console.log("Navegación inicializada (nav.js ejecutado).");
    } else {
         console.error("Error: window.initNav no está definido. Revisa el orden de scripts.");
    }
    
    // 2. Cargar la vista por defecto (por ejemplo, el Perfil o el Feed)
    window.loadUI('feed'); 
});
