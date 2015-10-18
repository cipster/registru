[#ftl]
[#include "../formMacros.ftl"]

[@rowBreak/]
[@modalContainer]
    [@adminInput "addIntrare-form-nrCrt" "nrCrt" "REGISTRU.NR_CRT" "REGISTRU.NR_CRT.PLACEHOLDER" "" "6"/]
    [@adminDatepicker "addIntrare-form-dataIntrarii" "dataIntrarii" "REGISTRU.DATA_INTRARII" "DATA.PLACEHOLDER" "6"/]
    [@rowBreak/]
    [@input "addIntrare-form-nrHartieiIntrate" "nrHartieiIntrate" "REGISTRU.NR_HARTIEI_INTRARE" "REGISTRU.NR_HARTIEI_INTRARE.PLACEHOLDER" "" "6"/]
    [@input "addIntrare-form-deLaCineVineCorespondenta" "deLaCineVineCorespondenta" "REGISTRU.DE_LA_CINE_VINE_CORESPONDENTA" "REGISTRU.DE_LA_CINE_VINE_CORESPONDENTA.PLACEHOLDER" "" "6"/]
    [@input "addIntrare-form-rezolutiiSiTermene" "rezolutiiSiTermene" "REGISTRU.REZOLUTII_SI_TERMENE" "REGISTRU.REZOLUTII_SI_TERMENE.PLACEHOLDER" "" "6"/]
    [@elementWithLink "modal-addTipContinut" "ADD_TIP_CONTINUT" "6"]
        [@embedableSelectBox "addIntrare-form-idTipContinut" "idTipContinut" "REGISTRU.TIP_CONTINUT" "SELECT.PLACEHOLDER" "SEARCH.NO_RESULTS" ] [/@embedableSelectBox]
    [/@elementWithLink]
    [@checkbox "addIntrare-form-formatFizic" "formatFizic" "REGISTRU.PRIMIT_PRIN_POSTA_FORM" "" "6"/]
    [@textarea "addIntrare-form-continut" "continut" "REGISTRU.CONTINUT" "CONTINUT.PLACEHOLDER" "12"/]
[/@modalContainer]
