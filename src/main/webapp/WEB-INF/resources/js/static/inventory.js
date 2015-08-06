var addStocForm = $('#modal-addStoc-form');
var stari = [];
var idContainer = 'map-canvas';
var latitude = '';
var longitude = '';
var numeLoc = '';

function getStari() {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    $.ajax({
        type: 'get',
        url: '/app/secure/inventory/getstari',
        contentType: "application/json",
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (response) {
            if (response) {
                $.each(response, function (index) {
                    stari[index] = response[index].numeStare;
                });
            }
        },
        error: function (e) {
            showNotification('Error. Please refresh page.', 'Error', WARNING);
        }
    });
}

function imageIsLoaded(e) {
    $('.image_preview').css("display", "block");
    $('.previewing').attr('src', e.target.result);
    $('.previewing').css('max-width', '250px');
    $('.previewing').css('max-height', '230px');
}

function generateBarcode(barcode) {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    $.ajax({
        type: 'get',
        url: '/app/secure/inventory/generatebarcode/' + barcode,
        cache: false,
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        error: function () {
            showNotification('Error. Please refresh page!', 'Error', WARNING);
        }
    });
}

function getTranzactie(idArticol) {
    var tranzactie = ZERO;
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    $.ajax({
        type: 'get',
        async: false,
        url: '/app/secure/inventory/tranzactie/' + idArticol,
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (response) {
            if (response) {
                tranzactie = response;
            }
        },
        error: function (e) {
            showNotification('Error. Please refresh page.', 'Error', WARNING);
        }
    });

    return tranzactie;
}


function generateHistoryTable(idArticol) {
    var counter;
    var data;
    var creatDe;
    var persoana;
    var stare;
    var stareAnterioara;
    var loc;
    var idLoc;
    var colet;
    var idStare;
    var idStareAnterioara;
    var detalii;
    var history = getHistory(idArticol);
    var stareIcon;
    var stareAnterioaraIcon;

    var historyTable = '<div class="wrapper">' +
        '<table class="table table-responsive table-hover"><thead><tr class="text-table-head">' +
        '<td></td><td>Package</td><td>Assigned to</td><td>Assigned at</td><td>State</td><td>Assigned by</td><td>Assigned on</td>' +
        '</tr></thead><tbody>';
    if (history) {
        $.each(history, function (i) {
            counter = i + 1;
            data = toJSDateTime(history[i].dataTranzactie);
            creatDe = history[i].creatDe;
            persoana = history[i].nume;
            loc = history[i].numeLoc;
            idLoc = history[i].idLoc;
            stare = history[i].stare;
            idStare = history[i].idStare;
            detalii = history[i].detalii;
            colet = history[i].colet;
            stareIcon = getStareIcon(idStare);
            stareAnterioaraIcon = getStareIcon(idStareAnterioara);

            historyTable += '<tr class="map-popup-marker-activator">' +
                '<td>' + counter + '.</td>' +
                '<td><nobr>' + colet + '</nobr></td>' +
                '<td><nobr>' + persoana + '</nobr></td>' +
                '<td><nobr><a class="map-popup-marker" data-load="idLoc=' + idLoc + '">' + loc + '</a></nobr></td>' +
                '<td><nobr><span class="fa ' + stareIcon + ' fa-fw fa-bold">&nbsp;&nbsp;</span>' + stare + '</nobr></td>' +
                '<td><nobr>' + creatDe + '</nobr></td>' +
                '<td><nobr>' + data + '</nobr></td></tr>';
        });
    } else {
        showNotification("Error. Please refresh page", "Error", WARNING);
        return;
    }

    historyTable += '</tbody></table></div>';

    return historyTable;

}

function getHistory(idArticol) {
    var retVal = null;
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    $.ajax({
        type: 'get',
        url: '/app/secure/inventory/tranzactie/history/' + idArticol,
        async: false,
        contentType: "application/json",
        mimeType: 'application/json',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (response) {
            retVal = response
        },
        error: function () {
            showNotification('Error. Please refresh page.', 'Error', WARNING);
        }
    });

    return retVal;
}

