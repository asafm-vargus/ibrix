var gErrorList = {};
var gErrorListPos = 0;
var gErrorContinueFunction="";
var backFunction="showMainMenu()";


$(document).ready(function() {
	
///	window.onbeforeunload = function() { return "Your work will be lost."; };
	// $('body').on('initialized', function () {

	// alert("doc ready");
	
	
	//login();
	/// showMainMenu();
	//showMoReport();
});

function bodyInit() { // 29.5.19

	login();
	
	// alert("Hello " + glob_ObjM3UserProp.USID);

}

function login() {
	
	
	var obj = proxy_API_getCurrentUser();

	if (obj.error != undefined) {
		var err = "Error_No_user_is_logIn_to_portal._Clear_cache_memory_or_cookies";
		var title = "Error_on_logging";
		var url = "../../m3api-rest/execute/GENERAL/GetUserInfo;maxrecs=100;returncols=ZZUSID,ZDCONO,ZDDIVI,ZDFACI,ZZWHLO,DZLANC,DZDTFM,TIZO,USFN";
		// window.location = "../404.html?title=" + title + "&desc=" + err;
		logonwin = window
				.open(
						url,
						"_blank",
						"resizable=yes, scrollbars=yes, titlebar=yes, width=800, height=900, top=10, left=10");

		var pollTimer = window
				.setInterval(
						function() {
							if (logonwin == undefined) {
								window.clearInterval(pollTimer);
								$('body')
										.message(
												{
													title : '<span>error</span>',
													status : 'error',
													returnFocus : $(this),
													message : '',
													buttons : [ {
														text : 'RETRY',
														click : function() {
															login();
															$(this).data(
																	'modal')
																	.close();
															return false;
														},
														isDefault : true
													} ]

												});
							}
							if (logonwin != undefined
									&& logonwin.closed !== false) { // !== is
								// required
								// for
								// compatibility
								// with
								// Opera
								window.clearInterval(pollTimer);
								loginClosed();
							}
						}, 200);

		return;
	}else{
		console.log("show main menu");
		showMainMenu(); // 12.2.20
	}
}

function loginClosed() {
	login();
}

function backClick(){
	console.log("backFunction:" + backFunction);
	navigator.vibrate(100);
	setTimeout(backFunction);
	
}
function showPickingMenu(clearDLIX){
	navigator.vibrate(100); 
	setTimeout("showPickingMenuDO(" + clearDLIX + ")",100);
}
function showPickingMenuDO(clearDLIX){
	
	
	$(".header").addClass("ruby07");
	backFunction="showMainMenu()";
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	//$("#btnPickingBack").hide();
	
	$(".pickMenuButtons").attr("disabled",true);
	$("#headerTitle").html("Picking Menu");
	$(".divsection").hide(); // hide all
	$("#maincontentPickingMenu").show();
	
	if($("#inpWHLO.Pickinputs").val()=="") $("#inpWHLO.Pickinputs").val(glob_ObjM3UserProp.WHLO); //7.4.21 check if empty first
	//buildPACTlist();
	if(clearDLIX==true) {
		$("#inpDLIX").val("");
		$("#inpCONA").html("");
	}
	$("#inpDLIX.Pickinputs").focus();
	if($("#inpDLIX.Pickinputs").val()!="") getPickData("inpDLIX");
}
function showPoRecieve() {

	$(".PoRinputs").val(""); //12.2.20
	$(".PoRspan").html("");  //12.2.20
	$("#chxREND").prop('checked',false); //12.2.20
	
	$(".header").addClass("turquoise07");
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	
	
	$(".divsection").hide(); // hide all
	$("#maincontentPoRecieve").show();

	$("#headerTitle").html("Purchase Receiving");
	$("#inpWHLO.PoRinputs").val(glob_ObjM3UserProp.WHLO);

	$("#inpPUNO").focus();

}


