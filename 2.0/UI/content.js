// ui/content.js
console.log("Notely 2.0: Módulo de Visor de Contenido cargado.");

// ----------------------------------------------------
// A. SIMULACIÓN DE BACKEND (Fake API Fetch)
// ----------------------------------------------------

// Datos de prueba para simular la respuesta del servidor
const MOCK_DB = {
    "TEST:001": { 
        title: "UNSEEN ART & VANDALISM", 
        image: "2.0_ASSETS/okmañana.jpg", 
        text: "La prueba de integración de contenido e imagen UV-Reactiva ha sido exitosa. Módulo de detección: Offline. Mensajes ocultos: Cifrado 777. Archivo de contenido cargado correctamente.",
        details: [
            "CHEMISTRY INVOLVED: UV-REACTIVE INKS",
            "INNOVATION IN VANDALISM: NEW FORM OF GRAFFITI",
            "DETECTION & REMOVAL: ZERO TRACES. ZERO PROBLEMS."
        ],
        tag: "TEST:001"
    },
    // Añadir futuros posts aquí...
};

/**
 * Simula la obtención de un post desde un servidor.
 * @param {string} postId - El ID del post a buscar.
 * @returns {Object|null} El objeto del post o null si no se encuentra.
 */
function fetchPostById(postId) {
    if (MOCK_DB[postId]) {
        console.log(`[CONTENT]: Contenido '${postId}' encontrado en la DB local.`);
        return MOCK_DB[postId];
    } else if (postId.startsWith('PENDING:')) {
        console.warn(`[CONTENT]: ID '${postId}' es PENDIENTE. No hay datos para cargar.`);
        return null;
    }
    console.error(`[CONTENT ERROR]: No se encontró contenido para el ID: ${postId}.`);
    return null;
}

// ----------------------------------------------------
// B. DISEÑO BRUTALISTA DEL VISOR (Referencia: Hacked Vandalism Poster)
// ----------------------------------------------------

function createBrutalistContentHTML(data) {
    // 1. Título principal (Encabezado)
    const titleHeader = `
        <h1 class="content-title">${data.title}</h1>
    `;

    // 2. Imagen Central (Zona de Foco)
    const centralImage = `
        <div class="content-image-zone">
            <img src="${data.image}" alt="${data.title}" class="content-main-image"/>
            <div class="image-deco-overlay"></div>
        </div>
    `;

    // 3. Área de Detalles/Mensajes Ocultos (Parte Inferior Modular)
    const detailsHTML = data.details.map(detail => `
        <div class="detail-module">
            <span class="detail-label">${detail.split(':')[0].trim()}</span>
            <p class="detail-text">${detail.split(':')[1] ? detail.split(':')[1].trim() : ''}</p>
        </div>
    `).join('');

    const footerDetails = `
        <div class="content-details-grid">
            ${detailsHTML}
            <div class="main-text-module">
                <span class="module-title">TRANSMISIÓN DE DATOS</span>
                <p>${data.text}</p>
            </div>
            <div class="info-tag-module">
                <span>[TAG: ${data.tag}]</span>
                <span>[TIME: ${new Date().toLocaleTimeString()}]</span>
            </div>
        </div>
    `;

    return `
        <div id="content-viewer-container">
            ${titleHeader}
            <div class="content-divider-line"></div>
            ${centralImage}
            <div class="content-divider-line"></div>
            ${footerDetails}
        </div>
    `;
}

// ----------------------------------------------------
// C. FUNCIÓN PRINCIPAL DE RENDERIZADO
// ----------------------------------------------------

window.renderContent = function(containerElement, postId) {
    // 1. Validar el ID
    if (!postId) {
        containerElement.innerHTML = `
            <h1 class="error-text">ERROR [400]: No se ha especificado el ID del contenido.</h1>
            <p>Por favor, regrese al feed.</p>
        `;
        return;
    }
    
    // 2. Simular carga del post
    const postData = fetchPostById(postId);

    if (postData) {
        // 3. Post encontrado: Renderizar con diseño Brutalista
        const contentHTML = createBrutalistContentHTML(postData);
        containerElement.innerHTML = contentHTML;
        
        console.log(`[CONTENT]: Visor de contenido '${postId}' renderizado con éxito.`);
        
        // Opcional: Aplicar animación GSAP para entrada de la vista
        if (typeof gsap !== 'undefined') {
            gsap.from("#content-viewer-container", { duration: 0.6, opacity: 0, y: 30, ease: "power2.out" });
        }
        
    } else {
        // 4. Post no encontrado o Pendiente: Mostrar error (Revisar conexión/Servidor)
        containerElement.innerHTML = `
            <div class="server-error-message">
                <h1>⚠️ PROBLEMA DE CONEXIÓN [503] ⚠️</h1>
                <p>Tenemos problemas para mostrar el contenido con ID **${postId}**. </p>
                <p>Revisa tu conexión a internet o la disponibilidad del servidor y recarga la página.</p>
                <p class="small-text">Timestamp de fallo: ${new Date().toLocaleString()}</p>
            </div>
        `;
        console.error(`[CONTENT]: Fallo al renderizar contenido. ID: ${postId}.`);
    }
};
