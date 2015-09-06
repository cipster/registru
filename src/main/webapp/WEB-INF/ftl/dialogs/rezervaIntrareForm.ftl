[#ftl]
[#include "../formMacros.ftl"]

[@rowBreak/]
[@modalContainer]
    [@selectBox "rezerva-intrare-form-numarInregistrari" "numarInregistrari" "REGISTRU.NR_REGISTRU" "NR_REGISTRU.PLACEHOLDER" "SEARCH.NO_RESULTS"  "6"]
    <option></option>
        [#list 1..50 as option]
        <option value="${option}">${option}</option>
        [/#list]
    [/@selectBox]
    [@datepicker "rezerva-intrare-form-dataInregistrare" "dataInregistrare" "REGISTRU.DATA" "DATA.PLACEHOLDER" "6"/]
[/@modalContainer]
