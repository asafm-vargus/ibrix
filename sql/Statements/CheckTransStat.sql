/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        DAIFST 
    FROM
        ##FFIHST##  
    WHERE
        DACONO=%cono% 
        AND DADIVI=~%div%~ 
        AND DAINTN=~%intn%~ 
        AND DACHID=~%user%~ 
        AND DARGDT=~%date%~ 
        AND DARGTM>=%time%
