var registruAOUGTable;var addAOUGForm = $('#modal-addRegistru-aoug-form');var selected;var lastAoug;function findLastNrInregistrareAoug() {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    $.ajax({        type: 'get',        url: '/app/secure/registru/get-last-aoug',        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                lastAoug = response;            }        },        error: function () {            showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR)        }    });}$(document).ready(function () {    getAllTipContinut('addRegistru-aoug-form-idTipContinut');    getAllDestinatari('addRegistru-aoug-form-idDestinatar');    $('#registru-aoug').addClass('active');    try {        registruAOUGTable = $('#registru-aoug-table').DataTable({            "ajax": {                "url": '../app/secure/registru/get-aoug',                "dataSrc": ""            },            "buttons": [                {                    extend: 'excel',                    text: '<span class="fa fa-file-excel-o" title="Apasa ALT+X pentru a salva tabelul in format Excel">&nbsp;&nbsp;</span><span>XLS</span>',                    className: 'btn btn-default',                    key: {                        key: 'x',                        altKey: true                    },                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'pdf',                    text: '<span class="fa fa-file-pdf-o" title="Apasa ALT+F pentru a salva tabelul in format PDF">&nbsp;&nbsp;</span><span>PDF</span>',                    className: 'btn btn-default',                    key: {                        key: 'f',                        altKey: true                    },                    orientation: 'landscape',                    title: 'Registru A.OUG',                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'print',                    text: '<span class="fa fa-print" title="Apasa ALT+P pentru a trimite la print">&nbsp;&nbsp;</span><span>Print</span>',                    className: 'btn btn-default',                    key: {                        key: 'p',                        altKey: true                    },                    title: 'Registru A.OUG',                    exportOptions: {                        columns: ':visible'                    }                },                {                    extend: 'colvis',                    text: '<span class="fa fa-adjust">&nbsp;&nbsp;</span><span>Alege coloane vizibile</span>',                    className: 'btn btn-default'                }            ],            "columns": [                {                    "data": "nrInregistrare",                    "className": 'text-bold'                },                {                    "data": "dataInregistrare",                    "className": 'text-bold'                },                {"data": "nrSiDataDocumentului"},                {"data": "emitent"},                {"data": "tipContinut"},                {"data": "continut"},                {"data": "dataExpediere"},                {"data": "destinatar"},                {"data": "formatFizic"}            ],            "columnDefs": [                {                    "targets": [1, 6],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        if (sData != null) {                            $(nTd).html(generateFormattedDate(new Date(sData)));                        }                        if (oData.anulat == 1) {                            $(nTd).closest('tr').css('text-decoration', 'line-through')                            $(nTd).closest('tr').css('color', 'gray');                        }                    }                },                {                    "targets": [8],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        var anulat = oData.anulat;                        $(nTd).html('<div class="checkbox"><label><input class="format-fizic" data-path="aoug" id="aoug-' + oData.idRegistruAoug + '" type="checkbox" ' + (sData == 0 ? (anulat == 1 ? 'disabled="disabled" ' : '' ) : ' checked="" disabled="disabled" ') + '></label></div>');                    }                }            ],            dom: '<"clear"><"break-row"><"pull-right"B>lrtip<"break-row-lg">'        });    } catch (err) {        console.log(err);    }    $("#registru-aoug-search").on('keyup', function () {        registruAOUGTable.search(this.value).draw();    });    $('#addRegistru-aoug-form-idTipContinut').on('change', function () {        $('addRegistru-aoug-form-idTipContinut').val(($('#addRegistru-form-idTipContinut option:selected').text()) + ': ' + $('#addRegistru-form-continut').val())    });    $(document).on('click', '#anuleazaCondica', function () {        selectedRowId = registruAOUGTable.row('.selected').data().idRegistruAoug;        anuleazaPath = 'aoug';        confirmModalAnuleazaInregistrare();    });    $(document).on('show.bs.modal', '#modal-addRegistru-aoug', function () {        findLastNrInregistrareAoug();        getAllTipContinut('addRegistru-aoug-form-idTipContinut');        getAllDestinatari('addRegistru-aoug-form-idDestinatar');        $('#addRegistru-aoug-form-dataInregistrare').val(generateFormattedDate(new Date()));        $('#addRegistru-aoug-form-nrInregistrare').val(lastAoug);    });    addAOUGForm.validate({        rules: {            required: true,            idDestinatar: {                'dependentBA-aoug': true,                required: false            },            dataExpediere: {                'dependentAB-aoug': true,                required: false            },            formatFizic: {                required: false            }        },        messages: {            nrInregistrare: {required: "Acest c&#226;mp este obligatoriu"},            nrSiDataDocumentului: {required: "Acest c&#226;mp este obligatoriu"},            dataInregistrare: {required: "Acest c&#226;mp este obligatoriu"},            idTipContinut: {required: "Acest c&#226;mp este obligatoriu"},            emitent: {required: "Acest c&#226;mp este obligatoriu"},            continut: {required: "Acest c&#226;mp este obligatoriu"}        }    });    addAOUGForm.on('submit', function (e) {        e.preventDefault();        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var nrInregistrare = $('#addRegistru-aoug-form-nrInregistrare').val();        var nrSiDataDocumentului = $('#addRegistru-aoug-form-nrSiDataDocumentului').val();        var dataInregistrare = $('#addRegistru-aoug-form-dataInregistrare').val();        var idTipContinut = $('#addRegistru-aoug-form-idTipContinut').val();        var emitent = $('#addRegistru-aoug-form-emitent').val();        var idDestinatar = $('#addRegistru-aoug-form-idDestinatar').val();        var continut = $('#addRegistru-aoug-form-continut').val();        var dataExpediere = $('#addRegistru-aoug-form-dataExpediere').val();        var formatFizic = $('#addRegistru-aoug-form-formatFizic').prop('checked') ? 1 : 0;        var dataToSend = {            "nrInregistrare": nrInregistrare, "dataInregistrare": dataInregistrare,            "emitent": emitent, "nrSiDataDocumentului": nrSiDataDocumentului,            "idTipContinut": idTipContinut, "idDestinatar": idDestinatar,            "continut": continut, "dataExpediere": dataExpediere, "formatFizic": formatFizic        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-addRegistru-aoug').modal('hide');                addAOUGForm.trigger('reset');                $('.chosen-select').trigger(chosenUpdated);                showNotification(response.message, 'Success', SUCCESS);                registruAOUGTable.ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Error", ERROR);            }        });    });});