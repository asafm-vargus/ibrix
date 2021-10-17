/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	SELECT MLSLTP
		,MLWHSL
		,MLBANO
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
	WHERE MLCONO = %cono%
		AND MLWHLO = '%whlo%'
		AND MLITNO = '%itno%'
		AND (MLBANO = '%bano%' or '%bano%'='') /*4.11.20 add ability for no bano */
	GROUP BY MLSLTP
		,MLWHSL
		,MLBANO
		,MLRGDT
