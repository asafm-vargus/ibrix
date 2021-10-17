/**
 * Created by denniszo on 13/05/2015.
 */

/*
 *******************************************************************************************
 *                         Global functions and variables                                  *
 *                            for use in all portals                                       *
 *          All names of included functions and variables must start with "glob_" string.  *
 *                                                                                         *
 *******************************************************************************************
 */

/*
 **************************
 *      variables         *
 **************************
 */

/*
 glob_ObjM3UserProp object contain all M3 user parameters like company,division,day format...
 */
var glob_ObjM3UserProp = {};
/*
 waitingDialog variables is waiting time dialog, good for set to screen when M3 programs are working.
 */
var glob_waitingDialog = (function ($) {
    // Creating modal dialog's DOM proses bar
    var $dialog = $(
        '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" ' +
        'aria-hidden="true" style="height:170px; background:none; direction: <%=direction%>;">' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content">' +
        '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
        '<div class="modal-body">' +
        '<div class="progress progress-striped active" style="margin-bottom:0;">' +
        '<div class="progress-bar" id="proLoadBar" style="width: 100%"></div></div>' +
        '</div>' +
        '</div></div></div>');

    return {
        /**
         * Opens our dialog
         * @param message Custom message
         * @param options Custom options:
         *                  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
         *                  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
         */
        show: function (message, options, pross) {
            // Assigning defaults
            var settings = $.extend({
                dialogSize: 'm',
                progressType: ''
            }, options);
            if (typeof message === 'undefined') {
                console.log("NoNONO");
                message = 'Loading';
            }
            if (typeof options === 'undefined') {
                options = {};
            } else {
                settings = options;
                if (settings.dialogSize == undefined || settings.dialogSize == null || settings.dialogSize == "") {
                    settings.dialogSize = 'm';
                }
                if (settings.progressType == undefined || settings.progressType == null || settings.progressType == "") {
                    settings.progressType = '';
                }
            }
            if (typeof pross === 'undefined') {
                $dialog.find('#proLoadBar').width('100%');
            } else {
                $dialog.find('#proLoadBar').width(pross + '%');
            }
            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Opening dialog

            $dialog.modal();

        },
        /**
         * Closes dialog
         */
        hide: function () {
            $dialog.modal('hide');
        }
    }
})(jQuery);


var glob_waitingDialogProssesing = (function ($) {
    // Creating modal dialog's DOM proses bar
    var $dialog = $(
        '<style>' +
        '.popover {' +
        'background:tomato;' +
        '}' +
        '.modal-static {' +
        'position: fixed;' +
        'top: 50% !important;' +
        'left: 50% !important;' +
        'margin-top: -100px;' +
        'margin-left: -100px;' +
        'overflow: visible !important;' +
        '}' +
        '.modal-static,' +
        '.modal-static .modal-dialog,' +
        '.modal-static .modal-content {' +
        'width: 200px;' +
        'height: 200px;' +
        '}' +
        '.modal-static .modal-dialog,' +
        '.modal-static .modal-content {' +
        'padding: 0 !important;' +
        'margin: 0 !important;' +
        '}' +
        '.modal-static .modal-content .icon {' +
        '}' +

        '</style>' +
        '<div class="modal modal-static fade" ' +
        'id="processing-modal" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<div class="text-center">' +
        '<img src="../sors/loading.gif" class="icon" />' +
        '<h4><button hidden type="button" class="close" style="float: none;" data-dismiss="modal" aria-hidden="true">×</button></h4>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    return {
        /**
         * Opens dialog
         */
        show: function (message) {
            // Assigning defaults

            if (typeof message === 'undefined') {
                message = "Processing...";
            }
            $dialog.find('h4').text(message);
            // Configuring dialog
            $dialog.modal();
        },
        /**
         * Closes dialog
         */
        hide: function () {
            $dialog.modal('hide');
        }
    }
})(jQuery);


var glob_obj_Employee = null;

/*
 **************************
 *  Simple JS functions   *
 **************************
 */

/**
 *  Set clock with refresh from user windows.
 * @param dateHTMLtag - input HTML field tag to post the time/
 *
 */
