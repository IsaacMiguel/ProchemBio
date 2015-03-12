//requiriendo modelo mensaje.js:
var mAccesos = require('../models/mAccesos');

module.exports = {
  getAccesos: getAccesos,
  postAccesos: postAccesos
  }

function getAccesos(req, res){
  params = req.params;
  idusuario = params.id;

  
	mAccesos.getMenues(function(docs){
	  mAccesos.getAccesos(function(docs2){
		mAccesos.getAccesosPorUsuario(idusuario, function(docs3){
		if ( docs.length == docs3.length){
		  res.render('accesoslista', {
			idUsuario: idusuario,
			pagename: 'Lista de Accesos',
			menues: docs,
			accesos: docs2,
			usuario_accesos: docs3
		  });  
		}else{
		  var band = false;
		  var noEsta = [];

		  docs.forEach(function (e) {
				 docs3.forEach(function (d) {
						 if ( e.id == d.menu ) {
								 band = true
						 }
				 })
				 if (!band) {
						mAccesos.insertAcceso(idusuario, e.id, function(data){
						  mAccesos.getMenues(function(docs){
							 mAccesos.getAccesos(function(docs2){
								mAccesos.getAccesosPorUsuario(idusuario, function(docs3){
								  if ( docs.length == docs3.length){
										res.render('accesoslista', {
										  idUsuario: idusuario,
										  pagename: 'Lista de Accesos',
										  menues: docs,
										  accesos: docs2,
										  usuario_accesos: docs3
										});  
								}
							  });
							});
		})
						});
						 console.log("No esta: " + e.id)
						 noEsta.push(e.a)
				 }
				 band = false;
		  });	
	  	}
	});    
  });
});
}

function postAccesos(req, res){
	//res.redirect('/usuariolista');
	//console.log(req.body)
    var idUsuario = req.body.idUsuario;
    var accesos = [];
    //console.log(req.body)
    var checkedValue = $('#:checked').val();

    mAccesos.getMenues(function(docs){
	 	mAccesos.getAccesos(function(docs2){
	   		docs.forEach(function(menu, idx) {
	 			accesos[menu.id] = [];
	 	  		docs2.forEach(function(acceso, idx2) {
			 		if (req.body[menu.id+'-'+acceso.descripcion] == 'on') {
			 		  accesos[menu.id].push({menu: menu.id, acceso: acceso.descripcion, checked: true });
			 		} else {
			 		  accesos[menu.id].push({menu: menu.id, acceso: acceso.descripcion, checked: false });
			 		}
	 	  		});
	   		});
		    mAccesos.addAccesos(idUsuario, accesos, function() {
		 		return res.redirect('/usuarioslista');
		    });
	 	});
   	});  
}