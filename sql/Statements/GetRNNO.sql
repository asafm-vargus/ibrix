/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        max (DARNNO) DARNNO,
        DAINTN 
    FROM
        ##FFIHST## 
    WHERE
        DACONO=%cono% 
        AND DADIVI=~%div%~ 
        AND DAINTN=~ADDVOUCHER~ 
    group by
        DAINTN
