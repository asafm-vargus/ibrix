var gDeliveriesList = [];
var gMoPickData = [];
var gCurrentMoPickDelivery = {};
var gCurrentMSGN="";

function getMoPickDelivery(enteredField) {
	if(enteredField==undefined) enteredField="";
	console.log("getMoPickDelivery:" + enteredField);

	var dlix = $("#inpDLIX.MoPickinputs").val();
	var whlo = $("#inpWHLO.MoPickinputs").val();
	var mfno = $("#inpMFNO.MoPickinputs").val();

	//if ((enteredField == "inpMFNO" || enteredField=="" ) && mfno != "") {
		gDeliveriesList = searchDeliveries("11", mfno, whlo,dlix);
		if (gDeliveriesList.length == 1 &&  enteredField!="") {
			gCurrentMoPickDelivery = gDeliveriesList[0];
			showMoPickDetails();
		}
	//}

}

function searchDeliveries(ttyp, ridn, whlo,dlix) {
	
	if(dlix==undefined || dlix=="") dlix="0";
	if(ridn==undefined) ridn="";
	if(ridn=="" && dlix==0) return false;
	$("#mopickDeliveries-listview").destroy();
	$("#mopickDeliveries-listview").off(); //<--- will remove events, apperantly the select event is multiplied
		
	
	$("#bdgMoPickDeliveries").text("");
	var ret = [];

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_searchDeliveries",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		ridn : ridn,
		dlix : dlix,
		ttyp : ttyp

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
			
			for(i=0;i<data.length;i++){
				if(data[i].PREVMSGN!="") data[i].ISINPROG=""; //show icon
			}
			ret = data;
			$("#bdgMoPickDeliveries").text(data.length);
			$("#mopickDeliveries-listview").listview({
				source : data
			}).on('selected', function(e, args) {
				
				console.log("selected "+ args);
				gCurrentMoPickDelivery =args.selectedData[0];
				showMoPickDetails();
				//gSelectedBigBox=args.selectedData[0].ORPANR;
				//$(".btnConnectPackage").attr("disabled",false);
				//console.log('selected ' + gSelectedBigBox);
			}).data('listview');
		}else{
			BadScanAudio.play();
			topSoHo.alert("לא נמצא משלוח !");
			
			
			ret = false;
		}

	}

	return ret;

}
function showMoPickDetails(){
	gCurrentMSGN="";
	
	console.log("showMoPickDetails");
	if(gCurrentMoPickDelivery.PREVMSGN!=""){

		var dlix = gCurrentMoPickDelivery.OQDLIX;
		var plsx = gCurrentMoPickDelivery.PIPLSX;
		
		var inputFields = {};

		inputFields.CONO = glob_ObjM3UserProp.CONO;
		inputFields.MSGN = gCurrentMoPickDelivery.PREVMSGN;
		var gotMSGN=runAPI_MHS850_GetWhsHead(inputFields);
		
		var msg="איסוף למשלוח " + dlix + "/" + plsx + " כבר החל בתאריך " + glob_convertAS400dateWithHyphen(gotMSGN.LMDT) + " ע''י " + gotMSGN.CHID + "<br />";
		msg+="האם להמשיך או להתחיל מהתחלה?";
		
		console.log(msg);
		  $('body').message({
	          title: 'איסוף כבר התחיל',
	          message: msg,
	          returnFocus: $(this),
	          buttons: [{
	            text: 'להמשיך',
	            click: function(e, modal) {
	            	gCurrentMSGN=gCurrentMoPickDelivery.PREVMSGN;
	              modal.close();          
	              showMoPickDetailsDO();
	            },isDefault: true
	          }, {
	            text: 'התחל מהתחלה',
	            click: function(e, modal) {
	              console.log('No');
	              runAPI_MHS850_DeleteWhsTran(inputFields);
	              gCurrentMSGN="";
	              modal.close();          
	              showMoPickDetailsDO();
	            }
	            
	          }]
	        });
		  
	}else{
		showMoPickDetailsDO();
	}
	
}


function showMoPickDetailsList() {
	$("#mopick-listview").destroy();

	var whlo = gCurrentMoPickDelivery.OQWHLO;
	var dlix = gCurrentMoPickDelivery.OQDLIX;
	var plsx = gCurrentMoPickDelivery.PIPLSX;

	var dataToSend = {
		usepool : 1,
		mie : "mie_VAR_searchPickingListLines",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		ridi : dlix,
		plsx : plsx,
		msgn : gCurrentMSGN

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

		gMoPickData = data;
		$("#mopick-listview").listview({
			source : data

		});
		$("#bdgMoPickCount").text(data.length);
		$("#inpMoPickBARCODE").focus();
		$("#inpMoPickBARCODE").select();
	}

}

