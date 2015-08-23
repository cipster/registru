[#ftl]
[#import "layouts/layouts.ftl" as layout]
[#assign security=JspTaglibs["http://www.springframework.org/security/tags"] /]
[#include "content.ftl"]
[#include "formMacros.ftl"]
[@layout.basic]
    [@sidebar]
    <div class="pull-right">
        [@searchbox "registru-general-search" "registru-table"/]
        [@security.authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SUPERUSER')"]
            <div class="list-group">
                [@listItemOpenModal "addIntrare" "BUT_ADD_INTRARE" "modal-addIntrare" "sign-in fa-1-5x"/]
            </div>
            <div class="list-group">
                [@listItemOpenModal "addIesire" "BUT_ADD_IESIRE" "modal-addIesire" "sign-out fa-1-5x"/]
            </div>
            <div class="list-group">
                [@listItemButton "anuleazaCondicaIntrare" "ANULEAZA_INREGISTRARE" "ban fa-1-5x"/]
            </div>
            <div class="list-group">
                [@listItemButton "anuleazaCondicaIesire" "ANULEAZA_INREGISTRARE" "ban fa-1-5x"/]
            </div>
            <div class="list-group">
                [@listItemOpenModal "addTipContinut" "ADD_TIP_CONTINUT" "modal-addTipContinut" "ticket fa-1-5x"/]
            </div>
        [/@security.authorize]
    </div>
    [/@sidebar]
    [@content]

        <div>
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#intrare" aria-controls="intrare" role="tab" data-toggle="tab">[@spring.message "INTRARE"/]</a></li>
                <li role="presentation"><a href="#iesire" aria-controls="iesire" role="tab" data-toggle="tab">[@spring.message "IESIRE"/]</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="intrare">
                    [@rowBreak/]
                    [@rowBreak/]
                    [@ajaxDataTable "intrare-table"]
                        <th> [@spring.message "REGISTRU.NR_CRT"/] </th>
                        <th> [@spring.message "REGISTRU.DATA_INTRARII"/] </th>
                        <th> [@spring.message "REGISTRU.NR_HARTIEI_INTRARE"/] </th>
                        <th> [@spring.message "REGISTRU.DE_LA_CINE_VINE_CORESPONDENTA"/] </th>
                        <th> [@spring.message "REGISTRU.TIP_CONTINUT"/] </th>
                        <th> [@spring.message "REGISTRU.CONTINUT"/] </th>
                        <th> [@spring.message "REGISTRU.REZOLUTII_SI_TERMENE"/] </th>
                        <th> [@spring.message "REGISTRU.PRIMIT_PRIN_POSTA"/] </th>
                    [/@ajaxDataTable]
                </div>
                <div role="tabpanel" class="tab-pane fade" id="iesire">
                    [@rowBreak/]
                    [@rowBreak/]
                    [@ajaxDataTable "iesire-table"]
                        <th> [@spring.message "REGISTRU.DATA_IESIRII"/] </th>
                        <th> [@spring.message "REGISTRU.REZOLVARE"/] </th>
                        <th> [@spring.message "REGISTRU.CATRE_CINE_S_A_LUCRAT"/] </th>
                        <th> [@spring.message "REGISTRU.NR_DOSAR_SI_AN"/] </th>
                        <th> [@spring.message "REGISTRU.DATA_SI_NR_INTRARE"/] </th>
                        <th> [@spring.message "REGISTRU.NR_SI_DATA_REVENIRE"/] </th>
                        <th> [@spring.message "REGISTRU.PRIMIT_PRIN_POSTA"/] </th>
                    [/@ajaxDataTable]
                </div>
            </div>

        </div>
        [@security.authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SUPERUSER')"]
            [@modalForm "modal-addIntrare" "BUT_ADD_INTRARE" "/app/secure/registru/add-intrare" "ADD_INTRARE" "book"]
                [#include "dialogs/addIntrareForm.ftl"]
            [/@modalForm]

            [@modalForm "modal-addIesire" "BUT_ADD_IESIRE" "/app/secure/registru/add-iesire" "ADD_INTRARE" "book"]
                [#include "dialogs/addIesireForm.ftl"]
            [/@modalForm]
        [/@security.authorize]

    [/@content]
[/@layout.basic]
<script src="/js/static/registruGeneral.js"></script>