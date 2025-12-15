// ui/feed.js
console.log("Notely 2.0: Módulo de Feed cargado. (Modo Prueba de Imagen Local Activo)");

// --- DEFINICIONES GLOBALES (FUERA DE RENDERFEED) ---

const TEMPLATE_CONFIG = [
    { class: 'card-square', type: 'post' },
    { class: 'card-vertical', type: 'post' },
    { class: 'card-horizontal', type: 'post' },
    { class: 'card-filler', type: 'filler' }
];

// 🚨 CASE ÚNICO DE PRUEBA (Imagen Local Integrada) 🚨
const TEST_POST = { 
    title: "NOTELY_RENDER_TEST", 
    text: "Prueba de Integración de Contenido e Imagen Cuadrada.", 
    tag: "TEST:001",
    // RUTA DE IMAGEN ACTUALIZADA
    image: "2.0_ASSETS/okmañana.jpg" 
};

let isGenerating = false; 

// ----------------------------------------------------
// A. FUNCIÓN CENTRAL DE GENERACIÓN DE POSTS
// ----------------------------------------------------
function generatePosts(count) {
    if (isGenerating) {
        console.log("[FEED DEBUG]: Llamada bloqueada. Ya está generando.");       
        return;
    }
    isGenerating = true;

    const feedArea = document.getElementById('feed-content-area');
    if (!feedArea) { 
        console.error("[FEED ERROR]: No se encontró el contenedor '#feed-content-area'. Generación cancelada.");
        isGenerating = false; // Importante resetear la bandera si fallamos aquí        
        return;
    }
    let postsHTML = '';
    console.log(`[FEED DEBUG]: Contenedor encontrado. Generando ${count} posts...`);   
    
    for (let i = 0; i < count; i++) {
        const template = TEMPLATE_CONFIG[Math.floor(Math.random() * TEMPLATE_CONFIG.length)];
        let content = '';

        // 🚨 LÓGICA DE PRUEBA: Solo rellenar si es 'card-square' 🚨
        if (template.class === 'card-square') {
            const data = TEST_POST;
            
            // Renderizado del Post Cuadrado con IMAGEN
            content = `
                <div class="post-image-container">
                    <img src="${data.image}" alt="${data.title}" class="post-image"/>
                </div>
                <div class="post-content-body">
                    <div class="post-header">
                        <span class="post-tag">[${data.tag}]</span>
                        <span class="post-timestamp">${new Date().toLocaleTimeString()}</span>
                    </div>
                    <h2>${data.title}</h2>
                    <p>${data.text}</p>
                </div>
            `;
        } else {
            // El resto de plantillas quedan como "PENDIENTE"
            content = `
                <div class="pending-content">
                    [${template.class.toUpperCase().replace('CARD-', '')}] PENDIENTE DE BACKEND
                    <hr style="border-color: var(--color-dd); margin-top: 10px; width: 50%;">
                </div>
            `;
        }

        // Crear el HTML del Post Card
        postsHTML += `
            <div class="post-card ${template.class}">
                ${content}
            </div>
        `;
    }

    // Inyectar los posts y aplicar animación GSAP
    feedArea.innerHTML += postsHTML;
    
    const newCards = feedArea.querySelectorAll('.post-card:not(.gsap-animated)');
    
    // Solo aplicar animación si GSAP existe (para evitar errores en caso de que no esté cargado)
    if (typeof gsap !== 'undefined') {
        gsap.from(newCards, {
            duration: 0.5,
            opacity: 0,
            y: 50,
            stagger: 0.05, 
            ease: "power2.out",
            onComplete: function() {
                newCards.forEach(card => card.classList.add('gsap-animated'));
                console.log(`[FEED]: ${newCards.length} posts inyectados en el DOM y animados.`);
            }
        });
    } else {
        newCards.forEach(card => card.style.opacity = 1);
        console.log(`[FEED]: ${newCards.length} posts inyectados en el DOM (Sin animación).`);
    }

    isGenerating = false;
    console.log(`[FEED]: Proceso de generación completado. isGenerating = false.`);
}
// ----------------------------------------------------
// B. LÓGICA DE SCROLL INFINITO (CORREGIDA)
// ----------------------------------------------------
function setupInfiniteScroll() {
    const scrollContainer = document.getElementById('content-area');
    
    if (!scrollContainer) {
        console.error("[FEED ERROR]: No se encontró el contenedor '#content-area' para el scroll.");
        return;
    }

    // 🚨 CLAVE: Escuchamos el evento de scroll del contenedor interno 🚨
    scrollContainer.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

        // Lógica: Si el scroll actual + la altura visible es mayor o igual que el scroll total - 200px
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            generatePosts(10); 
        }
    });
    
    console.log("[FEED]: Listener de scroll infinito configurado en '#content-area'.");
}
// ----------------------------------------------------
// C. FUNCIÓN PRINCIPAL DE RENDERIZADO DEL FEED
// ----------------------------------------------------
window.renderFeed = function(containerElement) {
    // 1. Estructura del Encabezado (sin cambios)
    const contentHTML = `
        <div class="feed-header-group">
            <h1 id="feed-intro-title" class="feed-title-animated" style="opacity: 0;">
                Contenido para tí
            </h1>
            <div class="brutalist-divider"></div>
        </div>
        <div id="feed-content-area"></div>
    `;
    containerElement.innerHTML = contentHTML;

    // 2. Animación GSAP para el Título (código mantenido)
    const title = document.getElementById('feed-intro-title');
    if (title && typeof gsap !== 'undefined') {
        gsap.timeline()
            .to(title, { duration: 0.1, opacity: 1, ease: "none" })
            .fromTo(title, { scaleX: 0.0, filter: 'blur(10px)', opacity: 0 }, { duration: 0.6, scaleX: 1.0, filter: 'blur(0px)', opacity: 1, ease: "power2.out" })
            .to(title, { duration: 0.05, x: 5, y: -5, repeat: 3, yoyo: true, ease: "sine.inOut" })
            .to(title, { duration: 0.3, x: 0, y: 0, ease: "power1.out" }, "+=0.1")
            .then(() => {
                console.log("Animación de título de feed completada. Cargando posts...");
                
                // 3. Inicializar el Feed después de la animación
                    setTimeout(() => {
                    generatePosts(15); 
                    setupInfiniteScroll();
                }, 50); // Un pequeño retraso de 50ms
            });

    } else if (title) {
        title.style.opacity = 1;
        generatePosts(15);
        setupInfiniteScroll();
    }
};
