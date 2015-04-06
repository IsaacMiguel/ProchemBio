//requiriendo modelo mensaje.js:
var mClientes = require('../models/mClientes');
var mProvincias = require('../models/mProvincias');
var mIva = require('../models/mIva');
var mBorro = require('../models/mBorro');
var mMatep = require('../models/mMatep');
var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');

module.exports = {
  getClientes: getClientes,
  getClientesAlta: getClientesAlta,
  putCliente: putCliente,
  getDelCliente: getDelCliente,
  getClienteModificar: getClienteModificar,
  postClienteModificar: postClienteModificar,
  getMatep: getMatep
}

function getClientes(req, res){
  req.session.nromenu = 2;
  mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
    mIva.getAll(function (docs){
      mProvincias.getAll(function (docs2){
        mClientes.getAllClientes(function (docs3){
          res.render('clienteslista',{
            pagename: 'Archivo de Clientes',
            iva: docs,
            provincias: docs2,
            clientes: docs3,
            ayuda: ayuda[0]
          });
        });
      });
    });
  });
}
   

function getClientesAlta(req, res){
  mIva.getAll(function (docs){
    mProvincias.getAll(function (docs2){
      mClientes.getAllClientes(function (docs3){
        res.render('clientesalta', {
          pagename: 'Alta de Clientes',
          iva: docs,
          provincias: docs2,
          usuarios: docs3
        });
      });
    });
  })
      
}

function putCliente(req, res){
  params = req.body;
  nombre = params.nombre;
  direc = params.direccion;
  local = params.localidad;
  prov = params.provincia;
  telefono = params.telefono;
  mail = params.mail;
  contacto = params.contacto;
  contel = params.contel;
  concel = params.concel;
  connex = params.connex;
  conmail = params.conmail;
  activa = params.activa;
  cuit = params.cuit;
  iva = params.iva;
  claveweb = params.claveweb;

  if (activa="on")
    activa = 1;
  else
    activa = 0;

  mClientes.getClientePorNombre(nombre, function (docs){
    if(docs[0]==null){
      //si no hay coincidencias 
      mClientes.insertCliente(nombre, direc, local, prov, telefono, mail, contacto, contel, concel, connex, conmail, activa, cuit, iva, claveweb, function(){
        res.redirect('clienteslista');
      });
    }else{
      //si hay coincidencias ->error
      res.render('error', {
        error: "Nombre de cliente existente. Intente con otro nombre de cliente."
      });
    }
  });  
}

function getClienteModificar(req, res){
  params = req.body;
  id = req.params.id;
 
  mIva.getAll(function (docs){
    mProvincias.getAll(function (docs2){
      mClientes.getClientePorID(id, function (docs3){
        res.render('clientesmodificar', {
          pagename: 'Modificar Cliente',
          iva: docs,
          provincias: docs2,
          cliente: docs3[0]

        });
      });
    });
  });
}

function postClienteModificar(req, res){
  params = req.body;
  id = params.id
  nombre = params.nombre;
  direc = params.direccion;
  local = params.localidad;
  prov = params.provincia;
  telefono = params.telefonos;
  mail = params.mail;
  contacto = params.contacto;
  contel = params.contel;
  concel = params.concel;
  connex = params.connex;
  conmail = params.conmail;
  activa = params.activa;
  cuit = params.cuit;
  iva = params.iva;
  claveweb = params.claveweb;

  if (activa="on")
    activa = 1;
  else
    activa = 0;
  
      mClientes.updateCliente(id, nombre, direc, local, prov, telefono, mail, contacto, contel, concel, connex, conmail, activa, cuit, iva, claveweb, function(){
        res.redirect('clienteslista');
      });
}

function getDelCliente(req, res){
  var params = req.params;
  var id = params.id;

  mVerificacion.getClienteFromMatep(id, function (clienteFromMatep){
    if (clienteFromMatep[0] != null){
      res.render('error', {
        error: "No puede eliminar este cliente, posee movimientos."
      });
    }else{
      mVerificacion.getClienteFromProduc(id, function (clienteFromProduc){
        if (clienteFromProduc[0]){
          res.render('error', {
            error: "No puede eliminar este cliente, posee movimientos."
          });
        }else{
          mVerificacion.getClienteFromFormulado(id, function (clienteFromFormulado){
            if (clienteFromFormulado[0]){
              res.render('error', {
                error: "No puede eliminar este cliente, posee movimientos."
              });
            }else{
              mVerificacion.getClienteFromRemito(id, function (clienteFromRemito){
                if (clienteFromRemito[0]){
                  res.render('error', {
                    error: "No puede eliminar este cliente, posee movimientos."
                  });
                }else{
                  mVerificacion.getClienteFromProgramacion(id, function (clienteFromProgramacion){
                    if (clienteFromProgramacion[0]){
                      res.render('error', {
                        error: "No puede eliminar este cliente, posee movimientos."
                      });
                    }else{
                      mClientes.getClientePorID(id, function (docs){
                        cliente = docs[0];
                        mBorro.add(req.session.user.usuario,"Clientes", "Borra Nombre Cliente: "+ cliente.nombre + ", id: " + id ,function(){
                          mClientes.delCliente(id, function(){
                            res.redirect('/clienteslista'); 
                          });
                        });
                      });
                    }
                  });
                }
              });  
            }
          });
        }        
      });
    }      
  });
}

function getMatep(req, res){
  params = req.params;
  idcliente = params.cliente;
  mMatep.getAllActivasPorCliente(idcliente, function (mateps){
    res.send(mateps);
  });  
}