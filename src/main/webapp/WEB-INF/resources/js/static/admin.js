var userTable;var tipContinutTable;var destinatarTable;var selected;var selectedRowData;var addUserForm = $('#modal-addUser-form');var editTipContinutForm = $('#modal-editTipContinut-form');var editDestinatarForm = $('#modal-editDestinatar-form');function stergeTipContinut(idTipContinut) {    var token = $("meta[name='_csrf']").prop("content");    var header = $("meta[name='_csrf_header']").prop("content");    $.ajax({        type: 'get',        url: '/app/secure/registru/delete-tip-continut/' + idTipContinut,        contentType: "application/json",        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            tipContinutTable.ajax.reload(null, false);            showNotification(response.message, "Succes", SUCCESS);        },        error: function () {            showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);        }    });}function stergeDestinatar(idDestinatar) {    var token = $("meta[name='_csrf']").prop("content");    var header = $("meta[name='_csrf_header']").prop("content");    $.ajax({        type: 'get',        url: '/app/secure/registru/delete-destinatar/' + idDestinatar,        contentType: "application/json",        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            destinatarTable.ajax.reload(null, false);            showNotification(response.message, "Succes", SUCCESS);        },        error: function () {            showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);        }    });}function confirmModalStergeTipContinut() {    var idModal = 'confirm-sterge-tip-continut';    var question = '<p class="lead">E&#x219;ti sigur c&#259; vrei s&#259; &#x219;tergi tipul de con&\#539;inut?</p>';    var title = '<i class="fa fa-question-circle"></i>  E&#x219;ti sigur c&#259;?';    showConfirmModal(idModal, title, question, 'confirm-sterge-tip-continut-button', 'not-confirm-sterge-tip-continut-button');}function confirmModalStergeTipContinutYes() {    $('#confirm-sterge-tip-continut').modal('hide');    if (selectedRowData && selectedRowData.idTipContinut) {        stergeTipContinut(selectedRowData.idTipContinut);    }}function confirmModalStergeTipContinutNo() {    $('#confirm-sterge-tip-continut').modal('hide');}function confirmModalStergeDestinatar() {    var idModal = 'confirm-sterge-destinatar';    var question = '<p class="lead">E&#x219;ti sigur c&#259; vrei s&#259; &#x219;tergi destinatarul?</p>';    var title = '<i class="fa fa-question-circle"></i>  E&#x219;ti sigur c&#259;?';    showConfirmModal(idModal, title, question, 'confirm-sterge-destinatar-button', 'not-confirm-sterge-destinatar-button');}function confirmModalStergeDestinatarYes() {    $('#confirm-sterge-destinatar').modal('hide');    if (selectedRowData && selectedRowData.idDestinatar) {        stergeDestinatar(selectedRowData.idDestinatar);    }}function confirmModalStergeDestinatarNo() {    $('#confirm-sterge-destinatar').modal('hide');}function activateUser(userId) {    var token = $("meta[name='_csrf']").prop("content");    var header = $("meta[name='_csrf_header']").prop("content");    $.ajax({        type: 'get',        url: '/app/secure/profil/activate-user/' + userId,        contentType: "application/json",        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                showNotification(response.message);            }        }    });}function deactivateUser(userId) {    var token = $("meta[name='_csrf']").prop("content");    var header = $("meta[name='_csrf_header']").prop("content");    $.ajax({        type: 'get',        url: '/app/secure/profil/deactivate-user/' + userId,        contentType: "application/json",        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                showNotification(response.message)            }        }    });}function getTipContinut(idTipContinut) {    var token = $("meta[name='_csrf']").prop("content");    var header = $("meta[name='_csrf_header']").prop("content");    $.ajax({        type: 'get',        url: '/app/secure/registru/tip-continut/' + idTipContinut,        contentType: "application/json",        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                $('#editTipContinut-form-idTipContinut').val(response.idTipContinut);                $('#editTipContinut-form-tipContinut').val(response.tipContinut);            }        }    });}function getDestinatar(idDestinatar) {    var token = $("meta[name='_csrf']").prop("content");    var header = $("meta[name='_csrf_header']").prop("content");    $.ajax({        type: 'get',        url: '/app/secure/registru/destinatar/' + idDestinatar,        contentType: "application/json",        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                $('#editDestinatar-form-idDestinatar').val(response.idDestinatar);                $('#editDestinatar-form-destinatar').val(response.destinatar);            }        }    });}$(document).ready(function () {    $('#admin').addClass('active');    $('#addUser-open').removeClass('hidden');    $('#editUser-open').removeClass('hidden');    try {        userTable = $('#user-table').DataTable({            "ajax": {                "deferRender": true,                "url": '/app/secure/profil/get-all-users',                "dataSrc": ""            },            "buttons": [                {                    extend: 'excel',                    text: '<span class="fa fa-file-excel-o" title="Apasa ALT+X pentru a salva tabelul in format Excel">&nbsp;&nbsp;</span><span>XLS</span>',                    className: 'btn btn-default',                    key: {                        key: 'x',                        altKey: true                    },                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'pdf',                    text: '<span class="fa fa-file-pdf-o" title="Apasa ALT+F pentru a salva tabelul in format PDF">&nbsp;&nbsp;</span><span>PDF</span>',                    className: 'btn btn-default',                    key: {                        key: 'f',                        altKey: true                    },                    orientation: 'landscape',                    title: 'Utilizatori',                    exportOptions: {                        columns: ':visible'                    }                }, {                    extend: 'print',                    text: '<span class="fa fa-print" title="Apasa ALT+P pentru a trimite la print">&nbsp;&nbsp;</span><span>Print</span>',                    className: 'btn btn-default',                    key: {                        key: 'p',                        altKey: true                    },                    title: 'Utilizatori',                    exportOptions: {                        columns: ':visible'                    }                },                {                    extend: 'colvis',                    text: '<span class="fa fa-adjust">&nbsp;&nbsp;</span><span>Alege coloane vizibile</span>',                    className: 'btn btn-default'                }            ],            "sRowSelect": "single",            "columns": [                {                    'data': 'username',                    "className": 'text-bold'                },                {'data': 'nume'},                {'data': 'prenume'},                {'data': 'tel'},                {'data': 'workTel'},                {'data': 'email'},                {'data': 'fax'},                {'data': 'lastLogin'},                {'data': 'lastPassChange'},                {'data': 'roles'},                {'data': 'enabled'}            ],            "columnDefs": [                {                    "targets": [1, 9],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        if (oData.enabled == 0) {                            $(nTd).closest('tr').css('text-decoration', 'line-through');                            $(nTd).closest('tr').css('color', 'gray');                        }                    }                },                {                    "targets": [10],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        $(nTd).html('<div class="checkbox"><label><input id="user-' + oData.idUser + '" type="checkbox" ' + (sData == 0 ? 'title="Utilizatorul este inactiv"' : ' checked="" title="Utilizatorul este activ"') + '></label></div>');                    }                }            ],            dom: '<"clear"><"break-row"><"pull-right"B>lrtip<"break-row-lg">'        });    } catch (err) {        console.log(err);    }    try {        tipContinutTable = $('#tip-continut-table').DataTable({            "ajax": {                "url": '/app/secure/registru/get-all-tip-continut',                "dataSrc": ""            },            "sRowSelect": "single",            "columns": [                {                    'data': null                },                {                    'data': 'tipContinut'                }            ],            "columnDefs": [                {                    "searchable": false,                    "orderable": false,                    "targets": 0                }            ],            "order": [[1, 'asc']],            dom: '<"clear"><"break-row"><"pull-right">lrtip<"break-row-lg">'        });    } catch (err) {        console.log(err);    }    tipContinutTable.on('order.dt search.dt', function () {        tipContinutTable.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {            cell.innerHTML = i + 1;        });    }).draw();    try {        destinatarTable = $('#destinatar-table').DataTable({            "ajax": {                "url": '/app/secure/registru/get-all-destinatari',                "dataSrc": ""            },            "sRowSelect": "single",            "columns": [                {                    'data': null                },                {                    'data': 'destinatar'                }            ],            "columnDefs": [                {                    "searchable": false,                    "orderable": false,                    "targets": 0                }            ],            "order": [[1, 'asc']],            dom: '<"clear"><"break-row"><"pull-right">lrtip<"break-row-lg">'        });    } catch (err) {        console.log(err);    }    destinatarTable.on('order.dt search.dt', function () {        destinatarTable.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {            cell.innerHTML = i + 1;        });    }).draw();    $("#user-search").on('keyup', function () {        userTable.search(this.value).draw();        tipContinutTable.search(this.value).draw();        destinatarTable.search(this.value).draw();    });    addUserForm.validate({        rules: {            required: true,            nume: {                minlength: 3            },            prenume: {                minlength: 3            },            email: {                email: true,                required: false            },            workTel: {                number: true,                minlength: 10,                required: false            },            tel: {                number: true,                minlength: 10,                required: false            },            fax: {                minlength: 10,                number: true,                required: false            },            username: {                nospace: true            }        },        messages: {            nume: {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Numele trebuie s&#259; aib&#259; 3 sau mai multe caractere"            },            prenume: {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Prenumele trebuie s&#259; aib&#259; 3 sau mai multe caractere"            },            username: {                required: "Acest c&#226;mp este obligatoriu"            },            email: {                email: "Introduce&#539;i un e-mail valid"            },            workTel: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre",                number: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            },            tel: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre",                number: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            },            fax: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre",                number: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            }        }    });    addUserForm.on('submit', function (e) {        e.preventDefault();        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").prop("content");        var header = $("meta[name='_csrf_header']").prop("content");        var nume = $('#addUser-form-nume').val();        var prenume = $('#addUser-form-prenume').val();        var username = $('#addUser-form-username').val();        var email = $('#addUser-form-email').val();        var workTel = $('#addUser-form-workTel').val();        var tel = $('#addUser-form-tel').val();        var fax = $('#addUser-form-fax').val();        var idProfil = $('#addUser-form-id-profil').val();        var roleArray = $('#addUser-form-roles').find('option:selected');        var roles = EMPTY;        $.each(roleArray, function (i) {            roles += ($(roleArray[i]).val()).concat(',');        });        var data = {            'nume': nume,            'prenume': prenume,            'username': username,            'email': email,            'workTel': workTel,            'tel': tel,            'fax': fax,            'idProfil': idProfil,            'roles': roles        };        $.ajax({            type: 'post',            url: $(this).prop('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            data: JSON.stringify(data),            contentType: 'application/json',            success: function (response) {                $('#modal-addUser').modal('hide');                addUserForm.trigger('reset');                showNotification(response.message, 'Success', SUCCESS);                userTable.ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });    });    editTipContinutForm.validate({        rules: {            required: true        },        messages: {            text: {required: "Acest c&#226;mp este obligatoriu"}        }    });    editTipContinutForm.on('submit', function (e) {        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").prop("content");        var header = $("meta[name='_csrf_header']").prop("content");        var idTipContinut = $('#editTipContinut-form-idTipContinut').val();        var tipContinut = $('#editTipContinut-form-tipContinut').val();        var dataToSend = {            "idTipContinut": idTipContinut, "tipContinut": tipContinut        };        $.ajax({            type: 'post',            url: $(this).prop('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                if (response.id == -1) {                    showNotification(response.message, "Aten&#539;ie", WARNING);                } else {                    $('#modal-editTipContinut').modal('hide');                    editTipContinutForm.trigger('reset');                    showNotification(response.message, 'Success', SUCCESS);                    tipContinutTable.ajax.reload(null, false);                }            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });        e.preventDefault();    });    addDestinarForm.validate({        rules: {            required: true        },        messages: {            destinatar: {required: "Acest c&#226;mp este obligatoriu"}        }    });    editDestinatarForm.on('submit', function (e) {        e.preventDefault();        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").prop("content");        var header = $("meta[name='_csrf_header']").prop("content");        var idDestinatar = $('#editDestinatar-form-idDestinatar').val();        var destinatar = $('#editDestinatar-form-destinatar').val();        var dataToSend = {            "destinatar": destinatar, "idDestinatar": idDestinatar        };        $.ajax({            type: 'post',            url: $(this).prop('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                if (response.id == -1) {                    showNotification(response.message, "Aten&#539;ie", WARNING);                } else {                    $('#modal-editDestinatar').modal('hide');                    editDestinatarForm.trigger('reset');                    showNotification(response.message, 'Success', SUCCESS);                    destinatarTable.ajax.reload(null, false);                }            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });    });    $(document).on('shown.bs.tab', 'a[href="#users"]', function () {        $("#user-search").val(EMPTY);        userTable.search(EMPTY).draw();        $('#addUser-open').removeClass('hidden');        $('#editUser-open').removeClass('hidden');        $('#addTipContinut-open').addClass('hidden');        $('#editTipContinut-open').addClass('hidden');        $('#deleteTipContinut-open').addClass('hidden');        $('#addDestinatar-open').addClass('hidden');        $('#editDestinatar-open').addClass('hidden');        $('#deleteDestinatar-open').addClass('hidden');    });    $(document).on('shown.bs.tab', 'a[href="#tip-continut"]', function () {        $("#user-search").val(EMPTY);        tipContinutTable.search(EMPTY).draw();        $('#addUser-open').addClass('hidden');        $('#editUser-open').addClass('hidden');        $('#addTipContinut-open').removeClass('hidden');        $('#editTipContinut-open').removeClass('hidden');        $('#deleteTipContinut-open').removeClass('hidden');        $('#addDestinatar-open').addClass('hidden');        $('#editDestinatar-open').addClass('hidden');        $('#deleteDestinatar-open').addClass('hidden');    });    $(document).on('shown.bs.tab', 'a[href="#destinatar"]', function () {        $("#user-search").val(EMPTY);        destinatarTable.search(EMPTY).draw();        $('#addUser-open').addClass('hidden');        $('#editUser-open').addClass('hidden');        $('#addDestinatar-open').removeClass('hidden');        $('#editDestinatar-open').removeClass('hidden');        $('#deleteDestinatar-open').removeClass('hidden');        $('#addTipContinut-open').addClass('hidden');        $('#editTipContinut-open').addClass('hidden');        $('#deleteTipContinut-open').addClass('hidden');    });    $(document).on('change', 'input[type="checkbox"]', function (e) {        var status = $(this).prop('checked');        var userId = $(this).prop('id').replace('user-', EMPTY);        if (status) {            activateUser(userId);        } else {            deactivateUser(userId);        }    });    $(document).on('click', '#editUser-open', function () {        var username = userTable.row('.selected').data().username;        if (username) {            getProfileForUser(username);            $('#editUser-form-username').prop('disabled', 'disabled');            $('#modal-editUser').modal('show');        }    });    $(document).on('click', '#editTipContinut-open', function () {        var data = tipContinutTable.row('.selected').data();        if (data) {            getTipContinut(data.idTipContinut);            $('#modal-editTipContinut').modal('show');        }    });    $(document).on('click', '#editDestinatar-open', function () {        var data = destinatarTable.row('.selected').data();        if (data) {            getDestinatar(data.idDestinatar);            $('#modal-editDestinatar').modal('show');        }    });    $(document).on('click', '#deleteTipContinut-open', function () {        selectedRowData = tipContinutTable.row('.selected').data();        confirmModalStergeTipContinut();    });    $(document).on('click', '#deleteDestinatar-open', function () {        selectedRowData = destinatarTable.row('.selected').data();        confirmModalStergeDestinatar();    });    $(document).on('click', '#confirm-sterge-tip-continut-button', function () {        confirmModalStergeTipContinutYes();    });    $(document).on('click', '#not-confirm-sterge-tip-continut-button', function () {        confirmModalStergeTipContinutNo();    });    $(document).on('click', '#confirm-sterge-destinatar-button', function () {        confirmModalStergeDestinatarYes();    });    $(document).on('click', '#not-confirm-sterge-destinatar-button', function () {        confirmModalStergeDestinatarNo();    });});