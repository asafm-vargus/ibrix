var gdatagridMvlConsol;

function clearMvlConScreen() {
	$(".MvlConinputs").val("");
	$(".MvlConinputs").html("");

	// $("#chxREND").prop('checked',false);
	$("#inpWHLOMvlConinputs").val(glob_ObjM3UserProp.WHLO);
	buildFromWHSL();
	$("#btnMoveCon").prop('disabled',true);
	
	$("#inpDLIXMvlConinputs").focus(); //12.4.20
}


function getMvlConData(enteredField){ //12.4.20
	console.log("getMvlConData:" + enteredField);
	var whsl=$("#inpWHSLMvlConinputs").val().toUpperCase();
	$("#inpWHSLMvlConinputs").val(whsl);
	$("#inpBARCODEMvlConinputs").val($("#inpBARCODEMvlConinputs").val().toUpperCase());
	var whlo = $("#inpWHLOMvlConinputs").val();
	if(enteredField=="inpDLIXMvlConinputs"){
		//check if DLIX exists in MITALO
		$("#inpWHSLMvlConinputs").focus();
	}
	if(enteredField=="inpWHSLMvlConinputs"){
		 var slds=runAPI_MMS010MI_GetLocation(whlo,whsl);
		 $("#inpSLDS").html(slds);
		 $("#inpBARCODEMvlConinputs").focus();
		 
		 //getConsolidateData();
	}
	if(enteredField=="inpBARCODEMvlConinputs"){
		MvlConGetBanoData();
	}
	if(enteredField=="inpALQTMvlConinputs"){
		mhs850do();
	}
	
	
}

function MvlConGetBanoData(){
	var whlo = $("#inpWHLOMvlConinputs").val();
	var whsl=$("#inpWHSLMvlConinputs").val();
	var bano=$("#inpBARCODEMvlConinputs").val();
	var dlix=$("#inpDLIXMvlConinputs").val();
	
	var ret = [];

	var dataToSend = {
		usepool : 1,
		localQuery : "mmtegm",
		mie : "mie_EGM_GetMITALOsum",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		bano : bano,
		whsl : whsl,
		dlix: dlix

	};
	var url = "../sql/runSQL.jsp?_"+ dataToSend.mie;
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
			var alqt=data[0].ALQT;
			var itno=data[0].MQITNO;
			var itds=data[0].MMITDS;
			

			$("#inpITNOMvlConinputs").html(itno);
			$("#inpITDSMvlConinputs").html(itds);
			$("#inpALQTMvlConinputs").val(alqt);
			$("#btnMoveCon").prop('disabled',false);
			$("#inpALQTMvlConinputs").focus();
		}else{
			BadScanAudio.play();
			topSoHo.alert("לא נמצאה מנה");
			$("#inpBARCODEMvlConinputs").focus();
		}
	}
	return ret;

}

function buildFromWHSL() {

	var whlo = $("#inpWHLOMvlConinputs").val();
	/* rem 12.4.20
	$("#ddlWHSL").destroy();

	$("#ddlWHSL").dropdown({
		source : lstCreates(whlo)
	}).on('change',function() {	
		console.log('ddlWHSL changed'); // 30.4.19
		var whsl=this.value;
		getConsolidateData();
		//ddlLTYPchanged();
	});
	*/
	/*
	$("#ddlTWSL").destroy();

	$("#ddlTWSL").dropdown({
		source : lstConsolidates(whlo),
		reload:true
	}).on('change',function() {	
		
		//ddlLTYPchanged();
	});
	
	var api = $('#ddlTWSL').data('dropdown');
	api.open(function(){
		api.selectValue("PACKCON");
		this.close();
		setTimeout("$('#ddlTWSL').data('dropdown').close()",200);
	});
	*/
//	api.close();
}

function lstCreates(whlo) {

	var ret = [];

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_sp_LstCrates",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		usid : glob_ObjM3UserProp.USID

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
		
			for (var i = 0; i < data.length; i++) {
				var label= data[i].MSSLDS;
				if(data[i].MSTRFL!=undefined && data[i].MSTRFL.length ) label+=" (" + data[i].MSTRFL + ")";
				ret.push({

					value : data[i].MSWHSL,
					label :label
					/*,
					badge:3,
					badgeColor : "error",
					selected:true
				*/

				});

			}
			
		}
	}
	return ret;

}

function lstConsolidates(whlo) {

	var ret = [];

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_sp_LstConsolidate",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		usid : glob_ObjM3UserProp.USID

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
		
			for (var i = 0; i < data.length; i++) {
				var label= data[i].MSSLDS;
			
				ret.push({

					value : data[i].MSWHSL,
					label :label
					/*,
					badge:3,
					badgeColor : "error",
					selected:true
				*/

				});

			}
			
		}
	}
	return ret;

}


