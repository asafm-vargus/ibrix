/* do not change the next line, which is the DataSource: 
Movex Java
*/ 


	select IBPNLI, IBPNLS, IBPITD, IBPITT, IBCODT, IBORQA, IBRVQA, IBPUUN , IBSUNO
		from ##MPLINE##
		where 
		IBCONO=%cono%
		and IBWHLO='%whlo%'
		and IBPUNO=%puno%
		and IBITNO='%itno%'
		and IBPUSL>=15 and IBPUSL<75 
		and IBPUST>=15 and IBPUST<75 
		order by IBCODT desc,IBPNLI asc, IBPNLS asc