var gbigBoxListview;
var gPickListData = {};
var gSmallBoxBanoData = {};
var gSmallBoxMitaloData = []; //11.12.19 changed to array to allow multiple mitalo lines
var gSmallBoxListPackedItems =[];
var gSelectedBigBox="";
var gBigBoxBanoData ={};
var gLastAddedSmallBoxPanr=""; //12.2.20

function getPickData(enteredField) {
	
	console.log("getPickData:" + enteredField);
	var whlo = $("#inpWHLO.Pickinputs").val();
	var whsl = $("#inpWHSL.SmallBoxinputs").val().toUpperCase();
	$("#inpWHSL.SmallBoxinputs").val(whsl);
	var bano = $("#inpSmallBoxBARCODE").val().toUpperCase();
	
	$("#inpSmallBoxBARCODE").val(bano);

	if (enteredField == "inpDLIX") {
		$(".pickMenuButtons").attr("disabled", true);
		var dlix = $("#inpDLIX").val();
		$("#bdgSmallBox").text("");
		$("#bdgBigBox").text("");
		gPickListData = searchPickingLists(dlix, whlo);
		$("#bdgSmallBox").text(gPickListData.SMALLBOX);
		$("#bdgBigBox").text(gPickListData.BIGBOX);
		var cona="(" + gPickListData.OQCONA + ") " + gPickListData.OKCUNM;
		$("#inpCONA").html(cona);
		showPackageList();
		 $("input").blur(); //for android close onscreen keyboard
	}

	if (enteredField == "inpSmallBoxBARCODE") {
		if (bano != "")
			gSmallBoxBanoData = getPickLotData(bano, whlo, whsl);
		if (gSmallBoxBanoData.LMITNO != undefined) {
			gSmallBoxMitaloData = getPickMitaloData(gPickListData.PIDLIX,
					gPickListData.PIPLSX, bano, whlo, whsl,
					gSmallBoxBanoData.LMITNO);
			if(gSmallBoxMitaloData==false) return false;;
		

			$("#inpSmallBoxITNO").html(gSmallBoxBanoData.LMITNO);
			$("#inpSmallBoxITDS").html(gSmallBoxBanoData.MMITDS);

			let trqt = $("#inpSmallBoxTRQT").val()*1; //12.4.20
			if (trqt == "" || trqt == 0)
				trqt = Math.round(gSmallBoxBanoData.MBTOMU);
			var panr = $("#inpSmallBoxPANR").val();
			if (panr == "")
				panr = "9999";

			
			let sumPacked=0;
			let sumAlqt=0;
			
			let totalAvailableQty=0;
			for(i=0;i<gSmallBoxMitaloData.length;i++){
				
				
				let qty = 0.0;
				let alqt = gSmallBoxMitaloData[i].MQALQT*1; //5
				let paqt = gSmallBoxMitaloData[i].MQPAQT*1; //0
				totalAvailableQty+= alqt - paqt; //5
				sumPacked+=paqt; //21.1.20
				//sumAlqt+=alqt; //21.1.20
			}
			
			if(trqt>totalAvailableQty){ //11.12.19
				topSoHo.alert("כמות גדולה מכמות נותרת!");
				return false;
			}
			sumAlqt=totalAvailableQty*1; //21.1.20
			//if($("#lblPacked").html()>0) sumPacked=$("#lblPacked").html()*1;
			for(i=0;i<gSmallBoxMitaloData.length;i++){
					
				if(trqt==0) break;
				
				let qty = 0.0;
				let alqt = gSmallBoxMitaloData[i].MQALQT*1; //5
				let paqt = gSmallBoxMitaloData[i].MQPAQT*1; //0
				let balance = alqt - paqt; //5
				
				if(trqt<=balance) {  //trqt=7   balance=5 
					qty=trqt;  
					trqt=0; //no need for next time
				}else{
					qty=balance; //5
					trqt=trqt-qty; //7-5=2
				}
				
				if(qty==0) continue;
			/*	
				var remain = Math.round(gSmallBoxMitaloData[i].MQALQT	- gSmallBoxMitaloData[i].MQPAQT);
				$("#lblRemain").html(remain);
				$("#lblPacked").html(Math.round(gSmallBoxMitaloData[i].MQPAQT));
				*/
				
				var inputFields = {};
	
				inputFields.CONO = glob_ObjM3UserProp.CONO;
				inputFields.WHLO = whlo;
				inputFields.RIDI = gPickListData.PIDLIX;
				inputFields.PLSX = gPickListData.PIPLSX;
				inputFields.WHSL = whsl;
				inputFields.BANO = bano;
				inputFields.RIDN = gSmallBoxMitaloData[i].MQRIDN;
				inputFields.RIDL = gSmallBoxMitaloData[i].MQRIDL;
				inputFields.ITNO = gSmallBoxBanoData.LMITNO;
				inputFields.TTYP = "31";
				inputFields.PAQT = qty;
				inputFields.PANR = panr;
				inputFields.PACT = "25";
				
				var res = runAPI_MWS423MI_PackLine(inputFields);
				if (res == false)	return;
				sumPacked+=qty;
			//	sumAlqt+=alqt; //rem 21.1.20
			}
			var currentPacked = $("#lblPacked").html()*1;
		//	var packed=(currentPacked * 1) + (trqt * 1);
			$("#lblPacked").html(sumPacked*1);
			var remain= Math.round(sumAlqt
					- sumPacked );
			$("#lblRemain").html(remain);
			gLastAddedSmallBoxPanr=panr;
			refreshSmallBoxScreen();

		}

	}

	if (enteredField == "inpWHSL") {

		if (whsl != "") {
			$("#inpSmallBoxBARCODE").focus();
			$("#inpSmallBoxBARCODE").select();
		}

	}
}

