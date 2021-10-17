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

String pdfpath="";
int n=0;
try {
	String dlix = request.getParameter("dlix");
	
	
	String url = "";

	if(CONECTION_JAVA.equals("SQL")){
		java.sql.DriverManager.registerDriver (new com.microsoft.sqlserver.jdbc.SQLServerDriver ());
		url =  "jdbc:sqlserver://"+SERVER_PORT+";databaseName="+DATABASE+";user="+USER+";password="+PASS+";TrustedConnection=false;";
	}else{
		if(CONECTION_JAVA.equals("AS400")){
			java.sql.DriverManager.registerDriver (new com.ibm.as400.access.AS400JDBCDriver());
			url =  "jdbc:as400://"+SERVER_PORT+";databaseName="+DATABASE+";user="+USER+";password="+PASS;
		}
    }

      Connection conn = DriverManager.getConnection(url);
      Statement stmt = conn.createStatement();
      ResultSet rs;

      String strSQL="";
      
      strSQL="";
		
		strSQL +=" select distinct PATH from  FRCFDBPRD.SMDDOCS where DLIX=" + dlix;
		


strSQL=strSQL.replace("~","'");
strSQL=strSQL.replace("SCHEMA.",SCHEMA_MOVEX);
strSQL=strSQL.replace("LOCAL.",LOCAL_SCHEMA);
strSQL=strSQL.replace("#PlusSign#",PlusSign);


  
      rs = stmt.executeQuery(strSQL);
    
     
      while ( rs.next() ) {
    	  pdfpath=rs.getString("PATH").trim();
		   pdfpath=pdfpath.replace("\\","\\\\");
    	  %>
		 
<object data="${pageContext.request.contextPath}/showPDF?file=<%=pdfpath%>" 
type="application/pdf" width="900" height="1200">
<a href="${pageContext.request.contextPath}/showPDF">Download file.pdf</a>
</object>

		
		  
		  
		  
		  <%
		  n++;
      }
    
      rs.close();
      
      conn.close();
     
      
		
		} catch (Exception e) {
			e.printStackTrace();
		    System.err.println("Got an exception! ");
		    System.err.println(e.getMessage());
		}
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
	var pdf=window.open(pdffile,'PDF','fullscreen=no');
	pdf.close();
	}

</script>
</body>
</html>
