var gBqBalItemData={};
var gBqItemData={};

function clearBalQueryScreen(){
	$(".BqRinputs").val("");
	$(".BqRinputs").html("");
	$("#bdgBalQueryCount").html("");
	$("#task-listview").hide();
	$("#task-listview-whsl").hide();
	$("#task-listview").destroy();
	$("#task-listview-whsl").destroy();
	$("#inpWHLOBqRinputs").val(glob_ObjM3UserProp.WHLO);
	//$("#chxREND").prop('checked',false);
	//showBalQuery();
	//$('#datagridBalQueryl').destroy();
	$("#inpBqBARCODE").focus();
	
	
	
}

function runBalQuery(){
	
	$("#task-listview").hide();
	$("#task-listview-whsl").hide();
	$("#task-listview").destroy();
	$("#task-listview-whsl").destroy();
	
	var bano=$("#inpBqBARCODE").val().toUpperCase();
	$("#inpBqBARCODE").val(bano.trim());
	
	var whsl=$("#inpBqWHSL").val().toUpperCase();
	$("#inpBqWHSL").val(whsl.trim());
	
	var whlo=$("#inpWHLOBqRinputs").val();
	if(bano=="" && whsl!=""){ //search by whsl 25.5.21
		$("#inpBqWHSL").blur();
		$("#inpBqITDS").html("");
		var slds=runAPI_MMS010MI_GetLocation(whlo,whsl);
		 $("#inpBqITDS").html(slds);
		 
			getBqDataByWHSL();
	}else{
	
		if (bano.substring(3,4) == "-"){	// ITNO
			gBqBalItemData = {MLITNO:bano, BANO:"", MLWHSL:""};		
		}else{							// BANO
			gBqBalItemData = getBqItno(whlo,bano);
			gBqBalItemData.BANO = bano;
		}
		
		if(gBqBalItemData==false){ //30.7.20
			clearBalQueryScreen();
			return;
		}
		
		gBqItemData=getDecimalIndiAndDescriptionFromMitmas(gBqBalItemData.MLITNO);
		if(gBqItemData==false){ //30.7.20
			clearBalQueryScreen();
			return;
		}
		
		$("#inpBqITDS").html(gBqItemData.MMITDS);
		getBqData();
		
		$("#inpBqWHSL").html(gBqBalItemData.MLWHSL);
		/*
		if(gBqBalItemData.MLWHSL!="") {
			$("#inpBqBARCODE").blur();
			getBqData();
		}
		*/
		getBqData();
	}
}

function getBqData(){
	
	//$('#datagridBalQueryl').destroy();
	var whlo=$("#inpWHLOBqRinputs").val();
	var bano=$("#inpBqBARCODE").val();
	
	var grid, columns = [], dataset = [];
	
	columns.push({
		name : 'אז.מלאי',
		id : 'MLSLTP',
		field : 'MLSLTP',
		width: 40,
		sortable : false
	});
	
	columns.push({
		name : 'איתור',
		id : 'MLWHSL',
		field : 'MLWHSL',
		width: 70,
		sortable : false
	});
	
	
	columns.push({
		name : 'מנה',
		id : 'MLBANO',
		field : 'MLBANO',
		width: 100,
		sortable : false
	});
	
	columns.push({
		name : 'כמות',
		id : 'MLSTQT',
		field : 'MLSTQT',
		sortable : false,
		formatter : Formatters.Integer
	});
	
	columns.push({
		name : 'מוקצה',
		id : 'MLALQT',
		field : 'MLALQT',
		sortable : false,
		formatter : Formatters.Integer
	});
	
	var dataToSend = {
			usepool : 1,
			localQuery:"mmtegm",
			mie : "mie_VAR_balQuery",
			cono : glob_ObjM3UserProp.CONO,
			whlo : whlo,
			bano: gBqBalItemData.BANO,
			itno : gBqBalItemData.MLITNO

		};

		var url = "../sql/runSQL.jsp?_" + dataToSend.mie;
		var data;
		$.ajax({
			dataType : "json",
			url : url,
			data : dataToSend,
			method : "post",
			cache : false,
			async : true,
			success : success,
			error : processError
		});

		function success(data, status, req) {
			if (status == "success" && data.length > 0) {
				
			}
			for (var i = 0; i < data.length; i++) {
				if(data[i].LOTAGE*1>=gMaxLotLifeMonths){
					data[i].escalatedClass="alert-text";
					data[i].escalated=1;
					data[i].escalatedText="לוט ישן!";
				}
			}
			//	for (var i = 0; i < data.length; i++) {
			$("#bdgBalQueryCount").html(data.length);
		 $("#task-listview").show();
		var listview=    $("#task-listview").listview({
			source:data
		})
		/*
		var grid = $('#datagridBalQueryl').datagrid({
			columns : columns,
			isList : false,
			
			paging : false,
			pagesize: 50,
			pagesizes:[50,100,200,300],
			disableClientSort : true,
			editable : false,
			clickToSelect : false,
			filterable : false,
			selectable : 'mixed',
			rowHeight : 'short',
			alternateRowShading : true,
			dataset : data,
			
			summaryRow : false 
			

		}).data('datagrid');
	*/
		$("#inpBqBARCODE").focus(); //30.7.20
		$("#inpBqBARCODE").select(); //30.7.20
		}

		function processError(data, status, req) {
		console.log("status:" + status);
		// alert(req.responseText + " " + status);
		console.log("ERROR:" + req.responseText + " " + status);
		retError = req.responseText + " " + status;
		var longError=data.responseText;
		var pos1=longError.indexOf("javax.servlet.ServletException");
		if(pos1>-1){
			longError=longError.substring(pos1);
			var pos2=longError.indexOf("\n");
			longError=longError.substring(0,pos2);
		} 
		topSoHo.alert( longError,"שגיאה בהרצת שאילתה");
		document.body.style.cursor = 'default';
		//$('#standalone-busy').trigger('complete.busyindicator');
		}
			
}

