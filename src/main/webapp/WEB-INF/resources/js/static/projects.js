var addProjectForm = $('#modal-addProiect-form');
var addClientForm = $('#modal-addClient-form');
var addCategoryForm = $('#modal-addCategory-form');
var projectsTable;

function getClients() {
    var clientsSelect = $('#addProject-form-client');
    clientsSelect.html(EMPTY);
    clientsSelect.append("<option></option>");
    $.ajax({
        type: 'get',
        url: '/app/secure/projects/getclients',
        contentType: "application/json",
        async: false,
        success: function (response) {
            if (typeof response !== 'undefined') {
                for (var i = 0; i < response.length; i++) {
                    clientsSelect.append($("<option>").val(response[i].idClient).text(response[i].numeClient));
                }
            }
            clientsSelect.trigger(chosenUpdated);
        },
        error: function (e) {
            showNotification("Error. Please try again later." + e.Message, "Error", DANGER);
        }
    });
}

function getCategories() {
    var categoriesSelect = $('#addProject-form-category');
    var parentCategoriesSelect = $('#addCategory-form-categorie-parinte');
    categoriesSelect.html(EMPTY);
    parentCategoriesSelect.html(EMPTY);
    categoriesSelect.append("<option></option>");
    parentCategoriesSelect.append("<option></option>");
    $.ajax({
        type: 'get',
        url: '/app/secure/projects/getcategories',
        contentType: "application/json",
        async: false,
        success: function (response) {
            if (typeof response !== 'undefined') {
                for (var i = 0; i < response.length; i++) {
                    categoriesSelect.append($("<option>").val(response[i].idCategorieProiect).text(response[i].nume));
                    parentCategoriesSelect.append($("<option>").val(response[i].idCategorieProiect).text(response[i].nume));
                }
            }
            categoriesSelect.trigger(chosenUpdated);
            parentCategoriesSelect.trigger(chosenUpdated);
        },
        error: function (e) {
            showNotification("Error. Please try again later." + e.Message, "Error", DANGER);
        }
    });
}

function deleteProject(id) {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    $.ajax({
        method: 'get',
        dataType: "json",
        url: '/app/secure/projects/deleteproject/' + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (response) {
            showNotification(response.message, 'Success', SUCCESS);
        },
        error: function () {
            showNotification("Error. Please try again later.", "Error", ERROR);
        }
    });
}

function getProjects() {
    var projectContainer = $('#project-container');
    projectContainer.empty();
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    var tableHeader = '<table id="project-table" class="table table-hover table-responsive">'
        + '<thead><tr class="text-table-head">'
        + '<td>Name</td>'
        + '<td>Category</td>'
        + '<td>Start Date</td>'
        + '<td>End Date</td>'
        + '</tr></thead><tbody>';
    $.ajax({
        method: 'get',
        dataType: "json",
        url: '/app/secure/projects/getprojects',
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (response) {
            var rows = [];
            var projectString;
            if (response.length <= 0) {
                projectContainer.html('<div class="panel text-center"><div class="panel-body"><h2><span class="text-muted"> No projects are defined, use the ' + $('#addProiect-open').parent().html() + '  button to define new projects</span></h2></div></div>');
                return;
            }
            $.each(response, function (i, proj) {
                var idProiect = proj.idProiect;
                var numeProiect = proj.numeProiect;
                var categorie = proj.idCategorieProiect;
                var dataNow = new Date();
                var dataEnd = toJSDateTime(proj.dataEndEstimativa);
                var dataStart = toJSDateTime(proj.dataStart);
                var isOverdue = dataNow > new Date(proj.dataEndEstimativa);
                var overdue = '';
                if (isOverdue && proj.idStatusProiect == '3') {
                    overdue = '<span class="fa fa-exclamation-circle text-danger" data-toggle="tooltip" data-placement="bottom" title="Project is overdue">&nbsp;</span>';
                }
                projectString = '<tr id="proiect-item' + idProiect + '" class="project-item"><td>'
                    + '<a id="project-options' + idProiect + '" tabindex="0" role="button" class="btn-xs popup-marker" data-load="idProiect=' + idProiect
                    + '" data-placement="bottom"><span class="fa fa-sliders"></span></a>'
                    + '&nbsp;&nbsp;<span id="proiect-nume-' + idProiect + '" class="proiect-nume">' + overdue + numeProiect + '</span></td>'
                    + '<td>' + categorie + '</td>'
                    + '<td><p id="proiect-data-start-' + idProiect + '" class="proiect-date"> ' + dataStart + '</p></td>'
                    + '<td><p id="proiect-data-end-' + idProiect + '" class="proiect-date"> ' + dataEnd + '</p>'
                    + '</td></tr>';
                rows.push(projectString);
            });
            var tableFooter = '</tbody></table>';
            projectContainer.html(tableHeader + rows.join('') + tableFooter);
            projectsTable = $('#project-table').DataTable({
                "sDom": 'ltipr',
                "columns": [
                    {
                        "bSortable": true,
                        "orderable": true,
                        "searchable": true
                    }, {
                        "bSortable": true,
                        "orderable": true,
                        "searchable": true
                    },
                    {
                        "bSortable": false,
                        "orderable": false,
                        "searchable": true
                    },
                    {
                        "bSortable": false,
                        "orderable": false,
                        "searchable": true
                    }
                ]

            });
            $("#project-search").on('keyup', function () {
                projectsTable.search(this.value).draw();
            });

            $('[data-toggle="tooltip"]').tooltip();
        },
        error: function () {

        }
    });

}

