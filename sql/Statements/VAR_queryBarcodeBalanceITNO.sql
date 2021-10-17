/* do not change the next line, which is the DataSource: 
Movex Java
*/ 

	SELECT MLITNO,MLWHSL,MLCAMU, SUM(MLSTQT) AS STQT 
	FROM ##MITLOC##
	WHERE  MLCONO=%cono%  AND MLWHLO='%whlo%' AND MLITNO='%itno%' 
	GROUP BY MLITNO,MLWHSL,MLCAMU ORDER BY MLITNO,MLWHSL,MLCAMU