[#ftl][#include "../formMacros.ftl"][@modalContainer]    [@input "addCondica-form-nrInregistrare" "nrInregistrare" "REGISTRU.NR_REGISTRU" "NR_REGISTRU.PLACEHOLDER" "" "6"/]    [@datepicker "addCondica-form-dataInregistrare" "dataInregistrare" "REGISTRU.DATA" "DATA.PLACEHOLDER" "6"/]    [@rowBreak/]    [@input "addCondica-form-emitent" "emitent" "REGISTRU.FROM" "FROM.PLACEHOLDER" "" "6"/]    [@elementWithLink "modal-addDestinatar" "ADD_DESTINATAR" "6"]        [@embedableSelectBox "addCondica-form-idDestinatar" "idDestinatar" "REGISTRU.TO" "TO.PLACEHOLDER" "SEARCH.NO_RESULTS" ] [/@embedableSelectBox]    [/@elementWithLink][/@modalContainer]