function showSmallBox(){
	 backFunction="showPickingMenu(false)";
	//$("#btnPickingBack").show();
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	$(".divsection").hide(); // hide all
	$("#maincontentSmallBox").show();

	var ttl="Small Box delivery:" + gPickListData.PIDLIX + "/" + gPickListData.PIPLSX;
	$("#headerTitle").html(ttl);
	$("#inpWHSL.SmallBoxinputs").focus();
	
}
function showBigBox(){
	backFunction="showPickingMenu(false)";
//	$("#btnPickingBack").show();
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	$(".divsection").hide(); // hide all
	$("#maincontentBigBox").show();

	var ttl="Big Box delivery:" + gPickListData.PIDLIX + "/" + gPickListData.PIPLSX;
	$("#headerTitle").html(ttl);
	//$("#inpWHSL.BigBoxinputs").focus();
	showBigPackageList();
	
}
function showBigBoxDetails(panr){
	//$("#btnPickingBack").show();
	backFunction="showBigBox()";
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
//	$(".divsection:not(#maincontentBigBox)").hide(); // hide all except maincontentBigBox
	$(".divsection").hide(); // hide all
	$("#maincontentBigBoxDetails").show();

	var ttl="Big Box delivery:" + gPickListData.PIDLIX + "/" + gPickListData.PIPLSX;
	$("#headerTitle").html(ttl);

	$("#bigBoxDetailHeader").text("Big Box number:" + panr);
	gSelectedBigBox=panr;
	clearBigBoxDetails();

	
}

function showMvl(){
	
	clearMvlScreen(); //12.2.20  clear previous inputs
	$(".header").addClass("emerald07");
	
	$('#maincontentMainMenu').trigger('start.busyindicator');
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	
	setTimeout('showMvlDo()',500);
}
function showMoveToConsol(){
	$(".header").addClass("azure07");
	
	
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	$(".divsection").hide(); // hide all
	$("#maincontentMoveConsol").show();

	$("#headerTitle").html("העברה לקונסולידציה");
	
	//getLocationsLookupMvl();
	
	clearMvlConScreen();
	
	//MvlFocusLogic();
	//$('#maincontentMainMenu').trigger('complete.busyindicator');
}
function showMvlDo(){
	
	
	$(".divsection").hide(); // hide all
	$("#maincontentMvl").show();

	$("#headerTitle").html("Movement. Change Loc – Balance ID");
	
	getLocationsLookupMvl();
	
	clearMvlScreen();
	
	MvlFocusLogic();
	$('#maincontentMainMenu').trigger('complete.busyindicator');
}
function showBalQuery(){
	$(".header").addClass("amethyst07");
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	
	$(".divsection").hide(); // hide all
	$("#maincontentBalQuery").show();

	$("#headerTitle").html("Balance Identity Inquiry");
	clearBalQueryScreen();
	
	
}

function showMainMenu() {

	
	
	$(".header").removeClass("emerald07");
	$(".header").removeClass("turquoise07");
	$(".header").removeClass("amber07");
	$(".header").removeClass("azure07");
	$(".header").removeClass("ruby07");
	$(".header").removeClass("turquoise04");
	$(".header").removeClass("graphite05");
	$(".header").removeClass("amethyst07");
	
	
	
	$("#btnHeaderBack").hide();
	///$("#btnMenuHamburger").show();
	$("#btnMenuHamburger").hide();
	$(".divsection").hide(); // hide all
	$("#maincontentMainMenu").show();
	$("#headerTitle").html("Main Menu");
	
	
	setTimeout("updateBattert()",500);
	 
	
}

function updateBattert(){
//	$('#progress-battery').destroy();
	// $('#progress-battery').data('progress').update(20);
	 //navigator.getBattery().then(batterySuccess, batteryFailure);
}
var numberUpdates = 0;
var battery;

function batterySuccess(batteryManager) {
  battery = batteryManager;
  var lvl=battery.level*100;
  console.log("prog write " + lvl);
  //if(lvl>=0) $('#progress-battery').data('progress').update(lvl+'');
  //document.getElementById("promiseStatus").innerHTML = "success";
 // updateBatteryInformation();
  //battery.addEventListener('chargingchange', updateBatteryInformation);
  //battery.addEventListener('chargingtimechange', updateBatteryInformation);
 // battery.addEventListener('dischargingtimechange', updateBatteryInformation);
 // battery.addEventListener('levelchange', updateBatteryInformation);
}

