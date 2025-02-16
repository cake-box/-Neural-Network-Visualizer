// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create the WebGL renderer and append it to the HTML body
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to create a neuron (sphere)
function createNeuron(x, y, z) {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32); // Sphere shape for neurons
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue color
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    return sphere;
}

// Function to create a connection (line) between neurons
function createConnection(neuron1, neuron2) {
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const geometry = new THREE.BufferGeometry().setFromPoints([neuron1.position, neuron2.position]);
    const line = new THREE.Line(geometry, material);
    return line;
}

// Create neurons and add them to the scene
const neurons = [];
for (let i = 0; i < 10; i++) {
    const x = Math.random() * 10 - 5;  // Random x position
    const y = Math.random() * 10 - 5;  // Random y position
    const z = Math.random() * 10 - 5;  // Random z position
    const neuron = createNeuron(x, y, z);
    scene.add(neuron);
    neurons.push(neuron);
}

// Connect neurons randomly
for (let i = 0; i < neurons.length - 1; i++) {
    const connection = createConnection(neurons[i], neurons[i + 1]);
    scene.add(connection);
}

// Position the camera so we can see the cube
camera.position.z = 5;

// Create the animation loop to render the scene
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates to -1 to 1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(neurons);

    // Reset color of all neurons
    neurons.forEach(neuron => neuron.material.color.set(0x0000ff));

    // Highlight intersected neurons
    intersects.forEach(intersect => {
        intersect.object.material.color.set(0xffff00);
    });

    renderer.render(scene, camera);
}

animate();
