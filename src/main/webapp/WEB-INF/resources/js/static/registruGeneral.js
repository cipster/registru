var intrareTable;var iesireTable;var selected;var addIntrareForm = $('#modal-addIntrare-form');var addIesireForm = $('#modal-addIesire-form');var rezervaIntrareForm = $('#modal-rezerva-intrare-form');var rezervaIesireForm = $('#modal-rezerva-iesire-form');var editIntrareForm = $('#modal-editIntrare-form');var editIesireForm = $('#modal-editIesire-form');var lastIntrare;jQuery.validator.addMethod("checkIntrare", function (value, element) {    return this.optional(element) || checkNrInregistrareIntrare(value);}, 'Num&#259;rul de &#238;nregistrare exist&#259; deja &#238;n registru sau nu este un num&#259;r consecutiv');function checkNrInregistrareIntrare(value) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var retVal = true;    $.ajax({        type: 'get',        url: '/app/secure/registru/duplicate/intrare/' + value,        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        contentType: 'application/json',        success: function (response) {            if (response.id < 0) {                retVal = false;            }        }    });    return retVal;}function getIntrareNrSiData() {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var nrSiDataIntrare = $('#addIesire-form-dataSiNrDeIntrare');    var nrSiDataIntrareEdit = $('#editIesire-form-dataSiNrDeIntrare');    nrSiDataIntrare.html(EMPTY);    nrSiDataIntrareEdit.html(EMPTY);    nrSiDataIntrare.append("<option></option>");    nrSiDataIntrareEdit.append("<option></option>");    $.ajax({        type: 'get',        url: '/app/secure/registru/get-intrare',        contentType: "application/json",        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                $.each(response, function (index) {                    nrSiDataIntrare.append('<option val="' + response[index].nrCrt + '/' + response[index].dataIntrarii + '">' + response[index].nrCrt + '/' + response[index].dataIntrarii + '</option>');                    nrSiDataIntrareEdit.append('<option val="' + response[index].nrCrt + '/' + response[index].dataIntrarii + '">' + response[index].nrCrt + '/' + response[index].dataIntrarii + '</option>');                });                nrSiDataIntrare.trigger(chosenUpdated);                nrSiDataIntrareEdit.trigger(chosenUpdated);            }        },        error: function () {            showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR)        }    });}function findLastNrCrtIntrare() {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    $.ajax({        type: 'get',        url: '/app/secure/registru/get-last-intrare',        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                lastIntrare = response;            }        },        error: function () {            lastIntrare = '1';        }    });}$(document).ready(function () {    getAllTipContinut('addIntrare-form-idTipContinut');    getAllTipContinut('editIntrare-form-idTipContinut');    getAllDestinatari('addIesire-form-catreCineSALucrat');    getAllDestinatari('editIesire-form-catreCineSALucrat');    $('#anuleazaCondicaIesire').hide();    $('#rezervaIesire-open').hide();    $('#registru-general').addClass('active');    $('#intrare-table').find('thead th').each(function () {        var title = $('#intrare-table').find('thead th').eq($(this).index()).text();        $(this).append('<input type="text" style="display:none;" placeholder="Caut&#259; ' + title + '" />');    });    $('#iesire-table').find('thead th').each(function () {        var title = $('#iesire-table').find('thead th').eq($(this).index()).text();        $(this).append('<input style="display:none;" type="text" placeholder="Caut&#259; ' + title + '" />');    });    try {        intrareTable = $('#intrare-table').DataTable({            "ajax": {                "url": '/app/secure/registru/get-intrare',                "dataSrc": ""            },            "buttons": [                {                    extend: 'excel',                    text: '<span class="fa fa-file-excel-o" title="Apasa ALT+X pentru a salva tabelul in format Excel">&nbsp;&nbsp;</span><span>XLS</span>',                    className: 'btn btn-default',                    key: {                        key: 'x',                        altKey: true                    },                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'pdf',                    text: '<span class="fa fa-file-pdf-o" title="Apasa ALT+F pentru a salva tabelul in format PDF">&nbsp;&nbsp;</span><span>PDF</span>',                    className: 'btn btn-default',                    key: {                        key: 'f',                        altKey: true                    },                    orientation: 'landscape',                    title: 'INTRARE',                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'print',                    text: '<span class="fa fa-print" title="Apasa ALT+P pentru a trimite la print">&nbsp;&nbsp;</span><span>Print</span>',                    className: 'btn btn-default',                    key: {                        key: 'p',                        altKey: true                    },                    title: 'INTRARE',                    exportOptions: {                        columns: ':visible'                    }                },                {                    extend: 'colvis',                    text: '<span class="fa fa-adjust">&nbsp;&nbsp;</span><span>Alege coloane vizibile</span>',                    className: 'btn btn-default'                }            ],            "columns": [                {                    "data": "nrCrt",                    "className": 'text-bold'                },                {                    "data": "dataIntrarii",                    "className": 'text-bold'                },                {"data": "nrHartieiIntrate"},                {"data": "deLaCineVineCorespondenta"},                {"data": "continut"},                {"data": "rezolutiiSiTermene"},                {"data": "formatFizic"}            ],            "columnDefs": [                {                    "targets": [0],                    "visible": true,                    "bUseRendered": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        if (oData.anulat != 1 && oData.rezervat == 1) {                            $(nTd).closest('tr').addClass('rand-rezervat');                            $(nTd).closest('tr').prop('title', 'Aceasta īnregistrare este rezervata');                            $(nTd).html('<a class="btn intrare-rezervat fa fa-edit"></a>  ' + oData.nrCrt);                        }                    }                },                {                    "targets": [1],                    "bUseRendered": true,                    "visible": true,                    "render": function (data, type, row) {                        if (data) {                            return generateFormattedDate(new Date(data));                        } else {                            return '';                        }                    },                    "fnCreatedCell": function (nTd, sData, oData, i) {                        if (oData.anulat == 1) {                            $(nTd).closest('tr').css('text-decoration', 'line-through')                            $(nTd).closest('tr').css('color', 'gray');                        }                    }                },                {                    "targets": [6],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        var anulat = oData.anulat;                        $(nTd).html('<div class="checkbox"><label><input  class="format-fizic" id="intrare-' + oData.idIntrare + '" data-path="intrare" type="checkbox" ' + (sData == 0 ? (anulat == 1 ? 'disabled="disabled" ' : '' ) : ' checked="" disabled="disabled" ') + '></label></div>');                        if (oData.rezervat == 1) {                            $(nTd).closest('tr').find('input[type="checkbox"]').prop('disabled', 'disabled');                        }                    }                }            ],            dom: '<"clear"><"break-row"><"pull-right"B>lrtip<"break-row-lg">'        });    } catch (err) {        console.log(err);    }    try {        iesireTable = $('#iesire-table').DataTable({            "ajax": {                "url": '/app/secure/registru/get-iesire',                "dataSrc": ""            },            "buttons": [                {                    extend: 'excel',                    text: '<span class="fa fa-file-excel-o" title="Apasa ALT+X pentru a salva tabelul in format Excel">&nbsp;&nbsp;</span><span>XLS</span>',                    className: 'btn btn-default',                    key: {                        key: 'x',                        altKey: true                    },                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'pdf',                    text: '<span class="fa fa-file-pdf-o" title="Apasa ALT+F pentru a salva tabelul in format PDF">&nbsp;&nbsp;</span><span>PDF</span>',                    className: 'btn btn-default',                    key: {                        key: 'f',                        altKey: true                    },                    orientation: 'landscape',                    title: 'IE&#350;IRE',                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'print',                    text: '<span class="fa fa-print" title="Apasa ALT+P pentru a trimite la print">&nbsp;&nbsp;</span><span>Print</span>',                    className: 'btn btn-default',                    key: {                        key: 'p',                        altKey: true                    },                    title: 'IE&#350;IRE',                    exportOptions: {                        columns: ':visible'                    }                },                {                    extend: 'colvis',                    text: '<span class="fa fa-adjust">&nbsp;&nbsp;</span><span>Alege coloane vizibile</span>',                    className: 'btn btn-default'                }            ],            "columns": [                {                    "data": "dataIesirii",                    "className": 'text-bold'                },                {                    "data": "rezolvare",                    "className": 'text-bold'                },                {"data": "catreCineSALucrat"},                {"data": "nrDosarSiAn"},                {"data": "dataSiNrDeIntrare"},                {"data": "nrSiDataRevenirii"},                {"data": "formatFizic"}            ],            "columnDefs": [                {                    "targets": [0],                    "bUseRendered": true,                    "visible": true,                    "render": function (data, type, row) {                        if (data) {                            return generateFormattedDate(new Date(data));                        } else {                            return '';                        }                    },                    "fnCreatedCell": function (nTd, sData, oData, i) {                        if (oData.anulat == 1) {                            $(nTd).closest('tr').css('text-decoration', 'line-through');                            $(nTd).closest('tr').css('color', 'gray');                        }                        if (oData.anulat != 1 && oData.rezervat == 1) {                            $(nTd).closest('tr').addClass('rand-rezervat');                            $(nTd).closest('tr').prop('title', 'Aceasta īnregistrare este rezervata');                            $(nTd).html('<a class="btn iesire-rezervat fa fa-edit"></a>  ' + oData.dataIesirii);                        }                    }                },                {                    "targets": [6],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        var anulat = oData.anulat;                        $(nTd).html('<div class="checkbox"><label><input  class="format-fizic" id="iesire-' + oData.idIesire + '" data-path="iesire" type="checkbox" ' + (sData == 0 ? (anulat == 1 ? 'disabled="disabled" ' : '' ) : ' checked="" disabled="disabled" ') + '></label></div>');                        if (oData.rezervat == 1) {                            $(nTd).closest('tr').find('input[type="checkbox"]').prop('disabled', 'disabled');                        }                    }                }            ],            dom: '<"clear"><"break-row"><"pull-right"B>lrtip<"break-row-lg">'        });    } catch (err) {        console.log(err);    }    intrareTable.columns().every(function () {        var that = this;        $('input', this.header()).on('keyup change', function () {            that                .search(this.value)                .draw();        });    });    iesireTable.columns().every(function () {        var that = this;        $('input', this.header()).on('keyup change', function () {            that                .search(this.value)                .draw();        });    });    $(document).on('shown.bs.modal', '#modal-rezerva-intrare', function () {        $('#rezerva-intrare-form-dataInregistrare').val(generateFormattedDate(new Date()));        $('#rezerva-intrare-form-dataInregistrare').prop('disabled', 'disabled');    });    $(document).on('shown.bs.modal', '#modal-rezerva-iesire', function () {        $('#rezerva-iesire-form-dataInregistrare').val(generateFormattedDate(new Date()));        $('#rezerva-iesire-form-dataInregistrare').prop('disabled', 'disabled');    });    $("#registru-general-search").on('keyup', function () {        intrareTable.search(this.value).draw();        iesireTable.search(this.value).draw();    });    addIntrareForm.validate({        rules: {            required: true,            formatFizic: {                required: false            },            nrCrt: {                checkIntrare: true            },            idTipContinut: {                required: false            },            rezolutiiSiTermene: {                required: false            },            nrHartieiIntrate: {                required: false            },            deLaCineVineCorespondenta: {                required: false            }        },        messages: {            nrCrt: {required: "Acest c&#226;mp este obligatoriu"},            dataIntrarii: {required: "Acest c&#226;mp este obligatoriu"},            nrHartieiIntrate: {required: "Acest c&#226;mp este obligatoriu"},            deLaCineVineCorespondenta: {required: "Acest c&#226;mp este obligatoriu"},            continut: {required: "Acest c&#226;mp este obligatoriu"},        }    });    addIntrareForm.on('submit', function (e) {        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var nrCrt = $('#addIntrare-form-nrCrt').val();        var dataIntrarii = $('#addIntrare-form-dataIntrarii').val();        var nrHartieiIntrate = $('#addIntrare-form-nrHartieiIntrate').val();        var deLaCineVineCorespondenta = $('#addIntrare-form-deLaCineVineCorespondenta').val();        var idTipContinut = $('#addIntrare-form-idTipContinut').val();        var continut = $('#addIntrare-form-continut').val();        var rezolutiiSiTermene = $('#addIntrare-form-rezolutiiSiTermene').val();        var formatFizic = $('#addIntrare-form-formatFizic').prop('checked') ? 1 : 0;        var dataToSend = {            "nrCrt": nrCrt, "nrHartieiIntrate": nrHartieiIntrate,            "deLaCineVineCorespondenta": deLaCineVineCorespondenta, "dataIntrarii": processDateForServer(dataIntrarii),            "idTipContinut": idTipContinut, "rezolutiiSiTermene": rezolutiiSiTermene,            "continut": continut, "formatFizic": formatFizic        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-addIntrare').modal('hide');                addIntrareForm.trigger('reset');                $('.chosen-select').trigger(chosenUpdated);                showNotification(response.message, 'Success', SUCCESS);                intrareTable.ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Error", ERROR);            }        });        e.preventDefault();    });    editIntrareForm.validate({        rules: {            required: true,            formatFizic: {                required: false            },            nrCrt: {                checkIntrare: true            },            idTipContinut: {                required: false            },            rezolutiiSiTermene: {                required: false            },            nrHartieiIntrate: {                required: false            },            deLaCineVineCorespondenta: {                required: false            }        },        messages: {            nrCrt: {required: "Acest c&#226;mp este obligatoriu"},            dataIntrarii: {required: "Acest c&#226;mp este obligatoriu"},            nrHartieiIntrate: {required: "Acest c&#226;mp este obligatoriu"},            deLaCineVineCorespondenta: {required: "Acest c&#226;mp este obligatoriu"},            continut: {required: "Acest c&#226;mp este obligatoriu"},        }    });    editIntrareForm.on('submit', function (e) {        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var idIntrare = $('#editIntrare-form-idIntrare').val();        var nrCrt = $('#editIntrare-form-nrCrt').val();        var dataIntrarii = $('#editIntrare-form-dataIntrarii').val();        var nrHartieiIntrate = $('#editIntrare-form-nrHartieiIntrate').val();        var deLaCineVineCorespondenta = $('#editIntrare-form-deLaCineVineCorespondenta').val();        var idTipContinut = $('#editIntrare-form-idTipContinut').val();        var continut = $('#editIntrare-form-continut').val();        var creatDe = $('#editIntrare-form-creatDe').val();        var creatLa = $('#editIntrare-form-creatLa').val();        var rezolutiiSiTermene = $('#editIntrare-form-rezolutiiSiTermene').val();        var formatFizic = $('#editIntrare-form-formatFizic').prop('checked') ? 1 : 0;        var dataToSend = {            "idIntrare": idIntrare, "nrCrt": nrCrt, "nrHartieiIntrate": nrHartieiIntrate,            "deLaCineVineCorespondenta": deLaCineVineCorespondenta, "dataIntrarii": processDateForServer(dataIntrarii),            "idTipContinut": idTipContinut, "rezolutiiSiTermene": rezolutiiSiTermene,            "continut": continut, "formatFizic": formatFizic, "creatDe": creatDe, "creatLa": creatLa        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-editIntrare').modal('hide');                editIntrareForm.trigger('reset');                $('.chosen-select').trigger(chosenUpdated);                showNotification(response.message, 'Success', SUCCESS);                intrareTable.ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Error", ERROR);            }        });        e.preventDefault();    });    rezervaIntrareForm.validate({        rules: {            required: true,            dataInregistrare: {                todayOnly: true            }        },        messages: {            numarInregistrari: {                required: "Acest c&#226;mp este obligatoriu"            },            dataInregistrare: {                required: "Acest c&#226;mp este obligatoriu"            }        }    });    rezervaIntrareForm.on('submit', function (e) {        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var numarInregistrari = $('#rezerva-intrare-form-numarInregistrari').val();        var dataInregistrare = $('#rezerva-intrare-form-dataInregistrare').val();        var dataToSend = {            "numarInregistrari": numarInregistrari, "dataInregistrare": processDateForServer(dataInregistrare)        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-rezerva-intrare').modal('hide');                rezervaIntrareForm.trigger('reset');                $('.chosen-select').trigger(chosenUpdated);                intrareTable.ajax.reload(null, false);                showNotification(response.message, 'Success', SUCCESS);            },            error: function () {                showNotification("Eroare. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });        e.preventDefault();    });    addIesireForm.validate({        rules: {            required: true,            formatFizic: {                required: false            },            nrSiDataRevenirii: {                required: false            },            rezolvare: {                required: false            },            catreCineSALucrat: {                required: false            },            nrDosarSiAn: {                required: false            }        },        messages: {            dataIesirii: {required: "Acest c&#226;mp este obligatoriu"},            rezolvare: {required: "Acest c&#226;mp este obligatoriu"},            catreCineSALucrat: {required: "Acest c&#226;mp este obligatoriu"},            nrDosarSiAn: {required: "Acest c&#226;mp este obligatoriu"},            dataSiNrDeIntrare: {required: "Acest c&#226;mp este obligatoriu"},        }    });    addIesireForm.on('submit', function (e) {        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var dataIesirii = $('#addIesire-form-dataIesirii').val();        var rezolvare = $('#addIesire-form-rezolvare').val();        var catreCineSALucrat = $('#addIesire-form-catreCineSALucrat').val();        var nrDosarSiAn = $('#addIesire-form-nrDosarSiAn').val();        var dataSiNrDeIntrare = $('#addIesire-form-dataSiNrDeIntrare').val();        var nrSiDataRevenirii = $('#addIesire-form-nrSiDataRevenirii').val();        var formatFizic = $('#addIesire-form-formatFizic').prop('checked') ? 1 : 0;        var dataToSend = {            "dataIesirii": processDateForServer(dataIesirii), "rezolvare": rezolvare, "catreCineSALucrat": catreCineSALucrat,            "nrDosarSiAn": nrDosarSiAn, "dataSiNrDeIntrare": dataSiNrDeIntrare,            "nrSiDataRevenirii": nrSiDataRevenirii, "formatFizic": formatFizic        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-addIesire').modal('hide');                addIesireForm.trigger('reset');                $('.chosen-select').trigger(chosenUpdated);                showNotification(response.message, 'Success', SUCCESS);                iesireTable.ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Error", ERROR);            }        });        e.preventDefault();    });    editIesireForm.validate({        rules: {            required: true,            formatFizic: {                required: false            },            nrSiDataRevenirii: {                required: false            },            rezolvare: {                required: false            },            catreCineSALucrat: {                required: false            },            nrDosarSiAn: {                required: false            }        },        messages: {            dataIesirii: {required: "Acest c&#226;mp este obligatoriu"},            rezolvare: {required: "Acest c&#226;mp este obligatoriu"},            catreCineSALucrat: {required: "Acest c&#226;mp este obligatoriu"},            nrDosarSiAn: {required: "Acest c&#226;mp este obligatoriu"},            dataSiNrDeIntrare: {required: "Acest c&#226;mp este obligatoriu"},        }    });    editIesireForm.on('submit', function (e) {        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var idIesire = $('#editIesire-form-idIesire').val();        var dataIesirii = $('#editIesire-form-dataIesirii').val();        var rezolvare = $('#editIesire-form-rezolvare').val();        var catreCineSALucrat = $('#editIesire-form-catreCineSALucrat').val();        var nrDosarSiAn = $('#editIesire-form-nrDosarSiAn').val();        var dataSiNrDeIntrare = $('#editIesire-form-dataSiNrDeIntrare').val();        var nrSiDataRevenirii = $('#editIesire-form-nrSiDataRevenirii').val();        var creatDe = $('#editIesire-form-creatDe').val();        var creatLa = $('#editIesire-form-creatLa').val();        var formatFizic = $('#editIesire-form-formatFizic').prop('checked') ? 1 : 0;        var dataToSend = {            "dataIesirii": processDateForServer(dataIesirii), "idIesire": idIesire, "rezolvare": rezolvare,            "catreCineSALucrat": catreCineSALucrat, "nrDosarSiAn": nrDosarSiAn,            "dataSiNrDeIntrare": dataSiNrDeIntrare, "nrSiDataRevenirii": nrSiDataRevenirii,            "formatFizic": formatFizic, "creatDe": creatDe, "creatLa": creatLa        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-editIesire').modal('hide');                editIesireForm.trigger('reset');                $('.chosen-select').trigger(chosenUpdated);                showNotification(response.message, 'Success', SUCCESS);                iesireTable.ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Error", ERROR);            }        });        e.preventDefault();    });    rezervaIesireForm.validate({        rules: {            required: true,            dataInregistrare: {                todayOnly: true            }        },        messages: {            numarInregistrari: {                required: "Acest c&#226;mp este obligatoriu"            },            dataInregistrare: {                required: "Acest c&#226;mp este obligatoriu"            }        }    });    rezervaIesireForm.on('submit', function (e) {        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var numarInregistrari = $('#rezerva-iesire-form-numarInregistrari').val();        var dataInregistrare = $('#rezerva-iesire-form-dataInregistrare').val();        var dataToSend = {            "numarInregistrari": numarInregistrari, "dataInregistrare": processDateForServer(dataInregistrare)        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-rezerva-iesire').modal('hide');                rezervaIesireForm.trigger('reset');                $('.chosen-select').trigger(chosenUpdated);                iesireTable.ajax.reload(null, false);                showNotification(response.message, 'Success', SUCCESS);            },            error: function () {                showNotification("Eroare. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });        e.preventDefault();    });    $(document).on('shown.bs.modal', '#modal-addIesire', function () {        getIntrareNrSiData();        $('#addIesire-form-dataIesirii').val(generateFormattedDate(new Date()));    });    $(document).on('shown.bs.modal', '#modal-addIntrare', function () {        findLastNrCrtIntrare();        $('#addIntrare-form-dataIntrarii').val(generateFormattedDate(new Date()));        $('#addIntrare-form-nrCrt').val(lastIntrare);    });    $(document).on('click', '#anuleazaCondicaIntrare', function () {        selectedRowId = intrareTable.row('.selected').data().idIntrare;        anuleazaPath = 'intrare';        confirmModalAnuleazaInregistrare();    });    $(document).on('click', '#anuleazaCondicaIesire', function () {        selectedRowId = iesireTable.row('.selected').data().idIesire;        anuleazaPath = 'iesire';        confirmModalAnuleazaInregistrare();    });    $(document).on('click', '.intrare-rezervat', function () {        rezervaData = intrareTable.row($(this).closest('tr')).data();        rezervaPath = 'intrare';        var editIntrareModal = $('#modal-editIntrare');        var idIntrare = $('#editIntrare-form-idIntrare');        var creatDe = $('#editIntrare-form-creatDe');        var creatLa = $('#editIntrare-form-creatLa');        var nrCrt = $('#editIntrare-form-nrCrt');        var dataIntrarii = $('#editIntrare-form-dataIntrarii');        editIntrareForm.trigger('reset');        idIntrare.val(rezervaData.idIntrare);        creatDe.val(rezervaData.creatDe);        creatLa.val(rezervaData.creatLa);        nrCrt.val(rezervaData.nrCrt);        nrCrt.prop('disabled', 'disabled');        dataIntrarii.val(processDateForClient(rezervaData.dataIntrarii));        dataIntrarii.prop('disabled', 'disabled');        editIntrareModal.modal('show');    });    $(document).on('click', '.iesire-rezervat', function () {        rezervaData = iesireTable.row($(this).closest('tr')).data();        rezervaPath = 'iesire';        var editIesireModal = $('#modal-editIesire');        var idIesire = $('#editIesire-form-idIesire');        var creatDe = $('#editIesire-form-creatDe');        var creatLa = $('#editIesire-form-creatLa');        var dataIesirii = $('#editIesire-form-dataIesirii');        editIntrareForm.trigger('reset');        idIesire.val(rezervaData.idIesire);        creatDe.val(rezervaData.creatDe);        creatLa.val(rezervaData.creatLa);        dataIesirii.val(processDateForClient(rezervaData.dataIesirii));        dataIesirii.prop('disabled', 'disabled');        getIntrareNrSiData();        editIesireModal.modal('show');    });    $(document).on('shown.bs.tab', 'a[href="#iesire"]', function () {        iesireTable.search(EMPTY).draw();        $('#anuleazaCondicaIntrare').hide();        $('#anuleazaCondicaIesire').show();        $('#rezervaIntrare-open').hide();        $('#rezervaIesire-open').show();    });    $(document).on('shown.bs.tab', 'a[href="#intrare"]', function () {        intrareTable.search(EMPTY).draw();        $('#anuleazaCondicaIesire').hide();        $('#anuleazaCondicaIntrare').show();        $('#rezervaIesire-open').hide();        $('#rezervaIntrare-open').show();    });    $(document).on('click', '#advanced-search', function () {        $("#registru-general-search").val(EMPTY);        $('#intrare-table').find('thead th input').each(function (i) {            $(this).toggle('display');            if ($(this).prop('display') == 'none') {                $(this).val(EMPTY);            }        });        iesireTable.search(EMPTY).draw();        intrareTable.search(EMPTY).draw();        $('#iesire-table').find('thead th input').each(function (i) {            $(this).toggle('display');            if ($(this).prop('display') == 'none') {                $(this).val(EMPTY);            }        });    });    $(document).keyup(function (e) {        if (e.keyCode == 27) {            iesireTable.search(EMPTY).draw();            intrareTable.search(EMPTY).draw();            $('#intrare-table').find('thead th input').each(function (i) {                $(this).hide();                $(this).val(EMPTY);            });            $('#iesire-table').find('thead th input').each(function (i) {                $(this).val(EMPTY);            });        }    });});