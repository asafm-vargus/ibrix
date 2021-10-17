var gPhsLine={};

function buildSTNBlist(){
	var whlo = $("#inpWHLO.PhsInvinputs").val();
	
	$("#ddlSTNB").destroy();
	
	$("#ddlSTNB").dropdown({
		source : lstSTNB(whlo)
		  
	}).on('change',function() {	
		
		var stnb=this.value;
		console.log('ddlSTNB changed ' + stnb); // 30.4.19
	//	showStockZones(whlo,stnb);
		
		$("#cardPhsInv").show();
		
		$("#inpWHSL.PhsInvinputs").focus();
	//	$("#inpCrtPACT").val(pact);
	//	getConsolidateData();
		//ddlLTYPchanged();
	});
}



function lstSTNB(whlo) {

	var ret = [];

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_ListPhsInvNumbers",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo
		

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
		
			for (var i = 0; i < data.length; i++) {
				var label= data[i].SHTX30 + " - " + data[i].SHSTNB ;
				//if(data[i].MSTRFL!=undefined && data[i].MSTRFL.length ) label+=" (" + data[i].MSTRFL + ")";
				ret.push({

					value : data[i].SHSTNB,
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


function PhsInvEnter(enteredField) {
	
	console.log("PhsInvEnter:" + enteredField);
	var whlo = $("#inpWHLO.PhsInvinputs").val();
	var whsl = $("#inpWHSL.PhsInvinputs").val().toUpperCase();
	$("#inpWHSL.PhsInvinputs").val(whsl);
	var bano = $("#inpPhsBARCODE").val().toUpperCase();
	
	var stnb=$("#ddlSTNB").val();
	$("#inpPhsBARCODE").val(bano);
	
	var trqt=$("#inpPhsTRQT").val();

	if (enteredField == "inpWHSL") {
		$("#inpPhsBARCODE").focus();
	}
	
	if (enteredField == "inpPhsBARCODE") {
		
		var itno=CheckAndGetItem(stnb, whlo,whsl,bano) ;
		if(itno!=false){
			var mms200 = runAPI_MMS200MI_GetItmBasic(itno);
			if(mms200!=""){
				$("#inpPhsITDS").html(mms200.ITDS);
				$("#inpPhsITNO").html(itno);
				$("#inpPhsTRQT").focus();
				
				gPhsLine=getPhsLineNumber(stnb, whlo,whsl,bano,itno);
			}
		}
		
	}
	
	if (enteredField == "inpPhsTRQT") {
		PhsInvDo();
	}
	
}

function PhsInvDo(){
	var whlo = $("#inpWHLO.PhsInvinputs").val();
	var whsl = $("#inpWHSL.PhsInvinputs").val().toUpperCase();
	$("#inpWHSL.PhsInvinputs").val(whsl);
	var bano = $("#inpPhsBARCODE").val().toUpperCase();
	
	var stnb=$("#ddlSTNB").val();
	
	var trqt=$("#inpPhsTRQT").val();
	var itno=$("#inpPhsITNO").html();
	
	if(itno==""){
		topSoHo.alert("Item not found");
		return false;
	}
	
	if(gPhsLine!=false){
		if( trqt *1 != gPhsLine.SDSTQR*1){
			  $('body').message({
		          title: 'Abnormal Quantity',
		          message: 'Entered quantity different than physical inventory quantity! <br /> Continue?',
		          returnFocus: $(this),
		          buttons: [{
		            text: 'Yes',
		            click: function(e, modal) {
		              console.log('Yes');
		              modal.close();
		              
		              PhsInvDoDo();
		            }
		          }, {
		            text: 'No',
		            click: function(e, modal) {
		              console.log('No');
		              modal.close();
		            },
		            isDefault: true
		          }]
		        });
		}else{
			PhsInvDoDo();
		}
		
	}else{
		PhsInvDoDo();
	}
	
	
}

function PhsInvDoDo(){
	var whlo = $("#inpWHLO.PhsInvinputs").val();
	var whsl = $("#inpWHSL.PhsInvinputs").val().toUpperCase();
	$("#inpWHSL.PhsInvinputs").val(whsl);
	var bano = $("#inpPhsBARCODE").val().toUpperCase();
	
	var stnb=$("#ddlSTNB").val();
	
	var trqt=$("#inpPhsTRQT").val();
	var itno=$("#inpPhsITNO").html();
	
	
	var dt=getWarehouseServerTime(whlo);
	if(gPhsLine==false){ //bano dosen't exist
		
		var inputFields = {};
		inputFields.CONO = glob_ObjM3UserProp.CONO;

		inputFields.WHLO = whlo;
		inputFields.STNB = stnb;
		inputFields.ITNO = itno;
		inputFields.WHSL = whsl;
		inputFields.BANO = bano;
		inputFields.REPN = "0";
		inputFields.RESP = glob_ObjM3UserProp.USID;
		
		
		
		var strn=runAPI_MMS301MI_AddStockTakeDet(inputFields) ;
		gPhsLine=getPhsLineNumber(stnb, whlo,whsl,bano,itno);
	}
	var phsline=gPhsLine;
	
	if(phsline!=false){
		var inputFields = {};
		inputFields.CONO = glob_ObjM3UserProp.CONO;

		inputFields.WHLO = whlo;
		inputFields.STNB = stnb;
		inputFields.STRN = phsline.SDSTRN;
		inputFields.STQI = trqt;
		inputFields.STBT = "3";
		inputFields.RESP = glob_ObjM3UserProp.USID;
		inputFields.STDI = dt.DT;
		inputFields.STTM = dt.TM;
		
		
		runAPI_MMS301MI_UpdStockTake(inputFields,bano) ;
		
		clearPhsScreen();
	}
	
}
function runAPI_MMS301MI_UpdStockTake(inputFields,bano) {

	console
			.log("-----------------------start runAPI_MWS423MI_PackLine --------------------------------");
	// console.log(inputFields);

	var program = 'MMS301MI';
	var transaction = 'UpdStockTake';
	var returncols = 'STAG';

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
	$('body').toast(
			{
				title : 'Phs. Inv',
				message : 'Lot:' + bano + ' Quantity :'
						+ inputFields.STQI + ' Line:' + inputFields.STRN
						,position:'top right',timeout:3000
			});
	// GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}



function runAPI_MMS301MI_AddStockTakeDet(inputFields,bano) {

	console
			.log("-----------------------start runAPI_MWS423MI_PackLine --------------------------------");
	// console.log(inputFields);

	var program = 'MMS301MI';
	var transaction = 'AddStockTakeDet';
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
	/*
	$('body').toast(
			{
				title : 'ספירת מלאי',
				message : 'מנה:' + bano + ' כמות :'
						+ inputFields.STQI + ' שורה:' + inputFields.STRN
						,position:'top right',timeout:3000
			});
			*/
	// GoodScanAudio.play();
	return  true;
}


function CheckAndGetItem(stnb, whlo,whsl,bano) {

	var ret ;

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_sp_AW_CHECK_STKCNT",
		usid : glob_ObjM3UserProp.USID,
		whlo : whlo,
		stnb : stnb,
		whsl : whsl,
		bano : bano

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
			 var error=data[0].ERR_TXT;
			 var errflag=data[0].ERROR_FLAG;
			if(error !=undefined && error.length || errflag=="Error" ){
				 topSoHo.alert(error);
				 ret=false;
				 
			}else{
				ret=data[0].ITNO;
			}
			
			
			
		} else {
			
			topSoHo.alert("err");
		
			
			ret = false;
		}

	}

	return ret;

}


function getPhsLineNumber(stnb, whlo,whsl,bano,itno) {

	
	 $("#inpPhsBARCODEerr").hide(); 
	var ret ;

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_getPhsLineNumber",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		stnb : stnb,
		whsl : whsl,
		bano : bano,
		itno : itno

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
			 
				ret=data[0];
			
			if(data[0].SDSTQI*1>0){
				
				 $("#inpPhsBARCODEerr").show(); 
			}
			
			
		} else {
	
			ret = false;
		}

	}

	return ret;

}



function getWarehouseServerTime(whlo) {

	var ret ;

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_getServerTimeByWHLOTimeZone",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo
	

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
			 
				ret=data[0];
			
			
			
			
		} else {
	
			ret = false;
		}

	}

	return ret;

}

