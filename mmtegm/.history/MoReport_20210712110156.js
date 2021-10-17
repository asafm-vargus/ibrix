var gMoDetails={};



function getMoData(enteredField){
	
	console.log("getMoData:" + enteredField);
	
	var whlo=$("#inpWHLOMoRinputs").val();
	
	if(enteredField=="inpMFNOMoRinputs"){
	//	$("#inpMoREQA").prop("readonly",false); //12.2.20
		var mfno=$("#inpMFNOMoRinputs").val();
		var whlo=$("#inpWHLOMoRinputs").val();
		gMoDetails=getMoDetails(whlo,mfno);
		if(gMoDetails==false){
			$("#inpMFNOMoRinputs").focus();
			$("#inpMFNOMoRinputs").select();
			return;
		}
		$("#inpMoITDS").html(gMoDetails.MMITDS);
		$("#inpMoITNO").html(gMoDetails.VHITNO);
		$("#inpMoORQA").html(Math.round(gMoDetails.VHORQA));
		$("#inpMoMAQA").html(Math.round(gMoDetails.VHMAQA));
		//$("#inpMoWHSL").html(gMoDetails.VHWHSL);
		$("#inpMoWHSL").val(getDefaultWHSfromMITBAL(whlo,gMoDetails.VHITNO)); //28.6.21
		if($("#inpMoWHSL").val()=="") { //12.7.21
			$("#inpMoWHSL").focus();
			$("#inpMoWHSL").select()
		}else{
			$("#inpMoREQA").focus();
			$("#inpMoREQA").select()
		}
		;
	}
	
	
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
	
	

	if(whlo=="101" && enteredField=="inpMoREQA" ){
		if($("#txtFULLQty").val()==0) calculatePartialAndPerform();
		
		//$("#inpMoREQA").prop("readonly",true); //12.2.20
	}
	if(whlo=="101" && enteredField=="txtPARTqty" ){
		if($("#txtPARTqty").val()>0) {
			$("#inpMoPartWHSL").val(getDefaultWHSL($("#inpWHLOMoRinputs").val(),gMoDetails.VHPRNO,'M','R',$("#txtPARTqty").val(),gMoDetails.VHMFNO+'P' ).DFT_LOC);
			$("#inpMoWHSL").focus();
			$("#inpMoWHSL").select();
		}
	}

	if(enteredField=="inpMoREQA" ){ //12.2.20
		$(".btnPMS050").attr("disabled", false); //12.2.20
		$("#inpMoWHSL").focus();
			$("#inpMoWHSL").select();
	}
	
	
	if(enteredField=="inpMoWHSL"){
		 $("#inpMoWHSL").val( $("#inpMoWHSL").val().toUpperCase()); 
		var whsl= $("#inpMoWHSL").val();
		if(whsl!="" )pms050do();
		/*
		if($("#inpMoPartWHSL").val()!="") {
			$("#inpMoPartWHSL").focus();
			$("#inpMoPartWHSL").select();
		}else{
			pms050do();
		}*/
		
	}
	
	if(enteredField=="inpMoPartWHSL"){
		pms050do();
	}
}



function getMoDetails(whlo,mfno){
	
	var ret = "";

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_GetMoData",
		cono : glob_ObjM3UserProp.CONO,
		whlo: whlo,
		mfno: mfno
	

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
			topSoHo.alert("לא נמצאה הוראת ייצור!");
			ret=false;
		}

	}

	return ret;

	
}
function getLocationsLookup(){
	
	var grid, columns = [], dataset = [];

	var whlo=$("#inpWHLOMoRinputs").val();
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
			
	$('#inpMoWHSL').destroy();
	var inpOBADID = $('#inpMoWHSL').lookup({
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
			
			filterable : false,
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
		$("#inpMoWHSL").html(f.cua1); // 21.1.19
	});

		}
	}
}

function clearMOReceiptScreen(){
	$(".MoRinputs").val("");
	$(".MoRspan").html("");
	
	//$("#chxREND").prop('checked',false);
	showMoReport();
}


function calculatePartialAndPerform(){ //13.9.18
	var	txtPARTqty=$("#txtPARTqty").val() *1 ;
	var	txtFULLQty=$("#txtFULLQty").val() *1;
	var txtREQA=$("#inpMoREQA").val()*1 ;
	var tomu=gMoDetails.MBTOMU*1;
	txtPARTqty= txtREQA % tomu;
	txtFULLQty=txtREQA-txtPARTqty;
	$("#txtPARTqty").val(txtPARTqty);
	$("#txtFULLQty").val(txtFULLQty);
	
	$("#inpMoWHSL").val(getDefaultWHSL($("#inpWHLOMoRinputs").val(),gMoDetails.VHPRNO,'M','R',txtFULLQty,gMoDetails.VHMFNO ).DFT_LOC);
	
	if( txtPARTqty==0){
		$("#inpMoWHSL").focus();
		$("#inpMoWHSL").select();
	} else{
	//	alertt("<%=trans.getTrans(MMTPack.Translator.CONSTANT, "EGM_MO_MSG_PART1")%> "+ txtPARTqty+ " <%=trans.getTrans(MMTPack.Translator.CONSTANT, "EGM_MO_MSG_PART2")%>");
		$("#txtPARTqty").focus();
		$("#txtPARTqty").select();
     	return;  
	}
}