function batteryFailure() {
 // document.getElementById("promiseStatus").innerHTML = "failed";
}
function showMoReport() {

	
	//clearMOReceiptScreen(); //12.2.20 add clear previous inputs
	$(".MoRinputs").val("");//12.2.20 add clear previous inputs
	$(".MoRspan").html("");//12.2.20 add clear previous inputs
	
	$(".header").addClass("amber07");
	
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	
	$(".divsection").hide(); // hide all
	$("#maincontentMoReport").show();

	$(".btnPMS050").attr("disabled", true); //12.2.20

	$("#headerTitle").html("Manufacture Order- Report Receipt");
	$("#inpWHLO.MoRinputs").val(glob_ObjM3UserProp.WHLO);

	getLocationsLookup(); // 28.10.19
	$("#inpMFNO").focus();
	$("#inpMFNO").select();

}

function runAPI_MMS200MI_GetItmBasic(itno) {

	var inputFields = {};
	inputFields.CONO = glob_ObjM3UserProp.CONO;

	inputFields.ITNO = itno;

	console
			.log("-----------------------start runAPI_MMS200MI_GetItmBasic --------------------------------");
	// console.log(inputFields);

	var program = 'MMS200MI';
	var transaction = 'GetItmBasic';
	var returncols = 'ITNO,ITDS,GRTI,UNMS,STAT,ITTY,FCU1,INDI'; //31.12.20 added INDI

	var anserAtt = RunApiProxy_OneAnswer_POST(program, transaction, returncols,
			inputFields, true);
	if (anserAtt.error != undefined && anserAtt.error != null
			&& anserAtt.error != "") {
		// topSoHo.alert(anserAtt.error);
		return "";
	}

	return anserAtt;
}

function getDefaultWHSL(whlo, itno, rectype, optype, qty, bano,fromWhsl) {
	if(fromWhsl==undefined) fromWhsl=""; //12.2.20
	var ret = "";
	if (bano == undefined)
		bano = "";
	var dataToSend = {
		usepool : 1,
		updatesql : 0,
		mie : "mie_VAR_sp_GetDefaultWHSL",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		rectype : rectype,
		optype : optype,
		usid : glob_ObjM3UserProp.USID,
		itno : itno,
		qty : qty,
		bano : bano,
		fromWhsl:fromWhsl

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
			ret = data[0];
		}

	}

	return ret;

}

function checkSP(whlo, itno, rectype, optype, qty, bano,pnli,whsl) {
	if(pnli==undefined) pnli="0";
	if(whsl==undefined) whsl=""; //17.11.19
	var ret = true;
	gErrorList = {};
	gErrorListPos = 0;

	if (bano == undefined)
		bano = "";
	var dataToSend = {
		usepool : 1,
		updatesql : 0,
		mie : "mie_VAR_sp_CheckEntryToStock",
		cono : glob_ObjM3UserProp.CONO,
		whlo : whlo,
		rectype : rectype,
		optype : optype,
		usid : glob_ObjM3UserProp.USID,
		itno : itno,
		qty : qty,
		bano : bano,
		pnli: pnli,
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
		async : false,
		success : success
	});

	function success(data, status, req) {
		if (status == "success" && data.length > 0) {
			gErrorList = data;
			console.log("sp error");
			processError();
		}else{
			console.log("gErrorContinueFunction:" + gErrorContinueFunction);
			setTimeout(gErrorContinueFunction,500);
			
			return;
		}
	}

	return ret;

}

function processError() {
	if (gErrorListPos > (gErrorList.length - 1)){
		setTimeout(gErrorContinueFunction,500);
		return;
	}
		

	var errType = gErrorList[gErrorListPos].ERROR_TYPE;
	var errText = gErrorList[gErrorListPos].ERROR_TEXT;

	// topSoHo.alert(errText);
if(errType=="W"){
		$('body').message({
			title : '<span>error W</span>',
			status : 'alert',
			returnFocus : $(this),
			message : errText,
			buttons : [ {
				text : 'OK',
				click : function() {
					console.log('OK');
					gErrorListPos++;
					processError();
					$(this).data('modal').close();
				}
				
			}, {
				text : 'Cancel',
				click : function() {
					console.log('Cancel');
					$(this).data('modal').close();
				}
			,isDefault : true /*12.2.20*/
			} ]
		});
	}
	if(errType=="E"){
		
		$('body').message({
			title : '<span>error E</span>',
			status : 'error',
			returnFocus : $(this),
			message : errText,
			buttons : [ {
				text : 'OK',
				click : function() {
					console.log('OK');
					
					$(this).data('modal').close();
				},
				isDefault : true
			} ]
		});
		
	}
	/*
	 * if(errType=="E"){ ret=false; return; }
	 */
}
function signout(){
	window.onbeforeunload = "";
	window.location.replace("login.jsp");
}

