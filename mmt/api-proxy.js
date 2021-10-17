var gMobmaintsession = null;


/**
 * run M3ApiMI for get M3 user information details.
 * store all return params to global Object (gObj_M3UserProp) defined in this js file.
 * @returns {{*}} object with error or return fields/
 */
function proxy_API_getCurrentUser() {
    var retObj = {};
    console.log("-----------------------RUN GENERAL.GetUserInfo--------------------------------")
    var program = 'GENERAL';
    var transaction = 'GetUserInfo';
    // var maxrecs = 100;
    var returncols = 'ZZUSID,ZDCONO,ZDDIVI,ZDFACI,ZZWHLO,ZDLANC,ZDDTFM,TIZO,USFN';
    var inputFields;
    var retObj = RunApiProxy_OneAnswer_POST(program, transaction, returncols, inputFields,true); //20.5.19 add true for teim 

    glob_ObjM3UserProp.USID = retObj.ZZUSID;
    glob_ObjM3UserProp.CONO = retObj.ZDCONO;
    glob_ObjM3UserProp.DIVI = retObj.ZDDIVI;
    glob_ObjM3UserProp.FACI = retObj.ZDFACI;
    glob_ObjM3UserProp.WHLO = retObj.ZZWHLO;
    glob_ObjM3UserProp.LANG = retObj.ZDLANC;  //8.12.15 was DZ
    glob_ObjM3UserProp.DTFM = retObj.ZDDTFM; //8.12.15 was DZ
    glob_ObjM3UserProp.TIZO = retObj.TIZO;
    glob_ObjM3UserProp.USFN = retObj.USFN;


    return retObj;
}



function RunApiProxy_OneAnswer_POST(program, transaction, returncols,
		inputFields,withTrim) {
	
	if(withTrim==undefined) withTrim=false; //10.3.19
	// var ansers= new Array();
	var anserAtt = {};
	// return OBJ
	var maxrecs = 100;
	// construct the URL
	
	var url = 'Queries/m3api-proxy.jsp?_program=' + program
			+ '&_transaction=' + transaction + '&_maxrecs=' + maxrecs
			+ '&_returncols=' + returncols;
	var selectedRows = [];
	$.ajax({
		cache : false,
		async : false,
		"url" : url,
		data : inputFields,
		success : processSuccess,
		error : processError
	});
	function processSuccess(data, status, req) {
		anserAtt.status = status;
		if (status == "success") {

			if ((req.responseText).indexOf("ErrorMessage") > -1) {
				console.log("API Error program-" + program + " transaction- "
						+ transaction);
				var Error = $(req.responseText).find('Message');
				var Message = $(Error).find('Message');
				var txt_Messege = $(Error[0]).text();

				var spaceError = txt_Messege
						.indexOf("                                                                                                                                                                                                                               ");
				if (spaceError > 2) {
					txt_Messege = txt_Messege.substring(0, spaceError)
							+ txt_Messege.substring(spaceError + 224)
				}
				var ApiError = "M3 API Error: ";
				var mesErr = ApiError + ": " + txt_Messege.trim();
				console.log("error from Api=" + ApiError);

				anserAtt.error = mesErr;

			} else {
				var MIRecord = $(req.responseText).find('MIRecord');
				var NameValue = $(MIRecord).find('NameValue');
				var val1 = $(NameValue).find('Value');
				$(val1).each(function(index, ell) {
					
					  var nm = NameValue[index].firstChild.childNodes[0].data;
	                    //var vl = ell.firstChild.data;
	                   
					  	var vl = "";
					  	if(ell.firstChild!=null) vl=ell.firstChild.data; //31.10.19 fix uncaught typeerror cannot read property 'data' of null
	                    if(withTrim==true) vl=vl.trim(); //10.3.19
	                    anserAtt[nm] = vl;        
				});
			}
		}
	}

	function processError(data, status, req) {
		anserAtt.status = status;
		anserAtt.error = "Error in Script Api";
	}

	return anserAtt;
}