$(document).ready(function () {
    $('#projects').addClass('active');

    getProjects();
    getClients();
    getCategories();

    $('body').on('mouseover', '.project-item', function () {
        $(this).find('a.popup-marker').webuiPopover($.extend({}, popoverDefaultSettings, {
                    type: 'html',//content type, values:'html','iframe','async'
                    url: '',//if not empty ,plugin will load content by url
                    title: '',//the popover title ,if title is set to empty string,title bar will auto hide
                    content: function (e) {
                        var retValue;
                        var data = $($(this)[0]).data('load').split('=');
                        var idProject = data[1];
                        retValue = '<div class="popover-left-column"><ul class="popover-options">'
                            + '<li><a><span class="fa fa-group fa-fw">&nbsp;</span>&nbsp; People</a></li>'
                            + '<li><a><span class="fa fa-tasks fa-fw">&nbsp;</span>&nbsp; Tasks</a></li>'
                            + '<li><a><span class="fa fa-bookmark-o fa-fw">&nbsp;</span>&nbsp; Milestones</a></li>'
                            + '<li><a><span class="fa fa-bomb fa-fw">&nbsp;</span>&nbsp; Risks</a></li>'
                            + '<li><a><span class="fa fa-archive fa-fw">&nbsp;</span>&nbsp; Archive</a></li>'
                            + '</ul></div>'
                            + '<div class="popover-right-column"><ul class="popover-options">'
                            + '<li><a><span class="fa fa-cog fa-fw">&nbsp;</span>&nbsp; Settings</a></li>'
                            + '<li><a><span class="fa fa-paperclip fa-fw">&nbsp;</span>&nbsp; Files</a></li>'
                            + '<li><a><span class="fa fa-line-chart fa-fw">&nbsp;</span>&nbsp; Report</a></li>'
                            + '<li><a id="pop-proj-del-' + idProject + '"><span class="fa fa-trash-o fa-fw">&nbsp;</span>&nbsp; Delete</a></li>'
                            + '</ul></div>';

                        return retValue;
                    }
                }
            )
        )
    });

    $('body').on('click', 'a[id^="pop-proj-del-"]', function (e) {
        var idProject = $(this).attr('id').replace('pop-proj-del-', '');
        confirmModal('delete-project-confirm-' + idProject, 'Are you sure you want to delete this project?');
    });

    $('body').on('click', 'button[id^=delete-project-confirm-]', function (e) {
        var idProject = $(this).attr('id').replace('delete-project-confirm-', '');
        var modalConfirm;
        idProject = idProject.replace('-yes', '');
        modalConfirm = $('#delete-project-confirm-' + idProject);
        deleteProject(idProject);
        modalConfirm.modal('hide');
        $('body').remove(modalConfirm);
    });

    $('body').on('hidden.bs.modal', 'div[id^=delete-project-confirm-]', function () {
        getProjects();
    });

    addCategoryForm.validate({
        rules: {
            required: true,
            nume: {
                minlength: 3
            }
        }
    });

    addCategoryForm.on('submit', function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");

        var nume = $('#addCategory-form-nume').val();
        var idCategorieParinte = $('#addCategory-form-categorie-parinte').val();

        var data = {
            "nume": nume,
            "idCategorieParinte": idCategorieParinte
        };

        $.ajax({
            type: 'post',
            url: $(this).attr('action'),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token);
            },
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
                    addCategoryForm.trigger('reset');
                    $('#modal-addCategory-close').click();
                    showNotification(response.message, 'Success', SUCCESS);
                }
            },
            error: function () {
                showNotification("Error. Please try again later.", "Error", ERROR);
            }
        });
    });

    $(document).on('hidden.bs.modal', '#modal-addCategory', function (e) {
        getCategories();
    });

    addClientForm.validate({
        rules: {
            required: true,
            numeClient: {
                minlength: 3
            },
            website: {
                required: false,
                url: true
            },
            email: {
                required: false,
                email: true
            },
            telefon: {
                required: false,
                number: true
            },
            fax: {
                required: false,
                number: true
            }
        }
    });

    addClientForm.on('submit', function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");

        var numeClient = $('#addClient-form-nume').val();
        var website = $('#addClient-form-website').val();
        var email = $('#addClient-form-email').val();
        var telefon = $('#addClient-form-telefon').val();
        var fax = $('#addClient-form-fax').val();
        var idIndustrie = $('#addClient-form-industrie').val();
        var adresa = $('#addClient-form-adresa').val();
        var oras = $('#addClient-form-oras').val();
        var judet = $('#addClient-form-judet').val();
        var codPostal = $('#addClient-form-cod-postal').val();
        var idTara = $('#addClient-form-taral').val();
        var data = {
            "numeClient": numeClient, "website": website, "email": email, "telefon": telefon,
            "fax": fax, "idIndustrie": idIndustrie, "adresa": adresa, "oras": oras, "judet": judet,
            "codPostal": codPostal, "idTara": idTara
        };

        $.ajax({
            type: 'post',
            url: $(this).attr('action'),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token);
            },
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
                    addClientForm.trigger('reset');
                    $('#modal-addClient-close').click();
                    showNotification(response.message, 'Success', SUCCESS);
                }
            },
            error: function () {
                showNotification("Error. Please try again later.", "Error", ERROR);
            }
        });
    });

    $(document).on('hidden.bs.modal', '#modal-addClient', function (e) {
        getClients();
    });

    addProjectForm.validate({
        rules: {
            required: true,
            numeProiect: {
                minlength: 5
            },
            descriere: {
                required: false
            }
        }
    });

    addProjectForm.on('submit', function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");

        var numeProiect = $('#addProject-form-nume').val();
        var idStatusProiect = $('#addProject-form-status').val();
        var descriere = $('#addProject-form-descriere').val();
        var idClient = $('#addProject-form-client').val();
        var idCategorieProiect = $('#addProject-form-category').val();
        var dataStart = new Date($('#addProject-form-start-date').val());
        var dataEndEstimativa = new Date($('#addProject-form-end-date').val());
        var data = {
            "numeProiect": numeProiect, "idStatusProiect": idStatusProiect,
            "descriere": descriere, "idClient": idClient,
            "idCategorieProiect": idCategorieProiect,
            "dataStart": dataStart, "dataEndEstimativa": dataEndEstimativa
        };

        $.ajax({
            type: 'post',
            url: $(this).attr('action'),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token);
            },
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
                    addProjectForm.trigger('reset');
                    $('#modal-addProiect-close').click();
                    showNotification(response.message, 'Success', SUCCESS);
                    getProjects();
                }
            },
            error: function () {
                showNotification("Error. Please try again later.", "Error", DANGER);
            }
        });
    });

});
