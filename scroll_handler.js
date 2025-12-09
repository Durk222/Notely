// scroll_handler.js

// --- VARIABLES GLOBALES DEL FEED ---
const POST_PLACEHOLDER_SIZE = 480; // Tamaño del cuadrado de carga
const POST_GAP = 30; // Espacio entre posts

/**
 * 1. Genera el contenedor de un post de carga (un div con un marco rough)
 * @param {number} id - ID del post (para la lógica futura).
 */
function createPlaceholderPost(id) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-placeholder';
    postDiv.dataset.postId = id;
    
    // Asignar el tamaño
    postDiv.style.width = `${POST_PLACEHOLDER_SIZE}px`;
    postDiv.style.height = `${POST_PLACEHOLDER_SIZE}px`;
    postDiv.style.marginBottom = `${POST_GAP}px`;
    
    // Crear un canvas interno para el marco "rough"
    const postCanvas = document.createElement('canvas');
    postCanvas.width = POST_PLACEHOLDER_SIZE;
    postCanvas.height = POST_PLACEHOLDER_SIZE;
    postDiv.appendChild(postCanvas);

    // Dibujar el placeholder (marco + puntos)
    drawPlaceholderCanvas(postCanvas);
    
    return postDiv;
}

/**
 * Dibuja el marco y los puntos de carga en el Canvas del Placeholder.
 * Se dibuja una sola vez al cargar, no en el loop de 4 FPS.
 */
function drawPlaceholderCanvas(canvas) {
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    
    // Usamos las variables globales de color (deberían estar disponibles)
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--color-fg').trim();
    const fillColor = getComputedStyle(document.body).getPropertyValue('--color-bg').trim(); 

    // Dibujar el marco (Roughness bajo para que no distraiga)
    rc.rectangle(5, 5, canvas.width - 10, canvas.height - 10, {
        roughness: 1.5, // Roughness medio para el post sin cargar
        stroke: strokeColor,
        strokeWidth: 1.5,
        fill: fillColor, // Color de fondo "blanco" (ecru)
        fillStyle: 'solid'
    });
    
    // Dibujar los 3 puntos (Ellipsis: ...) en el centro
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dotRadius = 5;
    const dotSpacing = 20;

    // Dibujar los 3 círculos (puntos)
    [-1, 0, 1].forEach(index => {
        rc.circle(centerX + index * dotSpacing, centerY, dotRadius, {
            roughness: 1.0,
            stroke: strokeColor,
            strokeWidth: 1,
            fill: strokeColor,
            fillStyle: 'solid'
        });
    });
}

/**
 * Carga el contenido de feed.html en #feed-container y genera N posts.
 */
function loadInitialFeed() {
    const feedContainer = document.getElementById('feed-container');
    const feedScroller = document.createElement('div');
    feedScroller.id = 'feed-scroller';
    
    // Generar unos posts iniciales
    for (let i = 0; i < 5; i++) {
        feedScroller.appendChild(createPlaceholderPost(i + 1));
    }
    feedContainer.appendChild(feedScroller);
    
    // Iniciar el listener de scroll infinito
    feedContainer.addEventListener('scroll', handleInfiniteScroll);
}

/**
 * 3. Lógica del Scroll Infinito (Backend ready)
 */
let postIdCounter = 6; // Empieza desde el ID siguiente a los iniciales
let isLoading = false; // Bandera para evitar cargas múltiples

function handleInfiniteScroll() {
    const container = document.getElementById('feed-container');
    const scroller = document.getElementById('feed-scroller');
    
    // Cálculo para saber si el usuario está cerca del final (últimos 300px)
    const isNearEnd = container.scrollTop + container.clientHeight >= scroller.scrollHeight - 300;
    
    if (isNearEnd && !isLoading) {
        isLoading = true;
        console.log("Cargando nuevos posts...");
        
        // Simular un retraso de carga de backend (300ms)
        setTimeout(() => {
            const numNewPosts = 5;
            for (let i = 0; i < numNewPosts; i++) {
                scroller.appendChild(createPlaceholderPost(postIdCounter++));
            }
            isLoading = false;
            console.log("Nuevos posts cargados. ID final:", postIdCounter - 1);
        }, 300);
    }
}


// 4. Llamar a la inicialización cuando el DOM esté listo
// Usamos DOMContentLoaded para asegurar que feed-container exista
document.addEventListener('DOMContentLoaded', loadInitialFeed);

// Exportar la función globalmente para que animation_right.js pueda llamarla
window.drawPlaceholderCanvas = drawPlaceholderCanvas;
