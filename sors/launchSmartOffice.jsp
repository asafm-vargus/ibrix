<%@page import="java.io.*"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>

<%@ include file="/sors/ServerInstace.jsp"%>
<%@ page contentType="application/html" pageEncoding="UTF-8"%>


/*
 how to use this function.
 in JS, build a function similar to this.
 update the Automation xml
 submit it to this JSP page and it will redirect to Smart Office (needs to be run on IE or Chrome with ClickOnce Addon)

function launchMMS076(styn) {
	 
	
	var xml="";
	xml="<?xml version='1.0' encoding='utf-8'?> "
	+" <sequence> "
	+" <step command='RUN' value='MMS076' /> " 
	+" 	<step command='KEY' value='ENTER'> "
	+" <field name='WWQTTP'>1</field> " 
	+" 	</step> "
	+" <step command='KEY' value='ENTER'> "
	+" <field name='WWSTYN'>" + styn + "</field> "
	 
	+"</step> "

	+" </sequence> ";

	
	xml=encodeURIComponent(xml);
	
	 var url = "sors/launchSmartOffice.jsp?xml="+xml;
	 window.open(url);

	
}


*/


<%

String rest = "";//json string
/*
*incuming parameters cono,whlo
*/
String xml = (String) request.getParameter("xml");
if(xml==null) xml="";

String url="";
url=ISO_URL + "&task=mforms://_automation?data=" + xml; 
////////----start SQL qwery
try {
	//out.println(url);

		} catch (Exception e) {
			e.printStackTrace();
		}

		// System.out.println("rest= "+rest);
		// System.out.println("rest= "+rest);

 //String site = new String(url);
   //response.setStatus(response.SC_MOVED_TEMPORARILY);
 //  response.setHeader("Location", site);
   response.sendRedirect(url);
%>

<script>
/*
  netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");
            alert("This will close the window");
            window.open('','_self');
            window.close();
*/
</script>