var gMvlBanoDetails={};
var gMvlItemData={};



function getBanoData(enteredField){
	
	console.log("getBanoData:" + enteredField);
	
	var whlo=$("#inpWHLO.Mvlinputs").val();
	
	$("#inpTWSL.Mvlinputs").val($("#inpTWSL.Mvlinputs").val().toUpperCase()); //31.12.20
	$("#inpWHSL.Mvlinputs").val($("#inpWHSL.Mvlinputs").val().toUpperCase()); //31.12.20

	
	if(enteredField=="inpWHLO"){
		var whlo=runAPI_MMS005MI_GetWarehouse(whlo);
		if(whlo!=""){
			glob_ObjM3UserProp.WHLO= whlo.WHLO;
			getLocationsLookupMvl();
		
			clearMvlScreen();
		}
	}
	if(enteredField=="inpMvlBARCODE"){
		gMvlBanoDetails={};
		gMvlItemData={};
		var bano=$("#inpMvlBARCODE").val().toUpperCase();
		$("#inpMvlBARCODE").val(bano);
		if(bano=="") {
			$("#inpMvlITNO").focus();
			$("#inpMvlITNO").select();
			return;	
		}
		
		
		gMvlBanoDetails=getMvlBanoDetails(whlo,bano);
		if(gMvlBanoDetails==false){
			$("#inpMvlBARCODE").focus();
			$("#inpMvlBARCODE").select();
			return;
		}
		gMvlItemData=getDecimalIndiAndDescriptionFromMitmas(gMvlBanoDetails.MLITNO);
		
		
		$("#inpMvlITDS").html(gMvlItemData.MMITDS);
		$("#inpMvlITNOdesc").html(gMvlBanoDetails.MLITNO); //12.2.20
		$("#inpWHSL.Mvlinputs").val(gMvlBanoDetails.MLWHSL);
		$("#inpMvlTRQT").val(ValToDecimal(gMvlBanoDetails.STQT,gMvlItemData.MMDCCD));
	
		MvlFocusLogic();
		//$("#inpMvlTRQT").focus();
		//$("#inpMvlTRQT").select();
	}
	
	if(enteredField=="inpMvlITNO"){ //31.12.20
		gMvlBanoDetails={};
		var itno=$("#inpMvlITNO").val().toUpperCase();
		var mms200 = runAPI_MMS200MI_GetItmBasic(itno);
		
		if(mms200!=""){
		
		
			if(mms200.INDI>0){
				topSoHo.alert("פריט מנוהל מנות. יש להקליד מנה!");
				$("#inpMvlITNO").val("");
				$("#inpMvlBARCODE").focus();
				$("#inpMvlBARCODE").select();
				return;
			}
			gMvlBanoDetails.MLITNO=mms200.ITNO;
				$("#inpMvlITDS").html(mms200.ITDS);
			$("#inpMvlITNOdesc").html(mms200.ITNO); //12.2.20
			MvlFocusLogic();
		}
	}
	if(enteredField=="inpTWSL" || enteredField=="inpMvlTRQT"){
		mms177do();
	}
	

	
	
}

function mms177do(isSPok){
	//console.log("isSPok:"+ isSPok);
	if(isSPok==undefined) isSPok=false;
	
	
	//validations:
	var whlo=$("#inpWHLO.Mvlinputs").val();
	if(whlo==undefined || whlo==""){
		topSoHo.alert("חובה להקליד מחסן!");
		MvlFocusLogic();
		return;
	}
	
	
	if($("#inpMvlBARCODE").val()==""  && $("#inpMvlITNO").val()=="" ){
		topSoHo.alert("חובה להקליד מנה!");
		MvlFocusLogic();
		return;
	}
	
	if($("#inpTWSL.Mvlinputs").val()==""){
		topSoHo.alert("חובה להקליד לאיתור!");
		MvlFocusLogic();
		return;
	}
	
	if($("#inpWHSL.Mvlinputs").val()==""){
		topSoHo.alert("חובה להקליד איתור!");
		MvlFocusLogic();
		return;
	}
	
	if($("#inpTWSL.Mvlinputs").val()==""){
		topSoHo.alert("חובה להקליד לאיתור!");
		MvlFocusLogic();
		return;
	}
	
	if($("#inpMvlTRQT").val()=="" || $("#inpMvlTRQT").val()=="0"){
		topSoHo.alert("חובה להקליד כמות!");
		MvlFocusLogic();
		return;
	}
	
	var itno=gMvlBanoDetails.MLITNO;
	var twsl=$("#inpTWSL.Mvlinputs").val().toUpperCase();
	var whsl=$("#inpWHSL.Mvlinputs").val().toUpperCase();
	var bano=$("#inpMvlBARCODE").val();
	var trqt=$("#inpMvlTRQT").val();
	
	
	
	if(isSPok==false){
		gErrorContinueFunction="mms177do(true)";
		checkSP(whlo,itno,'M','T',trqt,bano,0,twsl );	
		
		return;
	}

	var res = runAPI_MMS175MI_Update(whlo, itno, twsl, trqt, whsl,bano);
	if(res==true){
		clearMvlScreen();
	}
}


