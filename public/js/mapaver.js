$(document).ready(
	function(){
		$('#agregar').click(function() {

			//$("section").append("<div id="+nombre+" class='dynDiv_moveDiv' style='cursor: move'><p>"+nombre+"</p><div class='dynDiv_resizeDiv_tl'></div><div class='dynDiv_resizeDiv_tr'></div><div class='dynDiv_resizeDiv_bl'></div><div class='dynDiv_resizeDiv_br'></div></div>");
			//create an element

		   var insertedImage = $('#htmlImage').clone();
		   var resized = insertedImage.resizable();
		   insertedImage.appendTo($('#content'));

		});
	});