function refreshSmallBoxScreen() {
	$(".SmallBoxinputsRefresh").val("");
	$(".SmallBoxinputsRefresh").html("");

	$("input").blur(); //for android close onscreen keyboard
	if($("#packContent-listview").is(":visible")==true){
		showPackageContent(gLastAddedSmallBoxPanr);
	}else{
		showPackageList();
		$("#cardByPackages").show();
	}
	
	$("#inpSmallBoxBARCODE").focus();
	$("#inpSmallBoxBARCODE").select();
	
	

}

function showPackageList() {
	
	$("#pack-listview").destroy();
	//$("#smallboxTOpack-listview").destroy();
	var dlix = $("#inpDLIX").val();
	var whlo = $("#inpWHLO.Pickinputs").val();
	
	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_ListPackagesPerDelivery",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		dlix : dlix

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
		// for (var i = 0; i < data.length; i++) {

		var listview = $("#pack-listview").listview({
			source : data
		});
		
		/*
		var listview = $("#smallboxTOpack-listview").listview({
			source : data
		});
		$(".btnConnectPackage").attr("disabled",true);
		*/
	}
}

function searchPickingLists(dlix, whlo) {

	var ret = {};

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_searchPickingLists",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		dlix : dlix

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
			$(".pickMenuButtons").attr("disabled", false);
			//navigator.vibrate(500); 
		} else {
			BadScanAudio.play();
			topSoHo.alert("לא נמצא משלוח !");
			$("#inpDLIX").focus();
			
			ret = false;
		}

	}

	return ret;

}

function getPickLotData(bano, whlo, whsl) {

	var ret = {};

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_PickingGetLotData",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		bano : bano,
		whsl : whsl

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
			// $(".pickMenuButtons").attr("disabled",false);
		} else {
			topSoHo.alert("לא נמצאה מנה !");
			ret = false;
		}

	}

	return ret;

}

function getPickMitaloData(dlix, plsx, bano, whlo, whsl, itno) {

	var ret = [];

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_getQuantitiesFromMitalo",
		cono : glob_ObjM3UserProp.CONO,
		dlix : dlix,
		plsx : plsx,
		whlo : whlo,
		bano : bano,
		whsl : whsl,
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
			ret = data;//[0];
			// $(".pickMenuButtons").attr("disabled",false);
		} else {
			topSoHo.alert("מנה "  + bano + " לא נמצאה!");
			ret = false;
		}

	}

	return ret;

}