function  ValToDecimal(val,dccd) //17.11.19
{
	
	if(dccd==undefined || dccd=="") dccd=0;
	
	 let nVal=0;
	 nVal= val*1;
	 return nVal.toFixed(dccd*1);
	
}



function runAPI_MMS005MI_GetWarehouse(whlo) {

	var inputFields = {};
//	inputFields.CONO = glob_ObjM3UserProp.CONO;
	inputFields.WHLO = whlo;


	console
			.log("-----------------------start runAPI_MMS005MI_GetWarehouse --------------------------------");
	// console.log(inputFields);

	var program = 'MMS005MI';
	var transaction = 'GetWarehouse';
	var returncols = 'WHNM,FACI,WHLO';

	var anserAtt = RunApiProxy_OneAnswer_POST(program, transaction, returncols,
			inputFields, true);
	if (anserAtt.error != undefined && anserAtt.error != null
			&& anserAtt.error != "") {
		 topSoHo.alert(anserAtt.error);
		return "";
	}

	return anserAtt;
}



var BadScanAudio =  new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU3LjE5LjEwMAAAAAAAAAAAAAAA//uwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAA/AACcuwAHCwsPExMXGxsfHyMnJysvLzMzNzs7P0NDR0tLT09TV1dbX19jY2dra29zc3d3e39/g4eHi4+Pk5OXm5ufo6Onp6uvr7O3t7u7v8PDx8vLz9PT19fb39/j5+fr6+/z8/f7+/8AAAAATGF2YzU3LjE2AAAAAAAAAAAAAAAAJAAAAAAAAAAAnLvDB7szAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+7BkAA/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7smQAD/AAAGkAAAAIAAANIAAAAQAAAaQUAAAgAAA0goAABExBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV8DEsHgDGumPwNdZmwOVaMfAwCoFA3VpJ8Ds+c8DQ0FH8DbSmMDlaf8DPAmD/AyUAQA0eGSAwmDxAyXiZ/8DKuGoDCslkDdujcDk+QEDK0uf/8Dsq4MD460EDQQfYDIOTEDQ+C8DMMST//Awlh5AwxAoAFAmHBgWAOJ0HP///GeDHQDgHg3PGWFKAWBAGqgCgIf//+AUDgNvDVAwxZCyAjLByguAx/////Nw7YhKDYsBgEYjwSmRAh47xojuE6BxhPf////////4uAT4RYUoOBcnBXxOYW9i5DMINhsFhsRiQEgAAAAAAwAkBDMAdAYjDQwTUxUIRWPqVYeTHGQlgwcAEYMGDAqTBkhUMwQMHUMLuDRjApgX4wGwEEMEoArjBywb0wTQHQMNQCejB8Ap8MX8yELQ7XmY+Qlw26aA1Zh008Kw7Tg81pQs2Dbg4LS4xlpo1NK05paM5tJg0VIc3qWg0EPQz+IYwcKwwJs81jXcz2XUw3XQznAE4GiwyOJk2jeU3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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==");
var GoodScanAudio = new Audio("data:audio/mp3;base64,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KI9IYhwAAHQMgIgtmEnGYpeaw81UrHKX8nKaOqZ6ujxo5az/spxiclWZXJfku0Bq2pKGrjmgV1m+bAxC/112QdmFMAC4jxLkL3/6P//TXSpDHJrT//r+3rS6Cg9runeRxNPFUnlN9TfemiEgEPMigiqHprALqD60uFkndUVEMf6GDkka+TMOdfIzML1XEhMgcS+qawp7G1L5/9+fzX2LZgYCgEKDCgYnZqp1f//pcO/6kzUBcBRqjUTTodWEnKu4lIzxI9X/84Jk/w613wIAByM2kfmqEAATxKCAiRYBHg0Iif5ZY0BEoFEgVd/76CLWSJ0cPkRKVT9YS/mp9kqNghFAuB6UJK1ev+6sdO/7HKac46eRRzf1/FCTNFf2E0zKhG1/+VFFDf9CGERCMJNf///NCNEhMMRoSEwxGv+sP+k1JqSw1hqTbOsPLWGpfSpNfJgprB1jiQ1MQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zgkT9DBja7gAF4zYXjBXYADhHlFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//OCZEMAAAGkAAAAAAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=");
var CompleteScanAudio = new Audio("data:audio/mp3;base64,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2y06LpdSN03G//uyRK0Pg3hhP1EmGbqW6ffhJwkKQAABpAAAACKNOxiYxh75UxdLqSFpaZDiCwajWSD9y8CVCTt0m1WkqEvfWtX7659tp9bLUyVDYvS+bBCqKcaNhFCIKiERCZh6FShU8zU40op7f///quzmnDpQoeZ9MlVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");


