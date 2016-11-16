﻿var searchUrl = global_settings.urlCORS + '/api/filtroApi/';

registrationModule.factory('searchRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(searchUrl + '1|' + id);
        },
        getDivision: function () {
            return $http.get(searchUrl + '1');
        },
        getEmpresa: function (idempleado) {
            return $http.get(searchUrl + '2|' + idempleado);
        },
        getSucursal: function (idempleado, idempresa) {
            return $http.get(searchUrl + '3|' + idempleado + '|' + idempresa);
        },
        getDepartamento: function (idempleado, idempresa, idsucursal) {
            return $http.get(searchUrl + '4|' + idempleado + '|' + idempresa + '|' + idsucursal);
        },
        getTipos: function () {
            return $http.get(searchUrl + '6|0');
        },
        getProveedor: function (cadena) {
            return $http.get(searchUrl + '5|' + cadena);
        },
        getFolios: function (folio,idEmpresa,idSucursal,idDepartamento,tipoOrden,idProveedor,fecha1,fecha2,idProceso) { 
            return $http.get(searchUrl + '7|' + folio + '|' + idEmpresa + '|' + idSucursal + '|' + idDepartamento + '|' + idProveedor + '|' +tipoOrden+'|'+fecha1+'|'+fecha2+'|'+idProceso);
        },
        update: function (id) {
            return $http.post(searchUrl + '2|' + id);
        },
        getIsPlanta: function (folio) {  //LQMA 30062016
            return $http.get(searchUrl + '8|' + folio);
        },
        getProceso: function () {
            return $http.get(searchUrl + '9');
        }
    };
});