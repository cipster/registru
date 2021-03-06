[#ftl]
[#include "../formMacros.ftl"]

[@rowBreak/]
[@modalContainer]
    [@hiddenInput "editIntrare-form-idIntrare" "idIntrare"/]
    [@hiddenInput "editIntrare-form-creatDe" "creatDe"/]
    [@hiddenInput "editIntrare-form-creatLa" "creatLa"/]
    [@input "editIntrare-form-nrCrt" "nrCrt" "REGISTRU.NR_CRT" "REGISTRU.NR_CRT.PLACEHOLDER" "" "6"/]
    [@datepicker "editIntrare-form-dataIntrarii" "dataIntrarii" "REGISTRU.DATA_INTRARII" "DATA.PLACEHOLDER" "6"/]
    [@rowBreak/]
    [@input "editIntrare-form-nrHartieiIntrate" "nrHartieiIntrate" "REGISTRU.NR_HARTIEI_INTRARE" "REGISTRU.NR_HARTIEI_INTRARE.PLACEHOLDER" "" "6"/]
    [@input "editIntrare-form-deLaCineVineCorespondenta" "deLaCineVineCorespondenta" "REGISTRU.DE_LA_CINE_VINE_CORESPONDENTA" "REGISTRU.DE_LA_CINE_VINE_CORESPONDENTA.PLACEHOLDER" "" "6"/]
    [@input "editIntrare-form-rezolutiiSiTermene" "rezolutiiSiTermene" "REGISTRU.REZOLUTII_SI_TERMENE" "REGISTRU.REZOLUTII_SI_TERMENE.PLACEHOLDER" "" "6"/]
    [@elementWithLink "modal-addTipContinut" "ADD_TIP_CONTINUT" "6"]
        [@embedableSelectBox "editIntrare-form-idTipContinut" "idTipContinut" "REGISTRU.TIP_CONTINUT" "SELECT.PLACEHOLDER" "SEARCH.NO_RESULTS" ] [/@embedableSelectBox]
    [/@elementWithLink]
    [@checkbox "editIntrare-form-formatFizic" "formatFizic" "REGISTRU.PRIMIT_PRIN_POSTA_FORM" "" "6"/]
    [@textarea "editIntrare-form-continut" "continut" "REGISTRU.CONTINUT" "CONTINUT.PLACEHOLDER" "12"/]
[/@modalContainer]
