//requiriendo modelos:
var mProduccion = require('../models/mProduccion');
var mNovedades = require('../models/mNovedades');
var mAyuda = require('../models/mAyuda');
var mMatep = require('../models/mMatep');
var mProgram1 = require('../models/mProgramacion');


module.exports = {
  getLista: getLista,
  getProgramaciones: getProgramaciones,
  getVerFormulado: getVerFormulado,
  postDatosFormulado: postDatosFormulado,
  getImprimir: getImprimir
};

function changeDate(date){
  // input: dd/mm/yyyy
  //date = new Date(date);
  //console.log(date);
  fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
  //console.log(fechaus)
  return fechaus;
  // output: yyyy/mm/dd
}

function getLista(req, res){
  req.session.nromenu = 13;
  mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
    res.render('produccionlista',{
      pagename: 'Lista de Produciones'
    });
  });
}

function getProgramaciones(req, res){
  params = req.params;
  fi = params.fi;
  ff = params.ff;
  fi = changeDate(fi);
  ff = changeDate(ff);
  mProduccion.getProgramaciones(fi, ff, function (data){
    res.send(data);
  });
}

function getVerFormulado(req, res){
  params = req.params;
  id = params.id;
  mProduccion.getFormulado(id, function (form){
    res.render('produccionver',{
      pagename: 'Ver Datos Formulado',
      form: form
    });
  });
}

function postDatosFormulado(req, res){
  params = req.body;
  //console.log(params);
  ids = params.id;
  lotemps = params.lotemp;
  pesoobjs = params.pesoobj;
  pulsoobjs = params.pulsoobj;
  pulsoreals = params.pulsoreal;
  hris = params.hri; 
  hrfs = params.hrf;
  tempis = params.tempi;
  tempfs = params.tempf;
  phis = params.phi;
  phfs = params.phf;
  for (var i = 0; i < ids.length; i++) {
    i2 = i; 
    mProduccion.updateDatosFormulado(ids[i], lotemps[i], pesoobjs[i], pulsoobjs[i], pulsoreals[i], hris[i], hrfs[i], tempis[i], tempfs[i], phis[i], phfs[i], function(){
      console.log("grabado nro "+i2);
    });
  }
  res.redirect('produccionlista');
}

function getImprimir(req, res){
  params = req.params;
  id = params.id;

  mProgram1.getProg1PorId_joined_w_Clientes_Reacto_Formulado_Tanque_and_Empleados(id, function (program1){
    //console.log(program1)
    mProduccion.getFormulado(id, function (forms){
      mProduccion.getSuma(id, function (suma){
        console.log(suma)
        res.render('produccionimprimirform',{
          pagename: 'Imprimir Orden de Formulacion de Agroquímicos',
          program1: program1[0],
          forms: forms,
          suma: suma[0]
        });
      });
    });
  });
}