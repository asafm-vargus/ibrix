/* do not change the next line, which is the DataSource: 
Movex Java
*/

    SELECT
        EGJRNO,
        EGVONO,
        EGFEID,
        EGJSNO,
        EGVSER 
    FROM
        ##FGLEDG## 
    WHERE
        EGCONO=%cono% 
        AND EGDIVI=%divi% 
        AND EGYEA4=%year% 
        AND EGAIT1=~%ait%~   
        and EGVSER=~%vser%~ 
        and  EGVONO=~%vono%~
