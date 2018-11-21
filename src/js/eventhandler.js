var marker = document.getElementById('hacker-attack-1');

marker.addListener('markerFound', function(event)
{
	alert("Found the Marker");
});