function MoPickDetailsEnter(enteredField) {

	console.log("MoPickDetailsEnter:" + enteredField);
	var bano = $("#inpMoPickBARCODE").val();
	var trqt = $("#inpMoPickTRQT").val();
	if (enteredField == "inpMoPickBARCODE") {
		var foundBano = false;
		var SelectedBano = getSelectedPickMoBano(bano);
		if (SelectedBano > -1) {
			$("#inpMoPickTRQT").val(gMoPickData[SelectedBano].MQTRQT);
			$("#inpMoPickTRQT").focus();
			$("#inpMoPickTRQT").select();

		} else {

			topSoHo.alert("לא נמצאה מנה ברשימת איסוף");
			
			$("#inpMoPickBARCODE").focus();
			$("#inpMoPickBARCODE").select();
			return;
		}

	}
	if (enteredField == "inpMoPickTRQT") {
		var SelectedBanoIndex = getSelectedPickMoBano(bano);
		mhs850CoPick(bano, trqt ,SelectedBanoIndex );
	}

}

function getSelectedPickMoBano(bano) {
	var ret = -1;

	for (i = 0; i < gMoPickData.length; i++) {
		if (gMoPickData[i].MQBANO == bano) {
			ret = i;
			break;
		}
	}

	return ret;
}
function mhs850CoPick(bano, trqt,SelectedBanoIndex ) {
	var whlo = gCurrentMoPickDelivery.OQWHLO;
	var dlix = gCurrentMoPickDelivery.OQDLIX;
	var plsx = gCurrentMoPickDelivery.PIPLSX;
	var whsl = gMoPickData[SelectedBanoIndex].MQWHSL;
	var itno = gMoPickData[SelectedBanoIndex].MQITNO;
	var msln = gMoPickData[SelectedBanoIndex].G2MSLN;
	if(msln==undefined) msln=0;
	var inputFields = {};

	inputFields.PRFL = "";
	inputFields.CONO = glob_ObjM3UserProp.CONO;
	inputFields.WHLO = whlo;
	inputFields.E0PA = "WMS";
	inputFields.E065 = "ORDERS";
	inputFields.ISMD = "0";
	

		
	
	inputFields.DLIX = dlix;
	inputFields.PLSX = plsx;
	inputFields.BANO = bano;
	inputFields.ITNO = itno ;
	inputFields.QTYP = Math.round(trqt);
	inputFields.QTYO = Math.round(trqt);
	inputFields.RIDN =  gMoPickData[SelectedBanoIndex].MQRIDN;
	inputFields.RIDL =  gMoPickData[SelectedBanoIndex].MQRIDL;
	inputFields.WHSL = whsl;

	if(gCurrentMSGN==""){
		var res = runAPI_MHS850_AddMOPick(inputFields);
		if (res == false)		return;
		gCurrentMSGN=res.MSGN;
	}else{
		
		if(msln>0){ //need to delete the line first - before add new one
			var DelinputFields = {};
			DelinputFields.CONO = glob_ObjM3UserProp.CONO;
			DelinputFields.MSGN = gCurrentMSGN;
			DelinputFields.PACN = gCurrentMSGN;
			DelinputFields.MSLN=msln;
			
			var res=runAPI_MHS850_DeleteWhsTran(DelinputFields);
			if(res==false) return false;
		}
		
		inputFields.MSGN = gCurrentMSGN;
		inputFields.PACN = gCurrentMSGN;
		inputFields.QLFR = "11";
		inputFields.TTYP = "11";
		inputFields.ALQT = Math.round(trqt);
		inputFields.DLQT = Math.round(trqt); //11.12.19 was PLQT
		inputFields.CUNO = whlo; //11.12.19
		delete inputFields.QTYP;
		delete inputFields.QTYO;
		delete inputFields.E065;
		delete inputFields.E0PA;
		delete inputFields.ISMD;
		delete inputFields.PRFL;
		
		var res = runAPI_MHS850_AddWhsLine(inputFields);
		if (res == false)		return;
	}
	$(".MoPickDetailInputs").val("");
	showMoPickDetailsList();
	
}

