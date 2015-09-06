[#ftl]
[#include "../formMacros.ftl"]

[@rowBreak/]
[@modalContainer]
    [@hiddenInput "editIesire-form-idIesire" "idIesire"/]
    [@hiddenInput "editIesire-form-creatDe" "creatDe"/]
    [@hiddenInput "editIesire-form-creatLa" "creatLa"/]
    [@datepicker "editIesire-form-dataIesirii" "dataIesirii" "REGISTRU.DATA_IESIRII" "DATA.PLACEHOLDER" "6"/]
    [@input "editIesire-form-rezolvare" "rezolvare" "REGISTRU.REZOLVARE" "REGISTRU.REZOLVARE.PLACEHOLDER" "" "6"/]
    [@elementWithLink "modal-addDestinatar" "ADD_DESTINATAR" "6"]
        [@embedableSelectBox "editIesire-form-catreCineSALucrat" "catreCineSALucrat" "REGISTRU.CATRE_CINE_S_A_LUCRAT" "SELECT.PLACEHOLDER" "SEARCH.NO_RESULTS" ] [/@embedableSelectBox]
    [/@elementWithLink]
    [@input "editIesire-form-nrDosarSiAn" "nrDosarSiAn" "REGISTRU.NR_DOSAR_SI_AN" "REGISTRU.NR_DOSAR_SI_AN.PLACEHOLDER" "" "6"/]
    [@rowBreak/]
    [@selectBox "editIesire-form-dataSiNrDeIntrare" "dataSiNrDeIntrare" "REGISTRU.DATA_SI_NR_INTRARE" "SELECT.PLACEHOLDER" "SEARCH.NO_RESULTS" "6"/]
    [@input "editIesire-form-nrSiDataRevenirii" "nrSiDataRevenirii" "REGISTRU.NR_SI_DATA_REVENIRE" "REGISTRU.NR_SI_DATA_REVENIRE.PLACEHOLDER" "" "6"/]
    [@checkbox "editIesire-form-formatFizic" "formatFizic" "REGISTRU.PRIMIT_PRIN_POSTA_FORM" "" "6"/]
[/@modalContainer]
