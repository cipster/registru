var intrareTable;var iesireTable;var selected;var addIntrareForm = $('#modal-addIntrare-form');var addIesireForm = $('#modal-addIesire-form');var lastIntrare;jQuery.validator.addMethod("checkIntrare", function (value, element) {    return this.optional(element) || checkNrInregistrareIntrare(value);}, 'Num&#259;rul de &#238;nregistrare exist&#259; deja &#238;n registru sau nu este un num&#259;r consecutiv');function checkNrInregistrareIntrare(value) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var retVal = true;    $.ajax({        type: 'get',        url: '/app/secure/registru/duplicate/intrare/' + value,        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        contentType: 'application/json',        success: function (response) {            if (response.id < 0) {                retVal = false;            }        }    });    return retVal;}function getIntrareNrSiData() {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var nrSiDataIntrare = $('#addIesire-form-dataSiNrDeIntrare');    nrSiDataIntrare.html(EMPTY);    nrSiDataIntrare.append("<option></option>");    $.ajax({        type: 'get',        url: '/app/secure/registru/get-intrare',        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                $.each(response, function (index) {                    nrSiDataIntrare.append('<option val="' + response[index].nrCrt + '/' + response[index].dataIntrarii + '">' + response[index].nrCrt + '/' + response[index].dataIntrarii + '</option>');                });                nrSiDataIntrare.trigger(chosenUpdated);            }        },        error: function () {            showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR)        }    });}function findLastNrCrtIntrare() {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    $.ajax({        type: 'get',        url: '/app/secure/registru/get-last-intrare',        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                lastIntrare = response;            }        },        error: function () {            lastIntrare = '1';        }    });}$(document).ready(function () {    getAllTipContinut('addIntrare-form-idTipContinut');    getAllDestinatari('addIesire-form-catreCineSALucrat');    $('#anuleazaCondicaIesire').hide();    $('#registru-general').addClass('active');    $('#intrare-table').find('thead th').each(function () {        var title = $('#intrare-table').find('thead th').eq($(this).index()).text();        $(this).append('<input type="text" style="display:none;" placeholder="Caut&#259; ' + title + '" />');    });    $('#iesire-table').find('thead th').each(function () {        var title = $('#iesire-table').find('thead th').eq($(this).index()).text();        $(this).append('<input style="display:none;" type="text" placeholder="Caut&#259; ' + title + '" />');    });    try {        intrareTable = $('#intrare-table').DataTable({            "ajax": {                "url": '/app/secure/registru/get-intrare',                "dataSrc": ""            },            "buttons": [                {                    extend: 'excel',                    text: '<span class="fa fa-file-excel-o" title="Apasa ALT+X pentru a salva tabelul in format Excel">&nbsp;&nbsp;</span><span>XLS</span>',                    className: 'btn btn-default',                    key: {                        key: 'x',                        altKey: true                    },                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'pdf',                    text: '<span class="fa fa-file-pdf-o" title="Apasa ALT+F pentru a salva tabelul in format PDF">&nbsp;&nbsp;</span><span>PDF</span>',                    className: 'btn btn-default',                    key: {                        key: 'f',                        altKey: true                    },                    orientation: 'landscape',                    title: 'INTRARE',                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'print',                    text: '<span class="fa fa-print" title="Apasa ALT+P pentru a trimite la print">&nbsp;&nbsp;</span><span>Print</span>',                    className: 'btn btn-default',                    key: {                        key: 'p',                        altKey: true                    },                    title: 'INTRARE',                    exportOptions: {                        columns: ':visible'                    }                },                {                    extend: 'colvis',                    text: '<span class="fa fa-adjust">&nbsp;&nbsp;</span><span>Alege coloane vizibile</span>',                    className: 'btn btn-default'                }            ],            "columns": [                {                    "data": "nrCrt",                    "className": 'text-bold'                },                {                    "data": "dataIntrarii",                    "className": 'text-bold'                },                {"data": "nrHartieiIntrate"},                {"data": "deLaCineVineCorespondenta"},                {"data": "continut"},                {"data": "rezolutiiSiTermene"},                {"data": "formatFizic"}            ],            "columnDefs": [                {                    "targets": [1],                    "bUseRendered": true,                    "visible": true,                    "render": function (data, type, row) {                        if (data) {                            return generateFormattedDate(new Date(data));                        } else {                            return '';                        }                    },                    "fnCreatedCell": function (nTd, sData, oData, i) {                        if (oData.anulat == 1) {                            $(nTd).closest('tr').css('text-decoration', 'line-through')                            $(nTd).closest('tr').css('color', 'gray');                        }                    }                },                {                    "targets": [6],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        var anulat = oData.anulat;                        $(nTd).html('<div class="checkbox"><label><input  class="format-fizic" id="intrare-' + oData.idIntrare + '" data-path="intrare" type="checkbox" ' + (sData == 0 ? (anulat == 1 ? 'disabled="disabled" ' : '' ) : ' checked="" disabled="disabled" ') + '></label></div>');                    }                }            ],            dom: '<"clear"><"break-row"><"pull-right"B>lrtip<"break-row-lg">'        });    } catch (err) {        console.log(err);    }    try {        iesireTable = $('#iesire-table').DataTable({            "ajax": {                "url": '/app/secure/registru/get-iesire',                "dataSrc": ""            },            "buttons": [                {                    extend: 'excel',                    text: '<span class="fa fa-file-excel-o" title="Apasa ALT+X pentru a salva tabelul in format Excel">&nbsp;&nbsp;</span><span>XLS</span>',                    className: 'btn btn-default',                    key: {                        key: 'x',                        altKey: true                    },                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'pdf',                    text: '<span class="fa fa-file-pdf-o" title="Apasa ALT+F pentru a salva tabelul in format PDF">&nbsp;&nbsp;</span><span>PDF</span>',                    className: 'btn btn-default',                    key: {                        key: 'f',                        altKey: true                    },                    orientation: 'landscape',                    title: 'IE&#350;IRE',                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'print',                    text: '<span class="fa fa-print" title="Apasa ALT+P pentru a trimite la print">&nbsp;&nbsp;</span><span>Print</span>',                    className: 'btn btn-default',                    key: {                        key: 'p',                        altKey: true                    },                    title: 'IE&#350;IRE',                    exportOptions: {                        columns: ':visible'                    }                },                {                    extend: 'colvis',                    text: '<span class="fa fa-adjust">&nbsp;&nbsp;</span><span>Alege coloane vizibile</span>',                    className: 'btn btn-default'                }            ],            "columns": [                {                    "data": "dataIesirii",                    "className": 'text-bold'                },                {                    "data": "rezolvare",                    "className": 'text-bold'                },                {"data": "catreCineSALucrat"},                {"data": "nrDosarSiAn"},                {"data": "dataSiNrDeIntrare"},                {"data": "nrSiDataRevenirii"},                {"data": "formatFizic"}            ],            "columnDefs": [                {                    "targets": [0],                    "bUseRendered": true,                    "visible": true,                    "render": function (data, type, row) {                        if (data) {                            return generateFormattedDate(new Date(data));                        } else {                            return '';                        }                    },                    "fnCreatedCell": function (nTd, sData, oData, i) {                        if (oData.anulat == 1) {                            $(nTd).closest('tr').css('text-decoration', 'line-through');                            $(nTd).closest('tr').css('color', 'gray');                        }                    }                },                {                    "targets": [6],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        var anulat = oData.anulat;                        $(nTd).html('<div class="checkbox"><label><input  class="format-fizic" id="iesire-' + oData.idIesire + '" data-path="iesire" type="checkbox" ' + (sData == 0 ? (anulat == 1 ? 'disabled="disabled" ' : '' ) : ' checked="" disabled="disabled" ') + '></label></div>');                    }                }            ],            dom: '<"clear"><"break-row"><"pull-right"B>lrtip<"break-row-lg">'        });    } catch (err) {        console.log(err);    }    intrareTable.columns().every(function () {        var that = this;        $('input', this.header()).on('keyup change', function () {            that                .search(this.value)                .draw();        });    });    iesireTable.columns().every(function () {        var that = this;        $('input', this.header()).on('keyup change', function () {            that                .search(this.value)                .draw();        });    });    $("#registru-general-search").on('keyup', function () {        intrareTable.search(this.value).draw();        iesireTable.search(this.value).draw();    });    addIntrareForm.validate({        rules: {            required: true,            formatFizic: {                required: false            },            nrCrt: {                checkIntrare: true            },            idTipContinut: {                required: false            },            rezolutiiSiTermene: {                required: false            },            nrHartieiIntrate: {                required: false            },            deLaCineVineCorespondenta: {                required: false            }        },        messages: {            nrCrt: {required: "Acest c&#226;mp este obligatoriu"},            dataIntrarii: {required: "Acest c&#226;mp este obligatoriu"},            nrHartieiIntrate: {required: "Acest c&#226;mp este obligatoriu"},            deLaCineVineCorespondenta: {required: "Acest c&#226;mp este obligatoriu"},            continut: {required: "Acest c&#226;mp este obligatoriu"},        }    });    addIntrareForm.on('submit', function (e) {        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var nrCrt = $('#addIntrare-form-nrCrt').val();        var dataIntrarii = $('#addIntrare-form-dataIntrarii').val();        var nrHartieiIntrate = $('#addIntrare-form-nrHartieiIntrate').val();        var deLaCineVineCorespondenta = $('#addIntrare-form-deLaCineVineCorespondenta').val();        var idTipContinut = $('#addIntrare-form-idTipContinut').val();        var continut = $('#addIntrare-form-continut').val();        var rezolutiiSiTermene = $('#addIntrare-form-rezolutiiSiTermene').val();        var formatFizic = $('#addIntrare-form-formatFizic').prop('checked') ? 1 : 0;        var dataToSend = {            "nrCrt": nrCrt, "nrHartieiIntrate": nrHartieiIntrate,            "deLaCineVineCorespondenta": deLaCineVineCorespondenta, "dataIntrarii": processDateForServer(dataIntrarii),            "idTipContinut": idTipContinut, "rezolutiiSiTermene": rezolutiiSiTermene,            "continut": continut, "formatFizic": formatFizic        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-addIntrare').modal('hide');                addIntrareForm.trigger('reset');                $('.chosen-select').trigger(chosenUpdated);                showNotification(response.message, 'Success', SUCCESS);                intrareTable.ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Error", ERROR);            }        });        e.preventDefault();    });    addIesireForm.validate({        rules: {            required: true,            formatFizic: {                required: false            },            nrSiDataRevenirii: {                required: false            },            rezolvare: {                required: false            },            catreCineSALucrat: {                required: false            },            nrDosarSiAn: {                required: false            }        },        messages: {            dataIesirii: {required: "Acest c&#226;mp este obligatoriu"},            rezolvare: {required: "Acest c&#226;mp este obligatoriu"},            catreCineSALucrat: {required: "Acest c&#226;mp este obligatoriu"},            nrDosarSiAn: {required: "Acest c&#226;mp este obligatoriu"},            dataSiNrDeIntrare: {required: "Acest c&#226;mp este obligatoriu"},        }    });    addIesireForm.on('submit', function (e) {        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var dataIesirii = $('#addIesire-form-dataIesirii').val();        var rezolvare = $('#addIesire-form-rezolvare').val();        var catreCineSALucrat = $('#addIesire-form-catreCineSALucrat').val();        var nrDosarSiAn = $('#addIesire-form-nrDosarSiAn').val();        var dataSiNrDeIntrare = $('#addIesire-form-dataSiNrDeIntrare').val();        var nrSiDataRevenirii = $('#addIesire-form-nrSiDataRevenirii').val();        var formatFizic = $('#addIesire-form-formatFizic').prop('checked') ? 1 : 0;        var dataToSend = {            "dataIesirii": processDateForServer(dataIesirii), "rezolvare": rezolvare, "catreCineSALucrat": catreCineSALucrat,            "nrDosarSiAn": nrDosarSiAn, "dataSiNrDeIntrare": dataSiNrDeIntrare,            "nrSiDataRevenirii": nrSiDataRevenirii, "formatFizic": formatFizic        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-addIesire').modal('hide');                addIesireForm.trigger('reset');                $('.chosen-select').trigger(chosenUpdated);                showNotification(response.message, 'Success', SUCCESS);                iesireTable.ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Error", ERROR);            }        });        e.preventDefault();    });    $(document).on('shown.bs.modal', '#modal-addIesire', function () {        getIntrareNrSiData();        $('#addIesire-form-dataIesirii').val(generateFormattedDate(new Date()));    });    $(document).on('shown.bs.modal', '#modal-addIntrare', function () {        findLastNrCrtIntrare();        $('#addIntrare-form-dataIntrarii').val(generateFormattedDate(new Date()));        $('#addIntrare-form-nrCrt').val(lastIntrare);    });    $(document).on('click', '#anuleazaCondicaIntrare', function () {        selectedRowId = intrareTable.row('.selected').data().idIntrare;        anuleazaPath = 'intrare';        confirmModalAnuleazaInregistrare();    });    $(document).on('click', '#anuleazaCondicaIesire', function () {        selectedRowId = iesireTable.row('.selected').data().idIesire;        anuleazaPath = 'iesire';        confirmModalAnuleazaInregistrare();    });    $(document).on('shown.bs.tab', 'a[href="#iesire"]', function () {        $('#anuleazaCondicaIntrare').hide();        $('#anuleazaCondicaIesire').show();    });    $(document).on('shown.bs.tab', 'a[href="#intrare"]', function () {        $('#anuleazaCondicaIesire').hide();        $('#anuleazaCondicaIntrare').show();    });    $(document).on('click', '#advanced-search', function () {        $('#intrare-table').find('thead th input').each(function (i) {            $(this).toggle('display');        });        $('#iesire-table').find('thead th input').each(function (i) {            $(this).toggle('display');        });    });    $(document).keyup(function (e) {        if (e.keyCode == 27) {            $('#intrare-table').find('thead th input').each(function (i) {                $(this).hide();            });            $('#iesire-table').find('thead th input').each(function (i) {                $(this).hide();            });        }    });});