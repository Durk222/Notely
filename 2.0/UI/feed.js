// ui/feed.js
console.log("Notely 2.0: Módulo de Feed cargado. (GSAP listo)");

window.renderFeed = function(containerElement) {
    
    // 1. Crear la estructura: Contenedor de Encabezado (Título y Divisor) + Área de Contenido
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

    // 3. IMPLEMENTACIÓN DE LA ANIMACIÓN LLAMATIVA CON GSAP 🚨
    const title = document.getElementById('feed-intro-title');
    
    if (title && typeof gsap !== 'undefined') {
        
        // --- Animación de Entrada Llamativa (Typewriter + Glitch/Blur) ---
        gsap.timeline()
            .to(title, {
                duration: 0.1, 
                opacity: 1, 
                ease: "none"
            })
            // Efecto de 'Tipo de Impresión' rápido y agresivo con desenfoque
            .fromTo(title, {
                scaleX: 0.0, 
                filter: 'blur(10px)',
                opacity: 0,
            }, {
                duration: 0.6,
                scaleX: 1.0, 
                filter: 'blur(0px)',
                opacity: 1,
                ease: "power2.out"
            })
            // Pequeño efecto de glitch/rebote al final
            .to(title, {
                duration: 0.05,
                x: 5,
                y: -5,
                repeat: 3, 
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
    // --- DEFINICIÓN GLOBAL DE PLANTILLAS Y CONTENIDO ---
const TEMPLATE_CONFIG = [
    { class: 'card-square', type: 'post' },
    { class: 'card-vertical', type: 'post' },
    { class: 'card-horizontal', type: 'post' },
    { class: 'card-filler', type: 'filler' }
];

// 🚨 CASE DEFAULT: Contenido Pre-creado para Relleno 🚨
const DEFAULT_CONTENT = [
    { title: "SISTEMA OPERATIVO X7", text: "Reporte de estabilidad. Kernel 5.1. Actualización requerida para el 77% de los nodos.", tag: "Sistema" },
    { title: "PROTOCOLO 404", text: "Acceso denegado. Se detectó actividad sospechosa en el sector Gamma-9.", tag: "Alerta" },
    { title: "DISEÑO BRUTALISTA", text: "La estética de la función. No hay lugar para la suavidad. Solo la línea y el acento.", tag: "Estética" },
    { title: "DATOS AGREGADOS", text: "La matriz se está cargando. Espere la confirmación del nodo central.", tag: "Matriz" },
    { title: "NUEVO ESQUEMA DE COLOR", text: "Se ha activado el modo Oscuro (Dark Mode) con acento Naranja. Eficiencia energética: 89%.", tag: "UI" },
    { title: "REINICIO DE SISTEMA", text: "Preparando la secuencia de arranque. La navegación está online.", tag: "Status" },
    { title: "FALLA DE LÍNEA 1", text: "Revisar la conexión con el módulo QR decorativo.", tag: "Error" },
    { title: "PLANTILLA ACTIVA", text: "Este post es generado por el Case Default. El algoritmo real está inactivo.", tag: "Dev" },
    { title: "NOTELY 2.0", text: "Interfaz Utilitaria de Última Generación.", tag: "Info" },
];

let contentIndex = 0; // Para iterar sobre DEFAULT_CONTENT
let isGenerating = false; // Bandera para evitar llamadas múltiples al backend (simulado)

// ----------------------------------------------------
// A. FUNCIÓN CENTRAL DE GENERACIÓN DE POSTS
// ----------------------------------------------------
function generatePosts(count) {
    if (isGenerating) return;
    isGenerating = true;

    const feedArea = document.getElementById('feed-content-area');
    if (!feedArea) return;

    let postsHTML = '';
    
    for (let i = 0; i < count; i++) {
        // 1. Obtener una plantilla aleatoria
        const template = TEMPLATE_CONFIG[Math.floor(Math.random() * TEMPLATE_CONFIG.length)];
        const isFiller = template.type === 'filler';
        
        let content = '';

        // 2. 🚨 Lógica de Backend (Case Default) 🚨
        if (!isFiller) {
            // Asignar contenido pre-creado de forma cíclica
            const data = DEFAULT_CONTENT[contentIndex % DEFAULT_CONTENT.length];
            
            // Renderizado del contenido real del post
            content = `
                <div class="post-header">
                    <span class="post-tag">[${data.tag}]</span>
                    <span class="post-timestamp">${new Date().toLocaleTimeString()}</span>
                </div>
                <h2>${data.title}</h2>
                <p>${data.text}</p>
            `;
            contentIndex++;
        } else {
            // Contenido para el relleno estético
            content = `<span>RESERVA ${i + 1}</span>`;
        }

        // 3. Crear el HTML del Post Card
        postsHTML += `
            <div class="post-card ${template.class}">
                ${content}
            </div>
        `;
    }

    // 4. Inyectar los posts y animarlos
    feedArea.innerHTML += postsHTML;
    
    // 5. Aplicar animación de entrada GSAP (simulando aparición en el scroll)
    const newCards = feedArea.querySelectorAll('.post-card:not(.gsap-animated)');

    gsap.from(newCards, {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.05, // Retraso entre la aparición de cada tarjeta
        ease: "power2.out",
        onComplete: function() {
            newCards.forEach(card => card.classList.add('gsap-animated'));
        }
    });

    isGenerating = false;
}

// ----------------------------------------------------
// B. LÓGICA DE SCROLL INFINITO
// ----------------------------------------------------
function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        // Altura visible + Posición del scroll >= Altura total del documento - 400px
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400) {
            // Generar 10 posts adicionales cuando el usuario se acerca al final
            generatePosts(10); 
        }
    });
}


// ----------------------------------------------------
// C. FUNCIÓN PRINCIPAL DE RENDERIZADO DEL FEED
// ----------------------------------------------------
window.renderFeed = function(containerElement) {
    // 1. Estructura de Encabezado y Divisor (Copiado del paso anterior)
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

    // 2. Animación GSAP para el Título (código mantenido del paso anterior)
    const title = document.getElementById('feed-intro-title');
    if (title && typeof gsap !== 'undefined') {
        gsap.timeline()
            .to(title, { duration: 0.1, opacity: 1, ease: "none" })
            .fromTo(title, { scaleX: 0.0, filter: 'blur(10px)', opacity: 0 }, { duration: 0.6, scaleX: 1.0, filter: 'blur(0px)', opacity: 1, ease: "power2.out" })
            .to(title, { duration: 0.05, x: 5, y: -5, repeat: 3, yoyo: true, ease: "sine.inOut" })
            .to(title, { duration: 0.3, x: 0, y: 0, ease: "power1.out" }, "+=0.1")
            .then(() => {
                console.log("Animación de título de feed completada. Cargando posts...");
                
                // 3. Inicializar el Feed después de la animación del título
                generatePosts(15); // Carga inicial de posts
                setupInfiniteScroll(); // Activar la detección de scroll
            });

    } else if (title) {
        title.style.opacity = 1;
        generatePosts(15);
        setupInfiniteScroll();
    }
};
