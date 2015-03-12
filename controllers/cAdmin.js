var conn = require('../config/db').conn;
var mEventos = require('../models/mEventos');
var mNovedades = require('../models/mNovedades');

module.exports = {
	getLogin: getLogin,
	postLogin: postLogin,
	getAdmin: getAdmin
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function changeDate2(date){
	// input: yyyy/mm/dd
	fechaus = date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
	return fechaus;
	// output: dd/mm/yyyy
}

function getLogin(req, res){
	res.render('login',{
		pagename: 'Prochem Login',
		errors: req.session.errors,
	});
}

function getAdmin(req, res){
	res.render('admin/admin');
}

function postLogin(req, res){
	var form = req.body;
	if (form.email && form.password){
		conn("select * from secr where mail='"+ form.email +"'", function(user){
			console.log(user)
			user = user[0];
			if (user) {
				if (user.clave === form.password) {
					//alta = changeDate2(user.alta);
					//baja = changeDate2(user.baja);
					//console.log(alta, baja)
					if ( entreFechas(user.alta, user.baja) ) {
						if (user.activa == 1){

							req.session.user = user;
							req.session.auth = true;
							date = new Date()
							day = date.getDate();
							if (day<10)
								day = "0"+day
							month = (date.getMonth() + 1);
							if (month<10)
								month = "0"+month
							date = date.getFullYear() + '/' + month + '/' +  day;
							req.session.user.horaLogin = date;

							mEventos.add(req.session.user.unica, date, "Login", "", function(){});
							mNovedades.getLast(function(novedad){
								return res.render('inicio', {
									usuario: req.session.user,
									novedades: novedad[0]
								});
							});							
						}else{
							res.redirect('/')
						}
					} else {
						res.redirect('/')
					}
				} 
			} else {

    			req.session.errors = 'Usuario o Contraseña incorrectos.';
    			return res.redirect('/');
    		}
		});
	} else {
		req.session.errors = 'Campos obligatorios.';
		res.redirect('/');
	}
}

function entreFechas (alta, baja) {

	if ( new Date(alta).getTime() < new Date().getTime() ) {

		if ( new Date(baja).getTime() > new Date().getTime() ) {

			return true;

		} else {

			return false;
		}

	} else {
		return false;
	}

}