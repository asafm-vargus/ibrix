<%@page import="java.io.*"%>
<%@page import="java.sql.*"%>
<%@page import="java.net.*"%>
<%@ include file="/sors/ServerInstace.jsp"%>
<%@ page 
contentType="text/html"
pageEncoding="UTF-8"
%>
<html>

<head>
     
    <script  language='javascript'>
	
	
	
	
	</script>
    </head>

<body>	
<%


int n=0;

	String pdfpath = request.getParameter("path");
	
	

		 pdfpath=pdfpath.replace("\\","\\\\");
    	  %>
		 
<object data="${pageContext.request.contextPath}/showPDF?file=<%=pdfpath%>" 
type="image/jpg" width="900" height="1200">
<a href="${pageContext.request.contextPath}/showPDF?file=<%=pdfpath%>">Download file</a>
</object>

		
		  
		  
		  
		  <%
		  n++;
      
    
   
      
		
		
	if(!pdfpath.equals("")){
	//pdfpath=pdfpath.replace("\\","\\\\");
	//pdfpath=URLEncoder.encode(pdfpath,"UTF-8");
		//response.sendRedirect("file:///" + URLEncoder.encode(pdfpath,"UTF-8"));
	//	response.sendRedirect( pdfpath);
	}
	

%>

<br />
<button onclick="closeMe()" >סגור</button>

<script language='javascript'>

	var pdfpath='<%=pdfpath%>';
	if(pdfpath!='' && <%=n%>==1){
//	alert(pdfpath);
	
	//window.open('<%=pdfpath%>','_blank','fullscreen=no');
	
	//	launchPdf('<%=pdfpath%>');
	//	window.setTimeout("closeMe()",1000);

	}else{
		if(<%=n%>==0){
			alert("לא נמצאו מסמכים סרוקים לתעודה!");
			closeMe();
		}
	}
	

	function closeMe(){
		window.open('','_self','');
		window.close();
	}
	
	function launchPdf(pdffile){
	//alert(pdffile);
	var pdf=window.open(pdffile,'JPG','fullscreen=no');
	pdf.close();
	}

</script>
</body>
</html>