function runAPI_MWS423MI_PackLine(inputFields) {

	console
			.log("-----------------------start runAPI_MWS423MI_PackLine --------------------------------");
	// console.log(inputFields);

	var program = 'MWS423MI';
	var transaction = 'PackLine';
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
	$('body').toast(
			{
				title : 'איסוף Small Box',
				message : 'מנה:' + inputFields.BANO + ' כמות :'
						+ inputFields.PAQT + ' לאריזה:' + inputFields.PANR
						,position:'top right',timeout:3000
			});
	// GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}



function runAPI_MWS423MI_UnpackPackage(inputFields) {

	console
			.log("-----------------------start runAPI_MWS423MI_UnpackPackage --------------------------------");
	// console.log(inputFields);

	var program = 'MWS423MI';
	var transaction = 'UnpackPackage';
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
	
	// GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}



function runAPI_MWS423MI_UnpackLine(inputFields) {

	console
			.log("-----------------------start runAPI_MWS423MI_UnpackLine --------------------------------");
	// console.log(inputFields);

	var program = 'MWS423MI';
	var transaction = 'UnpackLine';
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
	
	// GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}

function runAPI_MWS423MI_DltPackage(inputFields) {

	console
			.log("-----------------------start runAPI_MWS423MI_DltPackage --------------------------------");
	// console.log(inputFields);

	var program = 'MWS423MI';
	var transaction = 'DltPackage';
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
	$('body').toast(
			{
				title : 'איסוף Small Box',
				message : 'אריזה:' + inputFields.PANR + 'פורקה!'
				,position:'top right',timeout:3000
						
			});
	 GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}




function runAPI_MWS423MI_ConnectPackages(inputFields) {

	console
			.log("-----------------------start runAPI_MWS423MI_ConnectPackages --------------------------------");
	// console.log(inputFields);

	var program = 'MWS423MI';
	var transaction = 'ConnectPackages';
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
	$('body').toast(
			{
				title : 'איסוף Big Box',
				message : 'אריזה:' + inputFields.PANR + " נארז בתוך: " + inputFields.PAII
				,position:'top right',timeout:3000
			});
	// GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}
function runAPI_MWS423MI_AddPackage(inputFields) {

	console
			.log("-----------------------start runAPI_MWS423MI_AddPackage --------------------------------");
	// console.log(inputFields);

	var program = 'MWS423MI';
	var transaction = 'AddPackage';
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
	$('body').toast(
			{
				title : 'איסוף Big Box',
				message : 'אריזה:' + inputFields.PANR
				,position:'top right',timeout:3000
			});
	// GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}

function runAPI_MWS423MI_ChangePackage(inputFields) {

	console
			.log("-----------------------start runAPI_MWS423MI_ChangePackage --------------------------------");
	// console.log(inputFields);

	var program = 'MWS423MI';
	var transaction = 'ChangePackage';
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
	$('body').toast(
			{
				title : 'איסוף Big Box',
				message : 'אריזה:' + inputFields.PANR + ' משקל:' +  inputFields.GWTM
				,position:'top right',timeout:3000
			});
	// GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}

function delSmallPanr(panr){
	
	

	  $('body').message({
          title: 'פירוק אריזה',
          message: 'בטוח שברצונך לפרק אריזה ' + panr,
          returnFocus: $(this),
          buttons: [{
            text: 'כן',
            click: function(e, modal) {
              console.log('Yes');
              modal.close();
              
              
              var inputFields = {};
   			inputFields.CONO = glob_ObjM3UserProp.CONO;
   			inputFields.DLIX = gPickListData.PIDLIX;	
   			inputFields.PANR = panr;
   			

   			var res = runAPI_MWS423MI_UnpackPackage(inputFields);
   			if (res == false)  				return;
             
   			runAPI_MWS423MI_DltPackage(inputFields);
   			refreshSmallBoxScreen();
   			showBigPackageList();
            }
          }, {
            text: 'לא',
            click: function(e, modal) {
              console.log('No');
              modal.close();
            },
            isDefault: true
          }]
        });
   

}


function showBigPackageList() {
	
	$("#bigboxpack-listview").destroy();
	$("#bdgBigBoxCard").text("");
	var dlix = $("#inpDLIX").val();
	var whlo = $("#inpWHLO.Pickinputs").val();
	
	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_getPackagingList",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		dlix : dlix,
		WhereString:""

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
		// for (var i = 0; i < data.length; i++) {
		$("#bdgBigBoxCard").text(data.length);
		gbigBoxListview = $("#bigboxpack-listview").listview({
			source : data
		}).on('selected', function(e, args) {
			
			gSelectedBigBox=args.selectedData[0].ORPANR;
			$(".btnConnectPackage").attr("disabled",false);
			console.log('selected ' + gSelectedBigBox);
			//showBigBoxDetails();
		}).on('deselected', function(e, args) {
			
			gSelectedBigBox="";
			$(".btnConnectPackage").attr("disabled",true);
			console.log('deselected ');
	       
		});
		
		$(".lvGRWE").click(function() {
			event.stopPropagation();
			$(this).select();
		});

		$(".lvGRWE").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				var panr=$(this).attr("panr");
				updateBigBoxWeight(panr,$(this).val());
			}

		});
		
//gbigBoxListview.data().listview.getSelected()[0].className.replace(" is-selected","") <--- selectd
		
		
	}
}

function updateBigBoxWeight(panr,grwe){

	var dlix = $("#inpDLIX").val();
	var whlo = $("#inpWHLO.Pickinputs").val();
	var inputFields = {};

	inputFields.CONO = glob_ObjM3UserProp.CONO;
	//inputFields.WHLO = whlo;
	inputFields.PANR = panr;
//	inputFields.PACT = pact;
	inputFields.GWTM = grwe;
	inputFields.DLIX = dlix;
	
	
	runAPI_MWS423MI_ChangePackage(inputFields);
	showBigPackageList();
	
}
function buildPACTlist(){
	var whlo = $("#inpWHLO.Pickinputs").val();
	
	$("#ddlCrtPACT").destroy();
	
	$("#ddlCrtPACT").dropdown({
		source : lstPACT(whlo)
		  
	}).on('change',function() {	
		console.log('ddlCrtPACT changed'); // 30.4.19
		var pact=this.value;
		$("#inpCrtPACT").val(pact);
	//	getConsolidateData();
		//ddlLTYPchanged();
	});
}


function newBigBoxPACT(){
	navigator.vibrate(100); 
	setTimeout("newBigBoxPACTDO()",100);
}

function newBigBoxPACTDO(){
	$(".mdlCrtBigbox").val("");
	buildPACTlist();
	$("#modal-crtBigBox").modal('open');
}

function lstPACT(whlo) {

	var ret = [];

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_searchPackagingType",
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
				var label= data[i].M4DOTX + " - " + data[i].M4PACT ;
				//if(data[i].MSTRFL!=undefined && data[i].MSTRFL.length ) label+=" (" + data[i].MSTRFL + ")";
				ret.push({

					value : data[i].M4PACT,
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


function createBigBox(){
	var pact=$("#inpCrtPACT").val();
	var grwe=$("#inpCrtGRWE").val();
	
	var dlix = $("#inpDLIX").val();
	var whlo = $("#inpWHLO.Pickinputs").val();
	
	var panr= getNewPanrOfBigBox(dlix, whlo) ;
	
	var inputFields = {};

	inputFields.CONO = glob_ObjM3UserProp.CONO;
	//inputFields.WHLO = whlo;
	inputFields.PANR = panr;
	inputFields.PACT = pact;
	inputFields.GWTM = grwe;
	inputFields.DLIX = dlix;
	
	
	runAPI_MWS423MI_AddPackage(inputFields);
	showBigPackageList();
	$("#modal-crtBigBox").modal('close');	
}

function getNewPanrOfBigBox(dlix, whlo) {

	var ret = {};

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_getNewPanrOfBigBox",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		dlix : dlix
		

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
			ret = data[0].NEWPANR;
			// $(".pickMenuButtons").attr("disabled",false);
		
		}

	}

	return ret;

}


function connectPackage(fromPANR){
	
	var whlo = $("#inpWHLO.Pickinputs").val();
	
    var inputFields = {};
		inputFields.CONO = glob_ObjM3UserProp.CONO;
		inputFields.DLIX = gPickListData.PIDLIX;	
		inputFields.PANR = fromPANR;
		inputFields.PAII = gSelectedBigBox;
		
		var isAlreadyPacked=checkIfAlreadyPacked(gPickListData.PIDLIX, fromPANR, whlo) ==true;
		
		if(isAlreadyPacked==false) runAPI_MWS423MI_ConnectPackages(inputFields);
		//if (res == false)  				return;
   
		//runAPI_MWS423MI_DltPackage(inputFields);
		//refreshSmallBoxScreen();	
		
		clearBigBoxDetails();
	
}

function BigBoxDetailEnter(enteredField) {
	
	console.log("BigBoxDetailEnter:" + enteredField);
	
	var dlix = $("#inpDLIX").val();
	
	
	var whlo = $("#inpWHLO.Pickinputs").val();
	
	var bano = $("#inpBigBoxBARCODE").val().toUpperCase();
	$("#inpBigBoxBARCODE").val(bano);
	
	var trqt=$("#inpBigBoxTRQT.BigBoxDetailinputs").val();

	var panr=$("#inpDetailPANR").val();
	if (enteredField == "inpDetailPANR") {
		 connectPackage(panr);
	
	}
	if (enteredField == "inpBigBoxBARCODE") {
		var panr="9999";
		gBigBoxBanoData= getQnatityFromMftrns(panr,bano, whlo, dlix);
		if(gBigBoxBanoData==false){
			gBigBoxBanoData= getQnatityFromMftrns("",bano, whlo, dlix); //no 9999 panr
		}
		$("#inpBigBoxITNO.BigBoxDetailinputs").val(gBigBoxBanoData.OSITNO);
		$("#inpSmallBoxITDS.BigBoxDetailinputs").html(gBigBoxBanoData.MMITDS);
		$("#inpBigBoxTRQT.BigBoxDetailinputs").val(Math.round(gBigBoxBanoData.OSDLQT));
		
		$("#inpBigBoxTRQT.BigBoxDetailinputs").focus();
		$("#inpBigBoxTRQT.BigBoxDetailinputs").select();
		
	}
	
	if (enteredField == "inpBigBoxTRQT") {
		panr=gBigBoxBanoData.OSPANR.trim();
		console.log("gBigBoxBanoData.OSPANR=" + gBigBoxBanoData.OSPANR);
		if(panr!="9999") panr="";
		if(bano!="" && trqt>0){
			
			if(panr=="9999" && trqt*1> gBigBoxBanoData.OSDLQT*1){
				topSoHo.alert("לא ניתן לארוז יותר ממה שיש בתת קופסה");
				return false;
			}
			var smallBoxRemain=gBigBoxBanoData.OSDLQT*1 - trqt*1;
			

		    var inputFields = {};
				inputFields.CONO = glob_ObjM3UserProp.CONO;
				inputFields.RIDI = gPickListData.PIDLIX;	
				inputFields.PLSX = gPickListData.PIPLSX;
				inputFields.WHLO = whlo;
				inputFields.WHSL = gBigBoxBanoData.MQWHSL;
				inputFields.ITNO = gBigBoxBanoData.OSITNO;
				inputFields.RIDN = gBigBoxBanoData.OSRIDN;
				inputFields.RIDL = gBigBoxBanoData.OSRIDL;
				inputFields.BANO = bano;
				inputFields.TTYP = "31";
				
				var res=true;
				if(panr=="9999") res=runAPI_MWS423MI_UnpackLine(inputFields);
				
				if(res==false) return;
					
				
				inputFields.PAQT = trqt;
				inputFields.PANR = gSelectedBigBox;
				//inputFields.PACT = "25";

				var res = runAPI_MWS423MI_PackLine(inputFields);
				if (res == false)		return;	
				
				inputFields.PAQT = smallBoxRemain;
				inputFields.PACT = "25";
				inputFields.PANR = panr;
				//inputFields.PACT = "25";

				if(smallBoxRemain*1>0) var res = runAPI_MWS423MI_PackLine(inputFields);
				if (res == false)		return;	
				
				clearBigBoxDetails();
		}
		
		
	}
	
}

function clearBigBoxDetails(){
	
	showOneBigPackageList(gSelectedBigBox);		
	$(".BigBoxDetailinputs").val("");
	$(".BigBoxDetailinputs").html("");
	$("#inpBigBoxBARCODE").focus();
}


function showOneBigPackageList(panr) {
	
	$("#bigboxpackDetail-listview").destroy();
	$("#cardBigBoxDetails").css( "min-height" ,"140px");
	$("#cardBigBoxDetails").height(140);
	$("#bdgBigBoxCard").text("");
	var dlix = $("#inpDLIX").val();
	var whlo = $("#inpWHLO.Pickinputs").val();
	
	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_getPackagingList",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		dlix : dlix,
		WhereString:" and A.ORPANR='" + panr + "' "

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
		// for (var i = 0; i < data.length; i++) {
		$("#bdgBigBoxCard").text(data.length);
		 $("#bigboxpackDetail-listview").listview({
			source : data
		
		 });
	}
}


function checkIfAlreadyPacked(dlix, panr, whlo) {

	var ret = false;

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_isPacked",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		dlix : dlix,
		panr : panr
		

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
			var paii= data[0].ORPAII;
			
			if(paii!=undefined && paii.trim()!=""){
				topSoHo.alert("אריזה " + panr + " כבר נארזה בתוך " + data[0].ORPAII);
				ret=true;
			}
			// $(".pickMenuButtons").attr("disabled",false);
		
		}else{
			topSoHo.alert("אריזה " + panr + " לא קיימת! ");
			ret=true;
		}

	}

	return ret;

}



