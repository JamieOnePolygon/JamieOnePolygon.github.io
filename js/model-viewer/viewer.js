// Creating a new THREE Scene
var scene = new THREE.Scene();

// Calculating the Aspect Ratio of the current window and creating a new
// perspective camera.
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

// Creating a new renderer which will render everything
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Adding the renderer to the body of our HTML page.
document.body.appendChild(renderer.domElement);

// Now for the moment we are just going to add a sphere to render
var geo = new THREE.BoxGeometry(1,1,1);
var mat = new THREE.MeshBasicMaterial( {color: 0x800000 });

var mesh = new THREE.Mesh(geo, mat);
//Now that we have a mesh created, we are going to add it to the scene.
scene.add(mesh);

// Adding some slight rotation to the sphere
mesh.rotation.x = 0.2;

// Setting the Camera position
camera.position.z = -5;

// Update Loop
function animate()
{
	requestAnimationFrame(animate);

	animateObject();

	renderer.render(scene, camera);
}

function animateObject()
{
	mesh.rotation.y += 0.01;
}