function glob_getCurrentTime() {
    var dt = new Date();
    var refresh = 1000; //Refresh rate 1000 milli sec means 1 sec

    var date = dt.getDate();
    if (date < 10) date = "0" + date;

    var month = dt.getMonth() + 1;
    if (month < 10)month = "0" + month;

    var hours = dt.getHours();
    if (hours < 10) hours = "0" + hours;

    var minutes = dt.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    var sec = dt.getUTCSeconds();
    if (sec < 10) sec = "0" + sec;

    var cDate = date + "/" + month + "/" + dt.getFullYear();
    //  $('#' + dateHTMLtag).html(cDate + "  [" + hours + ":" + minutes + ":" + sec + "]");
    // window.setTimeout("glob_DisplayCurrentTime('" + dateHTMLtag + "')", refresh);
    return "" + hours + "" + minutes;
}

function glob_DisplayCurrentTimeforUSA(dateHTMLtag) {
    var dt = new Date();
    var refresh = 1000; //Refresh rate 1000 milli sec means 1 sec

    var date = dt.getDate();
    if (date < 10) date = "0" + date;

    var month = dt.getMonth() + 1;
    if (month < 10)month = "0" + month;

    var hours = dt.getHours();
    if (hours < 10) hours = "0" + hours;

    var minutes = dt.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    var sec = dt.getUTCSeconds();
    if (sec < 10) sec = "0" + sec;

    var cDate = month + "/" + date + "/" + dt.getFullYear();
    $('#' + dateHTMLtag).html(cDate + "  [" + hours + ":" + minutes + ":" + sec + "]");
    window.setTimeout("glob_DisplayCurrentTimeforUSA('" + dateHTMLtag + "')", refresh);
}

function glob_getCurrentDateTime() {
    var objDateTime = {};
    var date = new Date();
    objDateTime.year = date.getFullYear();
    objDateTime.yearSm = date.getYear() - 100;
    objDateTime.month = date.getMonth() + 1;
    if (objDateTime.month < 10) objDateTime.month = "0" + objDateTime.month;
    objDateTime.day = date.getDate();
    if (objDateTime.day < 10) objDateTime.day = "0" + objDateTime.day;

    objDateTime.hours = date.getHours();
    if (objDateTime.hours < 10) objDateTime.hours = "0" + objDateTime.hours;
    objDateTime.minutes = date.getMinutes();
    if (objDateTime.minutes < 10) objDateTime.minutes = "0" + objDateTime.minutes;
    objDateTime.sec = date.getUTCSeconds();
    if (objDateTime.sec < 10) objDateTime.sec = "0" + objDateTime.sec;
    objDateTime.timeStep = date.getTime();

    /**day of Year **/
    var start = new Date(date.getFullYear(), 0, 0);
    var diff = date - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var dayOfYeare = Math.floor(diff / oneDay);
    objDateTime.dayOfYeare = dayOfYeare;

    objDateTime.m3Date = objDateTime.year + "" + objDateTime.month + "" + objDateTime.day;

    return objDateTime
}

/*
 **************************
 *  M3 run API programs   *
 **************************
 */

/**
 * Run M3apiMI programs and return one row answer.
 * If M3apiMI will reply more than one row, the last row will be returned from function.
 * @param program - apiMI program neme (like 'MMS001MI').
 * @param transaction - apiMI program method (like 'addItem').
 * @param returncols - return fields from  M3 apiMI program, set as arr ore blank arr if no return, ore use [] to return all fields.
 * @param inputFields - fields to input and send to M3 apiMI.
 * @returns {{}} -if no error from M3apiMI: return object include field name and content (like- CONO:001).
 *               -if is Error in M3apiMI: return object with error '"M3 API Error:":error string '/
 *
 */
