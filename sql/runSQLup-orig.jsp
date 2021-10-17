    <%@page import="java.io.*" %>
        <%@page import="java.sql.*" %>
        <%@ include file="/sors/ServerInstace.jsp" %>
        <%@ page import="java.util.Map" %>
        <%@ page import="java.util.Properties" %>
        <%@page import="il.co.intentia.ibrixconpool.*" %>

        <%@ page contentType="application/json" pageEncoding="UTF-8" %>

            <%
String usePool="";
String mieModel="";
Map<String, String[]> parameters = request.getParameterMap();
	// Thread.sleep(2000);////
	for (String parameter : parameters.keySet()) {

		if(!parameter.toLowerCase().startsWith("_")) {
		//	miSocket.mvxSetField(parameter, parameters.get(parameter)[0].trim());
			//System.out.println(parameter + ":" + parameters.get(parameter)[0] + "");
			if(parameter.equals("mie")) mieModel=parameters.get(parameter)[0];
			if(parameter.equals("usepool")) usePool=parameters.get(parameter)[0];
			usePool="0";///15.1.19 disabling pools for now - because of freeze
		//String[] values = parameters.get(parameter);
		//your code here
		   }
	}
	 //java.io.File f = new java.io.File(".");

	//System.out.println(f.getCanonicalPath());

		if(mieModel.startsWith("mie_")) mieModel=mieModel.replace("mie_","");
	  String thisLine;
	  String DataSource="";
	  String strSQL="";
	  //Open the file for reading
    try {

      BufferedReader br = new BufferedReader( new InputStreamReader(new FileInputStream("webapps//portals//sql//Statements//" + mieModel + ".sql"), "UTF8")) ;
      int lineNumber=0;


      while ((thisLine = br.readLine()) != null) { // while loop begins here
        //System.out.println(thisLine);
        if(lineNumber==1) DataSource=thisLine;
        strSQL+=thisLine;
        lineNumber++;
      } // end while

  	strSQL=strSQL.replace("\n"," ");
	strSQL=strSQL.replace("~","'");
	//strSQL=strSQL.replace("||","+");

	for (String parameter : parameters.keySet()) {
		if(!parameter.toLowerCase().startsWith("_")) {
			if(!parameter.equals("mie")) strSQL=strSQL.replace("%" +parameter + "%" ,parameters.get(parameter)[0]);
		   }
	}//for

      System.out.println(strSQL);
    } // end try
    catch (IOException e) {
      System.err.println("Error: " + e);
    }

    /* END READ SQL */


    /* START READ DataSource */
    Properties prop = new Properties();

    InputStream input = null;

	try {

		input = new FileInputStream("webapps//portals//sql//DataSources//" + DataSource + ".properties");

		// load a properties file
		prop.load(input);
		// get the property value and print it out
		System.out.println("MIE:" + mieModel);
				System.out.println("Driver:" + prop.getProperty("Driver"));

      }
      catch (IOException e) {
          System.err.println("Error: " + e);
        }

	Connection conn=null;
   if(usePool.equals("1") && prop.getProperty("Driver").equals("com.ibm.as400.access.AS400JDBCDriver")){
		System.out.println("Using AS400 pooled connection");

	   conn = DataSourceAS400.getInstance().getConnection();// DriverManager.getConnection(prop.getProperty("ConnectioString"));
	   System.out.println("num of connections:" + DataSourceAS400.getInstance().getNumConnections());
   }else{
    try {
		Class.forName(prop.getProperty("Driver")).newInstance();
	} catch (Exception e) {
		e.printStackTrace();
	}

    /* END READ DataSource */

    /* Execute SQL*/

     conn = DriverManager.getConnection(prop.getProperty("ConnectioString"));
   }
      Statement stmt = conn.createStatement();
      ResultSet rs;

     strSQL=strSQL.replace(" ##"," " + prop.getProperty("SCHEMA_MOVEX") + ".");
  	strSQL=strSQL.replace("##"," ");

  	System.out.println(strSQL);
    stmt.executeUpdate(strSQL);



    String rest="OK";
	conn.close();


	out.println(rest);
%>