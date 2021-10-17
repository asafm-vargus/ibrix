<%@page import="java.io.*"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="MvxAPI.*"%>

<%@ include file="/sors/ServerInstace.jsp"%>
<%@ page contentType="text/xml" pageEncoding="UTF-8"%>



<%



	
	String host = API_host ;
	int port = Integer.parseInt(API_Port);

	String user =session.getAttribute("apiusersession").toString();
	String password =session.getAttribute("apipasssession").toString();
	
	String cono="1";



	MvxSockJ miSocket = new MvxSockJ();

	String program=request.getParameter("_program");
	String transaction=request.getParameter("_transaction");
	String returncols=request.getParameter("_returncols");
	/*
	System.out.println("host:" + host);
	System.out.println("port:" + port);
	System.out.println("user:" + user);
	System.out.println("password:" + password);
	
	*/
	System.out.println( program + "/" +transaction );
	int connectionStatus = miSocket.mvxConnect(host, port, user, password, program, cono);

	if (connectionStatus != 0) {
		System.out.println("Connection Status fail=>" + connectionStatus);
		System.out.println(program + "API:\n" + miSocket.mvxGetLastError());
		return;
		// throw new MecException("Connection Status fail=>" +
		// connectionStatus);
	}

	
	Map<String, String[]> parameters = request.getParameterMap();
	
	for (String parameter : parameters.keySet()) {
		
		if(!parameter.toLowerCase().startsWith("_")) {
			miSocket.mvxSetField(parameter, parameters.get(parameter)[0].trim());
			System.out.println(parameter + ":" + parameters.get(parameter)[0] + "");
		//String[] values = parameters.get(parameter);
		//your code here
		   }
	}

	if (miSocket.mvxAccess(transaction) > 0) {

		System.out.println(program + "API:\n" + miSocket.mvxGetLastError());
		String err=miSocket.mvxGetLastError();
		String errField="";//miSocket.mvxGetLastBadField();
		String errCode="";//miSocket.mvxGetLastErrorCode();
		%>

<ErrorMessage xmlns="http://lawson.com/m3/miaccess" code="<%=errCode%>"
	field="<%=errField%>" type="ServerReturnedNOK"> <Message><%=err%></Message>
</ErrorMessage>

<%
		miSocket.mvxClose();
		return;

	}
	String MIRecords="<MIRecord>";

	if(returncols.indexOf(",")>-1){
		String cols[]= returncols.split(",");

		for(int i=0;i<cols.length;i++){
				MIRecords+="<NameValue>";
					MIRecords+="<Name>" + cols[i] +"</Name>";
					String res=miSocket.mvxGetField( cols[i] ).trim();
					res=res.replace("&","&amp;");
					MIRecords+="<Value>" + res  + "</Value>";
					MIRecords+="</NameValue>";
		
		}
		
	}
	MIRecords+="</MIRecord>";
	//TEMPORNO = miSocket.mvxGetField("ORNO").trim();
	miSocket.mvxClose();
	
%>
<miResult xmlns="http://lawson.com/m3/miaccess"> <Program><%=program%></Program>
<Transaction><%=transaction%></Transaction> <Metadata /> <%=MIRecords%>
</miResult>
