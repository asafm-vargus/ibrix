/* do not change the next line, which is the DataSource: 
Movex Java
*/ 

	SELECT 
	'1' SHOWBYCONTENT,
	case when 
	(select count(CNT.OSPANR) from ##MFTRNS##  CNT where  CNT.OSCONO=OS.OSCONO

	 and CNT.OSWHLO=OS.OSWHLO 
	and CNT.OSDLIX=OS.OSDLIX
	and CNT.OSRIDN=OS.OSRIDN and CNT.OSRIDL=OS.OSRIDL and CNT.OSITNO=OS.OSITNO and CNT.OSBANO=OS.OSBANO)>1 then '!קיים באריזות אחרות' else '' end  OTHERFLAG,

	OS.OSPANR,OS.OSWHLO,
	cast(OS.OSDLQT as numeric(17,0)) OSDLQT
		,OS.OSRIDN
		,OS.OSRIDL
		,MMDCCD
	,OS.OSITNO,MMITDS,
	MQWHSL,
MQPAQT
	,MQALQT
	,OS.OSBANO,OS.OSCHID

	FROM ##MFTRNS## OS
	 JOIN ##MITMAS## ON OS.OSCONO = MMCONO AND OS.OSITNO = MMITNO
	 
	 
	join ##MITALO## on MQCONO=OS.OSCONO and MQWHLO=OS.OSWHLO and MQITNO=OS.OSITNO and MQRIDN=OS.OSRIDN and MQRIDL=OS.OSRIDL and MQBANO=OS.OSBANO

	WHERE OS.OSCONO = %cono%
		AND OS.OSPANR like '%%panr%%'
		AND OS.OSWHLO = '%whlo%'
		AND OS.OSDLIX = '%dlix%'
		%WhereString%
	
		order by OS.OSBANO