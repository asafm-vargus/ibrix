/* do not change the next line, which is the DataSource: 
Movex Java
*/
	
	
	SELECT A.MSWHSL,A.MSSLDS FROM ##MITPCE## A
	where
	MSCONO=%cono% and MSWHLO='%whlo%'
	order by A.MSWHSL
	
	fetch first 200 rows only