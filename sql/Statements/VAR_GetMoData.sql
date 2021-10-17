/* do not change the next line, which is the DataSource: 
Movex Java
*/ 

	SELECT VHMFNO, VHRORN, VHPRNO, VHORQA, VHMAQA, VHWHLO, VHITNO, VHWHSL, MBWHSL, MBCOMG, MMBACD, MMINDI, MMITDS, 
	cast(coalesce(MBTOMU,1) as numeric(6,0)) MBTOMU  
	FROM ##MWOHED## LEFT JOIN ##MITBAL##    

	ON VHCONO = MBCONO AND VHWHLO = MBWHLO AND VHPRNO = MBITNO 
	
	
	INNER JOIN ##MITMAS## ON VHCONO = MMCONO AND VHPRNO = MMITNO 
	WHERE VHCONO=%cono% AND VHWHLO ='%whlo%' AND (VHMFNO= substring('%mfno%',1,10)  OR VHRORN=substring('%mfno%',1,10) ) 