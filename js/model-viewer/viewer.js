// Declaring a few global variables we'll need.
var scene;			
var camera;
var renderer;

var mesh;

// THE JSON DATA
var cardDetails = '{ "cards":[{"id": 0,"filePath": "/content/models/control/animations/Notification_02_GlitchAnim.FBX","name": "Notification Alert","color": "0x800000","description": "All phones now display a notification for when there is a call from outside of the company.","objective": "This is a test objective","cost": 300, "level": 0},{"id": 1,"filePath": "/content/models/control/Ports_Blocked_02.fbx","name": "Ports Blocked","color": "0x800000","description": "This is a test description.","objective": "This is a test objective","cost": 100000, "level": 1}]}';
var scannedCard;

function setupScene()
{
	// Creating a new THREE Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xa0a0a0);
	scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

	//Creating a plane which the objects sit on, and a grid efect
	var ground =  new THREE.Mesh( new THREE.PlaneBufferGeometry( 3000, 3000 ), new THREE.MeshStandardMaterial( { color: 0x000000 } ) );
	ground.rotation.x = - Math.PI / 2;
	ground.receiveShadow = true;
	scene.add( ground );

	var grid = new THREE.GridHelper(2000, 20, 0x707070, 0x707070);
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

	lightScene();
}

function lightScene()
{
	//Creating a directional light and adding it to the scene.
	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(150, 200, -25);
	light.castShadow = true;

	light.shadow.top = 180;
	light.shadow.bottom = -100;
	light.shadow.left = -120;
	light.shadow.right = 120;

	scene.add(light);

	light = new THREE.HemisphereLight(0xffffff, 0x444444);
	light.position.set(0, 200, 0);
	scene.add(light);
}


setupScene();

// Adding the renderer to the body of our HTML page.
document.body.appendChild(renderer.domElement);

function createObject()
{
	scannedCard = getCardDetails();

	var mat = new THREE.MeshStandardMaterial( {color: 0xffffff });
	//var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
	//mat.wireframe = true;

	// Creating a FBX Model Loader object in prerperation for loading a mesh
	var loader = new THREE.FBXLoader();
	loader.load(scannedCard.filePath, function(object)
	{
		console.log(object);

		object.children[0].castShadow = true;
		object.children[0].material = mat;

		//object.geometry.bufferNeedsUpdate = true;
		//object.geometry.uvsNeedUpdate = true;

		object.name = "Mesh Display";

		scene.add(object);

		console.log("Created object " + scannedCard.name);
	});

	document.getElementById("card-name").innerHTML = scannedCard.name;
	document.getElementById("card-price").innerHTML = 'Price: $' + scannedCard.cost;
	document.getElementById("card-level").innerHTML = 'Card Level: ' + scannedCard.level;
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

	return match;
}

createObject();

// Setting the Camera position
camera.position.z = 175;
camera.position.y = 200;

camera.lookAt(0, 50, 0);

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
		mesh.rotation.y += 0.005;
	}
	else 
	{
		mesh = scene.getObjectByName("Mesh Display");
	}
}

document.getElementById("scan").addEventListener('click', deployCard);

function deployCard()
{
	// Play animation on the mesh.

	// Send a message to socket.io
	//alert("Played Card: " + scannedCard.name);

	// Wait until the animation has stopped to move back to the phaser page.
	var mixer = new THREE.AnimationMixer(mesh);
	var clips = mesh.animations;

	var clip = THREE.AnimationClip.findByName(clips, 'Take 001');
	var action = mixer.clipAction(clip);
	action.play();

	//setInterval(open('/index.html'), 1500);
}

document.getElementById("back-button").addEventListener('click', function()
{
	open('webar.html', '_self');
});