[#ftl][#import "layouts/layouts.ftl" as layout][#assign security=JspTaglibs["http://www.springframework.org/security/tags"] /][#include "content.ftl"][#include "formMacros.ftl"][@layout.basic]    [@sidebar]    <div class="pull-right">        [@searchbox "registru-search" "registru-table"/]    </div>    [/@sidebar]    [@content]    [/@content][/@layout.basic]<script src="/js/static/registruOGB.js"></script>