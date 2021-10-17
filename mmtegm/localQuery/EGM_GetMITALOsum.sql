/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	select cast(sum(MQALQT) as numeric(17,0)) ALQT,MQITNO,MMITDS  ,count(MQCONO) CNT
	from ##MITALO## 
	 join ##MITMAS## on MQCONO=MMCONO and MQITNO=MMITNO
	where MQCONO=%cono% and MQWHLO='%whlo%' and MQRIDI='%dlix%' and MQWHSL='%whsl%' and MQBANO='%bano%' and MQSOFT=0
	group by MQITNO,MMITDS
	