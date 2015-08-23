[#ftl]
[#assign security=JspTaglibs["http://www.springframework.org/security/tags"] /]
[#include "../formMacros.ftl"]

[#macro basic]
    [#include "header.ftl"/]
    <div id="sb-site">
    [#nested]
    </div>
    [#include "footer.ftl"/]

    [@smallModalForm "modal-changePassword" "SCHIMBA_PAROLA" "/app/secure/profil/schimba-parola" "SAVE.CHANGES" "key"]
        [#include "../dialogs/changePassword.ftl"]
    [/@smallModalForm]
    [@modalForm "modal-userProfile" "MODAL.USERPROFILE" "/app/secure/profil/save-user" "SAVE.CHANGES" "user"]
        [#include "../dialogs/profileForm.ftl"]
    [/@modalForm]
    [@security.authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SUPERUSER')"]
        [@smallModalForm "modal-addTipContinut" "ADD_TIP_CONTINUT" "/app/secure/registru/add-tip-continut" "ADD_INTRARE" "ticket"]
            [#include "../dialogs/addTipContinutForm.ftl"]
        [/@smallModalForm]
        [@smallModalForm "modal-addDestinatar" "ADD_DESTINATAR" "/app/secure/registru/add-destinatar" "ADD_INTRARE" "user"]
            [#include "../dialogs/addDestinatarForm.ftl"]
        [/@smallModalForm]
    [/@security.authorize]
</body>

<script src="/js/jquery-2.1.4.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/bootstrap.file-input.js"></script>
<script src="/js/bootstrap-modalmanager.js"></script>
<script src="/js/bootstrap-modal.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/js/bootstrap-datepicker.js"></script>
<script src="/js/chosen.jquery.js"></script>
<script src="/js/dataTables.min.js"></script>
<script src="/js/dataTables-bootstrap.js"></script>
<script src="/js/dataTables-tools.js"></script>
<script src="/js/toastr.js"></script>
<script src="/js/jquery.validate.min.js"></script>
<script src="/js/additional-methods.min.js"></script>
<script src="/js/popover.js"></script>
<script src="/js/registru.js"></script>

</html>
[/#macro]
