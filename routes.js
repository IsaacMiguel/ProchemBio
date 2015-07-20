var indexController = require('./controllers/cIndex');
var usuarioController = require('./controllers/cUsuario');
var clientesController = require('./controllers/cCliente');
var adminController = require('./controllers/cAdmin');
var umedController = require('./controllers/cUmed');
var matepController = require('./controllers/cMatep');
var empleController = require('./controllers/cEmple');
var accesosController = require('./controllers/cAccesos');
var cargoController = require('./controllers/cCargos');
var reactoController = require('./controllers/cReacto');
var lineasController = require('./controllers/cLineas');
var prodController = require('./controllers/cProd');
var envasesController = require('./controllers/cEnvases');
var tanquesController = require('./controllers/cTanques');
var ubicaController = require('./controllers/cUbica');
var recetaController = require('./controllers/cReceta');
var remitosController = require('./controllers/cRemitos');
var progController = require('./controllers/cProgramacion');
var FormEnReactorController = require('./controllers/cFormEnReactor');
var labController = require('./controllers/cLab');
var formController = require('./controllers/cFormulados');
var mEventos = require('./models/mEventos');
var consuController = require('./controllers/cConsumibles');
var produccionController = require('./controllers/cProduccion');
var fraccionadoController = require('./controllers/cFraccionado');
var aprobacionController = require('./controllers/cAprobacion');
var navesController = require('./controllers/cNaves');
var mapaController = require('./controllers/cMapa');

function logout (req, res) {
	fecha = new Date();
	day = fecha.getDate();
	month = fecha.getMonth();
	if (day<10)
		day = "0" + day;
	if (month<10)
		month = "0" + month;
	fecha = fecha.getFullYear() + "/"+month+"/"+day+" "+fecha.getHours()+":"+fecha.getMinutes()
	mEventos.add(req.session.user.unica, fecha, "Logout", "", function(){
	});
	req.session = null;
	return res.redirect('/');
}

// Verifica que este logueado
function auth (req, res, next) {
	if (req.session.auth) {
		return next();
	} else {
		console.log("dentro del else del auth ")
		return res.redirect('/')
	}
}

