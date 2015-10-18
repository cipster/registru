[#ftl]
[#include "../formMacros.ftl"]

[@rowBreak/]
[@modalContainer]
    [@selectBox "rezerva-condica-form-numarInregistrari" "numarInregistrari" "NR_INREGISTRARI" "NR_INREGISTRARI.PLACEHOLDER" "SEARCH.NO_RESULTS"  "6"]
    <option></option>
        [#list 1..100 as option]
        <option value="${option}">${option}</option>
        [/#list]
    [/@selectBox]
    [@datepicker "rezerva-condica-form-dataInregistrare" "dataInregistrare" "REGISTRU.DATA" "DATA.PLACEHOLDER" "6"/]
[/@modalContainer]
