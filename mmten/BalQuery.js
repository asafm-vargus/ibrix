var gBqBalItemData={};
var gBqItemData={};

function clearBalQueryScreen(){
	$(".BqRinputs").val("");
	$(".BqRinputs").html("");
	$("#inpWHLO.BqRinputs").val(glob_ObjM3UserProp.WHLO);
	//$("#chxREND").prop('checked',false);
	//showBalQuery();
	$('#datagridBalQueryl').destroy();
	$("#inpBqBARCODE").focus(); //7.4.21 was inBqITNO
	
}

function runBalQuery(){
	
	var bano=$("#inpBqBARCODE").val().toUpperCase();
	$("#inpBqBARCODE").val(bano);
	
	var itno=$("#inBqITNO").val().toUpperCase(); //4.11.20
	$("#inBqITNO").val(itno);
	
	
	var whlo=$("#inpWHLO.BqRinputs").val();
	
	if(itno==""){
		gBqBalItemData= getBqItno(whlo,bano);
		if(gBqBalItemData==false){ //30.7.20
			clearBalQueryScreen();
			return;
		}
	}else{
		gBqBalItemData= getBqItnoByITNO(whlo,itno);
		if(gBqBalItemData==false){ //30.7.20
			clearBalQueryScreen();
			return;
		}
	}
	
	gBqItemData=getDecimalIndiAndDescriptionFromMitmas(gBqBalItemData.MLITNO);
	if(gBqItemData==false){ //30.7.20
		clearBalQueryScreen();
		return;
	}
	
	$("#inpBqITDS").html(gBqItemData.MMITDS);
	$("#inpBqWHSL").html(gBqBalItemData.MLWHSL);
	if(gBqBalItemData.MLWHSL!="") {
		$("#inpBqBARCODE").blur();
		getBqData();
	}
}

function getBqData(){
	
	$('#datagridBalQueryl').destroy();
	$('#task-listview').destroy();
	var whlo=$("#inpWHLO.BqRinputs").val();
	var bano=$("#inpBqBARCODE").val();
	
	var grid, columns = [], dataset = [];
	
	columns.push({
		name : 'St.Zone',
		id : 'MLSLTP',
		field : 'MLSLTP',
		width: 40,
		sortable : false
	});
	
	columns.push({
		name : 'Location',
		id : 'MLWHSL',
		field : 'MLWHSL',
		width: 70,
		sortable : false
	});
	
	
	columns.push({
		name : 'Lot',
		id : 'MLBANO',
		field : 'MLBANO',
		width: 100,
		sortable : false
	});
	
	columns.push({
		name : 'Qty',
		id : 'MLSTQT2D',
		field : 'MLSTQT2D',
		sortable : false
	
	});
	
	columns.push({
		name : 'Allocated',
		id : 'MLALQT2D',
		field : 'MLALQT2D',
		sortable : false
		
	});
	
	var dataToSend = {
			usepool : 1,
			mie : "mie_VAR_balQuery",
			cono : glob_ObjM3UserProp.CONO,
			whlo : whlo,
			bano: bano,
			itno : gBqBalItemData.MLITNO

		};

		var url = "../sql/runSQL.jsp";
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
			//	for (var i = 0; i < data.length; i++) {
		
		var listview=    $("#task-listview").listview({
			source:data
		})
		
		/*rem 4.11.20 not visible already
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
			
			summaryRow : false /
			

		}).data('datagrid');
	
	*/
				
		$("#inpBqBARCODE").focus(); //30.7.20 //7.4.21 was inBqITNO
		$("#inpBqBARCODE").select(); //30.7.20 //7.4.21 was inBqITNO
		
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
		topSoHo.alert( longError,"Error running query");
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
	var url = "../sql/runSQL.jsp";
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
			topSoHo.alert("Item not found!");
			ret=false;
		}

	}

	return ret;
	
}
function getBqItnoByITNO(whlo,itno){ //4.11.20
	
	var ret = "";

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_queryBarcodeBalanceITNO",
		cono : glob_ObjM3UserProp.CONO,
		whlo: whlo,
		itno: itno
	

	};
	var url = "../sql/runSQL.jsp";
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
			topSoHo.alert("Item not found!");
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
	var url = "../sql/runSQL.jsp";
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
			topSoHo.alert("Lot not found!");
			ret=false;
		}

	}

	return ret;

	
}