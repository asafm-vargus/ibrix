/* do not change the next line, which is the DataSource: 
Movex Java
*/ 


	SELECT T.MQALQT
		,T.MQPAQT
		,T.MQRIDN
		,T.MQRIDL
	FROM ##MHDISL## D
	INNER JOIN ##MITALO## T ON T.MQCONO = D.URCONO
		AND D.URDLIX = T.MQRIDI
		AND D.URRIDN = T.MQRIDN
		AND D.URRIDL = T.MQRIDL
	WHERE (D.URCONO = %cono%)
		AND (D.URDLIX = %dlix%)
		AND (T.MQPLSX = %plsx%)
		AND (T.MQWHLO = '%whlo%')
		AND (T.MQITNO = '%itno%')
		AND (T.MQBANO = '%bano%')		
		AND (T.MQWHSL = '%whsl%')
