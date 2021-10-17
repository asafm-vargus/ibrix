/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	SELECT trim(MMITDS) MMITDS , MMDCCD, MMINDI, MMUNMS, MMBACD 
	FROM ##MITMAS## WHERE MMCONO=%cono% AND MMITNO='%itno%'