function getQnatityFromMftrns(panr,bano, whlo, dlix) {

	var ret = {};

	var WherePanr="";
	if(panr!="") WherePanr=" and OSPANR='" + panr + "' ";
	var dataToSend = {
		usepool : 1,
		mie : "VAR_getQuantityFromMftrns",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		bano : bano,
		dlix : dlix,
		WherePanr : WherePanr

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
			// $(".pickMenuButtons").attr("disabled",false);
		} else {
			//topSoHo.alert("לא נמצאה מנה במשלוח !");
			ret = false;
		}

	}

	return ret;

}



function toggleSmallPackageList(){
	
	$("#crdListLotsTitle").html("תוכן אריזה/מנות");
	if($("#packContent-listview").is(":visible")==true) $("#packContent-listview").hide();
	if($("#cardByItems").is(":visible")==false){
		$("#cardByItems").show();
		$("#cardByPackages").hide();
		$("#inpPackCardITNO").val("");
		$("#inpPackCardITNO").focus();
	}else{
		$("#cardByItems").hide();
		$("#cardByPackages").show();
		$("input").blur(); //for android close onscreen keyboard
	}
	//$("#cardByItems").toggle();
	//$("#cardByPackages").toggle();
	
	
	$("#packLots-listview").destroy();
	$("#pack-listview").destroy();
	
	$("packContent-listview").destroy(); //12.2.20
	if($("#cardByItems").is(":visible")==false)	refreshSmallBoxScreen(); //12.2.20
}




