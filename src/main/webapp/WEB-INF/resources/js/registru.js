var SUCCESS = 'success';var DANGER = 'danger';var ERROR = 'error';var WARNING = 'warning';var PRIMARY = 'primary';var INFO = 'info';var EMPTY = '';var ZERO = 0;var chosenUpdated = 'chosen:updated';var addTipContinutForm = $('#modal-addTipContinut-form');var addDestinarForm = $('#modal-addDestinatar-form');var checkboxObject;var status;var formatFizicPath;var id;var selectedRowId;var anuleazaPath;var popoverDefaultSettings = {    placement: 'bottom',//values: auto,top,right,bottom,left,top-right,top-left,bottom-right,bottom-left,auto-top,auto-right,auto-bottom,auto-left    width: 'auto',//can be set with  number    height: 'auto',//can be set with  number    trigger: 'hover',//values:  click,hover,manual    style: '',//values:'',inverse    constrains: null, // constrains the direction when placement is  auto,  values: horizontal,vertical    animation: 'pop', //pop with animation,values: pop,fade (only take effect in the browser which support css3 transition)    delay: {//show and hide delay time of the popover, works only when trigger is 'hover',the value can be number or object        show: null,        hide: 500    },    async: {        before: function (that, xhr) {        },//executed before ajax request        success: function (that, data) {        }//executed after successful ajax request    },    cache: false,//if cache is set to false,popover will destroy and recreate    multi: false,//allow other popovers in page at same time    arrow: true,//show arrow or not    closeable: false,//display close button or not    padding: true//content padding};var changePasswordForm = $('#modal-changePassword-form');var userProfileForm = $('#modal-userProfile-form');var userEditForm = $('#modal-editUser-form');jQuery.validator.addMethod("nospace", function (value, element) {    return this.optional(element) || checkNoSpace();}, jQuery.validator.format("Utilizatorul nu poate con&#539;ine spa&#539;ii"));jQuery.validator.addMethod("duplicate", function (value, element) {    return this.optional(element) || checkSamePasswords();}, jQuery.validator.format("Parolele nu se potrivesc"));jQuery.validator.addMethod("dependentAB-aoug", function (value, element) {    return this.optional(element) || dateDependsOnDestinatarAOUG();}, jQuery.validator.format("Data expedierii depinde de destinatar"));jQuery.validator.addMethod("dependentBA-aoug", function (value, element) {    return this.optional(element) || dateDependsOnDestinatarAOUG();}, jQuery.validator.format("Destinatarul depinde de data expedierii"));jQuery.validator.addMethod("dependentAB-ogb", function (value, element) {    return this.optional(element) || dateDependsOnDestinatarOGB();}, jQuery.validator.format("Data expedierii depinde de destinatar"));jQuery.validator.addMethod("dependentBA-ogb", function (value, element) {    return this.optional(element) || dateDependsOnDestinatarOGB();}, jQuery.validator.format("Destinatarul depinde de data expedierii"));function getRolesForUser(username) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var rolesSelect = $('#userProfile-form-roles');    var rolesSelect2 = $('#editUser-form-roles');    var roles = [];    $.ajax({        type: 'get',        url: '/app/secure/profil/get-all-roles/' + username,        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                $.each(response, function (index) {                    switch (response[index].role) {                        case 'ROLE_ADMIN':                            roles.push(3);                            break;                        case 'ROLE_SUPERUSER':                            roles.push(2);                            break;                        case 'ROLE_USER':                            roles.push(1);                            break;                        default :                            break;                    }                });                rolesSelect.val(roles);                rolesSelect2.val(roles);                rolesSelect.trigger(chosenUpdated);                rolesSelect2.trigger(chosenUpdated);            }        }    });}function getAllTipContinut(container) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var tipContinutSelect = $('#' + container);    tipContinutSelect.html(EMPTY);    tipContinutSelect.append("<option></option>");    $.ajax({        type: 'get',        url: '/app/secure/registru/get-all-tip-continut',        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                $.each(response, function (index) {                    tipContinutSelect.append($("<option>").val(response[index].idTipContinut).text(response[index].tipContinut));                });                tipContinutSelect.trigger(chosenUpdated);            }        }    });}function getAllDestinatari(container) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var destinatarSelect = $('#' + container);    destinatarSelect.html(EMPTY);    destinatarSelect.append("<option></option>");    $.ajax({        type: 'get',        url: '/app/secure/registru/get-all-destinatari',        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                $.each(response, function (index) {                    destinatarSelect.append($("<option>").val(response[index].idDestinatar).text(response[index].destinatar));                });                destinatarSelect.trigger(chosenUpdated);            }        }    });}function checkSamePasswords() {    var pass1 = $('#changePassword-form-password').val();    var pass2 = $('#changePassword-form-password-again').val();    return pass1 === pass2;}function checkNoSpace() {    var user = $('#addUser-form-username').val();    return user.indexOf(' ') == -1;}function dateDependsOnDestinatarAOUG() {    var dataExpediere = $('#addRegistru-aoug-form-dataExpediere').val();    var idDestinatar = $('#addRegistru-aoug-form-idDestinatar').val();    var dataLength = dataExpediere.length;    var destinatarLength = idDestinatar.length;    return (dataLength == 0 && destinatarLength == 0) || (dataLength > 0 && destinatarLength > 0);}function dateDependsOnDestinatarOGB() {    var dataExpediere = $('#addRegistru-ogb-form-dataExpediere').val();    var idDestinatar = $('#addRegistru-ogb-form-idDestinatar').val();    var dataLength = dataExpediere.length;    var destinatarLength = idDestinatar.length;    return (dataLength == 0 && destinatarLength == 0) || (dataLength > 0 && destinatarLength > 0);}function getProfileForUser(id) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var idProfil = $('#editUser-form-id-profil');    var nume = $('#editUser-form-nume');    var prenume = $('#editUser-form-prenume');    var username = $('#editUser-form-username');    var email = $('#editUser-form-email');    var workTel = $('#editUser-form-workTel');    var tel = $('#editUser-form-tel');    var fax = $('#editUser-form-fax');    $.ajax({        type: 'get',        url: '/app/secure/profil/get-user/' + id,        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                username.val(response.username);                getRolesForUser(response.username);                nume.val(response.nume);                prenume.val(response.prenume);                email.val(response.email);                workTel.val(response.workTel);                tel.val(response.tel);                fax.val(response.fax);                idProfil.val(response.idProfil);            }        },        error: function () {            showNotification("Eroare. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR)        }    });}function getProfile() {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var idProfil = $('#userProfile-form-id-profil');    var nume = $('#userProfile-form-nume');    var prenume = $('#userProfile-form-prenume');    var username = $('#userProfile-form-username');    var email = $('#userProfile-form-email');    var workTel = $('#userProfile-form-workTel');    var tel = $('#userProfile-form-tel');    var fax = $('#userProfile-form-fax');    $.ajax({        type: 'get',        url: '/app/secure/profil/get-user',        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                username.val(response.username);                getRolesForUser(response.username);                nume.val(response.nume);                prenume.val(response.prenume);                email.val(response.email);                workTel.val(response.workTel);                tel.val(response.tel);                fax.val(response.fax);                idProfil.val(response.idProfil);            }        },        error: function () {            showNotification("Eroare. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR)        }    });}function formSubmit() {    document.getElementById("logoutForm").submit();}// Closes the Responsive Menu on Menu Item Click$('.navbar-collapse ul li a').click(function () {    $('.navbar-toggle:visible').click();});function showNotification(message, title, type) {    if (typeof(type) === "undefined") {        type = SUCCESS;    }    toastr.options = {        "closeButton": true,        "debug": false,        "progressBar": false,        "positionClass": "toast-top-center",        "onclick": null,        "showDuration": "7500",        "hideDuration": "1500",        "timeOut": "0",        "extendedTimeOut": "0",        "showEasing": "swing",        "hideEasing": "linear",        "showMethod": "fadeIn",        "hideMethod": "fadeOut"    };    toastr[type](message, title)}function toJSDate(dateParam, locale) {    var options = {        weekday: "long",        year: "numeric",        month: "long",        day: "numeric",        "second": "2-digit",        "minute": "2-digit",        "hour": "2-digit"    };    var date;    if (!locale) {        locale = 'ro'    }    //dateTime[0] = date, dateTime[1] = time    date = dateParam[0].split("-");    return new Date(date[0], date[1], date[2]).toLocaleString(locale, options);}function toLocaleDate(date, locale) {    var options = {        year: "numeric",        month: "numeric",        day: "numeric"    };    if (!locale) {        locale = 'en'    }    return date.toLocaleString(locale, options)}function toJSDateTime(dateParam) {    var locale;    var returnDate;    var options = {        weekday: "long",        year: "numeric",        month: "long",        day: "numeric",        "second": "2-digit",        "minute": "2-digit",        "hour": "2-digit"    };    returnDate = new Date(dateParam).toLocaleString(locale, options);    return returnDate;}function showModal(id, title, content, buttons) {    var modalHtml = '';    var modalId = '#' + id;    if (!buttons) {        buttons = '<button type="button" id="' + id + '-close" class="btn btn-default" data-dismiss="modal"><span class="fa fa-times"></span>&nbsp;&nbsp;Close</button>';    }    if (id && title && content) {        modalHtml += '<div class="modal fade" id="' + id + '">'                .concat('<div class="modal-dialog">')                .concat('<div class="modal-content">')                .concat('<div class="modal-header">')                .concat('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">�</button>')                .concat('<h4 class="modal-title">').concat(title).concat('</h4></div>')                .concat('<div class="modal-body">')                .concat(content)                .concat('</div><div class="modal-footer">')                .concat(buttons)                .concat('</div></div></div></div>');        if (!$(modalId).length) {            $('body').append(modalHtml);        }        $(modalId).modal('show');    } else {        throw "you must specify mandatory arguments "    }}function confirmModal(id, title) {    var modalHtml = '';    var modalId = '#' + id;    var buttons = '<button type="button" id="' + id + '-yes" class="btn btn-success" onclick="javascript:return true;"><span class="fa fa-check"></span>&nbsp;&nbsp;Yes</button>';    buttons += '<button type="button" class="btn btn-danger" data-dismiss="modal"><span class="fa fa-times"></span>&nbsp;&nbsp;No</button>';    modalHtml += '<div class="modal fade" id="' + id + '">'            .concat('<div class="modal-dialog">')            .concat('<div class="modal-content">')            .concat('<div class="modal-header">')            .concat('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">�</button>')            .concat('<h4 class="modal-title"><span class="fa fa-question-circle">&nbsp;</span>').concat("Are you sure?").concat('</h4></div>')            .concat('<div class="modal-body">')            .concat('<h4>' + title + '</h4>')            .concat('</div><div class="modal-footer">')            .concat(buttons)            .concat('</div></div></div></div>');    $('body').append(modalHtml);    $(modalId).modal('show');}function setFormatFizic(path, id) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var successful = false;    $.ajax({        type: 'get',        url: '/app/secure/registru/format-fizic/' + path + '/' + id,        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                showNotification(response.message);                successful = true;            }        },        error: function () {            showNotification("Eroare. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR)        }    });    return successful;}function setAnulat(path, id) {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var successful = false;    $.ajax({        type: 'get',        url: '/app/secure/registru/anulare/' + path + '/' + id,        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                showNotification(response.message);                successful = true;            }        },        error: function () {            showNotification("Eroare. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare ", ERROR)        }    });    return successful;}function getUsername() {    var token = $("meta[name='_csrf']").attr("content");    var header = $("meta[name='_csrf_header']").attr("content");    var username = $('#username');    $.ajax({        type: 'get',        url: '/app/secure/profil/get-user',        contentType: "application/json",        async: false,        beforeSend: function (xhr) {            xhr.setRequestHeader(header, token);        },        success: function (response) {            if (response) {                var user = response.username;                username.prop('title', 'Esti inregistrat ca: ' + user);                username.html(user);            }        },        error: function () {            showNotification("Eroare. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR)        }    });}$(window).scroll(function () {    if ($(document).scrollTop() > 0) {        $('#scrollUp').fadeIn(400)    } else {        $('#scrollUp').fadeOut(400);    }});jQuery.validator.setDefaults({    ignore: [".ignore", ":hidden:not(select)"],    focusCleanup: true,    errorClass: "text-danger",    errorElement: "span",    ignoreTitle: true,    focusInvalid: false,    messages: {        required: "Acest c&#226;mp este obligatoriu"    },    highlight: function (element) {        $(element).closest('.form-group').addClass('has-error');        if ($(element).parent().hasClass("chosen-search")) {            $(element).parent().closest("div.form-group").addClass('has-error');        }        var tab_content = $(element).closest('.tab-pane');        if ($(tab_content).find('div.has-error').length > ZERO) {            var id = $(tab_content).attr("id");            $('a[href="#' + id + '"]').css('color', '#a94442');        }    },    unhighlight: function (element) {        if ($(element).hasClass("chosen-select")) {            $(element).closest("div.form-group").find(".help-block").html(EMPTY);        }        if ($(element).parent().hasClass("chosen-search")) {            $(element).closest("div.form-group").find(".help-block").html(EMPTY);            $(element).closest("div.form-group").removeClass('has-error');        }        $(element).closest('.form-group').removeClass('has-error');        var tab_content = $(element).closest('.tab-pane');        if ($(tab_content).find('div.has-error').length == ZERO) {            var id = $(tab_content).attr("id");            $('a[href="#' + id + '"]').css('color', '#333');        }    },    errorPlacement: function (error, element) {        element.closest("div.form-group").find(".help-block").html(error);    }});function generateFormattedDate(date) {    if (date) {        var year = date.getFullYear();        var month = date.getMonth() <= 8 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);        var day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();        return day + '-' + month + '-' + year;    } else {        return '';    }}function processDateForServer(date) {    if (date) {        date = date.split('-');        var year = date[2];        var month = date[1];        var day = date[0];        return year + '-' + month + '-' + day;    } else {        return '';    }}function showConfirmModal(id, title, question, yesButton, noButton) {    var buttons = '<button id="' + yesButton + '" class="btn btn-success"><i class="fa fa-check"></i> Da</button><button class="btn btn-danger"  id="' + noButton + '"><i class="fa fa-times"></i> Nu</button>';    showModal(id, title, question, buttons);}function confirmModalFormatFizic(object) {    checkboxObject = object;    status = object.prop('checked');    formatFizicPath = object.data('path');    id = object.prop('id').replace(formatFizicPath + '-', '');    var question = '<p class="lead">E&#x219;ti sigur c&#259; documentul a fost primit &#238;n format fizic?</p>';    var title = '<i class="fa fa-question-circle"></i>  E&#x219;ti sigur c&#259;?';    var idModal = 'confirm-format-fizic-modal';    if (status) {        showConfirmModal(idModal, title, question, 'confirm-format-fizic-button', 'not-confirm-format-fizic-button');    }}function confirmModalAnuleazaInregistrare() {    var idModal = 'confirm-anulare';    var question = '<p class="lead">E&#x219;ti sigur c&#259; vrei s&#259; anulezi &#238;nregistrarea?</p>';    var title = '<i class="fa fa-question-circle"></i>  E&#x219;ti sigur c&#259;?';    showConfirmModal(idModal, title, question, 'confirm-anulare-button', 'not-confirm-anulare-button');}function confirmModalFormatFizicYes() {    $('#confirm-format-fizic-modal').modal('hide');    if (setFormatFizic(formatFizicPath, id)) {        checkboxObject.prop('disabled', 'disabled');    }}function confirmModalFormatFizicNo() {    $('#confirm-format-fizic-modal').modal('hide');    checkboxObject.status = false;    checkboxObject.prop('checked', false);}function confirmModalAnulareYes() {    $('#confirm-anulare').modal('hide');    if (setAnulat(anuleazaPath, selectedRowId)) {        $('.dataTable').DataTable().ajax.reload(null, false);    }}function confirmModalAnulareNo() {    $('#confirm-anulare').modal('hide');}$.fn.datepicker.dates['ro'] = {    days: ["Duminic?", "Luni", "Mar?i", "Miercuri", "Joi", "Vineri", "S�mb?t?", "Duminic?"],    daysShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "S�m", "Dum"],    daysMin: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "S�", "Du"],    months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],    monthsShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],    today: "Ast?zi",    weekStart: 1};$(document).ready(function () {    $('#an-copyright').text(new Date().getFullYear());    $('#username').text(getUsername());    $('input[type=file]').bootstrapFileInput();    $('.file-inputs').bootstrapFileInput();    $(".chosen-select").chosen({        disable_search_threshold: 2,        allow_single_deselect: true,        inherit_select_classes: true,        search_contains: true,        width: '100%'    });    $('.date-picker').datepicker({        format: 'dd-mm-yyyy',        weekStart: 1,        autoclose: true,        language: 'ro'    });    $.extend($.fn.dataTable.defaults, {        "aLengthMenu": [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],        stateSave: true,        fixedHeader: true,        select: 'single',        "language": {            "url": '/fonts/ro_RO.txt'        }    });    $(document).on('keyup', function (e) {        if (e.altKey && e.keyCode == 83) {            $('form').submit();        }    });    $(document).on('click', '#show-pass', function () {        if ($(this).prop('checked')) {            $('#changePassword-form-password').prop('type', 'text');            $('#changePassword-form-password-again').prop('type', 'text');        } else {            $('#changePassword-form-password').prop('type', 'password');            $('#changePassword-form-password-again').prop('type', 'password');        }    });    changePasswordForm.validate({        onfocusout: false,        rules: {            required: true,            password: {                duplicate: true,                minlength: 8            },            "password-again": {                duplicate: true,                minlength: 8            },            "show-pass": {                required: false            }        },        messages: {            password: {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Parola trebuie s&#259; aib&#259; 8 sau mai multe caractere"            },            "password-again": {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Parola trebuie s&#259; aib&#259; 8 sau mai multe caractere"            }        }    });    changePasswordForm.on('submit', function (e) {        e.preventDefault();        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var password = encodeURI($('#changePassword-form-password').val());        $.ajax({            type: 'get',            url: $(this).attr('action') + '/' + password,            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            contentType: 'application/json',            success: function (response) {                $('#modal-changePassword').modal('hide');                changePasswordForm.trigger('reset');                showNotification(response.message, 'Success', SUCCESS);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });    });    userProfileForm.validate({        rules: {            required: true,            nume: {                minlength: 3            },            prenume: {                minlength: 3            },            email: {                email: true,                required: false            },            workTel: {                number: true,                minlength: 10,                required: false            },            tel: {                number: true,                minlength: 10,                required: false            },            fax: {                number: true,                minlength: 10,                required: false            }        },        messages: {            nume: {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Numele trebuie s&#259; aib&#259; 3 sau mai multe caractere"            },            prenume: {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Prenumele trebuie s&#259; aib&#259; 3 sau mai multe caractere"            },            username: {                required: "Acest c&#226;mp este obligatoriu"            },            email: {                email: "Introduce&#539;i un e-mail valid"            },            workTel: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre",                number: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            },            tel: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre",                number: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            },            fax: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre",                number: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            }        }    });    userProfileForm.on('submit', function (e) {        e.preventDefault();        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var nume = $('#userProfile-form-nume').val();        var prenume = $('#userProfile-form-prenume').val();        var username = $('#userProfile-form-username').val();        var email = $('#userProfile-form-email').val();        var workTel = $('#userProfile-form-workTel').val();        var tel = $('#userProfile-form-tel').val();        var fax = $('#userProfile-form-fax').val();        var idProfil = $('#userProfile-form-id-profil').val();        var data = {            'nume': nume,            'prenume': prenume,            'username': username,            'email': email,            'workTel': workTel,            'tel': tel,            'fax': fax,            'idProfil': idProfil        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            data: JSON.stringify(data),            contentType: 'application/json',            success: function (response) {                $('#modal-userProfile').modal('hide');                userProfileForm.trigger('reset');                showNotification(response.message, 'Success', SUCCESS);                $('#user-table').DataTable().ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });    });    userEditForm.validate({        rules: {            required: true,            nume: {                minlength: 3            },            prenume: {                minlength: 3            },            email: {                email: true,                required: false            },            workTel: {                number: true,                minlength: 10,                required: false            },            tel: {                number: true,                minlength: 10,                required: false            },            fax: {                number: true,                minlength: 10,                required: false            }        },        messages: {            nume: {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Numele trebuie s&#259; aib&#259; 3 sau mai multe caractere"            },            prenume: {                required: "Acest c&#226;mp este obligatoriu",                minlength: "Prenumele trebuie s&#259; aib&#259; 3 sau mai multe caractere"            },            username: {                required: "Acest c&#226;mp este obligatoriu"            },            email: {                email: "Introduce&#539;i un e-mail valid"            },            workTel: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre",                number: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            },            tel: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre",                number: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            },            fax: {                minlength: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre",                number: "Num&#259;rul trebuie s&#259; aib&#259; 10 sau mai multe cifre"            }        }    });    userEditForm.on('submit', function (e) {        e.preventDefault();        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var nume = $('#editUser-form-nume').val();        var prenume = $('#editUser-form-prenume').val();        var username = $('#editUser-form-username').val();        var email = $('#editUser-form-email').val();        var workTel = $('#editUser-form-workTel').val();        var tel = $('#editUser-form-tel').val();        var fax = $('#editUser-form-fax').val();        var idProfil = $('#editUser-form-id-profil').val();        var roleArray = $('#editUser-form-roles').val();        var roles = '';        $.each(roleArray, function (i) {            roles += roleArray[i].concat(',');        });        var data = {            'nume': nume,            'prenume': prenume,            'username': username,            'email': email,            'workTel': workTel,            'tel': tel,            'fax': fax,            'idProfil': idProfil,            'roles': roles        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            data: JSON.stringify(data),            contentType: 'application/json',            success: function (response) {                $('#modal-editUser').modal('hide');                userEditForm.trigger('reset');                showNotification(response.message, 'Success', SUCCESS);                $('#user-table').DataTable().ajax.reload(null, false);            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });    });    $(document).on('show.bs.modal', '#modal-userProfile', function () {        getProfile();    });    addTipContinutForm.validate({        rules: {            required: true        },        messages: {            text: {required: "Acest c&#226;mp este obligatoriu"}        }    });    addTipContinutForm.on('submit', function (e) {        e.preventDefault();        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var tipContinut = $('#addTipContinut-form-text').val();        var dataToSend = {            "tipContinut": tipContinut        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-addTipContinut').modal('hide');                addTipContinutForm.trigger('reset');                showNotification(response.message, 'Success', SUCCESS);                getAllTipContinut('addRegistru-aoug-form-idTipContinut');                getAllTipContinut('addRegistru-ogb-form-idTipContinut');                getAllTipContinut('addIntrare-form-idTipContinut');                getAllTipContinut('addCondica-form-idTipContinut');            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });    });    addDestinarForm.validate({        rules: {            required: true        },        messages: {            destinatar: {required: "Acest c&#226;mp este obligatoriu"}        }    });    addDestinarForm.on('submit', function (e) {        e.preventDefault();        if (!$(this).valid()) {            return;        }        var token = $("meta[name='_csrf']").attr("content");        var header = $("meta[name='_csrf_header']").attr("content");        var destinatar = $('#addDestinar-form-destinatar').val();        var dataToSend = {            "destinatar": destinatar        };        $.ajax({            type: 'post',            url: $(this).attr('action'),            beforeSend: function (xhr) {                xhr.setRequestHeader(header, token);            },            async: false,            dataType: 'json',            contentType: 'application/json',            mimeType: 'application/json',            data: JSON.stringify(dataToSend),            success: function (response) {                $('#modal-addDestinatar').modal('hide');                addDestinarForm.trigger('reset');                showNotification(response.message, 'Success', SUCCESS);                getAllDestinatari('addRegistru-aoug-form-idDestinatar');                getAllDestinatari('addRegistru-ogb-form-idDestinatar');                getAllDestinatari('addIesire-form-catreCineSALucrat');                getAllDestinatari('addCondica-form-idDestinatar');            },            error: function () {                showNotification("Error. Mai &#238;ncerca&#539;i o dat&#259;.", "Eroare", ERROR);            }        });    });    $(document).on('click', '.input-group-addon', function () {        $(this).parent().find('input').focus();    });    $(document).on('click', '#confirm-format-fizic-button', function () {        confirmModalFormatFizicYes();    });    $(document).on('click', '#not-confirm-format-fizic-button', function () {        confirmModalFormatFizicNo();    });    $(document).on('click', '#confirm-anulare-button', function () {        confirmModalAnulareYes();    });    $(document).on('click', '#not-confirm-anulare-button', function () {        confirmModalAnulareNo();    });    $('.anulat').prop('disabled', 'disabled');    $(document).on('change', 'input.format-fizic', function (e) {        confirmModalFormatFizic($(this));    });});