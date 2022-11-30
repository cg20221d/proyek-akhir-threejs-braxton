import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loaders = new GLTFLoader();
loaders.load('../assets/house.glb', function (glb) {
  console.log(glb);
  const root = glb.scene;
  root.scale.set(0.2, 0.2, 0.2);
  scene.add(root);
}, function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
  console.log('An error happened');
});

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0.5, 2);
camera.position.z = 2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

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



