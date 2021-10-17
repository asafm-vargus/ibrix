
<%@page import="java.io.*"%>
<%@page import="java.sql.*"%>
<%@page import="java.net.*"%>
<%@ include file="/sors/ServerInstace.jsp"%>
<%@ page 
contentType="text/html"
pageEncoding="UTF-8"
%>

<%
File file = new File("\\\\hdstor1b\\share-folders\\Services\\Smadar_Scans\\2019\\5\\D2205190002276968015188.pdf");

/*
response.setHeader("Content-Type",    getServletContext().getMimeType(file.getName()));
response.setHeader("Content-Length", String.valueOf(file.length()));
response.setHeader("Content-Disposition", "inline; filename=\"Test.pdf\"");
     Files.copy(file.toPath(), response.getOutputStream());
}*/

%>

<%=String.valueOf(file.length())%>