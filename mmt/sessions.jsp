<%@page import="java.util.*"%>
<%
/*
 Enumeration e = (Enumeration) (session.getAttributeNames());

        while ( e.hasMoreElements())
        {
            Object tring;
            if((tring = e.nextElement())!=null)
            {
                out.println(session.getValue((String) tring));
                out.println("<br/>");
            }

        }*/
       // session.setMaxInactiveInterval(60); 
        long currentMillis = System.currentTimeMillis();
        out.println("getMaxInactiveInterval:" + (session.getMaxInactiveInterval() *1000 )); //28,800,000 
        out.println("getLastAccessedTime:" + (currentMillis-session.getLastAccessedTime()) );
        out.println("session kill in:" + ( session.getMaxInactiveInterval() *1000  -  (currentMillis-session.getLastAccessedTime())  ) );
        
       
        %>