function getBqDataByWHSL(){ //25.5.21
	
	//$('#datagridBalQueryl').destroy();
	var whlo=$("#inpWHLOBqRinputs").val();
	var bano=$("#inpBqBARCODE").val();
	var whsl=$("#inpBqWHSL").val().toUpperCase();
	
	var dataToSend = {
			usepool : 1,
			localQuery:"mmtegm",
			mie : "mie_VAR_balQueryByWHSL",
			cono : glob_ObjM3UserProp.CONO,
			whlo : whlo,
			whsl: whsl
			

		};

		var url = "../sql/runSQL.jsp?_" + dataToSend.mie;
		var data;
		$.ajax({
			dataType : "json",
			url : url,
			data : dataToSend,
			method : "post",
			cache : false,
			async : true,
			success : success,
			error : processError
		});

		function success(data, status, req) {
			if (status == "success" && data.length > 0) {
				
			}
			for (var i = 0; i < data.length; i++) {
				if(data[i].LOTAGE*1>=gMaxLotLifeMonths){
					data[i].escalatedClass="alert-text";
					data[i].escalated=1;
					data[i].escalatedText="לוט ישן!";
				}
			}
			$("#bdgBalQueryCount").html(data.length);
			//	for (var i = 0; i < data.length; i++) {
		  $("#task-listview-whsl").show();
		var listview=    $("#task-listview-whsl").listview({
			source:data
		})
	
			$("#inpBqBARCODE").focus(); //30.7.20
			$("#inpBqBARCODE").select(); //30.7.20
		}

		function processError(data, status, req) {
		console.log("status:" + status);
		// alert(req.responseText + " " + status);
		console.log("ERROR:" + req.responseText + " " + status);
		retError = req.responseText + " " + status;
		var longError=data.responseText;
		var pos1=longError.indexOf("javax.servlet.ServletException");
		if(pos1>-1){
			longError=longError.substring(pos1);
			var pos2=longError.indexOf("\n");
			longError=longError.substring(0,pos2);
		} 
		topSoHo.alert( longError,"שגיאה בהרצת שאילתה");
		document.body.style.cursor = 'default';
		//$('#standalone-busy').trigger('complete.busyindicator');
		}
			
}

function getDecimalIndiAndDescriptionFromMitmas(itno){

	var ret = "";

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_getDecimalIndiAndDescriptionFromMitmas",
		cono : glob_ObjM3UserProp.CONO,
		itno:itno
	

	};
	var url = "../sql/runSQL.jsp?_" + dataToSend.mie;
	var data;
	$.ajax({
		dataType : "json",
		url : url,
		data : dataToSend,
		method : "post",
		cache : false,
		async : false,
		success : success
	});

	function success(data, status, req) {
		if (status == "success" && data.length > 0) {
			ret = data[0];
		}else{
			topSoHo.alert("פריט לא נמצא!");
			ret=false;
		}

	}

	return ret;
	
}

function getBqItno(whlo,bano){
	
	var ret = "";

	var dataToSend = {
		usepool : 1,
		
		mie : "mie_VAR_queryBarcodeBalance",
		cono : glob_ObjM3UserProp.CONO,
		whlo: whlo,
		bano: bano
	

	};
	
	var url = "../sql/runSQL.jsp?_" + dataToSend.mie;
	var data;
	$.ajax({
		dataType : "json",
		url : url,
		data : dataToSend,
		method : "post",
		cache : false,
		async : false,
		success : success
	});

	function success(data, status, req) {
		if (status == "success" && data.length > 0) {
			ret = data[0];
		}else{
			topSoHo.alert("לא נמצאה מנה!");
			ret=false;
		}

	}

	return ret;

	
}