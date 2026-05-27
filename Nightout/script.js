// THREE.JS BACKGROUND
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

camera.position.z = 20;

// CREATE GRID FLOOR (RETRO Synthwave)
const gridHelper = new THREE.GridHelper(100, 50, 0x00ffff, 0x110022);
gridHelper.position.y = -15;
gridHelper.position.z = -10;
scene.add(gridHelper);

// CREATE FLOATING CUBES
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });

const cubes = [];
for(let i = 0; i < 30; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40 - 10
    );
    cube.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
    scene.add(cube);
    cubes.push({
        mesh: cube,
        rotSpeed: Math.random() * 0.02,
        floatSpeed: Math.random() * 0.01,
        floatOffset: Math.random() * Math.PI * 2
    });
}

// PARTICLES
const particlesGeo = new THREE.BufferGeometry();
const particleCount = 500;
const posArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 80;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xff00ff
});
const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ANIMATION LOOP
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Rotate cubes
    cubes.forEach(c => {
        c.mesh.rotation.x += c.rotSpeed;
        c.mesh.rotation.y += c.rotSpeed;
        c.mesh.position.y += Math.sin(time + c.floatOffset) * c.floatSpeed;
    });

    // Move particles
    particles.rotation.y = time * 0.05;

    // Camera parallax
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// RESIZE
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// REVEAL LOGIC
setTimeout(() => {
    // Hide loader
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        // Show main invitation
        const main = document.getElementById('main');
        main.style.opacity = '1';
        main.style.pointerEvents = 'all';
        // Add reveal animation
        const container = document.querySelector('.holo-container');
        container.classList.add('reveal-anim');
    }, 1500);
}, 2000);

function accept() {
    alert("You're in! See you Friday! 🎉");
}