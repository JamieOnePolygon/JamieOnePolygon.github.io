AFRAME.registerComponent('markerhandler', {

	init: function()
	{
		const object = document.querySelector("#animated-mesh");

		object.addEventListener('click', function(ev) {
			const entity = document.querySelector('#anim-property');

			entity.setAttribute('dur', 10000);
	});
}});