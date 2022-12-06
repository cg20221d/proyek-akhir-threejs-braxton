import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loaders = new GLTFLoader();
loaders.load('../assets/house.glb', function (glb) {
  console.log(glb);
  const root = glb.scene;
  root.scale.set(0.05, 0.05, 0.05);
  scene.add(root);
}, function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
  console.log('An error happened');
});

// floor
var groundTexture = new THREE.TextureLoader().load("./assets/grass.jpg");
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10000, 10000);
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;

var groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });

var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), groundMaterial);
mesh.position.y = 0.0;
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

// sky
const sky = new THREE.TextureLoader()
const background = sky.load('./assets/sky.jpg');
scene.background = background;


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(30, 20, -20);
scene.add(light);



// const light3 = new THREE.AmbientLight(0xffffff, 1);
// light.position.set(-5, -5, 7)
// scene.add(light3);

const light2 = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-20, 10, -20);
scene.add(light2);

// const loader = new THREE.TextureLoader();
// const bgTexture = loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/daikanyama.jpg');
// scene.background = bgTexture;


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0.1, 2);
camera.position.z = 2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;
renderer.setClearColor(0xffffff, 0);
renderer.outputEncoding = THREE.sRGBEncoding;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate()

// make scene rotate
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}
window.addEventListener('resize', onWindowResize);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 5;
controls.maxPolarAngle = Math.PI / 2;