function runAPI_MHS850_AddMOPick(inputFields) {

	console
			.log("-----------------------start runAPI_MHS850_AddMOPick --------------------------------");
	// console.log(inputFields);

	var program = 'MHS850MI';
	var transaction = 'AddMOPick';
	var returncols = 'MSGN,'; /*must have comma */

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
	 * $('body').toast({ title : 'העברה לקונסולידציה', message : 'מנה:' +
	 * inputFields.BANO + ' כמות :' + inputFields.TRQT + ' לאיתור:' +
	 * inputFields.TWSL });
	 */
	// GoodScanAudio.play();
	return anserAtt;// anserAtt.ITNO.trim();
}



function runAPI_MHS850_AddWhsLine(inputFields) {

	console
			.log("-----------------------start runAPI_MHS850_AddWhsLine --------------------------------");
	// console.log(inputFields);

	var program = 'MHS850MI';
	var transaction = 'AddWhsLine';
	var returncols = ''; /*must have comma */

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
	 * $('body').toast({ title : 'העברה לקונסולידציה', message : 'מנה:' +
	 * inputFields.BANO + ' כמות :' + inputFields.TRQT + ' לאיתור:' +
	 * inputFields.TWSL });
	 */
	// GoodScanAudio.play();
	return true;// anserAtt.ITNO.trim();
}


function runAPI_MHS850_GetWhsHead(inputFields) {

	console
			.log("-----------------------start runAPI_MHS850_GetWhsHead --------------------------------");
	// console.log(inputFields);

	var program = 'MHS850MI';
	var transaction = 'GetWhsHead';
	var returncols = 'MSGN,CHID,LMDT,STAT,'; /*must have comma */

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
	 * $('body').toast({ title : 'העברה לקונסולידציה', message : 'מנה:' +
	 * inputFields.BANO + ' כמות :' + inputFields.TRQT + ' לאיתור:' +
	 * inputFields.TWSL });
	 */
	// GoodScanAudio.play();
	return anserAtt;// anserAtt.ITNO.trim();
}



function runAPI_MHS850_DeleteWhsTran(inputFields) {

	console
			.log("-----------------------start runAPI_MHS850_DeleteWhsTran --------------------------------");
	// console.log(inputFields);

	var program = 'MHS850MI';
	var transaction = 'DeleteWhsTran';
	var returncols = ''; /*must have comma */

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
	 * $('body').toast({ title : 'העברה לקונסולידציה', message : 'מנה:' +
	 * inputFields.BANO + ' כמות :' + inputFields.TRQT + ' לאיתור:' +
	 * inputFields.TWSL });
	 */
	// GoodScanAudio.play();
	return anserAtt;// anserAtt.ITNO.trim();
}


function runAPI_MHS850_PrcWhsTran(inputFields) {

	console
			.log("-----------------------start runAPI_MHS850_PrcWhsTran --------------------------------");
	// console.log(inputFields);

	var program = 'MHS850MI';
	var transaction = 'PrcWhsTran';
	var returncols = ''; /*must have comma */

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
				title : 'ניפוק לייצור',
				message : 'משלוח נופק'
				,position:'top right',timeout:3000
			});
	/*
	 * $('body').toast({ title : 'העברה לקונסולידציה', message : 'מנה:' +
	 * inputFields.BANO + ' כמות :' + inputFields.TRQT + ' לאיתור:' +
	 * inputFields.TWSL });
	 */
	// GoodScanAudio.play();
	return anserAtt;// anserAtt.ITNO.trim();
}



function MoPickIssue(){
	
	
	var inputFields = {};

	inputFields.CONO = glob_ObjM3UserProp.CONO;
	inputFields.MSGN =gCurrentMSGN;
	inputFields.PACN =gCurrentMSGN;
	inputFields.PRFL ="*EXE";
	 runAPI_MHS850_PrcWhsTran(inputFields);
     showMoPick();
     /*
	var msg="האם לנפק את המשלוח?";
	  $('body').message({
          title: 'ניפוק',
          message: msg,
          returnFocus: $(this),
          buttons: [{
            text: 'נפק',
            click: function(e, modal) {
            
              modal.close();          
              runAPI_MHS850_PrcWhsTran(inputFields);
              showMoPick();
            },isDefault: true
          }, {
            text: 'בטל',
            click: function(e, modal) {
             
              modal.close();          
             
            }
            
          }]
        });
	  */
}

