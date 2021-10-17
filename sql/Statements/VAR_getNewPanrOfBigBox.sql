/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	SELECT coalesce(
	'PAL'||digits(cast(substring(ltrim(MAX(A.ORPANR)),4,5)+1 as numeric(5)) )
	
	,'PAL00001') AS NEWPANR
	FROM ##MPTRNS## A
		, ##MITPAC## B
	WHERE A.ORCONO = %cono%
		AND A.ORDIPA = 0
		AND A.ORWHLO = '%whlo%'
		AND A.ORDLIX = %dlix%
		AND B.M4CONO = A.ORCONO
		AND A.ORPACT != ''
		AND A.ORPACO = 0
		AND B.M4PACT = A.ORPACT
		AND ltrim(A.ORPANR) LIKE 'PAL%'
