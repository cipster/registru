[#ftl]
[#import "layouts/layouts.ftl" as layout/]
[#include "content.ftl" /]
[#include "formMacros.ftl" /]
[@layout.basic]
    [@dashboard]
        <div class="well">
            <ul class="list-group">
                <a class="list-group-item" href="/registru-general">[@spring.message "REGISTRU_GENERAL"/]</a>
                <a class="list-group-item" href="/registru-aoug">[@spring.message "REGISTRU_AOUG"/]</a>
                <a class="list-group-item" href="/registru-ogb">[@spring.message "REGISTRU_OGB"/]</a>
                <a class="list-group-item" href="/condica">[@spring.message "CONDICA"/]</a>
            </ul>
        </div>

    [/@dashboard]
[/@layout.basic]

<script type="text/javascript" src="/js/static/dashboard.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $('#dashboard').addClass('active');
    });
</script>