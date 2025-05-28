// Splash Screen Handling
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Only run splash screen code if elements exist
    if (splashScreen && loadingProgress) {
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    splashScreen.classList.add('fade-out');
                    startMainAnimations();
                }, 500);
            }
            loadingProgress.style.width = `${progress}%`;
        }, 200);
    } else {
        // If splash screen elements don't exist, start animations directly
        startMainAnimations();
    }

    // Basic setup for potential future animations
    console.log('script.js loaded');

    // Example using GSAP (can be expanded later)
    gsap.from('header h1', { duration: 1, y: -50, opacity: 0, ease: 'power3.out' });
    gsap.from('.profile', { duration: 1, scale: 0.5, opacity: 0, ease: 'back', delay: 0.5 });
    gsap.from('.project-card', { duration: 0.8, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out', delay: 1 });

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Scroll-triggered animations for project cards
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Scroll-triggered animation for social links
    gsap.from('.social-links', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.social-links',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });

    // Enhanced hover effects for project cards
    gsap.utils.toArray('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.03, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.3 });
        });
    });

    // Enhanced hover effects for social links
    gsap.utils.toArray('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { scale: 1.2, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { scale: 1, duration: 0.3 });
        });
    });
});

// Function to start main content animations
function startMainAnimations() {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const container = document.getElementById('canvas-container');

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create material with red/orange color
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#ff3e3e',
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Position camera
    camera.position.z = 2;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Slower rotation for a more subtle effect
        particlesMesh.rotation.x += 0.0002;
        particlesMesh.rotation.y += 0.0002;

        // Mouse interaction
        particlesMesh.rotation.x += mouseY * 0.0002;
        particlesMesh.rotation.y += mouseX * 0.0002;

        renderer.render(scene, camera);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start animation
    animate();

    // Add GSAP animations for content
    gsap.from('.title', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });

    gsap.from('.version-info', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.from('.download-grid', {
        duration: 1.5,
        y: 20,
        opacity: 0,
        ease: 'power3.out',
        delay: 1.1
    });

    // Animate sections as they come into view
    const sections = document.querySelectorAll('.changelog, .requirements, .download-section, .drivers-section, .notes, .issues, .credits');
    sections.forEach((section, index) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: index * 0.2
        });
    });
}

// Three.js basic setup (can be expanded for 3D background)
let scene, camera, renderer, geometry, material, cube;

function init3D() {
    // Placeholder for 3D initialization
    console.log('Three.js init placeholder');
    // You would typically set up scene, camera, renderer here
}

// Call init3D if you plan to add 3D elements
// init3D(); 