[#ftl]
[#include "../formMacros.ftl"]

[@rowBreak/]
[@modalContainer]
    [@input "addRegistru-form-nrRegistru" "nrRegistru" "REGISTRU.NR_REGISTRU" "NR_REGISTRU.PLACEHOLDER" "" "3"/]
    <div class="col-md-1 form-group" style="height:25px;margin-top:27px;"><span class="text-bold" style="position:relative;bottom: 0">/DRP/</span></div>
    [@datepicker "addRegistru-form-data" "data" "REGISTRU.DATA" "DATA.PLACEHOLDER" "3"/]
    [@elementWithLink "modal-addTipContinut" "ADD_TIP_CONTINUT" "5"]
        [@embedableSelectBox "addRegistru-form-idTipContinut" "idTipContinut" "REGISTRU.TIP_CONTINUT" "SELECT.PLACEHOLDER" "SEARCH.NO_RESULTS" ] [/@embedableSelectBox]
    [/@elementWithLink]
    [@input "addRegistru-form-deLa" "deLa" "REGISTRU.FROM" "FROM.PLACEHOLDER" "" "6"/]
    [@input "addRegistru-form-catre" "catre" "REGISTRU.TO" "TO.PLACEHOLDER" "" "6"/]

    [@textarea "addRegistru-form-continut" "continut" "REGISTRU.CONTINUT" "CONTINUT.PLACEHOLDER" "12"/]
[/@modalContainer]
