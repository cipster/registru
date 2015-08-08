[#ftl]
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="Raindrop">
    <meta name="author" content="Raindrop Solutions">

    <meta name="_csrf" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>

    <link rel="icon" href="http://gov.ro/front/view/img/logo.png">

    <title>[@spring.message "APPTITLE" /]</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/bootstrap-modal.css" rel="stylesheet">
    <link href="/fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="/css/chosen.css" rel="stylesheet">
    <link href="/css/datepicker.css" rel="stylesheet">
    <link href="/css/dataTables-bootstrap.css" rel="stylesheet">
    <link href="/css/dropzone.css" rel="stylesheet">
    <link href="/css/registru.css" rel="stylesheet">
</head>
<body class="unselectable" oncontextmenu="return false;">
<nav class="navbar navbar-raindrop navbar-fixed-top unselectable" role="navigation">
    <div class="container-raindrop">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/"><img style="height:90px;width: auto; display: inline;" src="http://gov.ro/front/view/img/logo.png"/></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li id="dashboard"><a href="/"><i class="fa fa-home" style="font-size: 1.3em;"></i>&nbsp;[@spring.message "HOME"/]</a></li>
            </ul>
            <ul class="nav navbar-nav">
                <li id="registru-general"><a href="/registru-general">[@spring.message "REGISTRU_GENERAL"/]</a></li>
            </ul>
            <ul class="nav navbar-nav">
                <li id="registru-aoug"><a href="/registru-aoug">[@spring.message "REGISTRU_AOUG"/]</a></li>
            </ul>
            <ul class="nav navbar-nav">
                <li id="registru-ogb"><a href="/registru-ogb">[@spring.message "REGISTRU_OGB"/]</a></li>
            </ul>
            <ul class="nav navbar-nav">
                <li id="condica"><a href="/condica">[@spring.message "CONDICA"/]</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
            [@security.authorize ifAnyGranted="ROLE_ADMIN"]
                <li id="admin"><a href="/administration">[@spring.message "ADMIN"/]</a></li>
            [/@security.authorize]
                <li class="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <a class="dropdown-toggle">
                        <span id="username" data-toggle="tooltip" data-placement="bottom"></span>&nbsp;<i class="fa fa-user"></i>
                    </a>
                </li>
                    <ul class="dropdown-menu pull-right">
                        <li>
                            <a data-toggle="modal" data-target="#modal-userProfile">
                                <span class="fa fa-user fa-fw">&nbsp;</span>[@spring.message "PROFILE"/]
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="javascript:formSubmit();">
                                <span class="fa fa-power-off fa-fw">&nbsp;</span>[@spring.message "LOGOUT"/]
                            </a>
                        </li>
                    </ul>
            </ul>
        </div>
    </div>
</nav>
<!--[if IE 5]>
<p>HI, WHAT IS THE PAST LIKE?</p>
<![endif]-->