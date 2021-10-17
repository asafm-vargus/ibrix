/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        DHFEID ||  DHFNCN AS FUNC  /*(DHFEID ||""|| DHFNCN) AS FUNC*/ 
    FROM
        ##FFIHEA## 
    WHERE
        DHCONO=%cono% 
        AND DHDIVI=~%divi%~ 
        AND  DHINTN=~%intn%~
