[#ftl]
[#include "../formMacros.ftl"]

[@rowBreak/]
[@modalContainer]
    [@adminInput "addRegistru-aoug-form-nrInregistrare" "nrInregistrare" "REGISTRU.NR_REGISTRU" "NR_REGISTRU.PLACEHOLDER" "" "6"/]
<div class="col-md-1 form-group" style="height:25px;margin-top:27px;"><span class="text-bold" style="position:relative;bottom: 0">/ A /</span></div>
    [@adminDatepicker "addRegistru-aoug-form-dataInregistrare" "dataInregistrare" "REGISTRU.DATA" "DATA.PLACEHOLDER" "5"/]
    [@rowBreak/]
    [@input "addRegistru-aoug-form-nrSiDataDocumentului" "nrSiDataDocumentului" "REGISTRU.NR_SI_DATA_DOCUMENT" "REGISTRU.NR_SI_DATA_DOCUMENT.PLACEHOLDER" "" "6"/]
    [@input "addRegistru-aoug-form-emitent" "emitent" "REGISTRU.FROM" "FROM.PLACEHOLDER" "" "6"/]
    [@rowBreak/]
    [@elementWithLink "modal-addDestinatar" "ADD_DESTINATAR" "6"]
        [@embedableSelectBox "addRegistru-aoug-form-idDestinatar" "idDestinatar" "REGISTRU.TO" "TO.PLACEHOLDER" "SEARCH.NO_RESULTS" ] [/@embedableSelectBox]
    [/@elementWithLink]
    [@datepicker "addRegistru-aoug-form-dataExpediere" "dataExpediere" "REGISTRU.DATA_EXPEDIERE" "DATA_EXPEDIERE.PLACEHOLDER" "6"/]
    [@rowBreak/]
    [@elementWithLink "modal-addTipContinut" "ADD_TIP_CONTINUT" "6"]
        [@embedableSelectBox "addRegistru-aoug-form-idTipContinut" "idTipContinut" "REGISTRU.TIP_CONTINUT" "SELECT.PLACEHOLDER" "SEARCH.NO_RESULTS" ] [/@embedableSelectBox]
    [/@elementWithLink]
    [@checkbox "addRegistru-aoug-form-formatFizic" "formatFizic" "REGISTRU.PRIMIT_PRIN_POSTA_FORM" "" "6"/]
    [@textarea "addRegistru-aoug-form-continut" "continut" "REGISTRU.CONTINUT" "CONTINUT.PLACEHOLDER" "12"/]
[/@modalContainer]
