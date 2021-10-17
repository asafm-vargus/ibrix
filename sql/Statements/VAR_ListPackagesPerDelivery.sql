/* do not change the next line, which is the DataSource: 
Movex Java
*/ 
	SELECT 

	MN.OSPANR
	,MN.OSDLIX,MN.OSCONO,MN.OSWHLO
		,cast(sum(MN.OSDLQT) as numeric(17,1)) OSDLQT
		,
		(select JUTX40 OSCHID from ##MFTRNS## MX 
		join ##CMNUSR##   on MX.OSCHID=JUUSID
		where MX.OSCONO=MN.OSCONO and MN.OSWHLO=MX.OSWHLO and MX.OSDLIX=MN.OSDLIX and MX.OSPANR=MN.OSPANR
	order by MX.OSLMDT desc
	fetch first 1 rows only 
	 ) 
	
	
	FROM ##MFTRNS## MN 
	join ##MPTRNS## on MN.OSCONO=ORCONO and MN.OSWHLO=ORWHLO and MN.OSDLIX=ORDLIX and MN.OSPANR=ORPANR and ORPACO = 0 /*only not packed*/ 
	WHERE MN.OSCONO =  %cono%
		AND MN.OSWHLO = '%whlo%'
		AND MN.OSDLIX = %dlix%
		and ltrim(OSPANR) not like 'PAL%'
		
	group by MN.OSPANR,MN.OSDLIX,MN.OSCONO,MN.OSWHLO
	order by MN.OSPANR