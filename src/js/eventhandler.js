var attack1Marker;

init: function()
{
	this.attack1Marker = document.getElementById("hacker-attack-1");
}

tick: function()
{
	if (!this.attack1Marker) return;

	if (this.attack1Marker.object3D.visible)
	{
		alert("Marker is Visible");
	}
}