function getConsolidateData(){
	
	var whlo = $("#inpWHLOMvlConinputs").val();
	var whsl = $("#inpWHSLMvlConinputs").val().toUpperCase();// $("#ddlWHSL").val();
	$('#datagridMvlConsol').destroy();
	$("#btnMoveCon").prop('disabled',true);
	
	
	var grid, columns = [], dataset = [];
	
	columns.push({
		name : 'מק"ט',
		id : 'MQITNO',
		field : 'MQITNO',
		width: 70,
		sortable : false
	});
	
	columns.push({
		name : 'משלוח',
		id : 'MQRIDI',
		field : 'MQRIDI',
		width: 70,
		sortable : false
	});
	
	
	columns.push({
		name : 'מנה',
		id : 'MQBANO',
		field : 'MQBANO',
		width: 100,
		sortable : false
	});
	
	columns.push({
		name : 'כמות',
		id : 'MQTRQT',
		field : 'MQTRQT',
		sortable : false,
		formatter : Formatters.Integer
	});
	
	columns.push({
		name : 'מוקצה',
		id : 'MQALQT',
		field : 'MQALQT',
		sortable : false,
		formatter : Formatters.Integer
	});
	
	var dataToSend = {
			usepool : 1,
			mie : "VAR_sp_LstConsolidateData",
			cono : glob_ObjM3UserProp.CONO,
			whlo : whlo,
			whsl: whsl,
			usid : glob_ObjM3UserProp.USID

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
				if(data[0].ERR_TXT!=undefined && data[0].ERR_TXT.length){
					 columns = [];
					
					columns.push({
						name : 'שגיאה',
						id : 'ERROR_FLAG',
						field : 'ERROR_FLAG',
						width: 70,
						sortable : false
					});
					
					columns.push({
						name : 'תיאור',
						id : 'ERR_TXT',
						field : 'ERR_TXT',
						sortable : false
					});
				}else{
					$("#btnMoveCon").prop('disabled',false);
				}
			}
			//	for (var i = 0; i < data.length; i++) {
		
		
		
		gdatagridMvlConsol = $('#datagridMvlConsol').datagrid({
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
			
			summaryRow : false /* if true will kill render */
			

		}).data('datagrid');
	
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
		//topSoHo.alert( longError,"שגיאה בהרצת שאילתה");
		document.body.style.cursor = 'default';
		//$('#standalone-busy').trigger('complete.busyindicator');
		}
			
}

function mhs850do(){
	
	console.log("mhs850do");
	var whlo = $("#inpWHLOMvlConinputs").val();
	var whsl=$("#inpWHSLMvlConinputs").val();
	var bano=$("#inpBARCODEMvlConinputs").val();
	var dlix=$("#inpDLIXMvlConinputs").val();
	
	var ret = [];

	var dataToSend = {
		usepool : 1,
		localQuery : "mmtegm",
		mie : "mie_EGM_LstMITALOsum",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		bano : bano,
		whsl : whsl,
		dlix: dlix

	};
	var url = "../sql/runSQL.jsp?_"+ dataToSend.mie;
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
			var twsl="CONSL"
			var inputFields = {};

			inputFields.PRMD = "*EXE";
			inputFields.CONO = glob_ObjM3UserProp.CONO;
			inputFields.WHLO = $("#inpWHLOMvlConinputs").val();
			inputFields.E0PA="WMS";
			inputFields.E065="ORDERS";
			inputFields.ISMD="1";
			inputFields.TWSL=twsl;
			
			for(var i=0;i<data.length;i++){
				
				var trqt=data[i].MQALQT;
				var itno=data[i].MQITNO;
				var bano=data[i].MQBANO;
				var whsl=data[i].MQWHSL;
				var plrn=data[i].MQPLRN;
				
				inputFields.BANO=bano;
				inputFields.QTYP=Math.round(trqt);
				inputFields.PLRN=plrn;
				inputFields.WHSL=whsl;
				var res=runAPI_MHS850_AddPickViaRepNo(inputFields);
				if(res==false) return;
			}
			CompleteScanAudio.play();
			$("#btnMoveCon").prop('disabled',true);
			$("#inpBARCODEMvlConinputs").val("");
			$("#inpALQTMvlConinputs").val(""); //12.7.21
		//	$("#inpWHSLMvlConinputs").val(""); //28.6.21
			$("#inpWHSLMvlConinputs").focus(); //28.6.21
			$("#inpWHSLMvlConinputs").select(); //12.7.21
		
			
		
		}
	}
	
	
	
}


function runAPI_MHS850_AddPickViaRepNo(inputFields) {


	console
			.log("-----------------------start runAPI_MHS850_AddPickViaRepNo --------------------------------");
	// console.log(inputFields);

	var program = 'MHS850MI';
	var transaction = 'AddPickViaRepNo';
	var returncols = '';

	var anserAtt = RunApiProxy_OneAnswer_POST(program, transaction, returncols,
			inputFields);
	// var anserAtt = glob_RunApi_OneAnswer_POST(program, transaction,
	// returncols, inputFields);
	if (anserAtt.error != undefined && anserAtt.error != null
			&& anserAtt.error != "") {
		
		
		BadScanAudio.play();
		topSoHo.alert(anserAtt.error);
		return false;
	}
	   $('body').toast({timeout:2000,
			title : 'העברה לקונסולידציה',
			message : 'מנה:' + inputFields.BANO   + ' כמות :' + inputFields.QTYP + ' לאיתור:' +  inputFields.TWSL 
		});
	  // GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}


