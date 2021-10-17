/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	SELECT A.M4PACT
	,A.M4PANM AS M4DOTX
	FROM ##MITPAC## A
	WHERE A.M4CONO = %cono%
	ORDER BY A.M4PACT
