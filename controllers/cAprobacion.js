//requiriendo modelos:
var mProduccion = require('../models/mProduccion');
var mNovedades = require('../models/mNovedades');
var mAyuda = require('../models/mAyuda');
var mMatep = require('../models/mMatep');
var mProg = require('../models/mProgramacion');
var mEmple = require('../models/mEmple');
var mAprobacion= require('../models/mAprobacion');
var mReceta = require('../models/mReceta');
var mForm = require('../models/mFormulados');
var mAprobacion = require('../models/mAprobacion');
var mTanques = require('../models/mTanques');

module.exports = {
  getLista: getLista,
  getVer: getVer,
  postVer: postVer,
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
  //req.session.nromenu = 13;
  //mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
  res.render('aprobacionlista',{
    pagename: 'Lista de Producciones'
    //ayuda: ayuda[0]
  });
  //});
}

function getVer(req, res){
  params = req.params;
  id_prog2 = params.id;

  //mProg.getProg2PorId(id_prog2, function (p2){
    //console.log(p2[0])
    mAprobacion.getByP2Id(id_prog2, function (aprobacion){
      mEmple.getAllActivos(function (emples){
        mTanques.getAllActivos(function (tanques){     
          res.render('aprobacionver', {
            pagename: "Aprobacion (Laboratorio)",
            id_prog2: id_prog2,
            emples: emples,
            tanques: tanques,
            aprobacion: aprobacion[0]
          });
        });
      });
    });
  //});
}

function postVer(req, res){
  params = req.body;
  idaprobacion = params.idaprobacion;
  idp2 = params.idp2;
  id_prog2 = params.id_prog2;
  console.log("ida "+idaprobacion)
  console.log("idp2 "+idp2)
  console.log("id_prog2 "+id_prog2)
  extrac1 = params.extrac1;
  recibida1 = params.recibida1;
  analizada1 = params.analizada1;
  ajustes1 = params.ajustes1;
  ph1 = params.ph1;
  dens1 = params.dens1;
  extrac2 = params.extrac2;
  recibida2 = params.recibida2;
  analizada2 = params.analizada2;
  ajustes2 = params.ajustes2;
  ph2 = params.ph2;
  dens2 = params.dens2;
  extrac3 = params.extrac3;
  recibida3 = params.recibida3;
  analizada3 = params.analizada3;
  ajustes3 = params.ajustes3;
  ph3 = params.ph3;
  dens3 = params.dens3;
  extrac4 = params.extrac4;
  recibida4 = params.recibida4;
  analizada4 = params.analizada4;
  ajustes4 = params.ajustes4;
  ph4 = params.ph4;
  dens4 = params.dens4;
  extrac5 = params.extrac5;
  recibida5 = params.recibida5;
  analizada5 = params.analizada5;
  ajustes5 = params.ajustes5;
  ph5 = params.ph5;
  dens5 = params.dens5;
  aprobacion_final = params.aprobacion_final;
  ph_final = params.ph_final;
  dens_final = params.dens_final;
  laboratorista = params.laboratorista;
  tanque_nro = params.tanquenro;
  hr_inicial = params.hr_inicial;
  hr_final = params.hr_final;
  controlado = params.controlado;
  formulador_final = params.formulador_final;
  tiempo_total = params.tiempo_total;
  refrigerio = params.refrigerio;
  observaciones = params.observaciones;

  if (idaprobacion != ""){
    mAprobacion.updateall(idaprobacion, idp2, extrac1, recibida1, analizada1, ajustes1, ph1, dens1, extrac2, recibida2, analizada2, ajustes2, ph2, dens2, extrac3, recibida3, analizada3, ajustes3, ph3, dens3, extrac4, recibida4, analizada4, ajustes4, ph4, dens4, extrac5, recibida5, analizada5, ajustes5, ph5, dens5, aprobacion_final, ph_final, dens_final, laboratorista, tanque_nro, hr_inicial, hr_final, controlado, formulador_final, tiempo_total, refrigerio, observaciones, function(){
      res.redirect('aprobacionlista');
    });
  }else{
    mAprobacion.insert(id_prog2, extrac1, recibida1, analizada1, ajustes1, ph1, dens1, extrac2, recibida2, analizada2, ajustes2, ph2, dens2, extrac3, recibida3, analizada3, ajustes3, ph3, dens3, extrac4, recibida4, analizada4, ajustes4, ph4, dens4, extrac5, recibida5, analizada5, ajustes5, ph5, dens5, aprobacion_final, ph_final, dens_final, laboratorista, tanque_nro, hr_inicial, hr_final, controlado, formulador_final, tiempo_total, refrigerio, observaciones, function(){
      res.redirect('aprobacionlista')
    });
  }
  
}

function getImprimir(req, res){
  params = req.params;
  id = params.id;
  mAprobacion.getByP2Id(id, function (ap){
    //console.log(ap[0])
    mEmple.getAllActivos(function (emples){
      mTanques.getAllActivos(function (tanques){      
        res.render('aprobacionimprimir', {
          pagename: "Aprobación (Laboratorio)",
          ap: ap[0],
          emples: emples,
          tanques: tanques
        });
      });
    });
  });
}