function pms050doFull(){ //12.2.20
	
	//$("#txtFULLQty").val($("#inpMoREQA").val());
	//$("#txtPARTqty").val("0");
	pms050do(false);
}
function pms050do(isSPok){
	if(isSPok==undefined) isSPok=false;
	var whlo=$("#inpWHLOMoRinputs").val();
	if(whlo==undefined || whlo==""){
		topSoHo.alert("חובה להקליד מחסן!");
		$("#inpWHLOMoRinputs").focus();
		$("#inpWHLOMoRinputs").select();
		return;
	}
	
	
	var mfno=gMoDetails.VHMFNO;
	if(mfno==undefined || mfno==""){
		topSoHo.alert("יש להקליד הוראת ייצור!");
		$("#inpMFNOMoRinputs").focus();
		$("#inpMFNOMoRinputs").select();
		return;
	}
	/*
	if($("#txtFULLQty").val()==0 && $("#txtPARTqty").val()==0){
		topSoHo.alert("יש להקליד כמות!");
		$("#txtFULLQty").focus();
		$("#txtFULLQty").select();
		return;
		
	}
	*/
	if($("#inpMoREQA").val()==0 && $("#inpMoREQA").val()==""){
		topSoHo.alert("יש להקליד כמות!");
		$("#inpMoREQA").focus();
		$("#inpMoREQA").select();
		return;
		
	}
	
	if($("#inpMoWHSL").val()==""){
		topSoHo.alert("יחובה להקליד איתור!");
		$("#inpMoWHSL").focus();
		$("#inpMoWHSL").select();
		return;
		
	}
	/*
	if($("#txtPARTqty").val()>0 && $("#inpMoPartWHSL").val()==""){
		topSoHo.alert("יחובה להקליד איתור חלקי!");
		$("#inpMoPartWHSL").focus();
		$("#inpMoPartWHSL").select();
		return;
		
	}
	*/
	
	if(isSPok==false){
		gErrorContinueFunction="pms050do(true)";
		checkSP($("#inpWHLOMoRinputs").val(),gMoDetails.VHPRNO,'M','R',$("#inpMoREQA").val(),gMoDetails.VHMFNO,0,$("#inpMoWHSL").val() );	
		
		return;
	}
	
	$(".btnPMS050").attr("disabled",true);
	

	 var obj_Row = {};
  //  obj_Row.isChangedFeld = false;
    obj_Row.CONO = glob_ObjM3UserProp.CONO;
    obj_Row.FACI = glob_ObjM3UserProp.FACI;
    obj_Row.MFNO = gMoDetails.VHMFNO;
    obj_Row.RPQA = $("#inpMoREQA").val();
    obj_Row.WHSL = $("#inpMoWHSL").val();
    obj_Row.BANO = gMoDetails.VHMFNO;
  
    obj_Row.STAS="2";
    
    obj_Row.DSP1="1";
    obj_Row.DSP2="1";
    obj_Row.DSP3="1";
    obj_Row.DSP4="1";
    obj_Row.DSP5="1";
    obj_Row.DSP6="1";
    obj_Row.DSP7="1";
    obj_Row.DSP8="1";

    var res=RunPMS050MI_RptReceipt(obj_Row);
/*
    if(res==true && $("#txtPARTqty").val()>0){
    	 obj_Row.BANO = gMoDetails.VHMFNO+'P';
    	 obj_Row.RPQA = $("#txtPARTqty").val();
    	 obj_Row.WHSL = $("#inpMoPartWHSL").val();
    	 res=RunPMS050MI_RptReceipt(obj_Row);
    }
*/
    if(res==true) clearMOReceiptScreen();
}



/*
run API
*/
function RunPMS050MI_RptReceipt(inputFields) {
   console.log("-----------------------start RunPMS050MI_RptReceipt --------------------------------")
   console.log("inputFields final= " + inputFields)
   var program = 'PMS050MI';
   var transaction = 'RptReceipt';
   var returncols = '';

   var anserAtt = RunApiProxy_OneAnswer_POST(program, transaction, returncols, inputFields);
   if (anserAtt.error != undefined && anserAtt.error != null && anserAtt.error != "") {
	   BadScanAudio.play();
	   topSoHo.alert(anserAtt.error);
    //   glob_waitingDialog.hide();
       return false;
   }
   GoodScanAudio.play();
   $('body').toast({timeout:2000,
		title : 'דיווח ייצור',
		message : 'פק"ע:' + inputFields.MFNO   + ' כמות :' + inputFields.RPQA 
	});
   return true;
}




function getDefaultWHSfromMITBAL(whlo, itno) { //28.6.21
	
	var dataToSend = {
		usepool : 1,
		updatesql : 0,
		localQuery:"mmtegm",
		mie : "mie_VAR_getDefaultWHSL",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		
		itno : itno

	};
	var url = "../sql/runSQL.jsp?_" + dataToSend.mie ;
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
			ret = data[0].MBWHSL;
		}

	}

	return ret;

}
