// ui/content.js
console.log("Notely 2.0: Módulo de Visor de Contenido cargado.");

// ----------------------------------------------------
// A. SIMULACIÓN DE BACKEND (Fake API Fetch)
// ----------------------------------------------------

// Datos de prueba para simular la respuesta del servidor
const MOCK_DB = {
    "TEST:001": { 
        title: "SIN TÍTULO", 
        author: "SIN DEFINIR",
        type: "IMG_STATIC", // Nuevo metadato
        date: "2025-SIN DEFINIR", // Nuevo metadato
        tag: "TEST:001",
        image: "2.0_ASSETS/okmañana.jpg", 
        description: "Prueba de Integración de Contenido e Imagen UV-Reactiva ha sido exitosa. Módulo de detección: Offline. Mensajes ocultos: Cifrado 777. Archivo de contenido cargado correctamente. Este es el texto principal.",
        metadata: [ // Detalles técnicos modulares
            { label: "CHEMISTRY INVOLVED", value: "UV-REACTIVE INKS" },
            { label: "TRANSMISSION KEY", value: "DX7729RS4" },
            { label: "DETECTION & REMOVAL", value: "ZERO TRACES. ZERO PROBLEMS." },
            { label: "ARCHIVE CLASS", value: "LEVEL B / SECURED" }
        ]
    },
    // El resto de IDs (PENDING) seguirán siendo null
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
// --- ESTILOS DECORATIVOS MODULARES ---
const MODULE_STYLES = [
    // Estilo 1: Bordes irregulares (Brutalist corner clipping)
    { border: '1px solid var(--color-fg)', background: 'var(--color-bg)', radius: '15px 2.5px 15px 2.5px' }, 
    // Estilo 2: Fondo más oscuro (simula una sección técnica)
    { border: '2px solid var(--color-md)', background: 'var(--color-dd)', radius: '5px' }, 
    // Estilo 3: Líneas de borde prominentes
    { border: '3px dashed var(--color-fg)', background: 'var(--color-bg)', radius: '0' } 
];

/**
 * Genera una caja modular con estilo aleatorio.
 * @param {string} contentHTML - El HTML interno del módulo.
 * @param {string} title - Título del módulo.
 */
function createRandomDataModule(contentHTML, title) {
    const style = MODULE_STYLES[Math.floor(Math.random() * MODULE_STYLES.length)];
    
    return `
        <div class="data-module" style="
            border: ${style.border}; 
            background: ${style.background}; 
            border-radius: ${style.radius};
        ">
            <h3 class="module-deco-title">${title}</h3>
            <div class="module-content">${contentHTML}</div>
        </div>
    `;
}

// --- FUNCIÓN DE CAJA DE COMENTARIOS FIJA ---
function createCommentBoxHTML() {
    return `
        <div id="comment-section-fixed">
            <h3 class="comment-section-title">003. COMENTARIOS / LOGS</h3>
            <div class="comment-input-area">
                <input type="text" placeholder="AUTH USER INPUT..." class="comment-input"/>
                <button class="comment-submit-btn">SEND 🙾</button>
            </div>
            <div class="comment-list-area">
                <p class="no-comments-msg">-- SIN ENTRADAS DE USUARIO EN ESTE ARCHIVO. --</p>
            </div>
        </div>
    `;
}
// ----------------------------------------------------
// B. DISEÑO BRUTALISTA DEL VISOR
// ----------------------------------------------------

function createBrutalistContentHTML(data) {
    // 1. Título principal (Header Fijo)
    const titleHeader = `
        <h1 class="content-title">${data.title}</h1>
        <div class="content-header-meta">
            <span>[AUTHOR: ${data.author}]</span>
            <span>[TYPE: ${data.type}]</span>
            <span>[DATE: ${data.date}]</span>
        </div>
    `;

    // 2. Imagen Central (Zona de Foco)
    const centralImage = `
     <div class="image-aspect-wrapper">
            <div class="content-image-zone">
                <img src="${data.image}" alt="${data.title}" class="content-main-image"/>
                <div class="image-deco-overlay"></div>
            </div>
        </div>
    `;
    
    // 3. Generación Modular Aleatoria de Detalles
    let modularContentHTML = '';

    // Módulo 1: Descripción Principal (Fijo, pero con estilo aleatorio)
    modularContentHTML += createRandomDataModule(
        `<p>${data.description}</p>`,
        "001. DESCRIPCIÓN/ABSTRACT"
    );

    // Módulo 2: Metadatos Técnicos (Random style)
    const metadataList = data.metadata.map(item => 
        `<div class="metadata-item"><span class="metadata-label">${item.label}:</span> <span>${item.value}</span></div>`
    ).join('');
    
    modularContentHTML += createRandomDataModule(
        metadataList,
        "002. DETALLES TÉCNICOS"
    );
    
    // Módulo 3: (Simulación de un tercer módulo, por ejemplo, estado de red)
    modularContentHTML += createRandomDataModule(
        `
        <div class="network-status">
            <span>NETWORK PING: </span><span class="status-ok">ONLINE ${Math.floor(Math.random() * 80) + 10}ms</span>
            <span class="status-warning">DECRYPTION LEVEL: LOW</span>
        </div>
        `,
        "004. ESTADO DEL SISTEMA"
    );

    // 4. Integración de todos los componentes
    return `
        <div id="content-viewer-container">
            ${titleHeader}
            <div class="content-divider-line"></div>
            
            ${centralImage}
            
            <div class="content-divider-line"></div>

            <div class="modular-data-area">
                ${modularContentHTML}
            </div>
            
            <div class="content-divider-line"></div>

            ${createCommentBoxHTML()}
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
        
        // 🚨 NUEVAS ANIMACIONES DE ENTRADA COMPLEJAS 🚨
        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline();
            
            // 1. Entrada general del contenedor
            tl.from("#content-viewer-container", { duration: 0.6, opacity: 0, y: 30, ease: "power2.out" })
              // 2. Animación del título
              .from(".content-title", { duration: 0.4, scaleX: 0, transformOrigin: 'left', ease: "power2.out" }, "<0.1")
              // 3. Entrada de la imagen central
              .from(".content-image-zone", { duration: 0.5, opacity: 0, scale: 0.9, ease: "back.out(1.7)" }, "-=0.2")
              // 4. Entrada escalonada de los módulos de datos
              .from(".data-module", { 
                  duration: 0.4, 
                  opacity: 0, 
                  x: -20, 
                  stagger: 0.1, 
                  ease: "power2.out" 
              }, "-=0.3"); // Comienza mientras la imagen se está completando
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
