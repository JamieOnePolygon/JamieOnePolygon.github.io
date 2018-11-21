(function()
{
	'use strict';

	var resultsFound = false;

	// Creating the reference to hold the CraftAR image recognition
	var imageRecognition = new craftar.CloudRecognition(
	{
		token: "e4ded19e80454ae7b9c90412b84f20da"
	});

	// Setting up events to listen for results being found, and the IR finishing
	imageRecognition.addListener('results', function(err, response, xhr)
	{
		// Checking to see if we have found any results for the image.
		if (response.results && response.results.length > 0)
		{
			handleResults(response);
			resultsFound = true;

			// As we have found results, we want to stop the image recognition
			imageRecognition.stopFinder();
		}
	});

	imageRecognition.addListener('finderFinished', function()
	{
		if (!resultsFound)
		{
			alert("No results have been found. Please try again.");
		}
	});

	function init()
	{

		// Checking to see if the users device supports the technology to run CraftAR
		if (craftar.supportsCapture())
		{
			setupCapture(function(err, captureObject)
			{
				// Checking to see if there was an error whilst initalizing the camera.
				if (err)
				{
					alert("There was an issue setting up your camera. (No Camera Detected)");
				}
				else 
				{
					// Getting the div element which wil be used to display the camera.
					var captureDiv = document.getElementById('videoCapture');
					captureDiv.appendChild(captureObject.domElement);

						// Resetting the bool for finding results and telling CraftAR to start looking for an image.
					resultsFound = false;
					imageRecognition.startFinder(captureObject, 500, 25);

					alert("Started IR");
				}
			});
		}
		else


		{
			alert("Your device does not support CraftAR and Image Recognition");
		}
	};

	window.addEventListener("load", init, false);

	function handleResults(results)
	{
		var result = results.results[0];

		// Here we want to now tell the web browser to navigate to a new web page to display the image.

		alert("Result found?");
	};

	function setupCapture(callback)
	{
		var capture = new craftar.Capture();

		capture.addListener('started', function()
		{
			callback(null, capture);
		});

		capture.addListener('error', function(error)
		{
			callback(error, capture);
		});

		capture.start();
	}
})();