function showStockZones(whlo,stnb) {
	

	$("#task-listview-phsStockZones").destroy();
	
	var dlix = $("#inpDLIX").val();
	
	
	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_sp_ListStockZones",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		stnb : stnb,
		usid : glob_ObjM3UserProp.USID

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
	
			var listview = $("#task-listview-phsStockZones").listview({
				source : data
			});
		}
		$("input").blur(); //for android close onscreen keyboard
	}
}



function clearPhsScreen(){
	 $("#inpPhsBARCODEerr").hide(); 
	var whsl = $("#inpWHSL.PhsInvinputs").val().toUpperCase();
	$(".PhsInvinputs").val("");
	$(".PhsInvinputs").html("");

	$("#inpWHLO.PhsInvinputs").val(glob_ObjM3UserProp.WHLO);	
	$("#inpWHSL.PhsInvinputs").val(whsl);
	if($("#inpWHSL.PhsInvinputs").val()==""){ //30.7.20
		$("#inpWHSL.PhsInvinputs").focus();
		$("#inpWHSL.PhsInvinputs").select();
	}else{
		$("#inpPhsBARCODE.PhsInvinputs").focus(); //30.7.20
		$("#inpPhsBARCODE.PhsInvinputs").select();//30.7.20
		
	}
	
	//$("#chxREND").prop('checked',false);
	

}