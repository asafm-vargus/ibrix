/* do not change the next line, which is the DataSource: 
Movex Java
*/

	SELECT A.ORPACT
		,A.ORPANR
		,A.ORGWTM
		,A.ORPACW
		,A.ORPACL
		,B.M4PANM
		,(select count(*) from ##MPTRNS## C
	where C.ORCONO=A.ORCONO and C.ORWHLO=A.ORWHLO and C.ORDLIX=A.ORDLIX and C.ORPAII=A.ORPANR ) PACKED
	FROM ##MPTRNS## A	, ##MITPAC## B
	WHERE A.ORCONO = %cono%
		AND A.ORDIPA = 0
		AND A.ORWHLO = '%whlo%'
		AND A.ORDLIX = %dlix%
		AND B.M4CONO = A.ORCONO
		AND A.ORPACT != ''
		AND A.ORPACO = 0
		AND B.M4PACT = A.ORPACT
		AND ltrim(A.ORPANR) LIKE 'PAL%'
		%WhereString%
	ORDER BY A.ORPANR
