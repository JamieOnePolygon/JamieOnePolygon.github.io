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
	scene.background = new THREE.Color(0xa0a0a0);

	//Creating a plane which the objects sit on, and a grid efect
	var ground =  new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshStandardMaterial( { color: 0x999999 } ) );
	ground.rotation.x = - Math.PI / 2;
	ground.receiveShadow = true;
	scene.add( ground );

	var grid = new THREE.GridHelper(2000, 50, 0x000000, 0x000000);
	grid.material.opacity = 0.2;
	grid.material.transparency = true;
	scene.add(grid);

	// Calculating the Aspect Ratio of the current window and creating a new
	// perspective camera.
	var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

	// Creating a new renderer which will render everything
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	//Creating a directional light and adding it to the scene.
	var light = new THREE.DirectionalLight(0xFFDA82);
	light.position.set(0, 200, 100);
	light.castShadow = true;
	scene.add(light);

	light = new THREE.HemisphereLight(0xffffff, 0x444444);
	light.position.set(0, 200, 0);
	//light.castShadow = true;
	scene.add(light);
}

setupScene();

// Adding the renderer to the body of our HTML page.
document.body.appendChild(renderer.domElement);

function createObject()
{
	var match = getCardDetails();

	var mat = new THREE.MeshStandardMaterial( {color: 0xff0000 });

	// Creating a FBX Model Loader object in prerperation for loading a mesh
	var loader = new THREE.FBXLoader();
	loader.load(match.filePath, function(object)
	{
		object.material = mat;
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
camera.position.z = 175;
camera.position.y = 175;

camera.lookAt(0, 0, 0);

// Update Loop
function animate()
{
	requestAnimationFrame(animate);

	//camera.lookAt((0, 0, 0));
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