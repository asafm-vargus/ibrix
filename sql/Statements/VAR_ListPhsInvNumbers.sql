/* do not change the next line, which is the DataSource: 
Movex Java
*/ 

	SELECT A.SHSTNB  ,A.SHTX30 
	FROM ##MITTKH## A 
	WHERE A.SHCONO=%cono%  
	AND A.SHWHLO='%whlo%' 
	AND (SHSTAT < 70) AND (SHSTAT > 10) 