function getStareIcon(idStare) {
    var stareIcon;
    switch (idStare) {
        case 1:
            stareIcon = 'fa-cubes';
            break;
        case 2:
            stareIcon = 'fa-recycle';
            break;
        case 3:
            stareIcon = 'fa-thumb-tack';
            break;
        case 4:
            stareIcon = 'fa-truck';
            break;
        case 5:
            stareIcon = 'fa-bug';
            break;
        case 6:
            stareIcon = 'fa-wrench';
            break;
        case 7:
            stareIcon = 'fa-exclamtion-circle';
            break;
        case 8:
            stareIcon = 'fa-trash';
            break;
    }
    return stareIcon;
}

function getImageForStoc(idStoc) {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    var image;
    $.ajax({
        type: 'get',
        url: '/app/secure/files/get-inventory-image/' + idStoc,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        async: false,
        success: function (response) {
            image = response;
        }
    });

    return image;
}

function format(row) {
    var usePersoana = false;
    var useUserRecuperare = false;
    var primitPrinTranzit;
    var barcode = row.codStoc;
    var loc = row.numeLoc;
    var idLoc = row.idLoc;
    var idStoc = row.idStoc;
    var persoana = row.nume;
    var idStare = row.idStare;
    var stareIndex = idStare - 1;
    var stare = stari[stareIndex];
    var stareIcon = getStareIcon(idStare);
    var dateAdaugare = toJSDateTime(row.creatLa);
    var dateModificare = toJSDateTime(row.modificatLa);
    var dateModificareTitlu = 'Recovered at:';
    var lastHistory = getTranzactie(row.idStoc);
    var detalii = lastHistory.detalii;
    var useHistoryDate = false;
    var historyDate = toJSDateTime(lastHistory.dataTranzactie);
    var historyDateTitlu;
    var detaliiTitle;
    var useDetalii = false;
    var userRecuperare = row.modificatDe;
    var image = getImageForStoc(idStoc);

    generateBarcode(barcode);

    switch (idStare) {
        case 1:
            break;
        case 2:
            detaliiTitle = 'Recovery details';
            useDetalii = true;
            historyDateTitlu = 'Recovered on';
            useHistoryDate = true;
            useUserRecuperare = true;

            break;
        case 3:
            historyDateTitlu = 'Assigned on';
            useHistoryDate = true;
            usePersoana = true;
            detaliiTitle = 'Assignment details';
            useDetalii = true;

            break;
        case 4:
            usePersoana = true;
            detaliiTitle = 'Tranzit details';
            useDetalii = true;
            ////dataPrimire = d.dataPrimire;
            //if (dataPrimire) {
            //    dataPrimire = toJSDate(dataPrimire, 1);
            //    if (dataPrimire < dateAdaugare) {
            //        dataPrimire = null;
            //        usePrimire = false;
            //    }
            //}
            //if (dataPrimire) {
            //    usePrimire = true;
            //    dataPrimire = toJSDate(dataPrimire, 1)
            //} else {
            //    dataPrimire = '&#206;nc&#259; nu a ajuns la destina&#355;ie';
            //}
            break;
        case 5 :
            break;
        case 6 :
            break;
        case 7 :
            break;
        case 8 :
            break;
        default:
            return;
    }
    var retString = '<div class="well"><table class="table" cellpadding="5" cellspacing="0" border="0">' +
        '<tr class="map-popup-marker-activator">' +
        '<td width="200px;"><span class="fa fa-map-marker fa-fw">&nbsp;</span><b>Location</b></td>' +
        '<td width="300px;"><a class="map-popup-marker" data-load="idLoc=' + idLoc + '">' + loc + '</a></td>' +
        '<td rowspan="10" style="vertical-align: middle; text-align: center"><div>' +
        '<img  width="auto" height="auto"  src="/barcode/' + barcode + '.png" alt="Not yet generated"><br><span class="text-center">' + barcode + '</span></div>' +
        '</td>' +
        '<td width="400px" rowspan="10" style="vertical-align: middle; text-align: center"><div>' +
        '<img  width="150" height="auto"  src="/files/' + image.fileName + '" alt="Not yet generated"></div>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><span class="fa ' + stareIcon + ' fa-fw">&nbsp;</span><b>State</b></td>' +
        '<td>' + stare + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><span class="fa fa-calendar fa-fw">&nbsp;</span><b>Added on</b></td>' +
        '<td>' + dateAdaugare + '</td>' +
        '</tr>';


    if (useHistoryDate) {
        retString += '<tr><td><span class="fa fa-calendar fa-fw">&nbsp;</span><b>' + historyDateTitlu + '</b></td>' +
            '<td>' + historyDate + '</td>' +
            '</tr>';
    }
    if (usePersoana) {
        retString += '<tr><td><span class="fa fa-user fa-fw">&nbsp;</span><b>Person</b></td>' +
            '<td>' + persoana + '</td>' +
            '</tr>';
    }
    if (useUserRecuperare) {
        retString += '<tr><td><span class="fa fa-user fa-fw">&nbsp;</span><b>Recovered by</b></td>' +
            '<td>' + userRecuperare + '</td>' +
            '</tr>';
    }
    if (useDetalii) {
        retString += '<tr><td><span class="fa fa-comment fa-fw">&nbsp;</span><b>' + detaliiTitle + '</b></td>' +
            '<td>' + detalii + '</td>' +
            '</tr>';
    }
    retString += '<tr>' +
        '<td>' +
        '<a class="btn btn-primary " data-target="#edit-stoc-item" data-toggle="modal"><span class="fa fa-pencil-square-o"> &nbsp;</span> Edit item</a>' +
        '</td><td>' +
        '<a href="/app/secure/inventory/downloadbarcode/' + barcode + '.png" class="btn btn-primary"><span class="fa fa-floppy-o"> &nbsp;</span> Save barcode</a>' +
        '<a id="history-' + idStoc + '" class="btn btn-warning pull-right" data-barcode="' + barcode + '"><span class="fa fa-history"> &nbsp;</span> Show history</a>' +
        '</td>' +
        '</tr>';
    retString += '</table></div>';

    return retString;
}

