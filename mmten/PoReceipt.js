var gPurchaseOrderLineDetails={};



function getPoData(enteredField){
	
	console.log("getData:" + enteredField);
	
	if(enteredField=="inpPUNO"){
		var puno=$("#inpPUNO").val();
		var res=runAPI_PPS200MI_GetHead(puno);
		if(res==""){
			$("#inpPUNO").focus();
			return;
		}else{
		//	$("#inpSUNO").val(res.SUNO);
			$("#inpSUDO").focus();
		}
		
	}
	
	if(enteredField=="inpSUDO"){
		var sudo=$("#inpSUDO").val();
		if(sudo!="") $("#inpITNO").focus();
	}
	
	if(enteredField=="inpITNO"){
		
		$("#inpITNO").val($("#inpITNO").val().trim().toUpperCase());
		var itno=$("#inpITNO").val();
		var whlo=$("#inpWHLO.PoRinputs").val();
		var puno=$("#inpPUNO").val();
		var mms200 = runAPI_MMS200MI_GetItmBasic(itno);
		if(mms200!=""){
			$("#inpITDS").html(mms200.ITDS);
			gPurchaseOrderLineDetails=getPurchaseOrderLine(whlo,puno,itno) ;
			$("#inpPNLI").val(gPurchaseOrderLineDetails.IBPNLI);
			$("#inpPUUN").html(gPurchaseOrderLineDetails.IBPUUN);
			$("#inpORQA").html(Math.round(gPurchaseOrderLineDetails.IBORQA));
			$("#inpRVQA").html(Math.round(gPurchaseOrderLineDetails.IBRVQA));
			$("#inpQA").focus();
			
		}
		
	}
	
	if(enteredField=="inpQA"){
		
		var whlo=$("#inpWHLO.PoRinputs").val();
		var itno=$("#inpITNO").val();
		var rectype="P";
		var optype="R";
		var qty= $("#inpQA").val();
		var gotWHSL=getDefaultWHSL(whlo,itno,rectype,optype,qty).DFT_LOC;
		
		$("#inpWHSL").val(gotWHSL);
		$("#inpWHSL").focus();
		
	}
	
	if(enteredField=="inpWHSL"){
		pps001do();
		
	}
}

function pps001do(isSPok){
	if(isSPok==undefined) isSPok=false;
	
	
	
	var whsl= $("#inpWHSL").val();
	if(whsl==""){
		 topSoHo.alert("Invalid Location!");
		 return;
	}
	

	//do validations
	if(isSPok==false){
		gErrorContinueFunction="pps001do(true)";
		checkSP($("#inpWHLO.PoRinputs").val(),$("#inpITNO").val(),'P','R',$("#inpQA").val(),$("#inpPUNO").val(), gPurchaseOrderLineDetails.IBPNLI,whsl);	
		
		return;
	}
	
	 var obj_Row = {};
     obj_Row.isChangedFeld = false;
     obj_Row.CONO = glob_ObjM3UserProp.CONO;
     obj_Row.RESP = glob_ObjM3UserProp.USID;
     obj_Row.RVQA = $("#inpQA").val();
     obj_Row.PUNO = $("#inpPUNO").val();
     obj_Row.PNLI = gPurchaseOrderLineDetails.IBPNLI;
     obj_Row.SUNO = gPurchaseOrderLineDetails.IBSUNO;
     obj_Row.PNLS = gPurchaseOrderLineDetails.IBPNLS;
     obj_Row.WHSL =whsl;
   //  obj_Row.BANO = bano;
     obj_Row.WHLO = $("#inpWHLO.PoRinputs").val();
  //   obj_Row.BREF =  $("#inpBREF_" + rownum).val();
     obj_Row.TRDT = GetServerTime().DATE;
     obj_Row.SUDO = $("#inpSUDO").val().toUpperCase();
     
     if($("#chxREND").is(':checked')) {
     	 obj_Row.OEND=1;
     }
     var res=RunPPS001MI_Receipt(obj_Row);
     if(res==true) clearPOReceiptScreen();
     
     
}

function runAPI_PPS200MI_GetHead(puno) {

	var inputFields = {};
	inputFields.CONO = glob_ObjM3UserProp.CONO;
	
	inputFields.PUNO = puno;


	console
			.log("-----------------------start runAPI_PPS200MI_GetHead --------------------------------");
	// console.log(inputFields);

	var program = 'PPS200MI';
	var transaction = 'GetHead';
	var returncols = 'SUNO';

	var anserAtt = RunApiProxy_OneAnswer_POST(program, transaction, returncols,
			inputFields,true);
	if (anserAtt.error != undefined && anserAtt.error != null
			&& anserAtt.error != "") {
		 topSoHo.alert(anserAtt.error);
		return "";
	}

	return anserAtt;
}



function getPurchaseOrderLine(whlo,puno,itno) {
	var ret = "";

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_ListPurchaseLines",
		cono : glob_ObjM3UserProp.CONO,
		whlo: whlo,
		puno: puno,
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
		}

	}

	return ret;

}


/*
run API
*/
function RunPPS001MI_Receipt(inputFields) {
   console.log("-----------------------start RunPPS001MI_Receipt --------------------------------")
   console.log("inputFields final= " + inputFields)
   var program = 'PPS001MI';
   var transaction = 'Receipt';
   var returncols = '';

   var anserAtt = RunApiProxy_OneAnswer_POST(program, transaction, returncols, inputFields);
   if (anserAtt.error != undefined && anserAtt.error != null && anserAtt.error != "") {
	   topSoHo.alert(anserAtt.error);
    //   glob_waitingDialog.hide();
		BadScanAudio.play();
       return false;
   }
   GoodScanAudio.play();
   $('body').toast({
		title : 'PO Receipt',
		message : 'Purchase Order:' + inputFields.PUNO   + ' Quantity :' + inputFields.RVQA 
	});
   return true;
}




function clearPOReceiptScreen(){
	$(".PoRinputs").val("");
	$(".PoRspan").html("");
	
	$("#chxREND").prop('checked',false);
	showPoRecieve();
}