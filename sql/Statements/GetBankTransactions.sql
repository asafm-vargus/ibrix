/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        BDBKID,
        BDALLN,
        BDCURD,
        BDCKNO,
        BDBLAM,
        BDVSER,
        BDVONO ,
        BDSDRC,
        RTRIM(BDBKID)||SUBSTRING(CAST(BDSDRC AS VARCHAR(10)),
        7,
        2) ||SUBSTRING(CAST(BDSDRC AS VARCHAR(10)),
        5,
        2) ||SUBSTRING(CAST(BDSDRC AS VARCHAR(10)),
        3,
        2) AS PAGENO,
        BDRFFD,
        BDLMDT 
    FROM
        ##XERECD## 
    WHERE
        BDCONO=%cono% 
        AND BDDIVI=~%divi%~ 
        AND BDBKID=~%bkid%~  %WhereString%  
    ORDER BY
        %OrderByStr%
