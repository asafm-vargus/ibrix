/* do not change the next line, which is the DataSource: 
Movex Java
*/

    select
        MMITNO,
        UHSQNR,
        CTTX15,
        UICFMG,
        UICFMF,
        UICFMA,
        UICFMN,
        UFTX15,
        UFMES0,
        UIDTID,
        case 
            when UICFMN=0 then cast(UICFMA as nvarchar(40)) 
            else cast(cast(UICFMN as numeric(15,
            2)) as nvarchar(40))
        end as VALUE,
        case 
            when UICFMN=0 then ~0~ 
            else ~1~ 
        end as VALUETYPE,
        UFFLDB,
        UFDCCD,
        UICHID,
        UILMDT   
    from
        ##MTEINF## 
    inner join
        ##MITMAS## 
            on MMCONO=UICONO 
            and MMDTID=UIDTID 
    inner join
        ##MTEFLD## 
            on UFCONO=UICONO 
            and UFCFMF=UICFMF  
    inner join
        ##MTEGCN## 
            on UHCONO=UICONO 
            and UHCFMG=UICFMG 
            and UHKFLD=MMITGR 
            and UHFILE=~DSITGR~ 
    inner join
        ##CSYTAB## 
            on UHCONO=CTCONO 
            and UHCFMG=CTSTKY 
            and CTSTCO=~CFMG~ 
    where
        UICONO=%cono% 
        and MMITNO=~%itno%~  
    union
    select
        MMITNO,
        UHSQNR,
        CTTX15,
        UICFMG,
        UICFMF,
        UICFMA,
        UICFMN,
        UFTX15,
        UFMES0,
        UIDTID,
        case 
            when UICFMN=0 then cast(UICFMA as nvarchar(40)) 
            else cast(cast(UICFMN as numeric(15,
            2)) as nvarchar(40))
        end as VALUE,
        case 
            when UICFMN=0 then ~0~ 
            else ~1~ 
        end as VALUETYPE,
        UFFLDB,
        UFDCCD,
        UICHID,
        UILMDT   
    from
        ##MTEINF## as MT1 
    inner join
        ##MITMAS## 
            on MMCONO=UICONO 
            and MMDTID=UIDTID 
    inner join
        ##MTEFLD## 
            on UFCONO=UICONO 
            and UFCFMF=UICFMF  
    inner join
        ##MTEGCN## 
            on UHCONO=UICONO 
            and UHCFMG=UICFMG 
            and UHKFLD=MMITGR 
            and UHFILE=~DSITGR~ 
    inner join
        ##CSYTAB## 
            on UHCONO=CTCONO 
            and UHCFMG=CTSTKY 
            and CTSTCO=~CFMG~ 
    where
        UICONO=%cono% 
        and MMITNO=~%itty%~ %showonlyactive% 
        and (
            select
                count(MT2.UICFMG) 
            from
                ##MTEINF## as MT2  
            inner join
                ##MITMAS## as MM2 
                    on  MM2.MMCONO=MT2.UICONO 
                    and MM2.MMDTID=MT2.UIDTID 
                    and MM2.MMITNO=~%itno%~ 
            where
                UICONO=MT2.UICONO 
                and MT1.UICFMG=MT2.UICFMG 
                and MT2.UICFMF=MT1.UICFMF 
        )=0 
    order by
        UHSQNR,
        UICFMG,
        UICFMF
