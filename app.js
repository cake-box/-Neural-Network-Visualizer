// 1. Set up the scene
const scene = new THREE.Scene();

// 2. Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Ensure the camera is positioned far enough to see objects

// 3. Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);  // Add renderer to the HTML

// 4. Create a simple geometry and material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);  // Add the cube to the scene

// 5. Create an animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);  // Continuously animate the scene
    
    cube.rotation.x += 0.01;  // Rotate the cube for some movement
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);  // Render the scene from the camera perspective
}

animate();  // Start the animation loop

