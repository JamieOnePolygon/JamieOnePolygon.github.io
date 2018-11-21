window.addEventListener('load', setupListener, false);

function setupListener()
{
	var marker = document.getElementById('hacker-attack-1');

	marker.addEventListener('markerFound', function(event)
	{
		alert("Found the Marker");
	});
}