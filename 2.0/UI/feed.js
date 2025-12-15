// ui/feed.js - VERSIÓN FINAL

console.log("Notely 2.0: Módulo de Feed cargado. (Modo Prueba de Imagen Local Activo)");

// --- DEFINICIONES GLOBALES ---
const TEMPLATE_CONFIG = [
    { class: 'card-square', type: 'post' },
    { class: 'card-vertical', type: 'post' },
    { class: 'card-horizontal', type: 'post' },
    { class: 'card-filler', type: 'filler' }
];

const TEST_POST = { 
    title: "NOTELY_RENDER_TEST", 
    text: "Prueba de Integración de Contenido e Imagen Cuadrada.", 
    tag: "TEST:001",
    image: "2.0_ASSETS/okmañana.jpg" 
};

let isGenerating = false; 

// ----------------------------------------------------
// D. FUNCIÓN DE ANIMACIÓN HOVER PARA POSTS
// ----------------------------------------------------
function setupPostHoverAnimations() {
    const postCards = document.querySelectorAll('.post-card');
    
    // Aseguramos que los posts no tengan transiciones CSS que interfieran
    // El 'will-change' le dice al navegador que estas propiedades van a cambiar
    postCards.forEach(card => {
        card.style.transition = 'none'; // Desactivar transiciones CSS para GSAP
        card.style.willChange = 'transform, opacity, box-shadow';
    });

    postCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Animación para la tarjeta actual
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                y: -10, // Un pequeño levantamiento
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                ease: "power2.out",
                zIndex: 610 // Asegurar que esté por encima de otras tarjetas
            });

            // Animación para las otras tarjetas
            gsap.to(Array.from(postCards).filter(c => c !== card), {
                duration: 0.3,
                scale: 0.95,
                opacity: 0.7,
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                ease: "power2.out",
                zIndex: 590 // Asegurar que estén por debajo
            });
        });

        card.addEventListener('mouseleave', () => {
            // Animación para la tarjeta actual (regresar a normal)
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                y: 0,
                boxShadow: "0 0px 0px rgba(0,0,0,0)",
                ease: "power2.out",
                zIndex: 600 // Regresar al z-index original
            });

            // Animación para las otras tarjetas (regresar a normal)
            gsap.to(Array.from(postCards).filter(c => c !== card), {
                duration: 0.3,
                scale: 1,
                opacity: 1,
                boxShadow: "0 0px 0px rgba(0,0,0,0)",
                ease: "power2.out",
                zIndex: 600 // Regresar al z-index original
            });
        });
    });
    console.log("[FEED]: Animaciones de hover para posts configuradas.");
}

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
        isGenerating = false; 
        return;
    }
    let postsHTML = '';
    console.log(`[FEED DEBUG]: Contenedor encontrado. Generando ${count} posts...`);   
    
    // ... (El loop de generación de posts HTML sigue igual) ...
    for (let i = 0; i < count; i++) {
        const template = TEMPLATE_CONFIG[Math.floor(Math.random() * TEMPLATE_CONFIG.length)];
        let content = '';

        if (template.class === 'card-square') {
            const data = TEST_POST;
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
            content = `
                <div class="pending-content">
                    [${template.class.toUpperCase().replace('CARD-', '')}] PENDIENTE DE BACKEND
                    <hr style="border-color: var(--color-dd); margin-top: 10px; width: 50%;">
                </div>
            `;
        }

        postsHTML += `
            <div class="post-card ${template.class}">
                ${content}
            </div>
        `;
    }
    // ... (Fin del loop) ...

    feedArea.innerHTML += postsHTML;
    
    const newCards = feedArea.querySelectorAll('.post-card:not(.gsap-animated)');
    
    if (typeof gsap !== 'undefined') {
        // 🚨 CORRECCIÓN CLAVE DE OPACIDAD 🚨
        gsap.fromTo(newCards, 
            // FROM (Estado Inicial)
            { opacity: 0, y: 50 },
            // TO (Estado Final)
            { 
                duration: 0.5,
                opacity: 1, // ¡Aquí forzamos el 1!
                y: 0,
                stagger: 0.05, 
                ease: "power2.out",
                onComplete: function() {
                    newCards.forEach(card => {
                        card.classList.add('gsap-animated');
                        // Fallback agresivo:
                        card.style.opacity = 1; 
                    });
                    console.log(`[FEED]: ${newCards.length} posts inyectados en el DOM y animados.`);
                    setupPostHoverAnimations();
                }
            }
        );
    } else {
        newCards.forEach(card => card.style.opacity = 1);
        console.log(`[FEED]: ${newCards.length} posts inyectados en el DOM (Sin animación).`);
        setupPostHoverAnimations();
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

    scrollContainer.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

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

    const title = document.getElementById('feed-intro-title');
    if (title && typeof gsap !== 'undefined') {
        gsap.timeline()
            .to(title, { duration: 0.1, opacity: 1, ease: "none" })
            .fromTo(title, { scaleX: 0.0, filter: 'blur(10px)', opacity: 0 }, { duration: 0.6, scaleX: 1.0, filter: 'blur(0px)', opacity: 1, ease: "power2.out" })
            .to(title, { duration: 0.05, x: 5, y: -5, repeat: 3, yoyo: true, ease: "sine.inOut" })
            .to(title, { duration: 0.3, x: 0, y: 0, ease: "power1.out" }, "+=0.1")
            .then(() => {
                console.log("Animación de título de feed completada. Cargando posts...");
                
                // Mantenemos el retraso de 50ms como parche de seguridad final
                setTimeout(() => {
                    generatePosts(15); 
                    setupInfiniteScroll();
                }, 50); 
            });

    } else if (title) {
        title.style.opacity = 1;
        generatePosts(15);
        setupInfiniteScroll();
    }
};
