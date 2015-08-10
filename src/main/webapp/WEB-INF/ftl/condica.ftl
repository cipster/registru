[#ftl][#import "layouts/layouts.ftl" as layout][#assign security=JspTaglibs["http://www.springframework.org/security/tags"] /][#include "content.ftl"][#include "formMacros.ftl"][@layout.basic]    [@sidebar]    <div class="pull-right">        [@searchbox "condica-search" "condica-table"/]        [@security.authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SUPERUSER')"]            <div class="list-group">                [@listItemOpenModal "addCondica" "ADD_INREGISTRARE" "modal-addCondica" "plus"/]            </div>        [/@security.authorize]    </div>    [/@sidebar]    [@content]            [@ajaxDataTable "condica-table"]            <th> [@spring.message "REGISTRU.NR_REGISTRU"/] </th>            <th> [@spring.message "REGISTRU.DATA"/] </th>            <th> [@spring.message "REGISTRU.TO"/] </th>            <th> [@spring.message "REGISTRU.SEMNATURA_PRIMIRE"/] </th>            [/@ajaxDataTable]        [@security.authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SUPERUSER')"]            [@modalForm "modal-addCondica" "ADD_INREGISTRARE" "/app/secure/registru/add-condica" "ADD_INTRARE" "book"]                [#include "dialogs/addCondicaForm.ftl"]            [/@modalForm]        [/@security.authorize]    [/@content][/@layout.basic]<script src="/js/static/condica.js"></script>