<%@page import="java.util.*"%>
<%@page import="MvxAPI.*"%>

<%@ include file="/sors/ServerInstace.jsp"%>
<!DOCTYPE html>
<html lang="he-IL">
<head>

<% 
	
	UUID uuid = UUID.randomUUID();
	String randomUUIDString = uuid.toString();
	
	//String currentSession = (String) session.getAttribute("mobmaintsession");	

	//clears session
	session.removeAttribute("mobmaintsession");
	session.removeAttribute("apiusersession");
	session.removeAttribute("apipasssession");
	

	String connError="";
	String user=request.getParameter("user"); if(user==null) user="";
	String password=request.getParameter("password"); if(password==null) password="";
	
	
	if(!user.equals("") && !password.equals("")){
		
		String program="GENERAL";
		String transaction="GetUserInfo";
		String returncols="ZZUSID";
	
		String host = API_host ;
		int port = Integer.parseInt(API_Port);
	
	
		MvxSockJ miSocket = new MvxSockJ();
		int connectionStatus = miSocket.mvxConnect(host, port, user, password, program, "001");
	
		if (connectionStatus != 0) {
			System.out.println("Connection Status fail=>" + connectionStatus);
			System.out.println(program + "API:\n" + miSocket.mvxGetLastError());
			connError=miSocket.mvxGetLastError();
			
			// throw new MecException("Connection Status fail=>" +
			// connectionStatus);
		
			
		}
	
		miSocket.mvxClose();
		
		if(connError.equals("")){ //login OK
			
			session.setMaxInactiveInterval(28800); //7.6.18 8 hours session
			session.setAttribute("mobmaintsession", randomUUIDString);
			session.setAttribute("apiusersession", user);
			session.setAttribute("apipasssession", password);
			
			response.sendRedirect("index.jsp");
		}
	}
		
%>

<!-- Meta Info -->
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="cache-control" content="no-cache" />
<!-- 24.3.19 -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<meta name="version" content="4.16.2" />
<meta name="commit" content="" />

<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
<!--  ver 4.13
<link rel="stylesheet" href="../sors/infor-4-13-0/css/light-theme.css" />
<link rel="stylesheet" href="../sors/infor-4-13-0/css/demo.css"
	type="text/css">



<script src="../sors/infor-4-13-0/js/jquery-3.3.1.min.js"></script>
<script src="../sors/infor-4-13-0/js/d3.min.js"></script>

<script src="../sors/infor-4-13-0/js/sohoxi.js"></script>
<script src="../sors/infor-4-13-0/js/sohoxi-migrate-4.4.0.js"></script>
 -->

<link rel="stylesheet"
	href="../sors/infor-4-51-1/css/theme-soho-contrast.css" />


<script src="../sors/infor-4-51-1/js/jquery-3.6.0.min.js"></script>


<script src="../sors/infor-4-51-1/js/d3.v5.min.js"></script>
<script src="../sors/infor-4-51-1/js/sohoxi.js"></script>
<script src="../sors/infor-4-51-1/js/sohoxi-migrate-4.4.0.js"></script>

<script src="api-proxy.js"></script>
<script src="../sors/global_sors.js"></script>
<link rel="stylesheet"
	href="../sors/mmt.css" />
<%
//24.3.19 prevent caching of index.js
Random rand = new Random();
int n =rand.nextInt(90000) + 10000;


%>
<!-- 
<script src="index.js?_<%=n%>"></script>
<script src="PoReceipt.js?_<%=n%>"></script>
<script src="MoReport.js?_<%=n%>"></script>
-->

<style>
/*
.header.mmt
{
	height:40px;
}

.header .toolbar {
    height: 40px;
    padding: 0 1rem; }
    
      .header .toolbar .title {
      color: #ffffff;
      height: 40px;
      left: 8px;
      overflow: hidden;
      position: absolute;
      text-overflow: clip; }
      
      
      .header + .application-menu + .page-container {
  height: calc(100% - 40px);
  margin-top: 40px; }
    */
.row-no-need {
	max-width: 1920px; /*27.1.19*/
}

.label {
	margin-bottom: 0px;
}

.field.label-left {
	display: flex;
	font-size: 1.4rem;
	margin: 5px 0;
}

.field.label-left .label {
	color: #5c5c5c;
	font-size: 1.2rem;
	line-height: normal;
	padding-right: 0px;
	position: relative;
}

.field.label-left .label::after {
	content: ': ';
}

.datagrid td {
	background-color: #ffffff;
	border-bottom: 1px solid #bdbdbd;
	border-right: 1px solid #bdbdbd;
	color: #1a1a1a;
	height: 10px;
	line-height: inherit;
	min-height: inherit;
	outline: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.custom-container .dropdown {
	width: 100px;
}


</style>
<title>פורטל מסופונים</title>
</head>


<body class="no-scroll busy-loading-locale">

	<!-- include file="../sors/infor-4-13-0/components/icons/svg.html"%>-->
	<%@include file="../sors/infor-4-51-1/svg/theme-new-svg.html"%>

<div class="page-container scrollable">
    <div class="wrapper">
 <section class="signin" role="main">
<!-- 
        <svg viewBox="0 0 34 34" class="icon icon-logo" focusable="false" aria-hidden="true" role="presentation" aria-label="Infor Logo">
          <use xlink:href="#icon-logo"></use>
        </svg>
-->
<img src="../img/egmo-logo.png" alt="Vargus" />
        <h1></h1>
 <form id="signin" data-validate-on-not-working="submit" autocomplete="off" method="post" action="login.jsp">
        <div class="field">
          <label for="username-display">שם משתמש</label>
          <input type="text" name="user" id="user" autocomplete="off" data-validate="required">
        </div>

        <div class="field">
          <label for="password-display">סיסמה</label>
          <input type="password" id="password" name="password" data-validate="required">
        </div>
     

       
            <button class="btn-primary" type="submit">התחבר</button>
         

        </form>
        	<div class="row"  style="margin-top: 4px">
					<div class="six columns">
          <h5>version 2021.5.25.001</h5>
          </div>
          </div>
    </section>
    </div></div>
     
  <script nonce="0184b957">
    // Initialize all IDS Enterprise Controls and set the locale
    var initialLocale = 'en-US';
    initialLocale = 'he-IL';
   
    $("#user").keydown(function(event) { // 31.12.15
    	//console.log(event.keyCode);
    	if (event.keyCode == 13) { // Enter
		event.stopPropagation();
		  $("#password").select();
		  $("#password").focus();
    	}
	});
  var  connError="<%=connError%>";
  if(connError!=""){
	$('body').message({
		title : '<span>Application Alert</span>',
		status : 'error',
		returnFocus : $(this),
		message : connError,
		buttons : [ {
			text : 'OK',
			click : function() {
				console.log('OK');
				
				$(this).data('modal').close();
			},
			isDefault : true
		} ]
	});
  }
    $('body').initialize({locale: initialLocale});
    
    $("#user").focus();
  </script>
     <script>
    $('#signin').on('submit', function (e) {
    if( $("#password").val()==""){
    	
    		  e.preventDefault(); // Cancel the submit
  		  $("#password").select();
  		  $("#password").focus();
  		  return false;
    	}
      console.log($(this).serialize());
     //	 $( "#signin" ).submit();
    });
  </script>

    </body>