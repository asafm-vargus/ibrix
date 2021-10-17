/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	
	select 
	MQWHSL,  MQPLRN ,MQBANO,cast(MQALQT as numeric(17,2))  MQALQT
	from ##MITALO##
	where MQCONO=%cono% 
	and MQWHLO='%whlo%' 
	and MQRIDI='%dlix%' 
	and MQWHSL='%whsl%' 
	and MQBANO='%bano%' 
	and MQSOFT=0
	
	
	
	