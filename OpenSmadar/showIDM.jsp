<%@page import="java.io.*"%>
<%@page import="java.sql.*"%>
<%@page import="java.net.*"%>

<%@ page 
contentType="text/html"
pageEncoding="UTF-8"
%>
<html>

<head>
     
    <script  language='javascript'>
	
    function closeMe(){
		window.open('','_self','');
		window.close();
	}
	
	
	</script>
    </head>

<body>	
<%


int n=0;
///Item_Picture[@MDS_ID = "fcb70fcf-b637-4e14-9422-835ac2dac5cf"]
	String uuid = request.getParameter("uuid");
	String doctype = request.getParameter("doctype");
	String conttype = request.getParameter("conttype");
	String mime = request.getParameter("mime");
	
	
	String uri="showIDM?imgtype=MAIN&doctype=" + doctype + "&uuid=" + uuid;
	//String uri = request.getParameter("uri");
		// pdfpath=pdfpath.replace("\\","\\\\");
		

    	  %>
<!-- http://cs-m3home.corp.aipm.co.il:20007/prtsrvlt/showIDM?imgtype=THUMBNAIL&doctype=User_Image&uuid=9f150556-51a8-4172-80b7-203d5c88f0b4-->
		 
		  
		  	 <%
		  	 if(mime.indexOf("image")>-1 ) {
		  	 %>
		  	 <img src="../../prtsrvlt/<%=uri%>" ></img>
		  	 <%}else{ %> 
<object data="../../prtsrvlt/<%=uri%>" 
 type="<%=mime%>" width="900" height="1200">
<a href="../../prtsrvlt/<%=uri%>">Download file</a>
</object>
		  <%} %> 
		  
		  
		
<br />
<button onclick="closeMe()" >סגור</button>

</body>
</html>