function showPackageContent(panr) {
	
	$("#packContent-listview").show()
	$("#crdListLotsTitle").html("תוכן אריזה " + panr);
//	$("#inpPackContentPANR").html(panr);
	
	$("#cardByPackages").hide();
	$("#cardByContent").show();
	$("#packContent-listview").destroy();
	
	var dlix = $("#inpDLIX").val();
	var whlo = $("#inpWHLO.Pickinputs").val();
	var WhereString="";
	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_lstQuantityFromMftrns",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		dlix : dlix,
		panr : panr,
		WhereString: WhereString

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
			gSmallBoxListPackedItems=data;
		}
		// for (var i = 0; i < data.length; i++) {
		var src=[];
		
		//"OSITNO":  "021-52033","OSBANO":  "1001459859P","OSRIDN":  "0001439972","OSRIDL":  "4","OSPANR":  "2","OSDLIX":  "3526766","OSCONO":  "1","OSWHLO":  "101","MQWHSL":  "PACKCON","OSDLQT":  "1.0","OSCHID":  "אינטנטיה" },

		for (var i = 0; i < data.length; i++) {
			src.push({
				id:''+i, /*0 is blank for some reason so we convert it to text */
				OSBANO : data[i].OSBANO,
				OSRIDN : data[i].OSRIDN,
				OSRIDL : data[i].OSRIDL,
				OSPANR : data[i].OSPANR,
				OSDLQT : data[i].OSDLQT,
				OSCHID : data[i].OSCHID,
				OSITNO : data[i].OSITNO,
				OTHERFLAG : data[i].OTHERFLAG
				

			});

		}
		var listview = $("#packContent-listview").listview({
			source : src
		});
		
		$("input").blur(); //for android close onscreen keyboard
	}
}