module.exports = function(app) {
	app.get('/', adminController.getLogin);
	app.get('/login', adminController.getLogin)
	app.post('/login', adminController.postLogin);
	app.get('/logout', logout);
	app.get('/inicio', auth, indexController.getInicio);
	app.get('/error', indexController.getError);
	//ayuda
	app.get('/ayuda', indexController.getAyuda);
	app.get('/ayudaver/:id', indexController.AyudaVer);
	//novedades
	app.get('/listanovedades', indexController.getNovedades);
	//usuarios
	app.get('/usuarioslista', auth, usuarioController.getUsuarios);
	app.get('/usuariosalta', auth, usuarioController.getUsuariosAlta);
	app.post('/usuariosalta', auth, usuarioController.putUsuario);
	app.get('/usuariosmodificar/:id', auth, usuarioController.getUsuarioModificar);
	app.post('/usuariosmodificar', auth, usuarioController.postUsuarioModificar);
	app.get('/usuariosborrar/:id', auth, usuarioController.getDelUsuario);
	//configurar accesos
	app.get('/accesoslista/:id', auth, accesosController.getAccesos);
	app.post('/accesoslista', auth, accesosController.postAccesos);
	//clientes
	app.get('/clienteslista', auth, clientesController.getClientes);
	app.get('/clientesalta', auth, clientesController.getClientesAlta);
	app.post('/clientesalta', auth, clientesController.putCliente);
	app.get('/clientesmodificar/:id', auth, clientesController.getClienteModificar);
	app.post('/clientesmodificar', auth, clientesController.postClienteModificar);
	app.get('/clientesborrar/:id', auth, clientesController.getDelCliente);
	app.get('/:cliente/materiasprimas', auth, clientesController.getMatep);
	//unidades de medida "umed"
	app.get('/umedlista', auth, umedController.getAllUmed);
	app.get('/umedalta', auth, umedController.getAlta);
	app.post('/umedalta', auth, umedController.postAlta);
	app.get('/umedmodificar/:id', auth, umedController.getModificar);
	app.post('/umedactualizar', auth, umedController.postModificar);
	app.get('/umedborrar/:id', auth, umedController.getDelUmed);
	//materias primas por cliente
	app.get('/mateplista/:cdcliente', auth, matepController.getAllMatepPorCliente);
	app.get('/matepalta/:cdcliente', auth, matepController.getAlta);
	app.post('/matepalta', auth, matepController.postAlta);
	app.get('/matepmodificar/:id', auth, matepController.getModificar);
	app.post('/matepmodificar', auth, matepController.postModificar);
	app.get('/matepborrar/:id', auth, matepController.getDelMatep);
	//cantidad maxima en tanque por matep
	app.get('/formenreactor/:id', auth, FormEnReactorController.getFormEnReactor);
	app.get('/formenreactoralta/:idform', auth, FormEnReactorController.getAlta);
	app.post('/formenreactoralta', auth, FormEnReactorController.postAlta);
	app.get('/formenreactormodificar/:id', auth, FormEnReactorController.getModificar);
	app.post('/formenreactormodificar', auth, FormEnReactorController.postModificar);
	app.get('/formenreactorborrar/:id', auth, FormEnReactorController.del);
	//producto por clientereactor
	app.get('/prodlista/:cdcliente', auth, prodController.getAllProdPorCliente);
	app.get('/prodalta/:cdcliente', auth, prodController.getAlta);
	app.post('/prodalta', auth, prodController.postAlta);
	app.get('/prodmodificar/:id', auth, prodController.getModificar);
	app.post('/prodmodificar', auth, prodController.postModificar);
	app.get('/prodborrar/:id', auth, prodController.getDelProd);
	app.get('/:idprod/ablote', auth, prodController.getAbLote);
	//empleados
	app.get('/emplelista', auth, empleController.getEmpleados);
	app.get('/emplealta', auth, empleController.getAlta);
	app.post('/emplealta', auth, empleController.postAlta);
	app.get('/emplemodificar/:codigo', auth, empleController.getModificar);
	app.post('/emplemodificar', auth, empleController.postModificar);
	app.get('/empleborrar/:codigo', auth, empleController.getDelEmple);
	//cargos de empleados
	app.get('/cargoslista', auth, cargoController.getAllCargos);
	app.get('/cargosalta', auth, cargoController.getAlta);
	app.post('/cargosalta', auth, cargoController.postAlta);
	app.get('/cargosmodificar/:id', auth, cargoController.getModificar);
	app.post('/cargosmodificar', auth, cargoController.postModificar);
	app.get('/cargosborrar/:id', auth, cargoController.getDelCargo);
	//reactores
	app.get('/reactolista', auth, reactoController.getAll);
	app.get('/reactoalta', auth, reactoController.getAlta);
	app.post('/reactoalta', auth, reactoController.postAlta);
	app.get('/reactomodificar/:id', auth, reactoController.getModificar);
	app.post('/reactomodificar', auth, reactoController.postModificar);
	app.get('/reactoborrar/:id', auth, reactoController.getDel);
	//lineas
	app.get('/lineaslista', auth, lineasController.getAll);
	app.get('/lineasalta', auth, lineasController.getAlta);
	app.post('/lineasalta', auth, lineasController.postAlta);
	app.get('/lineasmodificar/:id', auth, lineasController.getModificar);
	app.post('/lineasmodificar', auth, lineasController.postModificar);
	app.get('/lineasborrar/:id', auth, lineasController.getDel);
	//envases
	app.get('/envaseslista', auth, envasesController.getAll);
	app.get('/envasesalta', auth, envasesController.getAlta);
	app.post('/envasesalta', auth, envasesController.postAlta);
	app.get('/envasesmodificar/:id', auth, envasesController.getModificar);
	app.post('/envasesmodificar', auth, envasesController.postModificar);
	app.get('/envasesborrar/:id', auth, envasesController.getDel);
	app.get('/capacidadenvase/:id', auth, envasesController.getCapacidad);
	//tanques
	app.get('/tanqueslista', auth, tanquesController.getAll);
	app.get('/tanquesalta', auth, tanquesController.getAlta);
	app.post('/tanquesalta', auth, tanquesController.postAlta);
	app.get('/tanquesmodificar/:id', auth, tanquesController.getModificar);
	app.post('/tanquesmodificar', auth, tanquesController.postModificar);
	app.get('/tanquesborrar/:id', auth, tanquesController.getDel);
	//ubicaciones "ubica"
	app.get('/ubicalista', auth, ubicaController.getAll);
	app.get('/ubicaalta', auth, ubicaController.getAlta);
	app.post('/ubicaalta', auth, ubicaController.postAlta);
	app.get('/ubicamodificar/:id', auth, ubicaController.getModificar);
	app.post('/ubicamodificar', auth, ubicaController.postModificar);
	app.get('/ubicaborrar/:id', auth, ubicaController.getDel);
	//recetas
	app.get('/recetalista/:id', auth, recetaController.getRecetaPorFormulado);
	app.get('/recetaalta/:id', auth, recetaController.getAlta);
	app.post('/recetaalta', auth, recetaController.postAlta);
	app.get('/recetaborrar/:id', auth, recetaController.getDel);
	app.get('/recetamodificar/:id', auth, recetaController.getModificar);
	app.post('/recetamodificar', auth, recetaController.postModificar);
	//remitos
	app.get('/remitoslista', auth, remitosController.getAll);
	app.get('/remitosalta', auth, remitosController.getAlta);
	app.post('/remitosalta', auth, remitosController.postAlta);
	app.get('/remitosmodificar/:id', auth, remitosController.getModificar);
	app.post('/remitosmodificar', auth, remitosController.postModificar);
	app.get('/remitosborrar/:id', auth, remitosController.getDel);
	app.get('/buscarremito/:finicio/:ffin', auth, remitosController.getRemitos);
	//programacion
	app.get('/prog1lista', auth, progController.getAll);
	app.get('/prog1alta', auth, progController.getAlta);
	app.post('/prog1alta', auth, progController.postAlta);
	app.get('/prog2lista', auth, progController.getLista);
	app.get('/prog1alta2/:idprog', auth, progController.getAlta2);
	app.post('/prog1alta2', auth, progController.postAlta2);
	app.get('/prog1/:lote/:anio/:clienteid/:prodid', auth, progController.getCodigo);
	app.get('/prog1borrar/:id', auth, progController.getDel);
	app.get('/refrescaremito/:idcliente/:idmatep', auth, progController.getRemitos);
	app.get('/traerpa/:idform', auth, progController.getPA);
	app.get('/buscarprogramaciones/:fecha', auth, progController.getProgramaciones);
	app.get('/produccionborrarprogram/:id', auth, progController.getDelProgram);
	//laboratorio
	app.get('/lab/:idremito', auth, labController.getLab);
	app.post('/lab', auth, labController.postLab);
	//formulados
	app.get('/formuladoalta/:cdcliente', auth, formController.getAlta);
	app.post('/formuladoalta', auth, formController.postAlta);
	app.get('/formuladolista/:cdcliente', auth, formController.getAllFormuladoPorCliente);
	app.get('/formuladomodificar/:id', auth, formController.getModificar);
	app.post('/formuladomodificar', auth, formController.postModificar);
	app.get('/formuladoborrar/:id', auth, formController.getDelFormulado);
	app.get('/:id/formulados', auth, formController.getForms);
	app.get('/:idform/ablotee', auth, formController.getAbLote);
	//consumibles
	app.get('/consumibleslista/:idprod', auth, consuController.getAll);
	app.get('/consumiblesalta/:idprod', auth, consuController.getAlta);
	app.post('/consumiblesalta', auth, consuController.postAlta);
	app.get('/consumiblesborrar/:id', auth, consuController.getDel);
	//produccion	
	app.get('/produccionlista', auth, produccionController.getLista);
	app.get('/buscarprogramaciones2/:fi/:ff', auth, produccionController.getProgramaciones);	
	app.get('/produccionver/:id', auth, produccionController.getVerFormulado);
	app.post('/produccionver', auth, produccionController.postDatosFormulado);
	app.get('/produccionimprimir/:id', auth, produccionController.getImprimir);
	//borrar
	//fraccionado
	app.get('/fraccionadolista', auth, fraccionadoController.getLista);
	app.get('/fraccionadoalta/:id', auth, fraccionadoController.getAlta);
	app.post('/fraccionadoalta', auth, fraccionadoController.postAlta);
	app.get('/fraccionadomodificar/:id', auth, fraccionadoController.getModificar);
	app.post('/fraccionadomodificar', auth, fraccionadoController.postModificar);
	//borrar?
	//aprobacion
	app.get('/aprobacionlista', auth, aprobacionController.getLista);
	app.get('/aprobacionver/:id', auth, aprobacionController.getVer);
	app.post('/aprobacionver', auth, aprobacionController.postVer);
	app.get('/aprobacionimprimir/:id', auth, aprobacionController.getImprimir);
	//naves
	app.get('/naveslista', auth, navesController.getLista);
	//mapa
	app.get('/mapaver', auth, mapaController.getMapa);
}; 