function initializeMap(latitude, longitude) {
    var markerLocation = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: markerLocation,
        zoom: 19
    };
    var marker = new google.maps.Marker({
        position: markerLocation,
        title: "Item Location"
    });
    var map = new google.maps.Map(document.getElementById("map-canvas-container"), mapOptions);
    marker.setMap(map);
}

$(document).ready(function () {
    var inventoryTable;

    $('#inventory').addClass('active');
    getStari();

    try {
        inventoryTable = $('#inventory-table').DataTable({
            "ajax": {
                "url": '/app/secure/inventory/getinventory',
                "dataSrc": ""
            },
            "columns": [
                {
                    "sWidth": "35px",
                    "bSortable": false,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '',
                    "searchable": false
                },
                {
                    "data": "numeStoc",
                    "className": 'text-bold'
                },
                {"data": "numeCategorie"},
                {"data": "numeGrup"},
                {"data": "codStoc"},
                {"data": "detalii"},
                {
                    "sWidth": "45px",
                    "className": 'text-center',
                    "data": "idStare"
                },
                {
                    "data": "numeLoc",
                    "visible": false,
                    "searchable": false
                },
                {
                    "data": "creatLa",
                    "visible": false,
                    "searchable": false
                }
            ],
            "columnDefs": [
                {
                    "targets": [1],
                    "visible": true,
                    "searchable": false
                },
                {
                    "targets": [6],
                    "bUseRendered": true,
                    "visible": true,
                    "fnCreatedCell": function (nTd, sData, oData, i) {
                        var stare = stari[sData - 1];
                        switch (sData) {
                            case 1:
                                $(nTd).html('<div class="btn btn-success stare-icon" data-toggle="tooltip" data-placement="bottom" title="' + stare + '"><span class="fa fa-cubes fa-fw"></span></div>');
                                break;
                            case 2:
                                $(nTd).html('<div class="btn btn-success stare-icon" data-toggle="tooltip" data-placement="bottom" title="' + stare + '"><span class="fa fa-recycle fa-fw"></span></div>');
                                break;
                            case 3:
                                $(nTd).html('<div class="btn btn-primary stare-icon" data-toggle="tooltip" data-placement="bottom" title="' + stare + '"><span class="fa fa-thumb-tack fa-fw"></span></div>');
                                break;
                            case 4:
                                $(nTd).html('<div class="btn btn-warning stare-icon" data-toggle="tooltip" data-placement="bottom" title="' + stare + '"><span class="fa fa-truck fa-fw"></span></div>');
                                break;
                            case 5:
                                $(nTd).html('<div class="btn btn-danger stare-icon" data-toggle="tooltip" data-placement="bottom" title="' + stare + '"><span class="fa fa-bug fa-fw"></span></div>');
                                break;
                            case 6:
                                $(nTd).html('<div class="btn btn-danger stare-icon" data-toggle="tooltip" data-placement="bottom" title="' + stare + '"><span class="fa fa-wrench fa-fw"></span></div>');
                                break;
                            case 7:
                                $(nTd).html('<div class="btn btn-danger stare-icon" data-toggle="tooltip" data-placement="bottom" title="' + stare + '"><span class="fa fa-exclamation-triangle fa-fw"></span></div>');
                                break;
                            case 8:
                                $(nTd).html('<div class="btn btn-danger stare-icon" data-toggle="tooltip" data-placement="bottom" title="' + stare + '"><span class="fa fa-trash fa-fw"></span></div>');
                                break;
                        }
                    }
                }
            ],
            dom: 'T<"clear"><"break-row">ltipr<"break-row-lg">',
            tableTools: {
                "sSwfPath": "/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "csv",
                        "sButtonClass": "btn btn-default",
                        "sButtonText": '<span class="fa fa-file-o">&nbsp;&nbsp;</span><span>CSV</span>',
                        "mColumns": [1, 2, 3, 4, 5, 6],
                        "oSelectorOpts": {
                            page: 'current'
                        }
                    },
                    {
                        "sExtends": "xls",
                        "sButtonClass": "btn btn-default",
                        "sCharSet": "utf16le",
                        "sButtonText": '<span class="fa fa-file-excel-o">&nbsp;&nbsp;</span><span>XLS</span>',
                        "mColumns": [1, 2, 3, 4, 5, 6],
                        "oSelectorOpts": {
                            page: 'current'
                        }
                    },
                    {
                        "sExtends": "pdf",
                        "sButtonClass": "btn btn-default",
                        "sButtonText": '<span class="fa fa-file-pdf-o">&nbsp;&nbsp;</span><span>PDF</span>',
                        "mColumns": [1, 2, 3, 4, 5, 6],
                        "oSelectorOpts": {
                            page: 'current'
                        }
                    }
                ]
            }
        });

        $('[data-toggle="tooltip"]').tooltip();

        $('#inventory-table tbody').on('click', 'td.details-control, div.stare-icon', function () {
            var tr = $(this).closest('tr');
            var row = inventoryTable.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });
    } catch (err) {
        console.log(err);
    }

    $("#inventory-search").on('keyup', function () {
        inventoryTable.search(this.value).draw();
    });

    $('body').on('click', 'a[id^="history-"]', function () {
        var id = $(this).attr('id');
        var idArticol = id.replace('history-', '');
        var barcode = $(this).data('barcode');

        id = id + '-modal';
        var titlu = '<i class="fa fa-history">&nbsp;&nbsp;</i>History for&nbsp;&nbsp;<i class="fa fa-barcode">&nbsp;</i>' + barcode;
        var tabel = generateHistoryTable(idArticol);

        showModal(id, titlu, tabel);
    });

    addStocForm.validate({
        rules: {
            required: true,
            numeStoc: {
                minlength: 5
            }
        }
    });

    addStocForm.on('submit', function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");

        var numeStoc = $('#addStoc-form-numeStoc').val();
        var idLoc = $('#addStoc-form-idLoc').val();
        var idCategorieStoc = $('#addStoc-form-idCategorieStoc').val();
        var idGrupStoc = $('#addStoc-form-idGrupStoc').val();
        var detalii = $('#addStoc-form-detalii').val();
        var data = {
            "numeStoc": numeStoc, "idLoc": idLoc,
            "detalii": detalii, "idGrupStoc": idGrupStoc,
            "idCategorieStoc": idCategorieStoc
        };

        var idStocAdded;
        var formData;

        $.ajax({
            type: 'post',
            url: $(this).attr('action'),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token);
            },
            async: false,
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                if (response.errorsMap != null) {
                    $('.form-error').html(EMPTY);
                    for (var key in response.errorsMap) {
                        var err = "<span class=\"text-danger small form-error\" id=\"" + key + "Id\">" + response.errorsMap[key] + "</span>";
                        $("[id^='" + key + "-error']").html(err);
                    }
                } else {
                    idStocAdded = response.id;
                    formData = new FormData();
                    var image = $('#image-file')[0].files[0];
                    formData.append("imageFile", image);
                    $.ajax({
                        type: 'post',
                        url: '/app/secure/files/upload-inventory-image/' + idStocAdded,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader(header, token);
                        },
                        data: formData,
                        contentType: false,
                        cache: false,
                        processData: false,
                        error: function () {
                            showNotification("Error uploading item image. Please try again later.", "Error", DANGER);
                        }
                    });
                    addStocForm.trigger('reset');
                    $('#modal-addStoc').modal('hide');
                    showNotification(response.message, 'Success', SUCCESS);
                    inventoryTable.ajax.reload(null, false);
                }
            },
            error: function () {
                showNotification("Error. Please try again later.", "Error", DANGER);
            }
        });
    });

    $('body').on('mouseover', '.map-popup-marker-activator', function () {

        $(this).find('a.map-popup-marker').webuiPopover($.extend({}, popoverDefaultSettings, {
                    type: 'html',//content type, values:'html','iframe','async'
                    url: '',//if not empty ,plugin will load content by url
                    title: '',//the popover title ,if title is set to empty string,title bar will auto hide
                    trigger: 'hover',
                    width: '650',//can be set with  number
                    height: '400',//can be set with  number
                    delay: {//show and hide delay time of the popover, works only when trigger is 'hover',the value can be number or object
                        show: null,
                        hide: 50
                    },
                    closeable: false,
                    content: function (e) {
                        var retValue = '';
                        var data = $($(this)[0]).data('load').split('=');
                        var idLoc = data[1];

                        var token = $("meta[name='_csrf']").attr("content");
                        var header = $("meta[name='_csrf_header']").attr("content");

                        $.ajax({
                            type: 'get',
                            url: '/app/secure/inventory/loc/' + idLoc,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader(header, token);
                            },
                            dataType: 'json',
                            contentType: 'application/json',
                            mimeType: 'application/json',
                            async: false,
                            success: function (response) {
                                latitude = response.latitude;
                                longitude = response.longitude;
                                numeLoc = response.numeLoc;
                                retValue = '<div class="loc-popover"><div><b>' + numeLoc + '<b></div><div id="map-canvas-container"></div></div>';
                            },
                            error: function () {
                                showNotification("Error. Please refresh page.", "Error", WARNING);
                            }
                        });

                        return retValue;
                    }
                }
            )
        );
    });

    $('body').on('shown.webui.popover', function () {
        window.initializeMap(latitude, longitude)
    });

    $('body').on('hidden.webui.popover', function () {
        $('#map-canvas-container').remove();
    });


        $("#image-file").on('change', function () {
            $(".image-message").empty(); // To remove the previous error message
            var file = this.files[0];
            var imagefile = file.type;
            var match = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
            if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]) || (imagefile == match[3]))) {
                $('.previewing').attr('src', '../img/noimageplaceholder.png');
                $('.image-message').html("<div class='well-sm bg-infobox text-left'><h4 class='text-danger'><i class='fa fa-exclamation-circle'></i>&nbsp;Please select a valid image file</h4>"
                    + "<span class='error_message'>Only .jpeg, .jpg, .png and .gif image types allowed</span></div>");
                return false;
            }
            else {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
});