/* do not change the next line, which is the DataSource: 
Movex Java
*/ 

	SELECT A.OQDLIX
		,A.OQRIDN
		,A.OQPGRS
		,A.OQTTYP
		,A.OQPLSX
		,A.OQWHLO
	,B.PIESPD
	,B.PIPLSX
	,'none' ISINPROG
	,(select max(G2MSGN) from  ##MHILIN##  where  G2CONO=OQCONO 
		
		and G2WHLO=OQWHLO
		and  G2QLFR='11'
		and G2DLIX=OQDLIX
		and G2PLSX=PIPLSX
		and G2RIDN=OQRIDN and G2STAT<90 ) PREVMSGN
	FROM ##MHDISH## A
	
	 join ##MHPICH## B
			on  B.PICONO = A.OQCONO
				AND B.PIWHLO = A.OQWHLO
				AND B.PIDLIX = A.OQDLIX
				/*and B.PIPLSX = A.OQPLSX*/
				AND B.PIPISS BETWEEN 40
					AND 60
					
	WHERE A.OQCONO = %cono%
		AND A.OQWHLO = '%whlo%'
		AND A.OQPGRS < 90
		AND A.OQTTYP = %ttyp%
	
		/*
		AND EXISTS (
			SELECT 1
			FROM ##MHPICH## B
			WHERE B.PICONO = A.OQCONO
				AND B.PIWHLO = A.OQWHLO
				AND B.PIDLIX = A.OQDLIX
				AND B.PIPISS BETWEEN 40
					AND 60
			)
			*/
		AND (A.OQRIDN = '%ridn%' or A.OQDLIX=%dlix% )
	ORDER BY A.OQTTYP
		,A.OQDLIX
