/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        EAAITM,
        EATX40,
        EATX15,
        EAACR2 AS DIM2,
        EAACR3 AS DIM3,
        EAACR4 AS DIM4,
        EAACR5 AS DIM5,
        EAACR6 AS DIM6,
        EAACR7 AS DIM7 
    FROM
        ##FCHACC## 
    WHERE
        EACONO=%cono% 
        AND (
            EADIVI=~~ 
            or EADIVI=~%div%~
        ) 
        AND EAAITP=~%aitp%~  
        AND EAAT03 <> ~1~ 
        AND EAAT11 <> ~1~ %WhereString%