function runAPI_MMS175MI_Update(whlo, itno, twsl, trqt, whsl,bano) {
	var inputFields = {};
	inputFields.CONO = glob_ObjM3UserProp.CONO;
	inputFields.WHLO = whlo;
	inputFields.ITNO = itno;
	inputFields.TWSL = twsl;
	inputFields.TRQT = trqt;
	inputFields.WHSL = whsl;
	if(bano!="" )inputFields.BANO = bano;
	inputFields.DSP1 = "1";

	console
			.log("-----------------------start runAPI_MMS175MI_Update --------------------------------");
	// console.log(inputFields);

	var program = 'MMS175MI';
	var transaction = 'Update';
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
	var msg= 'מנה:' + inputFields.BANO   + ' כמות :' + inputFields.TRQT + ' לאיתור:' +  inputFields.TWSL;
	if(inputFields.BANO==undefined) msg= 'מק"ט":' + inputFields.ITNO   + ' כמות :' + inputFields.TRQT + ' לאיתור:' +  inputFields.TWSL;

	 
	   $('body').toast({
			title : 'העברה בין איתורים',
			message :msg
		});
	   GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}


function MvlFocusLogic(){
	
	if($("#inpWHLO.Mvlinputs").val()==""){
		$("#inpWHLO.Mvlinputs").focus();
		return;
	}
	
	if($("#inpMvlBARCODE").val()=="" && $("#inpMvlITNO").val()=="" ){ //31.12.20
		$("#inpMvlBARCODE").focus();
		return;
	}
	
	if($("#inpWHSL.Mvlinputs").val()==""){
		$("#inpWHSL.Mvlinputs").focus();
		return;
	}
	
	if($("#inpTWSL.Mvlinputs").val()==""){
		
		var whlo=$("#inpWHLO.Mvlinputs").val();
		var itno=gMvlBanoDetails.MLITNO;
		var whsl=$("#inpWHSL.Mvlinputs").val();
		var bano=$("#inpMvlBARCODE").val();
		var qty=0;
		var rectype="P";
		var optype="T";
		var gotWHSL=getDefaultWHSL(whlo,itno,rectype,optype,qty,bano,whsl).DFT_LOC; //12.2.20
		
		$("#inpTWSL.Mvlinputs").val(gotWHSL); //12.2.20
		$("#inpTWSL.Mvlinputs").select();
		$("#inpTWSL.Mvlinputs").focus();
		return;
	}
	
	if($("#inpMvlTRQT").val()=="" || $("#inpMvlTRQT").val()=="0"){
		$("#inpMvlTRQT").focus();
		return;
	}
	
}

function getMvlBanoDetails(whlo,bano){
	
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
			topSoHo.alert("לא נמצאה מנה !");
			ret=false;
		}

	}

	return ret;

	
}
function getLocationsLookupMvl(){
	
	var grid, columns = [], dataset = [];

	var whlo=$("#inpWHLO.Mvlinputs").val();
	if(whlo=="") whlo=glob_ObjM3UserProp.WHLO;
	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_SrchLocations",
		cono : glob_ObjM3UserProp.CONO,
		whlo: whlo
		

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
		success : success
	});

	function success(data, status, req) {
		if (status == "success" && data.length > 0) {
			for (var i = 0; i < data.length; i++) {

				dataset.push({
					id : i,
					MSWHSL : data[i].MSWHSL,
					MSSLDS : data[i].MSSLDS
					
					
				});
				// console.log({ id: i, cuno: data[i].OKCUNO, cunm:
				// data[i].OKCUNM, phno: data[i].OKPHNO});
			}

			// FR_Product_ListCustomers
			// Some Sample Data

			// Define Columns for the Grid.
			columns.push({
				id : 'MSWHSL',
				name : 'איתור',
				field : 'MSWHSL',
				filterType : 'integer'
			});
			columns.push({
				id : 'MSSLDS',
				name : 'תיאור',
				sortable : true,
				field : 'MSSLDS',
				filterType : 'text'
			});
			
	$('#inpWHSL.Mvlinputs').destroy();
	var inpOBADID = $('#inpWHSL.Mvlinputs').lookup({
		autoApply : true,
		field:"MSWHSL",
	
		
			autoWidth:true,
		/*
		 * field : function(f) {
		 * 
		 * $("#inpOBCUA1").html(f.cua1); // 21.1.19 return f.adid; },
		 */
		options : {
			columns : columns,
			dataset : dataset,
			
			 selectable : 'single',
			
			filterable : true,
			rowHeight : 'short',
			paging : false,
			pagesize : 25,
			rowNavigation : false,
			pagesizes : [ 5, 10, 25, 50 ]
	/*
			toolbar : {
				results : true,
				keywordFilter : true,
				advancedFilter : false,
				actions : false,
				views : true,
				rowHeight : false,
				collapsibleFilter : false,
				fullWidth : true
			}
			*/
		}
	}).on('change', function(e, args) {
		console.log(args);
		if(args==undefined) return false;
		var f=args[0].data;
		$("#inpWHSL.Mvlinputs").html(f.cua1); // 21.1.19
	});

	var inpOBADID = $('#inpTWSL.Mvlinputs').lookup({
		autoApply : true,
		field:"MSWHSL",
	
		
			autoWidth:true,
		
		options : {
			columns : columns,
			dataset : dataset,
			
			 selectable : 'single',
			
			filterable : true,
			rowHeight : 'short',
			paging : false,
			pagesize : 25,
			rowNavigation : false,
			pagesizes : [ 5, 10, 25, 50 ]
	
		}
	}).on('change', function(e, args) {
		console.log(args);
		if(args==undefined) return false;
		var f=args[0].data;
		$("#inpTWSL.Mvlinputs").html(f.cua1); // 21.1.19
	});
	
		}
	}
}

function clearMvlScreen(){
	$(".Mvlinputs").val("");
	$(".Mvlinputs").html("");
	
	//$("#chxREND").prop('checked',false);
	$("#inpWHLO.Mvlinputs").val(glob_ObjM3UserProp.WHLO);
	MvlFocusLogic();
}

