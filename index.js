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

scene.fog = new THREE.Fog(0xcce0ff, 5, 100);

// sky
const sky = new THREE.TextureLoader()
const background = sky.load('./assets/sky.jpg');
scene.background = background;

// light.position.set(2, 8, 4);

const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(10, 20, -20);
scene.add(light);


// scene.add(new THREE.DirectionalLightHelper(light));

const light2 = new THREE.PointLight(0xffffff, 0.5);
light2.position.set(-20, 2, 20);
scene.add(light2);

// scene.add(new THREE.PointLightHelper(light2));

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100);
camera.position.set(-2, 1.25,-2.5);
// camera.position.z = 2;
scene.add(camera);

// const axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

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



