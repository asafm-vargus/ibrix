/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        SUBSTRING(CTPARM,
        14,
        8) AS START_DATE,
        SUBSTRING(CTPARM,
        22,
        8) AS END_DATE  
    FROM
        ##CSYTAB##  
    WHERE
        CTCONO=%cono% 
        AND CTDIVI=~%divi%~ 
        AND CTSTCO=~FFNC~ 
        AND SUBSTRING(CTSTKY,1,7)=~%func%~
