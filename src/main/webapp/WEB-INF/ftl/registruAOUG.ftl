[#ftl][#import "layouts/layouts.ftl" as layout][#assign security=JspTaglibs["http://www.springframework.org/security/tags"] /][#include "content.ftl"][#include "formMacros.ftl"][@layout.basic]    [@sidebar]    <div class="pull-right">        [@searchbox "registru-aoug-search" "registru-aoug-table"/]        [@security.authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SUPERUSER')"]            <div class="list-group">                [@listItemOpenModal "addRegistru-aoug" "ADD_INREGISTRARE" "modal-addRegistru-aoug" "plus fa-1-5x"/]            </div>            <div class="list-group">                [@listItemButton "anuleazaCondica" "ANULEAZA_INREGISTRARE" "ban fa-1-5x"/]            </div>            <div class="list-group">                [@listItemOpenModal "addTipContinut" "ADD_TIP_CONTINUT" "modal-addTipContinut" "ticket fa-1-5x"/]            </div>        [/@security.authorize]    </div>    [/@sidebar]    [@content]            [@ajaxDataTable "registru-aoug-table"]            <th width="80"> [@spring.message "REGISTRU.NR_REGISTRU"/] </th>            <th width="100"> [@spring.message "REGISTRU.DATA"/] </th>            <th width="150"> [@spring.message "REGISTRU.NR_SI_DATA_DOCUMENT"/] </th>            <th> [@spring.message "REGISTRU.FROM"/] </th>            <th> [@spring.message "REGISTRU.CONTINUT"/] </th>            <th width="100"> [@spring.message "REGISTRU.DATA_EXPEDIERE"/] </th>            <th> [@spring.message "REGISTRU.TO"/] </th>            <th width="100"> [@spring.message "REGISTRU.PRIMIT_PRIN_POSTA"/] </th>            [/@ajaxDataTable]        [@security.authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SUPERUSER')"]            [@modalForm "modal-addRegistru-aoug" "ADD_INREGISTRARE" "/app/secure/registru/add-aoug" "ADD_INTRARE" "book"]                [#include "dialogs/addAOUGForm.ftl"]            [/@modalForm]        [/@security.authorize]    [/@content][/@layout.basic]<script src="/js/static/registruAOUG.js"></script>