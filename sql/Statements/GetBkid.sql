/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        EAACGR,
        BCBKID,
        BCBKNO,
        BCAIT1,
        EATX15,
        BCBKID || ~ ~ || LTRIM(BCBANA)   AS BKIDNAME  
    FROM
        ##CBANAC##  
    LEFT JOIN
        ##FCHACC## 
            ON BCCONO=EACONO 
            AND BCDIVI=EADIVI 
            AND EAAITP=1 
            AND BCAIT1=EAAITM 
    WHERE
        BCCONO=%cono% 
        AND BCDIVI=~%divi%~ 
        AND LTRIM(BCACHO)=~~ 
        AND BCBKTP=1
