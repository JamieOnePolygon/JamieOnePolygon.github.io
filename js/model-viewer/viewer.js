// Creating a new THREE Scene
var scene = new THREE.Scene();

// Calculating the Aspect Ratio of the current window and creating a new
// perspective camera.
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 1000);

// Creating a new renderer which will render everything
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Adding the renderer to the body of our HTML page.
document.body.appendChid(renderer.domElement);

// Now for the moment we are just going to add a sphere to render
var geo = new THREE.SphereGeometry(5, 32, 32);
var mat = new THREE.MeshBasicMaterial( {color: 0xffff00});

var sphere = new THREE.Mesh(geo, mat);
//Now that we have a mesh created, we are going to add it to the scene.
scene.add(sphere);

// Setting the Camera position
camera.position.z = 10;

// Update Loop
function update()
{
	requestAnimationFrame(update);
	renderer.render(scene, camera);
}