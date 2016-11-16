﻿registrationModule.controller("documentoController", function($scope, $rootScope, utils, localStorageService, alertFactory, documentoRepository) {

    //Propiedades
    //Desconfiguramos el clic izquierdo en el frame contenedor de documento
    var errorCallBack = function(data, status, headers, config) {
        $('#btnEnviar').button('reset');
        alertFactory.error('Ocurrio un problema');
    };

    //Métodos
    $scope.VerDocumento = function(doc) {
        //Inicia el Proceso 1 dependiendo de si eligieron CXP=2 CXC=1
        if (doc.idProceso == 1) {
            if (doc.consultar == 1) {
                //alert(doc.idDocumento);
                /*LMS
                if (doc.idDocumento == 14) {
                    $scope.folioActual = doc.folio;
                    //alert(doc.idDocumento);
                    documentoRepository.getDocsByFolio(doc.folio) //$rootScope.currentDocument.folio)
                        .success(muestraPolizasSuccessCallback)
                        .error(errorCallBack);
                } else {
                LMS*/
                ///////////////////////////////////////////////////////////////////////////
                //LMS Agregado para que se consulte y se despliega PDF
                //Dependiendo del nodo es el tipo de Documento OCO,OCA
                ///////////////////////////////////////////////////////////////////////////
                if (doc.idDocumento == 20 || doc.cargar == 1) {
                    //Si es cargable o 20 sale de esta ruta
                    //Muestra Documento
                    //Factura si se debe tomar de esta URL
                    /////////var pdf_link = doc.existeDoc; //doc.Ruta;                
                    //var arreglo =  pdf_link.split(".");
                    /*
                    var typeAplication = 'application/pdf';
                    
                    switch(arreglo[arreglo.length - 1].toLowerCase())
                    {                    
                        case 'jpg': 
                                    typeAplication = 'image/jpeg';
                                    break;    
                        case 'png': 
                                    typeAplication = 'image/png';
                                    break;
                        case 'gif': 
                                    typeAplication = 'image/gif';
                                    break;    
                        case 'jpeg': 
                                    typeAplication = 'image/jpeg';
                    }
                    */
                    /////////var typeAplication = $rootScope.obtieneTypeAplication(pdf_link);
                    /////////var titulo = doc.folio + ' :: ' + doc.descripcion;

                    if (doc.descargar == 1) {
                        //alertFactory.warning('Puede descargar el archivo.');
                        var pdf_link = doc.existeDoc; //doc.Ruta;
                        var typeAplication = $rootScope.obtieneTypeAplication(pdf_link);
                        var titulo = doc.folio + ' :: ' + doc.descripcion;
                        var iframe = '<div id="hideFullContent"><iframe id="ifDocument" src="' + pdf_link + '" frameborder="0"></iframe> </div>';
                        var iframe = '<div id="hideFullContent"><div onclick="nodisponible()" ng-controller="documentoController"> </div> <object id="ifDocument" data="' + pdf_link + '" type="' + typeAplication + '" width="100%" height="100%"><p>Alternative text - include a link <a href="' + pdf_link + '">to the PDF!</a></p></object> </div>';
                        $.createModal({
                            title: titulo,
                            message: iframe,
                            closeButton: false,
                            scrollable: false
                        });
                    } else {
                        //alertFactory.warning('Noooooo Puede descargar el archivo.');
                        var pdf_link = doc.existeDoc; //doc.Ruta;
                        var typeAplication = $rootScope.obtieneTypeAplication(pdf_link);
                        var titulo = doc.folio + ' :: ' + doc.descripcion;
                        var iframe = '<div id="hideFullContent"><div id="hideFullMenu"> </div><iframe id="ifDocument" src="' + pdf_link + '" frameborder="0"></iframe> </div>';
                        var iframe = '<div id="hideFullContent"><div id="hideFullMenu" onclick="nodisponible()" ng-controller="documentoController"> </div> <object id="ifDocument" data="' + pdf_link + '" type="' + typeAplication + '" width="100%" height="100%"><p>Alternative text - include a link <a href="' + pdf_link + '">to the PDF!</a></p></object> </div>';
                        $.createModal({
                            title: titulo,
                            message: iframe,
                            closeButton: false,
                            scrollable: false
                        });
                    }

                    // var iframe = '<div id="hideFullContent"><div id="hideFullMenu"> </div><iframe id="ifDocument" src="' + pdf_link + '" frameborder="0"></iframe> </div>';
                    //var iframe = '<div id="hideFullContent"><div id="hideFullMenu" onclick="nodisponible()" ng-controller="documentoController"> </div> <object id="ifDocument" data="' + pdf_link + '" type="' + typeAplication + '" width="100%" height="100%"><p>Alternative text - include a link <a href="' + pdf_link + '">to the PDF!</a></p></object> </div>';
                    /*$.createModal({
                        title: titulo,
                        message: iframe,
                        closeButton: false,
                        scrollable: false
                    });*/

                } else {
                    //Mando a llamar al WebService
                    documentoRepository.getPdf(doc.tipo, doc.folio, doc.idNodo).then(function(d) {
                        //Creo la URL
                        var pdf = URL.createObjectURL(utils.b64toBlob(d.data[0].arrayB, "application/pdf"))
                        var pdf_link = doc.existeDoc;
                        var typeAplication = $rootScope.obtieneTypeAplication(pdf_link);
                        var titulo = doc.folio + ' :: ' + doc.descripcion;
                        //Mando a llamar la URL desde el div sustituyendo el pdf
                        /////////  $("<object id='pdfDisplay' data='" + pdf + "' width='100%' height='400px' >").appendTo('#pdfContent');
                        var iframe = '<div id="hideFullContent"><div onclick="nodisponible()" ng-controller="documentoController"> </div> <object id="ifDocument" data="' + pdf + '" type="' + typeAplication + '" width="100%" height="100%"><p>Alternative text - include a link <a href="' + pdf + '">to the PDF!</a></p></object> </div>';
                        $.createModal({
                            title: titulo,
                            message: iframe,
                            closeButton: false,
                            scrollable: false
                        });
                        /////////$scope.loadingOrder = false; //Animacion
                    });

                }
                //}
            } else {
                alertFactory.warning('Acción no permitida para su perfil.');
            }
        } //Fin de Proceso 1
        //Inicia el Proceso 2
        if (doc.idProceso == 2) {

            if (doc.consultar == 1) {
                pruebaPdf();
            }
        } //Fin de Proceso 2


    };

    //Mandamos a llamar el repository para conseguir la Factura 
    var pruebaPdf = function() {
        documentoRepository.pruebaPdf()
            .success(pruebaPdfSuccessCallback)
            .error(errorCallBack);

    }
    //Aqui es donde se muestra el pdf 
    var pruebaPdfSuccessCallback = function(data) {
        //console.log('si entre ');

        if (data.mensajeresultadoField == "") {
            var pdf = URL.createObjectURL(utils.b64toBlob(data.pdfField, "application/pdf"))
                //var typeAplication = $rootScope.obtieneTypeAplication(pdf_link);
            console.log(pdf)
                //var pdf2=pdf.split('blob:');
            var iframe = '<div id="hideFullContent"><div onclick="nodisponible()" ng-controller="documentoController"> </div> <object id="ifDocument" data="' + pdf + '" type="application/pdf" width="100%" height="100%"><p>Alternative text - include a link <a href="' + pdf + '">to the PDF!</a></p></object> </div>';
            $.createModal({
                title: 'FACTURA',
                message: iframe,
                closeButton: false,
                scrollable: false
            });
        } else {
            $("<h2 class='filesInvoce'>" + data.mensajeresultadoField + "</h2>").appendTo('#myModal');
        }



    }

    $rootScope.obtieneTypeAplication = function(ruta) {

        var arreglo = ruta.split(".");
        var typeAplication = 'application/pdf';
        switch (arreglo[arreglo.length - 1].toLowerCase()) {
            case 'jpg':
                typeAplication = 'image/jpeg';
                break;
            case 'png':
                typeAplication = 'image/png';
                break;
            case 'gif':
                typeAplication = 'image/gif';
                break;
            case 'jpeg':
                typeAplication = 'image/jpeg';
        }

        return typeAplication;
    };

    $scope.NoDisponible = function() {
        //alertFactory.error('Función deshabilitada en digitalización.');
        alertFactory.warning('Acción no permitida para su perfil.');
    };

    ///////////////////////////////////////////////////////////////////////////////////
    ///Envío de documentos

    $scope.ShowEnviar = function(doc) {
        if (doc.enviarEmail == 1) {
            $('#modalSend').modal('show');
            $rootScope.currentDocument = doc;
        } else {
            alertFactory.warning('Acción no permitida para su perfil.');
        }
    };

    var enviarDocumentoSuccessCallback = function(data, status, headers, config) {
        alertFactory.success('Documento enviado correctamente.');
        $('#btnEnviar').button('reset');
        $('#modalSend').modal('hide');
    };

    //LQMA 19012015
    var muestraPolizasSuccessCallback = function(data, status, headers, config) {
        var iframe = '<div id="hideFullContent"><div><ul class="nav nav-tabs"> ';

        angular.forEach(data, function(value, key) {
            if (key == 0) {
                iframe = iframe + '<li class="active"><a data-toggle="tab" href="#divMenu' + key + '" target="_self">Póliza ' + (key + 1) + ' </a></li>';
            } else {
                iframe = iframe + '<li><a data-toggle="tab" href="#divMenu' + key + '" target="_self">Póliza ' + (key + 1) + ' </a></li>';
            }
        });

        iframe = iframe + '</ul></div> <div class="tab-content">';

        angular.forEach(data, function(value, key) {

            if (key == 0) {
                iframe = iframe + '<div class="tab-pane active" id="divMenu' + key + '"><iframe src="' + value + '" width="560" height="350" allowfullscreen="allowFullScreen"></iframe></div>';
            } else {
                iframe = iframe + '<div class="tab-pane" id="divMenu' + key + '"><iframe src="' + value + '" width="560" height="350" allowfullscreen="allowFullScreen"></iframe></div>';
            }
        });

        iframe = iframe + '</div></div>';

        $.createModal({
            title: "Pólizas de Transferencia", //titulo,
            message: iframe,
            closeButton: false,
            scrollable: false
        });

    };

    $scope.EnviarDocumento = function() {
        if ($rootScope.currentDocument.consultar == 1) {
            $('#btnEnviar').button('loading');
            documentoRepository.sendMail($rootScope.currentDocument.idDocumento, $rootScope.currentDocument.folio, $scope.correoDestinatario)
                .success(enviarDocumentoSuccessCallback)
                .error(errorCallBack);
        } else {
            alertFactory.warning('Acción no permitida para su perfil.');
        }
    };

    //////////////////////////////////////////////////////////////////////////
    /// Carga de documentos

    $scope.openUpload = function() {

        var documento = {
            "idProceso": 1,
            "idNodo": 2,
            "nombreNodo": "",
            "folio": $rootScope.currentFolioFactura,
            "nombreDocumento": "",
            "idDocumento": 15,
            "origen": "",
            "descripcion": "",
            "idPerfil": "",
            "consultar": "",
            "imprimir": "",
            "enviarEmail": "",
            "descargar": "",
            "cargar": "",
            "estatusNombre": "",
            "idEstatus": "",
            "Ruta": "",
            "existeDoc": ""
        };

        $scope.ShowCargar(documento);
    };

    $scope.ShowCargar = function(doc) {
        if (doc.idDocumento == 15 && window.location.pathname != '/factura') {
            location.href = '/factura?id=' + doc.folio + '&employee=' + $rootScope.currentEmployee + '&perfil=' + $rootScope.empleado.idPerfil;
        } else {
            $('#frameUpload').attr('src', '/uploader');
            $('#modalUpload').modal('show');
            $rootScope.currentUpload = doc;
        }

    };

    var uploadSuccessCallback = function(data, status, headers, config) {
        alertFactory.success('Documento cargado');
    };

    $scope.CargarDocumento = function() {
        documentoRepository.uploadFile($("#fileDoc")[0].files[0])
            .success(uploadSuccessCallback)
            .error(errorCallBack);
    };

    $scope.FinishUpload = function(name) {
        alertFactory.success('Se guardo el documento ' + name);
        var doc = $rootScope.currentUpload;

        documentoRepository.saveDocument(doc.folio, doc.idDocumento, 1, 1, doc.idNodo, 1, global_settings.uploadPath + '/' + name)
            .success(saveDocumentSuccessCallback)
            .error(errorCallBack);
    };

    var saveDocumentSuccessCallback = function(data, status, headers, config) {
        alertFactory.success('Documento guardado.');
        //actualizar los nodos para mostrar botonerass
        //goToPage($scope.currentPage);       

        var url = window.location.pathname;
        //alert(url);
        if (url == '/factura') {
            $rootScope.muestraDocumentos();
        } else {
            setTimeout(function() {
                $rootScope.LoadActiveNode();
            }, 200);
        }
    };
});

/*var nameDocument = '';
function refresh() {
  var scope = angular.element($("#modalUpload")).scope();
  scope.$apply(function(){
    scope.FinishUpload(nameDocument);
  })
}*/
