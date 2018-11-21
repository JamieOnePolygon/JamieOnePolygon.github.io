// Declaring a few global variables we'll need.
var scene;			
var camera;
var renderer;

// Decalring the mesh that we're going to display
var mesh;

function setupScene()
{
	// Creating a new THREE Scene
	scene = new THREE.Scene();

	// Calculating the Aspect Ratio of the current window and creating a new
	// perspective camera.
	var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

	// Creating a new renderer which will render everything
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	//Creating a directional light and adding it to the scene.
	var dirLight = new THREE.DirectionalLight(0xFFDA82, 0.8);
	dirLight.castShadow = true;
	scene.add(dirLight);
}

setupScene();

// Adding the renderer to the body of our HTML page.
document.body.appendChild(renderer.domElement);

function createObject()
{
	// Now for the moment we are just going to add a sphere to render
	var geo = new THREE.SphereGeometry(5, 32, 32);
	var mat = new THREE.MeshStandardMaterial( {color: 0x800000 });

	mesh = new THREE.Mesh(geo, mat);
	//Now that we have a mesh created, we are going to add it to the scene.
	scene.add(mesh);

	// Adding some slight rotation to the sphere
	mesh.rotation.x = 0.8;

}


createObject();

const urlParam = new URLSearchParams(window.location.search);
console.log(urlParam.get('id'));

// Setting the Camera position
camera.position.z = 10;

// Update Loop
function animate()
{
	requestAnimationFrame(animate);

	animateObject();

	renderer.render(scene, camera);
}

animate();

function animateObject()
{
	mesh.rotation.y += 0.01;
}