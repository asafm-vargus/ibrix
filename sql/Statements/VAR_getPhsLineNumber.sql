/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
		SELECT A.SDSTRN
		,A.SDSTQI
		,A.SDSTQR
		,B.MLSTQT
	FROM ##MITTKD## A
	LEFT JOIN ##MITLOC## B ON A.SDCONO = B.MLCONO
		AND A.SDWHLO = B.MLWHLO
		AND A.SDITNO = B.MLITNO
		AND A.SDWHSL = B.MLWHSL
		AND A.SDBANO = B.MLBANO
		AND A.SDCAMU = B.MLCAMU
	WHERE A.SDCONO = %cono%
		AND A.SDWHLO = '%whlo%'
		AND A.SDSTNB = %stnb%
		AND A.SDITNO = '%itno%'
		AND A.SDWHSL = '%whsl%'
		AND A.SDBANO = '%bano%'