function showPackageListByItem() {
	
	var itno=$("#inpPackCardITNO").val();
	$("#packLots-listview").destroy();
	
	var dlix = $("#inpDLIX").val();
	var whlo = $("#inpWHLO.Pickinputs").val();
	
	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_ListLotsPerDelivery",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		dlix : dlix,
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
		async : true,
		success : success,
		error : processError
	});

	function success(data, status, req) {
		if (status == "success" && data.length > 0) {
			gSmallBoxListPackedItems=data;
		}
		// for (var i = 0; i < data.length; i++) {
		var src=[];
		
		//"OSITNO":  "021-52033","OSBANO":  "1001459859P","OSRIDN":  "0001439972","OSRIDL":  "4","OSPANR":  "2","OSDLIX":  "3526766","OSCONO":  "1","OSWHLO":  "101","MQWHSL":  "PACKCON","OSDLQT":  "1.0","OSCHID":  "אינטנטיה" },

		for (var i = 0; i < data.length; i++) {
			src.push({
				id:''+i, /*0 is blank for some reason so we convert it to text */
				OSBANO : data[i].OSBANO,
				OSRIDN : data[i].OSRIDN,
				OSRIDL : data[i].OSRIDL,
				OSPANR : data[i].OSPANR,
				OSDLQT : data[i].OSDLQT,
				OSCHID : data[i].OSCHID
				
				
				

			});

		}
		var listview = $("#packLots-listview").listview({
			source : src
		});
		
		$("input").blur(); //for android close onscreen keyboard
	}
}

