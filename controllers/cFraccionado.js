//requiriendo modelos:
var mProduccion = require('../models/mProduccion');
var mAyuda = require('../models/mAyuda');
var mProgram1 = require('../models/mProgramacion');
var mEmple = require('../models/mEmple');
var mLineas = require('../models/mLineas');
var mFraccionado = require('../models/mFraccionado');

module.exports = {
  getLista: getLista,
  getProgramaciones: getProgramaciones,
  getAlta: getAlta,
  postAlta: postAlta,
  getModificar: getModificar,
  postModificar: postModificar
};

function changeDate(date){
  //input: dd/mm/yyyy
  fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
  //console.log(fechaus)
  return fechaus;
  // output: yyyy/mm/dd
}

function getLista(req, res){
  req.session.nromenu = 16;
  mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
    res.render('fraccionadolista',{
      pagename: 'Lista de Programaciones Producidas a Fraccionar',
      ayuda: ayuda[0]
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

function getAlta(req, res){
  params = req.params;
  idprog1 = params.id;

  mEmple.getAllActivos(function (emples){
    mLineas.getAll(function (lineas){
      res.render("fraccionadoalta", {
        pagename: "Cargar Datos de Fraccionado",
        emples: emples,
        lineas: lineas,
        idprog1: idprog1
      });
    });
  });
}

function postAlta(req, res){
  params = req.body;
  idprog1 = params.idprog1;
  linea = params.linea;
  ffinal = params.ffinal;
  finicial = params.finicial;
  lote = params.lote;
  tiempototal = params.tiempototal;
  pesoneto = params.pesoneto;
  pesomin = params.pesomin;
  pesomax = params.pesomax;
  cantpallets = params.cantpallets;
  cantbidones = params.cantbidones;
  bidxpallets = params.bidxpallet;
  bidsobra = params.bidsobra;
  fechainicialf = params.fechainicialf;
  fechafinalf = params.fechafinalf;
  horainicialf = params.horainicialf;
  horafinalf = params.horafinalf;
  palletsprod = params.palletsprod;
  bidonesprod = params.bidonesprod;
  muestrap = params.muestrap;
  muestram = params.muestram;
  muestrau = params.muestrau;
  controlp = params.controlp;
  controlm = params.controlm;
  controlu = params.controlu;
  ofn = params.ofn;

  fechainicialf = changeDate(fechainicialf);
  fechafinalf = changeDate(fechafinalf);

  mFraccionado.update(idprog1, ofn, linea, ffinal, finicial, lote, tiempototal, pesoneto, pesomin, pesomax, cantpallets, cantbidones, bidxpallets, bidsobra, fechainicialf, fechafinalf, horainicialf, horafinalf, palletsprod, bidonesprod, muestrap, muestram, muestrau, controlp, controlm, controlu, function(){
    res.redirect('fraccionadolista')
  });
}

function getModificar(req, res){
  params = req.params;
  id = params.id;
  mEmple.getAllActivos(function (emples){
    mLineas.getAll(function (lineas){
      mProgram1.getProgPorId(id, function (prog1){
        console.log(prog1)
        res.render('fraccionadomodificar',{
          prog1: prog1[0],
          pagename: "Modificar Datos de Fraccionado",
          lineas: lineas,
          emples: emples
        });
      });
    });
  });
} 

function postModificar(req, res){
  params = req.body;
  idprog1 = params.idprog1;
  console.log(idprog1)
  linea = params.linea;
  ffinal = params.ffinal;
  finicial = params.finicial;
  lote = params.lote;
  tiempototal = params.tiempototal;
  pesoneto = params.pesoneto;
  pesomin = params.pesomin;
  pesomax = params.pesomax;
  cantpallets = params.cantpallets;
  cantbidones = params.cantbidones;
  bidxpallets = params.bidxpallet;
  bidsobra = params.bidsobra;
  fechainicialf = params.fechainicialf;
  fechafinalf = params.fechafinalf;
  horainicialf = params.horainicialf;
  horafinalf = params.horafinalf;
  palletsprod = params.palletsprod;
  bidonesprod = params.bidonesprod;
  muestrap = params.muestrap;
  muestram = params.muestram;
  muestrau = params.muestrau;
  controlp = params.controlp;
  controlm = params.controlm;
  controlu = params.controlu;
  ofn = params.ofn;
  //arreglar lo de las fechas
  //ver lo del idprog1
  fechainicialf = changeDate(fechainicialf);
  fechafinalf = changeDate(fechafinalf);

  mFraccionado.update(idprog1, ofn, linea, ffinal, finicial, lote, tiempototal, pesoneto, pesomin, pesomax, cantpallets, cantbidones, bidxpallets, bidsobra, fechainicialf, fechafinalf, horainicialf, horafinalf, palletsprod, bidonesprod, muestrap, muestram, muestrau, controlp, controlm, controlu, function(){
    res.redirect('fraccionadolista')
  });
}