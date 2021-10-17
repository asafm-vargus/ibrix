/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	SELECT MBWHSL
	FROM ##MITBAL##
	WHERE MBCONO = %cono%
		AND MBWHLO = '%whlo%'
		AND MBITNO = '%itno%'
		