/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	
	SELECT A.PIESPD
		,A.PIDLIX
		,A.PIPLSX
		,OQTTYP
	,OQDLIX
	,OQCONA
	,OQRIDN
	,OQPGRS
	,OKCUNM
	,(select count( *) SMALLBOX  from  ##MPTRNS##
	where ORCONO=A.PICONO and ORWHLO=A.PIWHLO  and ORDLIX=A.PIDLIX  and ORPACT='25'  and ORPACO = 0 /*only not packed*/ ) SMALLBOX
	,(select count( *) SMALLBOX  from  ##MPTRNS##
	where ORCONO=A.PICONO and ORWHLO=A.PIWHLO  and ORDLIX=A.PIDLIX  and ORPACT<>'25'  and ORPACO = 0 /*only not packed*/  ) BIGBOX
	FROM ##MHPICH## A
	join ##MHDISH## on PICONO=OQCONO and PIWHLO=OQWHLO and PIDLIX=OQDLIX and PIPLSX=OQPLSX
	left join ##OCUSMA## on OQCONO=OKCONO and OQCONA=OKCUNO
	WHERE A.PICONO = %cono%
		AND A.PIWHLO = '%whlo%'
		AND A.PIDLIX = '%dlix%'
		AND A.PIPISS BETWEEN 40
			AND 60
	ORDER BY A.PIESPD
