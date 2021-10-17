/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        BCCUCD  
    FROM
        ##CBANAC##  
    WHERE
        BCCONO=%cono% 
        AND BCDIVI=~%div%~ 
        AND BCBKID=~%bkid%~