function delSmallLot(id){


	   var inputFields = {};
		inputFields.CONO = glob_ObjM3UserProp.CONO;
		inputFields.RIDI = gPickListData.PIDLIX;	
		inputFields.PLSX = gPickListData.PIPLSX;
		inputFields.WHLO = gSmallBoxListPackedItems[id].OSWHLO;
		inputFields.WHSL = gSmallBoxListPackedItems[id].MQWHSL;
		inputFields.ITNO = gSmallBoxListPackedItems[id].OSITNO;
		inputFields.RIDN = gSmallBoxListPackedItems[id].OSRIDN;
		inputFields.RIDL = gSmallBoxListPackedItems[id].OSRIDL;
		inputFields.BANO = gSmallBoxListPackedItems[id].OSBANO;
		inputFields.TTYP = "31";
		
		var msg='בטוח שברצונך לפרק מנה ' + inputFields.BANO + " מאריזה " + gSmallBoxListPackedItems[id].OSPANR;
		if(gSmallBoxListPackedItems[id].OTHERFLAG!=undefined &&  gSmallBoxListPackedItems[id].OTHERFLAG!="") msg+="<br /><b>שים לב!" + gSmallBoxListPackedItems[id].OTHERFLAG + "</b>";
		var res=true;
		
		  $('body').message({
	          title: 'פירוק מנה',
	          message: msg,
	          returnFocus: $(this),
	          buttons: [{
	            text: 'כן',
	            click: function(e, modal) {
	              console.log('Yes');
	              modal.close();
	              
					res=runAPI_MWS423MI_UnpackLine(inputFields);
					if(gSmallBoxListPackedItems[id].SHOWBYCONTENT!=undefined && gSmallBoxListPackedItems[id].SHOWBYCONTENT=="1"){
						showPackageContent(gSmallBoxListPackedItems[id].OSPANR)
					}else{
						showPackageListByItem();
					}
	            }
	          }, {
	            text: 'לא',
	            click: function(e, modal) {
	              console.log('No');
	              modal.close();
	            },
	            isDefault: true
	          }]
	        });
}


