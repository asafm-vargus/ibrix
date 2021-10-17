/* do not change the next line, which is the DataSource: 
Movex Java
*/

    select
        PMCNQT,
        PMMTNO,
        MMFCU1 
    from
        ##MPDMAT## 
    join
        ##MITMAS## 
            on MMCONO=PMCONO 
            and MMITNO=PMMTNO 
            and MMITTY=~G1~ 
            and MMITGR=~G1410~ 
    where
        PMCONO=%cono% 
        and PMFACI=~%faci%~ 
        and PMSTRT=~%strt%~ 
        and PMPRNO=~%prno%~
