/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	SELECT 
	MN.OSITNO,MN.OSBANO,MN.OSRIDN,MN.OSRIDL,
	MN.OSPANR
	,MN.OSDLIX,MN.OSCONO,MN.OSWHLO,T.MQWHSL
		,cast(MN.OSDLQT as numeric(17,1)) OSDLQT
		,
		(select JUTX40 OSCHID from ##MFTRNS## MX 
		join ##CMNUSR##   on MX.OSCHID=JUUSID
		where MX.OSCONO=MN.OSCONO and MN.OSWHLO=MX.OSWHLO and MX.OSDLIX=MN.OSDLIX and MX.OSPANR=MN.OSPANR
	order by MX.OSLMDT desc
	fetch first 1 rows only 
	 ) 
	
	
	FROM ##MFTRNS## MN 
	join ##MPTRNS## on MN.OSCONO=ORCONO and MN.OSWHLO=ORWHLO and MN.OSDLIX=ORDLIX and MN.OSPANR=ORPANR and ORPACO = 0 /*only not packed*/
	
	JOIN ##MITALO## T ON T.MQCONO = MN.OSCONO
		and MN.OSWHLO = T.MQWHLO
		AND MN.OSDLIX = T.MQRIDI
		AND MN.OSRIDN = T.MQRIDN
		AND MN.OSRIDL = T.MQRIDL
		and MN.OSITNO=T.MQITNO 
		and MN.OSBANO=T.MQBANO
		
	WHERE MN.OSCONO =  %cono%
		AND MN.OSWHLO = '%whlo%'
		AND MN.OSDLIX = %dlix%
		and  MN.OSITNO = '%itno%'
		

	order by MN.OSPANR,MN.OSBANO