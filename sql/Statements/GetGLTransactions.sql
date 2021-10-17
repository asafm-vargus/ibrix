/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        FG.EGAIT1 AS EGAIT1,
        FG.EGCUAM AS EGCUAM ,
        FG.EGOCDT AS EGCODT,
        LTRIM(SUBSTRING(FX1.EGGEXI,
        1,
        3)) AS VSER ,
        LTRIM(SUBSTRING(FX1.EGGEXI,
        4,
        8)) AS RECNO,
        FX2.EGGEXI AS CHKNO,
        FG.EGJRNO AS EGJRNO,
        FG.EGJSNO AS EGJSNO,
        FG.EGYEA4 AS EGYEA4,
        FG.EGACAM AS EGACAM,
        CASE 
            WHEN FB.EGCURD IS NULL THEN FG.EGOCDT  
            ELSE FB.EGCURD 
        END AS TRDATE,
        EGVTXT,
        LTRIM(FG.EGVSER) || LTRIM(CAST(FG.EGVONO AS VARCHAR(10))) AS SHOVAR,
        FG.EGERDT AS EGERDT 
    FROM
        ##FGLEDG## FG 
    LEFT JOIN
        ##FGLEDX## FX1 
            ON FX1.EGCONO = FG.EGCONO 
            and FX1.EGDIVI = FG.EGDIVI  
            and FX1.EGJRNO = FG.EGJRNO 
            and FX1.EGJSNO = FG.EGJSNO  
            and FX1.EGYEA4 = FG.EGYEA4 
            and FX1.EGGEXN=103 
    LEFT JOIN
        ##FGLEDX## FX2 
            ON FX2.EGCONO = FG.EGCONO 
            and FX2.EGDIVI = FG.EGDIVI  
            and FX2.EGJRNO = FG.EGJRNO 
            and FX2.EGJSNO = FG.EGJSNO  
            and FX2.EGYEA4 = FG.EGYEA4 
            and FX2.EGGEXN=2 
    LEFT JOIN
        ##FGLEDB## FB 
            ON FB.EGCONO = FG.EGCONO 
            and FB.EGDIVI = FG.EGDIVI  
            and FB.EGJRNO = FG.EGJRNO 
            and FB.EGJSNO = FG.EGJSNO  
            and FB.EGYEA4 = FG.EGYEA4 
    WHERE
        FG.EGCONO=%cono% 
        and EGCUAM <> 0  
        AND FG.EGDIVI=~%divi%~ 
        AND FG.EGAIT1=~%ait%~  %WhereString%  
    ORDER BY
        %OrderByStr%
