/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        CUARAT ,
        CUCUTD,
        CUCUCD 
    FROM
        ##CCURRA##  
    WHERE
        CUCONO=%cono% 
        AND CUDIVI=~%div%~  
        AND  CUCUTD<= ~%date%~ 
        AND  CUCUCD=~%cucd%~ 
        and CUCRTP=~01~ 
    order by
        CUCUTD DESC
