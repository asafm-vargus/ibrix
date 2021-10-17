/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	
	SELECT ORPAII FROM ##MPTRNS## 
	WHERE ORCONO=%cono%
	AND ORPANR='%panr%'
	AND ORWHLO='%whlo%'
	AND ORDLIX=%dlix%