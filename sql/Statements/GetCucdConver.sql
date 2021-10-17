/* do not change the next line, which is the DataSource: 
Movex Java
*/

    select
        CCLOCD ,
        CCDMCU 
    from
        ##CMNDIV## 
    WHERE
        CCCONO=%cono% 
        AND CCDIVI=~%div%~
