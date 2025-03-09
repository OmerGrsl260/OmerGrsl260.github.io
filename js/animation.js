// Icônes de programmation
const programmingIcons = [
    'fa-html5',
    'fa-css3-alt',
    'fa-js',
    'fa-react',
    'fa-node',
    'fa-python',
    'fa-database',
    'fa-git-alt',
    'fa-code',
    'fa-terminal'
];

// Création des éléments flottants
function createFloatingElements() {
    const container = document.createElement('div');
    container.className = 'floating-elements';
    document.body.appendChild(container);

    // Création du fond animé
    const background = document.createElement('div');
    background.className = 'animated-background';
    document.body.appendChild(background);

    // Création des icônes flottantes
    setInterval(() => {
        if (container.children.length < 20) { // Limite le nombre d'icônes
            const icon = document.createElement('i');
            icon.className = `floating-icon fas ${programmingIcons[Math.floor(Math.random() * programmingIcons.length)]}`;
            
            // Position aléatoire
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.fontSize = `${Math.random() * 20 + 10}px`;
            
            // Durée d'animation aléatoire
            const duration = Math.random() * 10 + 10;
            icon.style.animation = `float ${duration}s linear infinite`;
            
            container.appendChild(icon);
            
            // Supprime l'icône après l'animation
            setTimeout(() => {
                icon.remove();
            }, duration * 1000);
        }
    }, 1000);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();

    const background = document.querySelector('.animated-background');
    
    // Créer les conteneurs pour les points et les formes
    const networkPoints = document.createElement('div');
    networkPoints.className = 'network-points';
    const floatingShapes = document.createElement('div');
    floatingShapes.className = 'floating-shapes';
    
    background.appendChild(networkPoints);
    background.appendChild(floatingShapes);

    // Animation des points
    function animatePoints() {
        const time = Date.now() * 0.001;
        
        points.forEach(point => {
            // Mouvement plus aléatoire avec plusieurs fréquences
            const offsetX = Math.sin(time * 0.3 + point.seed) * 50 + 
                          Math.cos(time * 0.7 + point.seed * 2) * 30;
            const offsetY = Math.cos(time * 0.4 + point.seed) * 50 + 
                          Math.sin(time * 0.6 + point.seed * 2) * 30;
            
            const newX = point.initialX + offsetX;
            const newY = point.initialY + offsetY;
            
            point.currentX = newX;
            point.currentY = newY;
            point.element.style.transform = `translate(${newX}px, ${newY}px)`;
        });
        
        updateCanvas();
        requestAnimationFrame(animatePoints);
    }

    function updateCanvas() {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5;

        points.forEach((point, i) => {
            points.slice(i + 1).forEach(otherPoint => {
                const dx = otherPoint.currentX - point.currentX;
                const dy = otherPoint.currentY - point.currentY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(point.currentX, point.currentY);
                    ctx.lineTo(otherPoint.currentX, otherPoint.currentY);
                    
                    const opacity = 0.2 * (1 - distance / 150);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    
                    ctx.stroke();
                }
            });
        });
    }

    // Initialisation des points
    const numberOfPoints = 50; // Plus de points
    const points = [];
    
    function initPoints() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const margin = 100; // Marge pour éviter les bords
        
        for (let i = 0; i < numberOfPoints; i++) {
            const point = document.createElement('div');
            point.className = 'glow-point';
            
            // Position aléatoire sur tout l'écran
            const baseX = margin + Math.random() * (width - 2 * margin);
            const baseY = margin + Math.random() * (height - 2 * margin);
            
            point.style.transform = `translate(${baseX}px, ${baseY}px)`;
            networkPoints.appendChild(point);
            
            points.push({
                element: point,
                initialX: baseX,
                initialY: baseY,
                currentX: baseX,
                currentY: baseY,
                seed: Math.random() * 100 // Valeur aléatoire pour le mouvement
            });
        }
    }

    // Initialisation responsive
    initPoints();
    
    // Réinitialiser les points lors du redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            points.forEach(point => point.element.remove());
            points.length = 0;
            initPoints();
        }, 250);
    });

    // Dessiner les lignes entre les points
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    networkPoints.appendChild(canvas);

    // Ajouter les formes géométriques
    const shapes = ['triangle', 'circle', 'square'];
    const numberOfShapes = 15;

    for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElement('div');
        shape.className = `shape ${shapes[i % shapes.length]}`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        floatingShapes.appendChild(shape);
    }

    // Mettre à jour le canvas lors du redimensionnement
    window.addEventListener('resize', updateCanvas);
    updateCanvas();

    animatePoints();
}); 