/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	SELECT A.MQRIDN
		,A.MQRIDL
		,A.MQITNO
		,A.MQBANO
		,A.MQCAMU
		,A.MQWHSL
		,A.MQTWSL
		,A.MQPLRN
		,A.MQSOFT
		,MM.MMDCCD
		,MM.MMITDS
		,cast(A.MQTRQT as numeric(17,0)) MQTRQT
		,A.MQALQT
		,'true' as ESCALATED
		,SUM(B.O0DLQT) PACKED
		,A.MQTRQT - SUM(B.O0DLQT) TOPACK
		,MAX(B.O0PANR) PACKNR
		,G2STAT,cast(coalesce(G2ALQT,0) as numeric(17,0)) G2DLQT ,G2MSLN
		,case when coalesce(MLRGDT,0)>0  then
		 timestampdiff (64, char( 
			current_timestamp-TIMESTAMP (year(MLRGDT) || '-' || month(MLRGDT) || '-' || day(MLRGDT) || ' ' || substring(digits(12),1,2) ||':' || substring(digits(12),3,2) ||  ':00')
			))
			else 0 end LOTAGE
	FROM ##MITALO## A
	LEFT JOIN ##MFTRND## B ON B.O0CONO = A.MQCONO
		AND B.O0WHLO = A.MQWHLO
		AND B.O0DLIX = A.MQRIDI
		AND B.O0RIDN = A.MQRIDN
		AND B.O0RIDL = A.MQRIDL
		AND B.O0BANO = A.MQBANO
		AND B.O0CAMU = A.MQCAMU
		AND B.O0PLRN = A.MQPLRN
		
	left join ##MITLOC## on MLCONO=A.MQCONO and MLWHLO=A.MQWHLO and MLITNO=A.MQITNO and MLBANO=A.MQBANO
	INNER JOIN ##MITMAS## MM ON MM.MMCONO = A.MQCONO
		AND MM.MMITNO = A.MQITNO
		
		left join ##MHILIN## on G2CONO=A.MQCONO 
		and G2MSGN='%msgn%'
		and G2WHLO=A.MQWHLO
		and G2DLIX=A.MQRIDI
		and G2WHSL=A.MQWHSL
		and G2ITNO=A.MQITNO
		and G2BANO=A.MQBANO
		and G2RIDN=A.MQRIDN
		and G2RIDL=A.MQRIDL
		and G2STAT<90
	WHERE A.MQCONO = %cono%
		AND A.MQWHLO = '%whlo%'
		AND A.MQRIDI = %ridi%
		AND A.MQPLSX = %plsx%
		AND A.MQSTAT < 70
	GROUP BY A.MQRIDN
		,A.MQRIDL
		,A.MQITNO
		,A.MQBANO
		,A.MQCAMU
		,A.MQWHSL
		,A.MQTWSL
		,A.MQPLRN
		,A.MQSOFT
		,MM.MMDCCD
		,MM.MMITDS
		,A.MQTRQT
		,A.MQALQT
		,G2STAT,G2ALQT,G2MSLN,MLRGDT
	ORDER BY 
	coalesce(G2STAT,0) asc,
	A.MQITNO
		,A.MQSOFT DESC
		,A.MQALQT