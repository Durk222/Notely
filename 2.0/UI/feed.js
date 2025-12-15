// ui/feed.js
console.log("Notely 2.0: Módulo de Feed cargado. (GSAP listo)");

window.renderFeed = function(containerElement) {
    
    // 1. Crear la estructura para el texto animado
    const titleHTML = `
        <h1 id="feed-intro-title" class="feed-title-animated" style="opacity: 0;">
            Contenido para tí
        </h1>
    `;

    // 2. Inyectar el texto en el contenedor principal
    containerElement.innerHTML = titleHTML;

    // 3. 🚨 IMPLEMENTACIÓN DE LA ANIMACIÓN LLAMATIVA CON GSAP 🚨
    const title = document.getElementById('feed-intro-title');
    
    if (title && typeof gsap !== 'undefined') {
        
        // --- 3.1. Animación de Entrada Llamativa (Typewriter + Glitch/Blur) ---
        gsap.timeline()
            .to(title, {
                duration: 0.1, 
                opacity: 1, 
                ease: "none"
            })
            // Efecto de 'Tipo de Impresión' rápido y agresivo con desenfoque
            .fromTo(title, {
                scaleX: 0.0, // Empezar muy comprimido horizontalmente
                filter: 'blur(10px)',
                opacity: 0,
            }, {
                duration: 0.6,
                scaleX: 1.0, // Estirarse a tamaño normal
                filter: 'blur(0px)',
                opacity: 1,
                ease: "power2.out"
            })
            // Pequeño efecto de glitch/rebote al final
            .to(title, {
                duration: 0.05,
                x: 5,
                y: -5,
                repeat: 3, // Parpadeo rápido
                yoyo: true,
                ease: "sine.inOut"
            })
            // Volver al estado final limpio
            .to(title, {
                duration: 0.3,
                x: 0,
                y: 0,
                ease: "power1.out"
            }, "+=0.1")
            .then(() => {
                console.log("Animación de título de feed completada.");
            });

    } else if (title) {
        // Fallback si GSAP no está cargado
        title.style.opacity = 1;
    }
    // ui/feed.js (Modificación en window.renderFeed)

window.renderFeed = function(containerElement) {
    
    // 1. Crear la estructura para el texto animado Y el divisor
    const contentHTML = `
        <div class="feed-header-group">
            <h1 id="feed-intro-title" class="feed-title-animated" style="opacity: 0;">
                Contenido para tí
            </h1>
            
            <div class="brutalist-divider"></div>
        </div>

        <div id="feed-content-area">
            </div>
    `;

    // 2. Inyectar el nuevo contenido en el contenedor principal
    containerElement.innerHTML = contentHTML;

    // 3. IMPLEMENTACIÓN DE LA ANIMACIÓN LLAMATIVA CON GSAP 
    // ... (El código GSAP para animar #feed-intro-title se mantiene sin cambios) ...
    
};
