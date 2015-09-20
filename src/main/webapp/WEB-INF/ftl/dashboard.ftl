[#ftl]
[#import "layouts/layouts.ftl" as layout/]
[#include "content.ftl" /]
[#include "formMacros.ftl" /]
[@layout.basic]
    [@dashboard]
    <div class="well">
        [@modalContainer]
            [@form "search-general" "/app/secure/registru/search-general" "post"]
            [@checkbox "use-intrare" "useIntrare" "USE_INTRARE" "" "2"/]
            [@checkbox "use-iesire" "useIesire" "USE_IESIRE" "" "2"/]
            [@checkbox "use-aoug" "useAoug" "USE_AOUG" "" "2"/]
            [@checkbox "use-ogb" "useOgb" "USE_OGB" "" "2"/]
            [@checkbox "use-condica" "useCondica" "USE_CONDICA" "" "3"/]

            [@input "search-nrInregistrare" "nrInregistrare" "REGISTRU.NR_REGISTRU" "NR_REGISTRU.PLACEHOLDER" "" "4"/]
            [@rangeDatepicker "search-dataInregistrare-from" "search-dataInregistrare-to" "dataInregistrareFrom" "dataInregistrareTo" "REGISTRU.DATA" "DATA.PLACEHOLDER" "4"/]
            [@input "search-nrSiDataDocumentului" "nrSiDataDocumentului" "REGISTRU.NR_SI_DATA_DOCUMENT" "REGISTRU.NR_SI_DATA_DOCUMENT.PLACEHOLDER" "" "4"/]
            [@input "search-emitent" "emitent" "REGISTRU.DE_LA_CINE_VINE_CORESPONDENTA" "REGISTRU.DE_LA_CINE_VINE_CORESPONDENTA.PLACEHOLDER" "" "4"/]
            [@selectBoxMulti "search-tipContinut" "tipContinut" "REGISTRU.TIP_CONTINUT" "TIP_CONTINUT.PLACEHOLDER" "" "4"/]
            [@input "search-continut" "continut" "REGISTRU.CONTINUT" "CONTINUT.PLACEHOLDER" "" "4"/]
            [@rangeDatepicker "search-dataExpediere-from" "search-dataExpediere-to" "dataExpediereFrom" "dataExpediereTo" "REGISTRU.DATA_EXPEDIERE" "DATA_EXPEDIERE.PLACEHOLDER" "4"/]
            [@input "search-destinatar" "destinatar" "DESTINATAR" "DESTINATAR.PLACEHOLDER" "" "4"/]
            [@checkbox "use-anulat" "useAnulat" "USE_ANULAT" "" "2"/]
            [@checkbox "use-rezervat" "useRezervat" "USE_REZERVAT" "" "2"/]
            [@buttonRow]
                [@buttonSubmit "btn-cauta" "SEARCH" "primary" "cog fa-spin"/]
            [/@buttonRow]
        [/@form]
        [/@modalContainer]
    </div>

    [/@dashboard]
[/@layout.basic]

<script type="text/javascript" src="/js/static/dashboard.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $('#dashboard').addClass('active');
    });
</script>