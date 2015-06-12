var conn = require('../config/db').conn;

module.exports = {
	update: update
}

function update(idprog1, ofn, linea, ffinal, finicial, lote, tiempototal, pesoneto, pesomin, pesomax, cantpallets, cantbidones, bidxpallets, bidsobra, fechainicialf, fechafinalf, horainicialf, horafinalf, palletsprod, bidonesprod, muestrap, muestram, muestrau, controlp, controlm, controlu, cb){
	conn("UPDATE `program1` SET formuladorfinal="+ffinal+", id_lineafraccionado_fk="+linea+", id_fraccionadorinicial_fk="+finicial+", id_fraccionadorfinal_fk="+ffinal+", ofn="+ofn+", lotef='"+lote+"', tiempototallote='"+tiempototal+"', pesoneto="+pesoneto+", pesomin="+pesomin+", pesomax="+pesomax+", cantpallets="+cantpallets+", cantbidones="+cantbidones+", bidonesxpallet="+bidxpallets+", bidonessobrantes="+bidsobra+", fechainicialf='"+fechainicialf+"', fechafinalf='"+fechafinalf+"', horainicialf='"+horainicialf+"', horafinalf='"+horafinalf+"', palletsprod="+palletsprod+", bidonesprod="+bidonesprod+", muestrap="+muestrap+", muestram="+muestram+", muestrau="+muestrau+", controlp='"+controlp+"', controlm='"+controlm+"', controlu='"+controlu+"' WHERE id="+idprog1, cb);
}