function clearScreen(){
	
	
	
	
	
	
	
	
	
	
	var $visibleForm = $('.divsection:visible'),
    formId = $visibleForm.attr('id');
	
	switch(formId) {
	  case "maincontentMoReport":
	    // code block
	    break;
	  case "maincontentPoRecieve":
		    // code block
		    break;
	  case "maincontentPickingMenu":
		    // code block
		    break;
	  case "maincontentBalQuery":
		  	clearBalQueryScreen();
		    break;
	  case "maincontentMvl":
	//	  clearMvlScreen();
		  clearMvlConScreen();
		    break;
	  case "maincontentMoveConsol":
		    // code block
		    break;
	  case "maincontentSmallBox":
		    // code block
		    break;
	  case "maincontentBigBoxDetails":
		  clearBigBoxDetails();
		    break;
		    
	  case "maincontentBigBox":
		    // code block
		    break;
		    
	  default:
	    // code block
	}

}



function showMoPick() {
	
	
	
	$(".MoPickinputs").val(""); //12.2.20
	$(".MoPickinputs").html("");  //12.2.20
	
	
	$(".header").addClass("turquoise04"); 
	console.log("showMoPick:" );
	$("#mopickDeliveries-listview").destroy();
	getMoPickDelivery();
	
	backFunction="showMainMenu()";
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	
	
	$(".divsection").hide(); // hide all
	$("#maincontentMoPick").show();

	$("#headerTitle").html("Picking (issue) - To Manufacture Order");
	$(".MoPickinputs").val("");
	$("#inpWHLO.MoPickinputs").val(glob_ObjM3UserProp.WHLO);
	
	$("#inpDLIX.MoPickinputs").focus(); //7.4.21 was inpMFNO

}


function showMoPickDetailsDO(dlixDetails){
	console.log("showMoPickDetails:" + dlixDetails);
	backFunction="showMoPick()";
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
//	$(".divsection:not(#maincontentBigBox)").hide(); // hide all except maincontentBigBox
	$(".divsection").hide(); // hide all
	$("#maincontentMoPickDetails").show();

	var ttl="pick list:" + gCurrentMoPickDelivery.OQDLIX + "/" + gCurrentMoPickDelivery.PIPLSX;
	$("#headerTitle").html(ttl);

	$("#MoPickDetailHeader").text("");
	$("#bdgMoPickCount").text("");
	$(".MoPickDetailInputs").val("");
	//gSelectedBigBox=panr;
	//clearBigBoxDetails();
	
	showMoPickDetailsList();
}


function showPhsInv(){
	

	$(".header").addClass("graphite05"); 
	
	backFunction="showMainMenu()";
	$("#btnHeaderBack").show();
	$("#btnMenuHamburger").hide();
	
	
	$(".divsection").hide(); // hide all
	$("#maincontentPhsInv").show();

	$("#headerTitle").html("Physical Inventory Perform");
	$(".PhsInvinputs").val("");
	$("#inpWHLO.PhsInvinputs").val(glob_ObjM3UserProp.WHLO);

	$("#cardStockZones").css( "min-height" ,"320px");
	$("#cardStockZones").height(320);
	
	buildSTNBlist();
	//$("#inpMFNO.MoPickinputs").focus();
}


function GetServerTime() { //15.12.19
    console.log("-----------------------regist.GetServerTime(par)--------------------------------");
    var program = 'GENERAL';
    var transaction = 'GetServerTime';
    var returncols = "DATE,TIME,LMTS";
    var inputFields = "";
    return RunApiProxy_OneAnswer_POST(program, transaction, returncols, inputFields,true); //10.3.19 added true for trim
}
