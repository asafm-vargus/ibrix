/* do not change the next line, which is the DataSource: 
Movex Java
*/

    select
        SFDEV 
    from
        ##CSFDEF## 
    where
        SFCONO=%cono% 
        and SFMEDC=~*PRT~ 
        and SFPRTF=~%prtf%~ 
        and SFUSID=~%usid%~
