/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	SELECT 
	MLITNO,
	MMITDS,
	MLSLTP
		
		,MLBANO
		,case when MLPRDT>0 then day(MLPRDT)||'/'||month(MLPRDT)||'/'||year(MLPRDT) end MLPRDT
		,cast( SUM(MLSTQT) as numeric(17,0)) AS MLSTQT
		,cast( SUM(MLALQT) as numeric(17,0)) AS MLALQT
		,cast( SUM(MLSTQT) as numeric(17,2)) AS MLSTQT2D
		,cast( SUM(MLALQT) as numeric(17,2)) AS MLALQT2D
		,case when coalesce(MLRGDT,0)>0  then
		 timestampdiff (64, char( 
			current_timestamp-TIMESTAMP (year(MLRGDT) || '-' || month(MLRGDT) || '-' || day(MLRGDT) || ' ' || substring(digits(12),1,2) ||':' || substring(digits(12),3,2) ||  ':00')
			))
			else 0 end LOTAGE
	FROM ##MITLOC##
	join ##MITMAS## on MMCONO=MLCONO and MLITNO=MMITNO
	WHERE MLCONO = %cono%
		AND MLWHLO = '%whlo%'
		AND MLWHSL = '%whsl%'
		
	GROUP BY 
	MLITNO,
	MMITDS,
	MLSLTP
		
		,MLBANO
 ,MLPRDT
 ,MLRGDT
 
 order by MLITNO
 