var userTable;var selected;var addUserForm = $('#modal-addUser-form');function activateUser(userId) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    $.ajax({        type: 'get',        url: '/app/secure/profil/activate-user/' + userId,        contentType: "application/json",        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                showNotification(response.message)            }        }    });}function deactivateUser(userId) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    $.ajax({        type: 'get',        url: '/app/secure/profil/deactivate-user/' + userId,        contentType: "application/json",        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                showNotification(response.message)            }        }    });}$(document).ready(function () {    $('#admin').addClass('active');    try {        userTable = $('#user-table').DataTable({            "ajax": {                "url": '/app/secure/profil/get-all-users',                "dataSrc": ""            },            "rowCallback": function (row, data) {                if ($.inArray(data.DT_RowId, selected) !== -1) {                    $(row).addClass('selected');                }            },            "sRowSelect": "single",            "columns": [                {                    'data': 'username',                    "className": 'text-bold'                },                {'data': 'nume'},                {'data': 'prenume'},                {'data': 'tel'},                {'data': 'workTel'},                {'data': 'email'},                {'data': 'fax'},                {'data': 'lastLogin'},                {'data': 'lastPassChange'},                {'data': 'roles'},                {'data': 'enabled'}            ],            "columnDefs": [                {                    "targets": [1, 9],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        if (oData.enabled == 0) {                            $(nTd).closest('tr').css('text-decoration', 'line-through');                            $(nTd).closest('tr').css('color', 'gray');                        }                    }                },                {                    "targets": [10],                    "bUseRendered": true,                    "visible": true,                    "fnCreatedCell": function (nTd, sData, oData, i) {                        $(nTd).html('<div class="checkbox"><label><input id="user-' + oData.idUser + '" type="checkbox" ' + (sData == 0 ? 'title="Utilizatorul este inactiv"' : ' checked="" title="Utilizatorul este activ"') + '></label></div>');                    }                }            ],            dom: 'T<"clear"><"break-row">ltipr<"break-row-lg">',            tableTools: {                "sSwfPath": "/swf/copy_csv_xls_pdf.swf",                "aButtons": [                    {                        "sExtends": "csv",                        "sButtonClass": "btn btn-default",                        "sButtonText": '<span class="fa fa-file-o">&nbsp;&nbsp;</span><span>CSV</span>',                        "mColumns": [0, 1, 2, 3, 4, 5, 6],                        "oSelectorOpts": {                            page: 'current'                        }                    },                    {                        "sExtends": "xls",                        "sButtonClass": "btn btn-default",                        "sCharSet": "utf16le",                        "sButtonText": '<span class="fa fa-file-excel-o">&nbsp;&nbsp;</span><span>XLS</span>',                        "mColumns": [0, 1, 2, 3, 4, 5, 6],                        "oSelectorOpts": {                            page: 'current'                        }                    },                    {                        "sExtends": "pdf",                        "sButtonClass": "btn btn-default",                        "sButtonText": '<span class="fa fa-file-pdf-o">&nbsp;&nbsp;</span><span>PDF</span>',                        "mColumns": [0, 1, 2, 3, 4, 5, 6],                        "oSelectorOpts": {                            page: 'current'                        }                    }                ]            }        });    } catch (err) {        console.log(err);    }    $("#user-search").on('keyup', function () {        userTable.search(this.value).draw();    });    addUserForm.validate({        rules: {            required: true,            nume: {                minlength: 3            },            prenume: {                minlength: 3            },            email: {                email: true,                required: false            },            workTel: {                minlength: 10,                required: false            },            tel: {                minlength: 10,                required: false            },            fax: {                minlength: 10,                required: false            },            username: {                nospace: true            }        },        messages: {            nume: {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Numele trebuie s&#259; aib&#259; 3 sau mai multe caractere"            },            prenume: {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Prenumele trebuie s&#259; aib&#259; 3 sau mai multe caractere"            },            username: {                required: "Acest c&#226;mp este obligatoriu"            },            email: {                email: "Introduce&#539;i un e-mail valid"            },            workTel: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            },            tel: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            },            fax: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            }        }    });    addUserForm.on('submit', function (e) {        e.preventDefault();        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var nume = $('#addUser-form-nume').val();        var prenume = $('#addUser-form-prenume').val();        var username = $('#addUser-form-username').val();        var email = $('#addUser-form-email').val();        var workTel = $('#addUser-form-workTel').val();        var tel = $('#addUser-form-tel').val();        var fax = $('#addUser-form-fax').val();        var idProfil = $('#addUser-form-id-profil').val();        var roleArray = $('#addUser-form-roles option:selected');        var roles = '';        $.each(roleArray, function (i) {            roles += ($(roleArray[i]).val()).concat(',');        });        var data = {            'nume': nume,            'prenume': prenume,            'username': username,            'email': email,            'workTel': workTel,            'tel': tel,            'fax': fax,            'idProfil': idProfil,            'roles': roles        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            data: JSON.stringify(data),            contentType: 'application/json',            success: function (response) {                $('#modal-addUser').modal('hide');                addUserForm.trigger('reset');                showNotification(response.message, 'Success', SUCCESS);                userTable.ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });    });    $(document).on('change', 'input[type="checkbox"]', function (e) {        var status = $(this).prop('checked');        var userId = $(this).prop('id').replace('user-', '');        if (status) {            activateUser(userId);        } else {            deactivateUser(userId);        }    });});