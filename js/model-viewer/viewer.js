// Declaring a few global variables we'll need.
var scene;			
var camera;
var renderer;

var mesh;

// THE JSON DATA
var cardDetails = '{ "cards":[{"id": 0,"filePath": "/content/models/GeoSphere.FBX","name": "Bitlocker","color": "0x800000","description": "This is a test description.","objective": "This is a test objective","cost": 100000},{"id": 1,"filePath": "/content/models/Teapot.FBX","name": "Multi-factor Authentication","color": "0x800000","description": "This is a test description.","objective": "This is a test objective","cost": 100000}]}';


function setupScene()
{
	// Creating a new THREE Scene
	scene = new THREE.Scene();

	// Calculating the Aspect Ratio of the current window and creating a new
	// perspective camera.
	var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

	camera.position = (0, 200, 300);
	camera.target.position = (0, 0, 0);

	// Creating a new renderer which will render everything
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	//Creating a directional light and adding it to the scene.
	var dirLight = new THREE.DirectionalLight(0xFFDA82, 0.8);
	dirLight.position.x = 2;
	dirLight.castShadow = true;
	scene.add(dirLight);
}

setupScene();

// Adding the renderer to the body of our HTML page.
document.body.appendChild(renderer.domElement);

function createObject()
{
	var match = getCardDetails();

	var mat = new THREE.MeshStandardMaterial( {color: match.color });

	// Creating a FBX Model Loader object in prerperation for loading a mesh
	var loader = new THREE.FBXLoader();
	loader.load(match.filePath, function(object)
	{
		object.mateiral = mat;
		object.name = "Mesh Display";
		scene.add(object);

		console.log("Created object " + match.name);
	});


	/*if (id == 0)
	{
		geo = new THREE.SphereGeometry(5, 12, 12);
	}
	else 
	{
		geo = new THREE.BoxGeometry(3, 3, 3);
	}*/

	/*// Now for the moment we are just going to add a sphere to render
	var mat = new THREE.MeshStandardMaterial( {color: 0x800000 });

	mesh = new THREE.Mesh(geo, mat);
	//Now that we have a mesh created, we are going to add it to the scene.
	scene.add(mesh);

	// Adding some slight rotation to the sphere
	mesh.rotation.x = 0.8;*/

}

function getCardDetails()
{
	var match;
	var i;

	// Here we now want to look up which model we want to display. This will be done
	// by loading the JSON file containing all of the data for the cards in the future.
	// For now we just use an if statement.
	const urlParam = new URLSearchParams(window.location.search);
	var id = urlParam.get('id');

	var loading = JSON.parse(cardDetails);

	for(i = 0; i < loading.cards.length; i++)
	{
		if (loading.cards[i].id == id)
		{
			match = loading.cards[i];
			break;
		}
	}

	console.log(match.name);

	return match;
}

createObject();

// Setting the Camera position
//camera.position.z = 300;

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
	if (mesh) 
	{
		mesh.rotation.y += 0.01;
	}
	else 
	{
		mesh = scene.getObjectByName("Mesh Display");
	}
}