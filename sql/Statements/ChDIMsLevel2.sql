/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        ECAITM,
        ECAITF,
        ECAITT 
    FROM
        ##FCHCHK## 
    WHERE
        ECCONO=%cono% 
        AND (
            ECDIVI=~~ 
            or ECDIVI=~%div%~
        ) 
        AND ECAITP=~%aitp%~ 
        AND ECACRC=~%acrc%~ 
        AND ECAITM=~%dim1%~ %WhereString%
