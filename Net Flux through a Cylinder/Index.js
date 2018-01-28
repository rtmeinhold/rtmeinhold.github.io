let camera, renderer, scene, cylinder, controls;

function setup() {
    const width = window.innerWidth, height=window.innerHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(50,50,150)");

    const aLight = new THREE.AmbientLight(0xfffffff, 0.5);
    aLight.position.set(5, 3, 5);
    scene.add(aLight);

    const dLight = new THREE.DirectionalLight(0xfffffff, 1.5);
    dLight.position.set(5, 3, 5);
    scene.add(dLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.set(0, 0, 7);
    scene.add(camera);
    controls = new THREE.OrbitControls( camera );

    createCylinder(scene, new THREE.Vector3(1.5, .125, 0), Math.PI/2); // D
    createCylinder(scene, new THREE.Vector3(-1.5, 0, 0), Math.PI/2); // C
    createCylinder(scene, new THREE.Vector3(-4, 0, 0), 0); // A
    createCylinder(scene, new THREE.Vector3(0, 1.5, 0), 0); // B
    createCylinder(scene, new THREE.Vector3(4, 0.05, 0), -Math.PI/4); // E
    createCylinder(scene, new THREE.Vector3(-1, -1.5, 0), Math.PI/3); // F
    createCylinder(scene, new THREE.Vector3(3, -1.5, 0), Math.PI/6); // G

    const size = .1125;
    const field = 7;
    for (let i = -field; i <= field; i += 1.5*size) {
        createPlus(scene, new THREE.Vector3(i,0,0), size);
    }

    update();
}

function update() {
    renderer.render(scene, camera);

    // cylinder.rotation.z += .01;
    // cylinder.rotation.x += .01;

    requestAnimationFrame(update);
}

function createCylinder(scene, position, zRotation) {
    const detail = 32;
    const radius = .25;
    const length = 1.25;
    const geometry = new THREE.CylinderGeometry(radius, radius, length, detail, detail);
    const material = new THREE.MeshStandardMaterial({
        transparent: true,
        // color: 0x8ADDFF,
        opacity: 0.6,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.z = zRotation;

    scene.add(mesh);
}

function createPlus(scene, position, size = .1125) {
    const width = size/5;
    const height = size;
    const detail = 1;
    const geometry = new THREE.BoxGeometry(width, height, width, detail, detail, detail);
    const material = new THREE.MeshStandardMaterial({
        color: 0xf51414
    });

    const meshVertical = new THREE.Mesh(geometry, material);
    meshVertical.position.set(position.x, position.y, position.z);
    scene.add(meshVertical);

    const meshHorizontal = new THREE.Mesh(geometry, material);
    meshHorizontal.position.set(position.x, position.y, position.z);
    meshHorizontal.rotation.z = Math.PI/2;
    scene.add(meshHorizontal);
}