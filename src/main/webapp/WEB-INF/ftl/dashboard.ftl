[#ftl]
[#import "layouts/layouts.ftl" as layout/]
[#include "content.ftl" /]
[#include "formMacros.ftl" /]
[@layout.basic]
    [@dashboard]
    <div class="well">
        <ul class="list-group">
            <li class="list-group-item lead"><a href="/registru-general">[@spring.message "REGISTRU_GENERAL"/]</a></li>
            <li class="list-group-item lead"><a href="/registru-aoug">[@spring.message "REGISTRU_AOUG"/]</a></li>
            <li class="list-group-item lead"><a href="/registru-ogb">[@spring.message "REGISTRU_OGB"/]</a></li>
            <li class="list-group-item lead"><a href="/condica">[@spring.message "CONDICA"/]</a></li>
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