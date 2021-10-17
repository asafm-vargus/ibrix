<%@page import="java.io.*"%>
<%@page import="java.sql.*"%>
<%@ include file="/sors/ServerInstace.jsp"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Properties"%>


<%@ page contentType="application/json" pageEncoding="UTF-8"%>

<%
String usePool="";
String mieModel="";
String updateSQL=""; //21.2.19
System.out.println("\n");
Map<String, String[]> parameters = request.getParameterMap();
	// Thread.sleep(2000);////
	for (String parameter : parameters.keySet()) {

		if(!parameter.toLowerCase().startsWith("_")) {
		//	miSocket.mvxSetField(parameter, parameters.get(parameter)[0].trim());
			//System.out.println(parameter + ":" + parameters.get(parameter)[0] + "");
			if(parameter.equals("mie")) mieModel=parameters.get(parameter)[0];
			if(parameter.equals("usepool")) usePool=parameters.get(parameter)[0];
			if(parameter.equals("updatesql")) updateSQL=parameters.get(parameter)[0];
			usePool="0";///15.1.19 disabling pools for now - because of freeze //re 24.6.19   -> ZVIKA remove /// and save
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

      BufferedReader br = new BufferedReader( new InputStreamReader(new FileInputStream("webapps//ibrix//sql//Statements//" + mieModel + ".sql"), "UTF8")) ;
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
			if(!parameter.equals("mie")) {
				strSQL=strSQL.replace("%" +parameter + "%" ,parameters.get(parameter)[0]);
				System.out.print(parameter + ":" + parameters.get(parameter)[0]+";"); //7.7.19
			}
		   }
	}//for

     // System.out.println("READ SQL:" + strSQL);
    } // end try
    catch (IOException e) {
      System.err.println("Error: " + e);
    }

    /* END READ SQL */


    /* START READ DataSource */
    Properties prop = new Properties();

    InputStream input = null;

	try {

		input = new FileInputStream("webapps//ibrix//sql//DataSources//" + DataSource + ".properties");

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
  
    try {
		Class.forName(prop.getProperty("Driver")).newInstance();
	} catch (Exception e) {
		e.printStackTrace();
	}

    /* END READ DataSource */

    /* Execute SQL*/

     conn = DriverManager.getConnection(prop.getProperty("ConnectioString"));
   
      Statement stmt = conn.createStatement();
      ResultSet rs;

     
      
     strSQL=strSQL.replace(" ##"," " + prop.getProperty("SCHEMA_MOVEX") + ".");
  	strSQL=strSQL.replace("##"," ");
  	 strSQL=strSQL.replace("CUSTSCHEMA." , prop.getProperty("CUST_SCHEMA") + "."); //17.11.19
  	
  //	System.out.println("DataSource:" + DataSource);
  	System.out.println("SQL EXEC:" + strSQL);

	String rest="";
	try{
  	if(updateSQL.equals("1")){
  		 stmt.executeUpdate(strSQL);
  	}else{
	    rs = stmt.executeQuery(strSQL);
	
	  	ResultSetMetaData rsmd = rs.getMetaData();
		int ColumnCount = rsmd.getColumnCount();
	
	  
	
		  rest="  [";
		  int i=0;
		  String sel="";
		  String selResult="";
	      while ( rs.next() ) {
	
	    	  if(i>0) rest+=",";
	    	  rest+=" { ";
	
	    	  String rest2="";
	    	  for(int j=0;j<ColumnCount;j++){
	    			if (j > 0)	rest2 += ",";
					sel = rsmd.getColumnName(j + 1);// insert name of feald
					selResult = rs.getString(j + 1);// insert result
	
					if (selResult == null) {
						selResult = "";
					} else {
						//selResult = selResult.trim().replace("\"", "\\\"");
						selResult = selResult.trim().replace("\"", "");
						selResult = selResult.replace("\\", "/");
						 selResult=selResult.replace("\"","\\\""); //removes "
						 selResult=selResult.replace("",""); //removes char 26 7.5.19
	
					}
	
					  rest2+="\""   + sel +  "\":";
	
					  rest2+="  \""   + selResult + "\"";
	    	  }
	    	 	 rest += rest2 + " }";
				i++;
	      }
	
	  	rest += " ]";
		rs.close();
  		}
	} catch (Exception e) {
		System.out.println("SQL EXEC:" + strSQL);
		System.out.println("SQL ERROR!");
		e.printStackTrace();
	}
	finally{
		//System.out.println("close connection! isClosed=" + conn.isClosed());
		 stmt.close(); //7.7.19
		conn.close();
		//System.out.println("close connection! isClosed=" + conn.isClosed());
	}


	out.println(rest);
%>