function glob_RunApi_OneAnswer(program, transaction, returncols, inputFields) {
    // var ansers= new Array();
    var anserAtt = {};
    // return OBJ
    var maxrecs = 100;
    // construct the URL
    var url = '../../m3api-rest/execute/' + program + '/' + transaction + ';maxrecs=' + maxrecs + ';returncols=' + returncols + '?' + inputFields;
    var selectedRows = [];
    $.ajax({
        cache: false,
        async: false,
        "url": url,
        success: processSuccess,
        error: processError
    });
    function processSuccess(data, status, req) {
        anserAtt.status = status;
        if (status == "success") {

            if ((req.responseText).indexOf("ErrorMessage") > -1) {
                console.log("API Error program-" + program + " transaction- " + transaction);
                var Error = $(req.responseText).find('Message');
                var Message = $(Error).find('Message');
                var txt_Messege = $(Error[0]).text();

                var spaceError = txt_Messege.indexOf("                                                                                                                                                                                                                               ");
                if (spaceError > 2) {
                    txt_Messege = txt_Messege.substring(0, spaceError) + txt_Messege.substring(spaceError + 224)
                }
                var ApiError = "M3 API Error: ";
                var mesErr = ApiError + ": " + txt_Messege.trim();
                console.log("error from Api=" + ApiError);

                anserAtt.error = mesErr;

            } else {
                var MIRecord = $(req.responseText).find('MIRecord');
                var NameValue = $(MIRecord).find('NameValue');
                var val1 = $(NameValue).find('Value');
                $(val1).each(function (index, ell) {
                    var nm = NameValue[index].firstChild.childNodes[0].data;
                    var vl = ell.firstChild.data;
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

function glob_RunApi_OneAnswer_POST(program, transaction, returncols, inputFields) {
    // var ansers= new Array();
    var anserAtt = {};
    // return OBJ
    var maxrecs = 100;
    // construct the URL
    var url = '../../m3api-rest/execute/' + program + '/' + transaction + ';maxrecs=' + maxrecs + ';returncols=' + returncols;
    var selectedRows = [];
    $.ajax({
        cache: false,
        async: false,
        "url": url,
        data: inputFields,
        success: processSuccess,
        error: processError
    });
    function processSuccess(data, status, req) {
        anserAtt.status = status;
        if (status == "success") {

            if ((req.responseText).indexOf("ErrorMessage") > -1) {
                console.log("API Error program-" + program + " transaction- " + transaction);
                var Error = $(req.responseText).find('Message');
                var Message = $(Error).find('Message');
                var txt_Messege = $(Error[0]).text();

                var spaceError = txt_Messege.indexOf("                                                                                                                                                                                                                               ");
                if (spaceError > 2) {
                    txt_Messege = txt_Messege.substring(0, spaceError) + txt_Messege.substring(spaceError + 224)
                }
                var ApiError = "M3 API Error: ";
                var mesErr = ApiError + ": " + txt_Messege.trim();
                console.log("error from Api=" + ApiError);

                anserAtt.error = mesErr;

            } else {
                var MIRecord = $(req.responseText).find('MIRecord');
                var NameValue = $(MIRecord).find('NameValue');
                var val1 = $(NameValue).find('Value');
                $(val1).each(function (index, ell) {
                    var nm = NameValue[index].firstChild.childNodes[0].data;
                    var vl = ell.firstChild.data;
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
/**
 * run M3ApiMI for get M3 user information details.
 * store all return params to global Object (gObj_M3UserProp) defined in this js file.
 * @returns {{*}} object with error or return fields/
 */
function glob_API_getCurrentUser() {
    var retObj = {};
    console.log("-----------------------RUN GENERAL.GetUserInfo--------------------------------")
    var program = 'GENERAL';
    var transaction = 'GetUserInfo';
    // var maxrecs = 100;
    var returncols = 'ZZUSID,ZDCONO,ZDDIVI,ZDFACI,ZZWHLO,ZDLANC,ZDDTFM,TIZO,USFN';
    var inputFields;
    var retObj = glob_RunApi_OneAnswer(program, transaction, returncols, inputFields)

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

function glob_GetServerTime() {
    console.log("-----------------------regist.GetServerTime(par)--------------------------------");
    var program = 'GENERAL';
    var transaction = 'GetServerTime';
    var returncols = "DATE,TIME,LMTS";
    var inputFields = "";
    return glob_RunApi_OneAnswer(program, transaction, returncols, inputFields);
}


/********************** Authentication for Emploee *********************
 *  good to set Authentication like user and password not of real M3 user
 */
/**
 * set modal to Authentication
 * open modal
 */
function glob_loadModalEmployee(isManager) {
    $("#md_setEmployee").remove();
    if (isManager == undefined || isManager == null) {
        isManager = false;
    }
    var modelstr = "<div class='modal fade' id='md_setEmployee' tabindex='-1' role='dialog' aria-labelledby='ar_setEmployee' aria-hidden='true'>" +
        "<div class='modal-dialog'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>";
    if (isManager) {
        modelstr += "<h4 class='modal-title' id='Label_1'>Enter Manager</h4>";
    } else {
        modelstr += "<h4 class='modal-title' id='Label_1'>Enter Employee</h4>";
    }

    modelstr += "</div>" +
        "<div class='modal-body'>" +
        "<form>" +
        "<div id='divfrm_inpEMNO' class='form-group has-feedback'>";
    if (isManager) {
        modelstr += "<label for='inpEMNO' class='control-label'>Manager</label>";
    } else {
        modelstr += "<label for='inpEMNO' class='control-label'>Employee</label>";
    }
    modelstr += "<input type='text' id='inpEMNO' class='form-control popEmplee' style='width: 20%; ' maxlength='10' tabindex='5' data-toggle='popover' data-placement='right'/>" +
        "</div>" +
        "<div id='divfrm_inpCANO' class='form-group  has-feedback'>" +
        "<label for='inpCANO' class='control-label'>Card</label>" +
        "<input type='password' id='inpCANO' class='form-control popEmplee' style='width: 20%; ' maxlength='10' tabindex='6' data-toggle='popover' data-placement='right'/>" +
        "</div>" +
        "</form>" +
        "</div>" +
        "<div class='modal-footer'>" +
        "<button type='button' id='btnClose' style='width: 100px;' class='btn btn-default' data-dismiss='modal'>Close</button>" +
        "<button type='button' id='btnEmployee' style='width: 100px' class='btn btn-primary' onclick='glob_chEmployee(" + isManager + ");'>Enter</button>" +
        "</div>" +
        "<script>" +
        "$('.popEmplee').keyup(function (event) {" +
        "if (event.keyCode == 13) {" +
        "if(this.id=='inpEMNO') $('#inpCANO').focus();" +
        "if(this.id=='inpCANO') glob_chEmployee(" + isManager + ");" +
        "}" +
        "})" +
        "</script>" +
        "</div>" +
        "</div>" +
        "</div>";


    $('body').append(modelstr);

    $('#md_setEmployee').modal('show'); //.modal('hide')
}

/**
 * check employee code
 * get and save in global object (obj_Emploeey) the employee
 */
function glob_chEmployee(isManager) {

    var emno = $('#inpEMNO').val(); //user
    var cano = $('#inpCANO').val(); //pass

    if (emno == "") {
        $('#divfrm_inpEMNO').removeClass('has-success')
        $('#divfrm_inpEMNO').addClass('has-error');
        $('#inpEMNO').popover({content: "Enter employee number"});
        $('#inpEMNO').popover('show');
        $('#inpEMNO').focus();
        return;
    } else {
        $('#divfrm_inpEMNO').removeClass('has-error')
        $('#divfrm_inpEMNO').addClass('has-success');
        $('#inpEMNO').popover('hide');
    }

    if (cano == "") {
        $('#divfrm_inpCANO').removeClass('has-success');
        $('#divfrm_inpCANO').addClass('has-error');
        $('#divfrm_inpCANO').popover({content: "Enter password"});
        $('#inpCANO').popover('show');
        $('#inpCANO').focus();
        return;
    } else {
        $('#divfrm_inpCANO').removeClass('has-error');
        $('#divfrm_inpCANO').addClass('has-success');
        $('#inpCANO').popover('hide');
    }


    var tmpEmployee = glob_SQL_getEmployee(emno);
    if (!isManager) {
        if (tmpEmployee.cano == undefined || tmpEmployee.cano == null || tmpEmployee.cano == "" || tmpEmployee.cano.trim() != cano.trim()) {
            $('#divfrm_inpCANO').removeClass('success');
            $('#divfrm_inpCANO').addClass('has-error');
            $('#divfrm_inpEMNO').removeClass('has-success');
            $('#divfrm_inpEMNO').addClass('has-error');
            $('#inpCANO').val("");
            $('#divfrm_inpCANO').popover({content: "Employee or password not correct !"});
            $('#inpCANO').popover('show');
            $('#inpCANO').focus();
            return;
        } else {
            $('#divfrm_inpCANO').removeClass('has-error');
            $('#divfrm_inpCANO').addClass('has-success');
            $('#divfrm_inpEMNO').removeClass('has-error');
            $('#divfrm_inpEMNO').addClass('has-success');
            $('#inpCANO').popover('hide');
            $('#md_setEmployee').modal('hide');
            glob_obj_Employee = tmpEmployee;
            runLocalSetEmploee();
        }
    } else {
        if (tmpEmployee.cano == undefined || tmpEmployee.cano == null || tmpEmployee.cano == "" || tmpEmployee.cano.trim() != cano.trim() || tmpEmployee.rear != "9999") {
            $('#divfrm_inpCANO').removeClass('success');
            $('#divfrm_inpCANO').addClass('has-error');
            $('#inpCANO').val("");
            if (tmpEmployee.swsc != "1") {
                $('#inpEMNO').val("");
            }
            $('#divfrm_inpCANO').popover({content: "Manager or password not correct !"});
            $('#inpCANO').popover('show');
            $('#inpCANO').focus();

            localManagerRet(false);
            return;
        } else {
            $('#divfrm_inpCANO').removeClass('has-error');
            $('#divfrm_inpCANO').addClass('has-success');
            $('#inpCANO').popover('hide');
            $('#md_setEmployee').modal('hide');
            console.log("Manager is OK");
            localManagerRet(true);
        }
    }


}

/**
 * get employee object if exist in DataBase
 * @param emno - employee number
 * @returns obj_Employee {{emno: *, emnm: string, cano: string, faci: string}}
 */
function glob_SQL_getEmployee(emno) {
    var cano = "";
    var emnm = "";
    var faci = "";
    var rear = "";

    var url = "Queries/getEmploee.jsp?cono=" + glob_ObjM3UserProp.CONO + "&faci=150" + "&emno=" + emno;
    console.log(url)
    $.ajax({
        cache: false,
        async: false,
        "url": url,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: processSuccess,
        error: processError
    });
    function processSuccess(data, status, req) {
        if (status == "success") {
            var obj = $.parseJSON(req.responseText);
            $.each(obj, function (idx, el) {
                if (idx != "MIRecord") {
                } else {
                    var etr = 0;// counter for rows
                    for (var i = 0; i < el.length; i++) {
                        for (var j = 0; j < el[i].NameValue.length; j++) {
                            if (el[i].NameValue[j].Name == "EACANO") {
                                cano = el[i].NameValue[j].Value;
                            }
                            if (el[i].NameValue[j].Name == "EAEMNM") {
                                emnm = el[i].NameValue[j].Value;
                            }
                            if (el[i].NameValue[j].Name == "EAFACI") {
                                faci = el[i].NameValue[j].Value;
                            }
                            if (el[i].NameValue[j].Name == "EAREAR") {
                                rear = el[i].NameValue[j].Value;
                            }
                        }
                        etr++;
                    }
                }
            });
        }
    }

    function processError(data, status, req) {
        // alert(req.responseText + " " + status);
        console.log("Error -> " + req.responseText + " " + status)
    }

    return {emno: emno, emnm: emnm, cano: cano, faci: faci, rear: rear};
}

function glob_isEmployeeExist() {
    if (glob_obj_Employee == null || glob_obj_Employee.emno == undefined || glob_obj_Employee.emno == null) {
        bootbox.alert("No User/Employee loged in ! refresh the portal !", function (result) {
            window.location.reload();
        });
        return false;
    } else {
        return true;
    }
}


/******** End employee ore user validation****/



function glob_AddLeadZero(tmpTxt, tmpLen) //16.11.15
{
    tmpTxt = tmpTxt.toString();
    var n = tmpLen - tmpTxt.length;
    var tmpSpc = "";

    if (n > 0) {
        for (var i = 0; i < n; i++) {
            tmpSpc = tmpSpc.concat("0");
        }
    }

    return tmpSpc.concat(tmpTxt);
}


function glob_convertDDMMYYtoYYYYMMDD(DDMMYY)  //ddmmyy to yyyymmdd
{

    var dd;
    var mm;
    var yyyy;

    dd = DDMMYY.substr(0, 2);
    mm = DDMMYY.substr(2, 2);
    yy = DDMMYY.substr(4, 2);

    var tmpAS400Date = "20" + yy + mm + dd
    return tmpAS400Date;


}


function glob_convertDDMMYYWithSlashtoYYYYMMDD(DDMMYY)  //dd/mm/yy to yyyymmdd
{

    var dd;
    var mm;
    var yyyy;

    dd = DDMMYY.substr(0, 2);
    mm = DDMMYY.substr(3, 2);
    yy = DDMMYY.substr(6, 2);

    var tmpAS400Date = "20" + yy + mm + dd
    return tmpAS400Date;


}


function glob_ThousandSeparator(decimalDigits, Value) {
    // Separator Length. Here this is thousand separator
    var separatorLength = 3;
    var OriginalValue = Value;
    var TempValue = "" + OriginalValue;
    var NewValue = "";

    // Store digits after decimal
    var pStr;

    // store digits before decimal
    var dStr;

    // Add decimal point if it is not there
    if (TempValue.indexOf(".") == -1) {
        TempValue += "."
    }

    dStr = TempValue.substr(0, TempValue.indexOf("."));

    pStr = TempValue.substr(TempValue.indexOf("."))

    // Add “0? for remaining digits after decimal point
    while (pStr.length - 1 < decimalDigits) {
        pStr += "0"
    }

    if (pStr == '.')
        pStr = '';

    if (dStr.length > separatorLength) {
        // Logic of separation
        while (dStr.length > separatorLength) {
            NewValue = "," + dStr.substr(dStr.length - separatorLength) + NewValue;
            dStr = dStr.substr(0, dStr.length - separatorLength);
        }
        NewValue = dStr + NewValue;
    }
    else {
        NewValue = dStr;
    }
    // Add decimal part
    NewValue = NewValue + pStr;
    return NewValue;
    // Show Final value
    // alert(NewValue);
}


function glob_InputUpperCase(this_inp) {
    //add class   text-uppercase to input string
    // example: var dopty=glob_InputUpperCase("#inp_DOPTY_t2");
    var txt = $(this_inp).val();
    var isUpper = $(this_inp).parent().find('.text-uppercase').length;
    if (isUpper == 1) txt = txt.toUpperCase();
    return txt;
}


function glob_setDateByUserFormat(day, month, year) {
    if (day == undefined || day == null || day == "" || isNaN(day) ||
        month == undefined || month == null || month == "" || isNaN(month) ||
        year == undefined || year == null || year == "" || isNaN(year)) {

        var dateNow = glob_getCurrentDateTime();
        day = dateNow.day;
        month = dateNow.month;
        year = dateNow.year;
    }

    if (glob_ObjM3UserProp.DTFM == "DMY") {
        return day + "" + month + "" + year.substr(0, 2);
    }

    if (glob_ObjM3UserProp.DTFM == "YMD") {
        return year.substr(0, 2) + "" + month + "" + day;
    }

    if (glob_ObjM3UserProp.DTFM == "MDY") {
        return month + "" + day + "" + year.substr(0, 2);
    }

    return day + "" + month + "" + year.substr(0, 2);
}


function glob_ConvertDatetoM3(dt) //7.2.16
{

    var dd;
    var mm;
    var yyyy;


    var ddpos = 0;
    var mmpos = 0;
    var yypos = 0;
    console.log("dt:" + dt);
    switch (glob_ObjM3UserProp.DTFM) {
        case "MDY":
            ddpos = 2;
            mmpos = 0;
            yypos = 4;
            break;
        case "DMY":
            ddpos = 0;
            mmpos = 2;
            yypos = 4;
            break;
        case "YMD":
            ddpos = 4;
            mmpos = 2;
            yypos = 0;
            break;


    }

    //for future replace / with ''  dd/mm/yy = dd/mm/yy
    dt = dt.toString().replace(/\\/g, ''); //remove backslah (not really needed here)
    dt = dt.toString().replace(/\//g, ''); //removes forward slash

    console.log("dt:" + dt);
    dd = dt.substr(ddpos, 2);
    mm = dt.substr(mmpos, 2);
    yyyy = "20" + dt.substr(yypos, 2);
    /*
     console.log("ddpos:" + ddpos+ " dd:" + dd);
     console.log("mmpos:" + mmpos+ " mm:" + mm);
     console.log("yypos:" + yypos+ " yyyy:" + yyyy);

     console.log("yyyy+mm+dd=" + yyyy+mm+dd);
     */
    return yyyy + mm + dd;
}


function glob_convertYYYYMMDDtoDate(YYYYMMDD)  //ddmmyy to yyyymmdd
{

    var day;
    var month;
    var year;

    day = YYYYMMDD.substr(6, 2);
    month = YYYYMMDD.substr(4, 2);
    year = YYYYMMDD.substr(2, 2);

    if (glob_ObjM3UserProp.DTFM == "DMY") {
        return day + "/" + month + "/" + year;
    }

    if (glob_ObjM3UserProp.DTFM == "YMD") {
        return year.substr(0, 2) + "/" + month + "/" + day;
    }

    if (glob_ObjM3UserProp.DTFM == "MDY") {
        return month + "/" + day + "/" + year;
    }

    return day + "/" + month + "/" + year;


}

///*************************************////
/***
 * function to test user login name*
 * */
function glob_getUserData() {
    var dataToSend = {
        cono: glob_ObjM3UserProp.CONO
    };

    var retArryOfLines = [];
    var htmlStr = "";
    var url = "Queries/getEmploee.jsp";

    console.log(url);
    $.ajax({
        async: false,
        cache: false,
        type: "POST",
        url: url,
        data: dataToSend,
        dataType: 'text',
        success: processSuccess,
        error: processError
    });

    function processSuccess(data, status, req) {
        if (status == "success") {
            var obj = $.parseJSON(req.responseText);
            $.each(obj, function (idx, el) {
                if (idx == "CONO") {
                    glob_ObjM3UserProp.CONO = el;
                }
                if (idx == "user") {
                    glob_ObjM3UserProp.USID = el;
                }
                if (idx == "whlo") {
                    glob_ObjM3UserProp.WHLO = el;
                }
                if (idx == "mail") {
                    glob_ObjM3UserProp.MAIL = el;
                }
            });

        }
    }

    function processError(data, status, req) {
        // alert(req.responseText + " " + status);
        console.log("Error -> " + req.responseText + " " + status);
        alert("Error -> " + req.responseText + " " + status);
    }
}


///*******************//For Portals USAwarehaus//******************////


function gM3dateTOdateUSA(YYYYMMDD) {
    var dd;
    var mm;
    var yy;

    dd = YYYYMMDD.substr(6, 2);
    mm = YYYYMMDD.substr(4, 2);
    yy = YYYYMMDD.substr(0, 4);
    var tmpD = mm + "/" + dd + "/" + yy;
    return tmpD;
}
function gM3dateTOtimeUSA(hhmm) {
    var hh;
    var mm;
    hhmm =hhmm.trim();
    if (hhmm.length == 1) {
        hhmm = "000" + hhmm;
    }
    if (hhmm.length == 2) {
        hhmm = "00" + hhmm;
    }
    if (hhmm.length == 3) {
        hhmm = "0" + hhmm;
    }
    hh = hhmm.substr(0, 2);
    mm = hhmm.substr(2, 2);
    var tmpT = hh + ":" + mm;
    return tmpT;
}

function gSetTimeToM3() {

    var date = new Date();
    var hh = date.getHours();
    var mm = date.getMinutes();

    if (hh < 10) {
        hh = "0" + date.getHours();
    } else {
        hh = date.getHours();
    }

    if (mm < 10) {
        mm = "0" + date.getMinutes();
    } else {
        mm = date.getMinutes();
    }

    var tmpT = hh + "" + mm;
    return tmpT;
}
function gchBtnSubmit() {
    bootbox.confirm({
        message: "Are you sure about Submit to M3?",
        color: 'danger',
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result == true) {
                BildJSobjectToUp();
            }
        }
    });
}


function g_relocate_Back() {
    var TempTable = $("#tblWork > tbody").html();
    if (TempTable.trim() != "") {
        bootbox.confirm({
            message: "Are you sure?  You want  back to home page?",
            color: 'danger',
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result == true) {
                    location.href = "http://" + $(location).attr('host') + "/intentiaTest/TefronUSAWarehouse/";
                }
            }
        });
    }
    else {
        location.href = "http://" + $(location).attr('host') + "/intentiaTest/TefronUSAWarehouse/";
    }

}

function gIFclearInP() {
    $('#pageNo').html('1');
    $(".historyLB").hide();
    $("#historyLB").hide();
    $("#inSSCC").prop('disabled', false);
    var TempTable = $("#tblWork > tbody").html();
    if (TempTable.trim() != "") {

        bootbox.confirm({
            message: "Are you sure?  You want clear page? ",
            color: 'danger',
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result == true) {
                    clearInP();
                }
            }
        });
    }
    var TempTable1 = $("#tblWorkresult > tbody").html();
    if (TempTable1.trim() != "") {
        clearInP();

    }

}