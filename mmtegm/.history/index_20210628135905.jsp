<%@page import="java.util.*"%>
<%@ include file="/sors/ServerInstace.jsp"%>

<!DOCTYPE html>
<html lang="he-IL">
<head>
<%

	if(session.getAttribute("apiusersession")==null ){
		response.sendRedirect("login.jsp");
		return;
	}


%>
<% String cuno=request.getParameter("CUNO"); if(cuno==null) cuno=""; %>
<% String orno=request.getParameter("orno"); if(orno==null) orno=""; %>
<% String ponr=request.getParameter("ponr"); if(ponr==null) ponr=""; %>
<!-- Meta Info -->
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="cache-control" content="no-cache" />
<!-- 24.3.19 -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<meta name="version" content="4.22.1" />
<meta name="commit" content="" />

<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />

<link rel="stylesheet"
	href="../sors/infor-4-51-1/css/theme-soho-contrast.css" />


<script src="../sors/infor-4-51-1/js/jquery-3.6.0.min.js"></script>


<script src="../sors/infor-4-51-1/js/d3.v5.min.js"></script>
<script src="../sors/infor-4-51-1/js/sohoxi.js"></script>
<script src="../sors/infor-4-51-1/js/sohoxi-migrate-4.4.0.js"></script>

<script src="api-proxy.js"></script>
<script src="../sors/global_sors.js"></script>
<%
//24.3.19 prevent caching of index.js
Random rand = new Random();
int n =rand.nextInt(90000) + 10000;


%>
<script src="index.js?_<%=n%>"></script>
<script src="PoReceipt.js?_<%=n%>"></script>
<script src="MoReport.js?_<%=n%>"></script>
<script src="BalQuery.js?_<%=n%>"></script>
<script src="Mvl.js?_<%=n%>"></script>
<script src="MvlConEgm.js?_<%=n%>"></script>
<script src="Picking.js?_<%=n%>"></script>
<script src="MoPick.js?_<%=n%>"></script>
<script src="PhsInv.js?_<%=n%>"></script>

<style>
/*
.header.mmt
{
	height:40px;
}

.header .toolbar {
    height: 40px;
    padding: 0 1rem; }
    
      .header .toolbar .title {
      color: #ffffff;
      height: 40px;
      left: 8px;
      overflow: hidden;
      position: absolute;
      text-overflow: clip; }
      
      
      .header + .application-menu + .page-container {
  height: calc(100% - 40px);
  margin-top: 40px; }
    */
.row-no-need {
	max-width: 1920px; /*27.1.19*/
}

.label {
	margin-bottom: 0px;
}

.field.label-left {
	display: flex;
	font-size: 1.4rem;
	margin: 5px 0;
}

.field.label-left .label {
	color: #5c5c5c;
	font-size: 1.2rem;
	line-height: normal;
	padding-right: 0px;
	position: relative;
}

.field.label-left .label::after {
	content: ': ';
}

.datagrid td {
	background-color: #ffffff;
	border-bottom: 1px solid #bdbdbd;
	border-right: 1px solid #bdbdbd;
	color: #1a1a1a;
	height: 10px;
	line-height: inherit;
	min-height: inherit;
	outline: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.custom-container .dropdown {
	width: 100px;
}

/*
body::before {
  background: #003C80;
  bottom: 12px;
  color: #ffffff;
  content: 'test';
  font-size: 13px;
  font-weight: 900;
  height: 25px;
  left: -25px;
  line-height: 27px;
  position: fixed;
  text-align: center;
  text-transform: uppercase;
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  width: 100px;
  z-index: 1000; }
  
  
  }
  */
</style>
<title>פורטל מסופונים</title>
</head>


<body class="no-scroll busy-loading-locale">

	<!-- include file="../sors/infor-4-13-0/components/icons/svg.html"%>-->
	<%@include file="../sors/infor-4-51-1/svg/theme-new-svg.html"%>

	<!-- 
	<nav id="application-menu" class="application-menu  is-personalizable"
		data-options="{'dismissOnClickMobile': 'true'}">

		<div class="accordion panel inverse"
			data-options="{'allowOnePane': true}">


			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
          <use xlink:href="#icon-number-list"></use>
        </svg>
				<a href="#" onclick="showMainMenu()"><span>תפריט ראשי</span></a>
			</div>

			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
        <use xlink:href="#icon-archives"></use>
        </svg>
				<a href="#" onclick="showPoRecieve()" title="PoRecieve"><span>קליטה
						מרכש</span></a>
			</div>

			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
        <use xlink:href="#icon-transfer"></use>
        </svg>
				<a href="#" onclick="showMvl()" title=""><span>העברה בין
						איתורים</span></a>
			</div>

			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
          <use xlink:href="#icon-manufacturing"></use>
        </svg>
				<a href="#" onclick="showMoReport()"><span>דיווח ייצור</span></a>
			</div>


			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
          <use xlink:href="#icon-inventory"></use>
        </svg>
				<a href="#" onclick="showBalQuery()"><span>שאילתת מלאי</span></a>
			</div>



			<div class="branding">
				<svg class="icon" viewBox="0 0 34 34" focusable="false"
					aria-hidden="true" role="presentation">
        <use xlink:href="#icon-logo"></use>
        </svg>
				20190514 גירסה
			</div>
		</div>

		<div class="application-menu-footer">
			<div class="application-menu-toolbar">
				<div class="flex-toolbar">
					<div class="toolbar-section buttonset center-text">
						<span id="userName"><%=session.getAttribute("apiusersession") %></span>
						<button class="btn-icon" onclick="signout()" type="button"
							title="התנתק">
							<svg class="icon" focusable="false" aria-hidden="true"
								role="presentation">
                <use xlink:href="#icon-logout"></use>
              </svg>

						</button>
					</div>
				</div>
			</div>
		</div>


	</nav>
-->
	<div class="page-container no-scroll">

		<header class="header is-personalizable mmt">
			<div class="toolbar" data-options="{maxVisibleButtons: 4}">
				<div class="title">

					<button id="btnMenuHamburger"
						class="btn-icon application-menu-trigger" type="button">
						<span class="audible">Show navigation</span> <span
							class="icon app-header"> <span class="one"></span> <span
							class="two"></span> <span class="three"></span>
						</span>
					</button>
					<button id="btnHeaderBack" type="button" style="display: none"
						class="btn-icon application-menu-trigger hide-focus" tabindex="0"
						onclick="backClick()" onclick-old="showMainMenu()">
						<span class="audible">Show navigation</span> <span
							class="icon app-header go-back"> <span class="one"></span>
							<span class="two"></span> <span class="three"></span>
						</span>
					</button>
					<!-- 
					<button id="btnPickingBack" type="button" style="display: none"
						class="btn-icon application-menu-trigger hide-focus" tabindex="0"
						onclick="showPickingMenu(false)">
						<span class="audible">Show navigation</span> <span
							class="icon app-header go-back"> <span class="one"></span>
							<span class="two"></span> <span class="three"></span>
						</span>
					</button>
-->
					<h1 id="headerTitle">מסופונים</h1>
				</div>


				<div class="more">
					<button class="btn-actions page-changer" type="button" title="More">
						<svg class="icon" focusable="false" aria-hidden="true"
							role="presentation">
        <use xlink:href="#icon-more"></use>
        </svg>
						<span class="audible" data-translate="text">More</span>
					</button>
					<!-- 
					<ul class="popupmenu is-selectable">
						<li class="heading" role="presentation">Theme</li>
						<li class="is-selectable is-checked"><a href="#"
							data-theme="light-theme">Light</a></li>
						<li class="is-selectable"><a href="#" data-theme="dark-theme">Dark</a></li>
						<li class="is-selectable"><a href="#"
							data-theme="high-contrast-theme">High Contrast</a></li>
						<li class="separator"></li>
						<li class="heading" role="presentation">Personalization</li>
						<li class="is-selectable is-checked"><a
							data-rgbcolor="#2578A9" href="#">Azure</a></li>
						<li class="is-selectable"><a data-rgbcolor="#DB7726" href="#">Amber</a></li>
						<li class="is-selectable"><a data-rgbcolor="#9279A6" href="#">Amethyst</a></li>
						<li class="is-selectable"><a data-rgbcolor="#579E95" href="#">Turqoise</a></li>
						<li class="is-selectable"><a data-rgbcolor="#317C73" href="#">Emerald</a></li>
						<li class="is-selectable"><a data-rgbcolor="#5C5C5C" href="#">Graphite</a></li>
					</ul>
-->
				</div>
				<div class="buttonset">


					<!-- 
					<button id="btnHdrRefresh" class="btn" type="button" title="רענן"
						onclick="getData()">
						<svg class="icon" focusable="false">
        <use xlink:href="#icon-refresh"></use>
        </svg>
						<span>רענן</span>
					</button>
-->
					<!-- 
					<button id="btnHdrClearScreen" class="btn" type="button"
						title="נקה מסך" onclick="clearScreen()">
						<svg class="icon" focusable="false" aria-hidden="true"
							role="presentation">
        <use xlink:href="#icon-clear-screen"></use>
        </svg>
						<span>נקה</span>
					</button>
-->
				</div>
			</div>



		</header>


		<section id="maincontent" class="page-container scrollable"
			role="main">



			<div id="maincontentMainMenu" class="divsection busy"
				style="display: none;">
				<div class="row" style="margin-top: 4px"></div>


				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" class="btn-secondary-border full-width"
								style="text-align: right" onclick="showMvl()">
								<span class="round emerald07  badge">1</span>



								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-transfer"></use>
  </svg>

								<span>העברה בין איתורים</span>

							</button>


						</div>
					</div>
				</div>

				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" class="btn-secondary-border full-width"
								style="text-align: right" onclick="showPoRecieve()">
								<span class="round turquoise07  badge">2</span>
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-archives"></use>
  </svg>
								<span>קליטה מרכש</span>
							</button>


						</div>
					</div>
				</div>


				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" class="btn-secondary-border full-width"
								style="text-align: right" onclick="showMoReport()">
								<span class="round amber07  badge">3</span>
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-manufacturing"></use>
  </svg>
								<span>דיווח ייצור</span>
							</button>


						</div>
					</div>
				</div>





				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" class="btn-secondary-border full-width"
								style="text-align: right" onclick="showMoveToConsol()">
								<span class="round azure07  badge">4</span>
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-insert-grid-row"></use>
  </svg>
								<span>העברה לקונסולידציה</span>
							</button>


						</div>
					</div>
				</div>



				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex ">

							<button type="button" class="btn-secondary-border full-width"
								style="text-align: right" onclick="showPickingMenu(true)">
								<span class="round ruby07  badge" style="color: #ffffff">5</span>
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-freight-mgmt"></use>
  </svg>
								<span>איסוף למשלוח</span>
							</button>


						</div>
					</div>
				</div>

				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" class="btn-secondary-border full-width"
								style="text-align: right" onclick="showMoPick()">
								<span class="round turquoise04  badge">6</span>
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-default"></use>
  </svg>
								<span>ניפוק לייצור</span>
							</button>


						</div>
					</div>
				</div>



				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" class="btn-secondary-border full-width"
								style="text-align: right" onclick="showPhsInv()">
								<span class="round graphite05  badge">7</span>
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-doc-check"></use>
  </svg>
								<span>ספירת מלאי</span>
							</button>


						</div>
					</div>
				</div>


				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" class="btn-secondary-border full-width"
								style="text-align: right" onclick="showBalQuery()">
								<span class="round amethyst07  badge">8</span>
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-inventory"></use>
  </svg>
								<span>שאילתת מלאי</span>
							</button>


						</div>
					</div>
				</div>

				<div class="row" style="margin-top: 52px">
					<hr class="fieldset-hr">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" class="btn-secondary-border full-width"
								onclick="signout()">
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-logout"></use>
  </svg>
								<span>ניתוק <%=session.getAttribute("apiusersession") %></span>
							</button>
<!-- 
<div class="progress">
            <div class="progress-bar"  id="progress-battery" aria-labelledby="pr-label1"></div>
          </div>
          -->
						</div>
					</div>
				</div>



			</div>

			<div id="maincontentPickingMenu" class="divsection busy"
				style="display: none;">
				<div class="row" style="margin-top: 4px"></div>

				<div class="row">
					<div class="six columns">
						<table>

							<tr>
								<td>
									<div class="field-flex">
										<label for="inpWHLO" class="required label">מחסן: </label> <input
											type="text" id="inpWHLO" class="input-xs Pickinputs "
											placeholder="000" data-options='{ "pattern" : "###" }'
											autocomplete="off" aria-required="true"
											data-validate="required" value="" onchange="" /> <br /> <span
											id="inpWHNM" class="data-description"></span>
									</div>
								</td>
								<td>
									<div class="field-flex" style="margin-top: 2px; width: 80px">
										<label for="inpDLIX" class="label">מס.משלוח:</label> <input
											type="number" id="inpDLIX" class="input-sm Pickinputs"
											autocomplete="off" aria-required="true" data-validate=""
											value="" onchange="" />
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="row" style="margin-top: 12px">
					<div class="field-flex">
						<div class="field label-left">
							<span class="label">לקוח</span> <span class="data Pickinputs"
								id="inpCONA"></span>
						</div>
					</div>
				</div>
				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" id="btnSmallBox"
								class="btn-secondary-border full-width pickMenuButtons"
								onclick="showSmallBox()">
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-new-case"></use>
  </svg>
								<span>Small Box</span> <span class="round ruby07 badge"
									style="color: #ffffff" id="bdgSmallBox"></span>
							</button>


						</div>
					</div>
				</div>

				<div class="row" style="margin-top: 12px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" id="btnBigBox"
								class="btn-secondary-border full-width pickMenuButtons"
								onclick="showBigBox()">
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-travel-plan"></use>
  </svg>
								<span>Big Box</span> <span class="round ruby07 badge"
									style="color: #ffffff" id="bdgBigBox"></span>
							</button>


						</div>
					</div>
				</div>


				<div class="row" style="margin-top: 24px">
					<div class="six columns">



						<div class="field-flex">

							<button type="button" class="btn-secondary-border full-width"
								onclick="showMainMenu()">
								<svg role="presentation" aria-hidden="true" focusable="false"
									class="icon">
    <use xlink:href="#icon-ledger"></use>
  </svg>
								<span>חזרה לתפריט ראשי</span>
							</button>


						</div>
					</div>
				</div>
			</div>

			<div id="maincontentMoReport" class="divsection"
				style="display: none;">
				<div class="row" style="margin-top: 4px"></div>
				<div class="row">
					<div class="six columns">

						<div class="field-flex">
							<label for="inpWHLOMoRinputs" class="required label">מחסן: </label> <input
								type="text" id="inpWHLOMoRinputs" class="input-xs MoRinputs "
								placeholder="000" data-options='{ "pattern" : "###" }'
								autocomplete="off" aria-required="true" data-validate="required"
								value="" onchange="" /> <br /> <span id="inpWHNM"
								class="data-description"></span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="six columns">
						<div class="field-flex" style="margin-top: 2px">
							<label for="inpMFNOMoRinputs" class="label">ה.ייצור:</label> <input
								type="text" id="inpMFNOMoRinputs" class="input-sm MoRinputs"
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>

					</div>
				</div>
				<div class="row">
					<div class="six columns">
						<div class="field label-left">
							<span class="label">מק"ט</span> <span class="data MoRspan"
								id="inpMoITNO"></span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="six columns">

						<div class="field label-left">
							<span class="label">תיאור</span> <span class="data MoRspan"
								id="inpMoITDS"></span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="six columns">
						<table>
							<tr>
								<td>


									<div class="field-flex-sm">
										<span class="label">מוזמן: </span> <span
											class="round badge amber07 MoRspan" style="color: #ffffff"
											id="inpMoORQA"></span>
									</div>
								</td>
								<td>

									<div class="field-flex">
										<label class="label">דווח: </label> <span
											class="round badge amber07 MoRspan" style="color: #ffffff"
											id="inpMoMAQA"></span>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<hr />


				<div class="row">
					<div class="six columns">
										<div class="field-flex" style="margin-top: 2px">
										<label for="inpMoREQA" class="label">כמות:</label> <input
											type="number" id="inpMoREQA" class="input-xs MoRinputs "
											autocomplete="off" aria-required="true" data-validate=""
											value="0" onchange="" />
									</div>
						<!--<table>
							<tr>
								<td>
									<div class="field-flex" style="margin-top: 2px">
										<label for="inpMoREQA" class="label">כמות:</label> <input
											type="number" id="inpMoREQA" class="input-xs MoRinputs "
											autocomplete="off" aria-required="true" data-validate=""
											value="0" onchange="" />
									</div>
								</td>
								<td>
									<button type="button" id="btnPMS050" 
										class="btn amber07 btnPMS050" onclick="pms050doFull()">דווח כמות</button>
								</td>
							</tr>
						</table>-->
					</div>

				</div>
				<!--
					<hr />
					
				<div class="row">
					<div class="six columns">
						<table>
							<tr>
								<td>
									<div class="field-flex" style="margin-top: 2px">
										<label for="txtFULLQty" class="label">מלא:</label> <input
											type="number" id="txtFULLQty" class="input-xs MoRinputs "
											autocomplete="off" aria-required="true" data-validate=""
											value="" onchange="" />
									</div>


								</td>
								<td>
									<div class="field-flex" style="margin-top: 2px">
										<label for="txtPARTqty" class="label">חלקי:</label> <input
											type="number" id="txtPARTqty" class="input-xs MoRinputs "
											autocomplete="off" aria-required="true" data-validate=""
											value="0" onchange="" />
									</div>

								</td>

							</tr>
						</table>
					</div>
				</div>
				-->
				<div class="row">
					<div class="six columns">
						<div class="field-flex" style="margin-top: 2px">
							<label for="inpMoWHSL" class="label">איתור:</label> <input
								type="text" id="inpMoWHSL" class="lookup input-sm MoRinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />

						</div>
					</div>
				</div>
				<!--
				<div class="row">
					<div class="six columns">

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpMoPartWHSL" class="label">איתור חלקי:</label> <input
								type="text" id="inpMoPartWHSL"
								class="lookup input-sm MoRinputs " autocomplete="off"
								aria-required="true" data-validate="" value="" onchange="" />

						</div>
					</div>
				</div>
				-->
				<div class="row">
					<div class="six columns">
						<button type="button" id="btnPMS050" class="btn amber07 btnPMS050"
							onclick="pms050do()">דווח</button>
						<button type="button" class="btn-icon" id="btnClear"
							onclick="clearMOReceiptScreen()">
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-refresh"></use>
  </svg>

						</button>
					</div>
				</div>
			</div>


			<!-- section div -->

			<div id="maincontentPoRecieve" class="divsection"
				style="display: none;">
				<div class="row" style="margin-top: 4px"></div>
				<div class="row">
					<div class="six columns">

						<div class="field-flex">
							<label for="inpWHLOPoRinputs" class="required label">מחסן: </label> <input
								type="text" id="inpWHLOPoRinputs" class="input-xs PoRinputs "
								placeholder="000" data-options='{ "pattern" : "###" }'
								autocomplete="off" aria-required="true" data-validate="required"
								value="" onchange="" /> <br /> <span id="inpWHNM"
								class="data-description"></span>
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpPUNO" class="label">הזמנת רכש:</label> <input
								type="text" id="inpPUNO" class="input-sm PoRinputs"
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>


						<div class="field-flex" style="margin-top: 2px">
							<label for="inpSUDO" class="label">תעודת משלוח:</label> <input
								type="text" id="inpSUDO" class="input-xs PoRinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>



						<div class="field-flex" style="margin-top: 2px">
							<label for="inpITNO" class="label">מק"ט:</label> <input
								type="text" id="inpITNO" class="input-sm PoRinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpITDS" class="label">תיאור:</label> <span
								class="PoRspan" id="inpITDS"></span>
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpPNLI" class="label">שורה:</label> <input
								type="text" id="inpPNLI" class="input-xs PoRinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>

						<hr />

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpPUUN" class="label">יח':</label> <span
								id="inpPUUN" class="PoRspan"></span>
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpQA" class="label">כמות:</label> <input type="text"
								id="inpQA" class="input-xs PoRinputs " autocomplete="off"
								aria-required="true" data-validate="" value="" onchange="" />
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpORQA" class="label">כמות מוזמנת:</label> <span
								id="inpORQA" class="PoRspan"></span>
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpRVQA" class="label">כמות שהתקבלה:</label> <span
								id="inpRVQA" class="PoRspan"></span>
						</div>



						<div class="field-flex" style="margin-top: 2px">
							<label for="inpWHSLPoRinputs" class="label">איתור:</label> <input
								type="text" id="inpWHSLPoRinputs" class="input-sm PoRinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />


						</div>

						<div class="field">
							<input type="checkbox" class="checkbox" id="chxREND" /> <label
								for="chxREND" class="checkbox-label">סיום</label>
						</div>

						<button type="button" class="btn-primary turquoise07"
							onclick="pps001do()">דווח</button>

						<button type="button" class="btn-icon" id="btnCleare"
							onclick="clearPOReceiptScreen()">
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-refresh"></use>
  </svg>

						</button>

					</div>


				</div>

			</div>
			<!-- section div -->

			<div id="maincontentBalQuery" class="divsection"
				style="display: none;">
				<div class="row" style="margin-top: 4px"></div>
				<div class="row">
					<div class="six columns">

						<div class="field-flex">
							<label for="inpWHLOBqRinputs" class="required label">מחסן: </label> <input
								type="text" id="inpWHLOBqRinputs" class="input-xs BqRinputs "
								placeholder="000" data-options='{ "pattern" : "###" }'
								autocomplete="off" aria-required="true" data-validate="required"
								value="" onchange="" /> <br /> <span id="inpWHNM"
								class="data-description"></span>
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpBqBARCODE" class="label">מנה:</label> <input
								type="text" id="inpBqBARCODE" class="input-sm BqRinputs"
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>
						<div class="field-flex" style="margin-top: 2px">
							<label for="inpBqWHSL" class="label">איתור:</label> <input
								type="text" id="inpBqWHSL" class="input-sm BqRinputs"
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpBqITDS" class="label">תיאור:</label> <span
								id="inpBqITDS" class="BqRinputs"></span>
						</div>



						<button type="button" class="btn-primary amethyst07"
							onclick="runBalQuery()">הצג</button>



						<button type="button" class="btn-icon" id="btnCleare"
							onclick="clearBalQueryScreen()">
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-refresh"></use>
  </svg>

						</button>

					</div>
				</div>
				<div class="row">
					<div class="one-third column">
						<div class="card">
							<div class="card-header">
								<h2 class="card-title">רשימת מנות
								<span class="round amethyst07 badge"
										style="color: #ffffff" id="bdgBalQueryCount"></span>
								</h2>

							</div>

							<div class="card-content">
								<div class="listview" id="task-listview"  style="display: none;"
									data-options="{'template': 'task-tmpl', 'selectable': 'false'}"></div>
								<div class="listview" id="task-listview-whsl"  style="display: none;"
									data-options="{'template': 'task-tmpl-whsl', 'selectable': 'false'}"></div>	
									l
							</div>
						</div>
					</div>
					<!--  
				<div class="data"
					style="margin-right: 2px; margin-left: 2px; height: 200px">
					<div class="full-height full-width">
						<div id="datagridBalQueryl" class="datagrid"></div>

					</div>
				</div>
				-->
				</div>

			</div>



			<!-- section div -->

			<div id="maincontentMvl" class="divsection" style="display: none;">
				<div class="row" style="margin-top: 4px"></div>
				<div class="row">
					<div class="six columns">

						<div class="field-flex">
							<label for="inpWHLOMvlinputs" class="required label">מחסן: </label> <input
								type="text" id="inpWHLOMvlinputs" class="input-xs Mvlinputs "
								placeholder="000" data-options='{ "pattern" : "###" }'
								autocomplete="off" aria-required="true" data-validate="required"
								value="" onchange="" /> <br /> <span id="inpWHNM"
								class="data-description"></span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="six columns">
						<div class="field">
							<label for="inpMvlBARCODE" class="label">מנה:</label> <input
								type="text" id="inpMvlBARCODE" class="input-sm Mvlinputs"
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>

					</div>
				</div>
				<div class="row">
					<div class="six columns">
						<div class="field">
							<label for="inpWHSLMvlinputs" class="label">איתור:</label> <input
								type="text" id="inpWHSLMvlinputs" class="lookup input-sm Mvlinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />

						</div>
					</div>
				</div>
				<div class="row">
					<div class="six columns">

						<div class="field">
							<label for="inpTWSL" class="label">לאיתור:</label> <input
								type="text" id="inpTWSL" class="lookup input-sm Mvlinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />

						</div>
					</div>
				</div>
				<!-- 
							<div class="row">
					<div class="six columns">


						<div class="field" style="margin-top: 2px">
							<label for="inpMvlITDS" class="label">תיאור:</label> <span
								id="inpMvlITDS" class="Mvlinputs"></span>
						</div>
					</div>
				</div>
				-->
				<div class="row">
					<div class="six columns">
						<div class="field label-left">
							<span class="label">מק"ט</span> <span class="data Mvlinputs"
								id="inpMvlITNO"></span>
						</div>



						<div class="field label-left">
							<span class="label">תיאור</span> <span class="data Mvlinputs "
								id="inpMvlITDS"></span>
						</div>

					</div>
				</div>
				<div class="row">
					<div class="six columns">
						<div class="field" style="margin-top: 2px">
							<label for="inpMvlTRQT" class="label">כמות:</label> <input
								type="number" id="inpMvlTRQT" class="input-xs Mvlinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="0" onchange="" />
						</div>


					</div>
				</div>
				<div class="row">
					<div class="six columns">

						<button style="margin-top: 8px" type="button"
							class="btn-primary emerald07" onclick="mms177do()">

							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-transfer"></use>
  </svg>
							<span>העבר</span>
						</button>

						<button type="button" class="btn-icon" id="btnClear "
							onclick="clearMvlScreen()">
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-refresh"></use>
  </svg>

						</button>

					</div>


				</div>

			</div>
			<!-- section div -->



			<!-- section div -->

			<div id="maincontentMoveConsol" class="divsection"
				style="display: none;">
				<div class="row" style="margin-top: 4px"></div>
				<div class="row">
					<div class="six columns">
						<table>

							<tr>
								<td>
									<div class="field-flex">
										<label for="inpWHLOMvlConinputs" class="required label">מחסן: </label> <input
											type="text" id="inpWHLOMvlConinputs" class="input-xs MvlConinputs "
											placeholder="000" data-options='{ "pattern" : "###" }'
											autocomplete="off" aria-required="true"
											data-validate="required" value="" onchange="" /> <br /> <span
											id="inpWHNMMvlConinputs" class="data-description"></span>
									</div>
								</td>
								<td>
									<div class="field-flex" style="margin-top: 2px; width: 80px">
										<label for="inpDLIXMvlConinputs" class="label">מס.משלוח:</label> <input
											type="number" id="inpDLIXMvlConinputs" class="input-sm MvlConinputs"
											autocomplete="off" aria-required="true" data-validate=""
											value="" onchange="" />
									</div>
								</td>
							</tr>
						</table>
					</div>
			</div>
		
					<div class="row">
					<div class="six columns">
						<div class="field">
							<label for="inpWHSLMvlConinputs" class="label">איתור:</label> <input
								type="text" id="inpWHSLMvlConinputs" class="lookup input-sm MvlConinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
								<br /> <span id="inpSLDS"
								class="data-description MvlConinputs"></span>

						</div>
					</div>
				</div>
				
				<div class="compound-field">

								<div class="two columns">

									<div class="field-flex" style="margin-top: 2px">
										<label for="inpBARCODEMvlConinputs" class="label">מנה:</label> <input
											type="text" id="inpBARCODEMvlConinputs" class="input-sm MvlConinputs"
											autocomplete="off" aria-required="true" data-validate=""
											value="" onchange="" />

									</div>
								</div>
							</div>
							<div class="compound-field">
								<div class="two columns">
									<div class="field" style="margin-top: 2px">
										<label for="inpITNOMvlConinputs" class="label">מק''ט:</label> <span
											id="inpITNOMvlConinputs" class="MvlConinputs" style="font-size: 12px"></span>
									</div>

								</div>
								<div class="two columns">
									<div class="field" style="margin-top: 2px">
										<label for="inpITDSMvlConinputs" class="label">תיאור:</label> <span
											id="inpITDSMvlConinputs" class="MvlConinputs" style="font-size: 12px"></span>
									</div>

								</div>


							</div>
				<div class="compound-field">

					<div class="two columns">
						<div class="field-flex" style="margin-top: 2px">
							<label for="inpALQTMvlConinputs" class="label">כמות:</label> <input
								type="number" id="inpALQTMvlConinputs"
								class="input-xs MvlConinputs" readonly autocomplete="off"
								aria-required="true" data-validate="" value="" onchange="" />
						</div>
					</div>
					<div class="two columns">
						<div class="field-flex" style="margin-top: 2px">
									<button type="button" id="btnMoveCon" class="btn-primary"
										onclick="mhs850do()">

										<svg role="presentation" aria-hidden="true" focusable="false"
											class="icon">
    <use xlink:href="#icon-transfer"></use>
  </svg>
										<span>העבר</span>
									</button>
								</div>
					</div>			
				</div>


				


				<div class="row">


					<button type="button" class="btn-icon" id="btnClear"
						onclick="clearMvlConScreen()">
						<svg role="presentation" aria-hidden="true" focusable="false"
							class="icon">
    <use xlink:href="#icon-refresh"></use>
  </svg>

					</button>

				</div>


			</div>

			<!-- section div -->

			<!-- section div -->

			<div id="maincontentSmallBox" class="divsection"
				style="display: none;">
				<div class="row" style="margin-top: 4px"></div>
				<div class="row">
					<div class="six columns">


						<div class="field-flex" style="margin-top: 2px">
							<label for="inpWHSL" class="label">איתור:</label> <input
								type="text" id="inpWHSL" class="lookup input-sm SmallBoxinputs "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />

						</div>





						<div class="field-flex" style="margin-top: 2px">
							<label for="inpSmallBoxBARCODE" class="label">מנה:</label> <input
								type="text" id="inpSmallBoxBARCODE"
								class="input-sm SmallBoxinputs SmallBoxinputsRefresh "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>

						<div class="field label-left">
							<span class="label">מק"ט</span> <span
								class="data SmallBoxinputs SmallBoxinputsRefresh"
								id="inpSmallBoxITNO"></span>
						</div>



						<div class="field label-left">
							<span class="label">תיאור</span> <span
								class="data SmallBoxinputs SmallBoxinputsRefresh"
								id="inpSmallBoxITDS"></span>
						</div>


						<div class="field-flex" style="margin-top: 2px">
							<label for="lblRemain" class="label">יתרה:</label> <span
								id="lblRemain" class="SmallBoxinputs "></span>
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="lblPacked" class="label">נארז:</label> <span
								id="lblPacked" class="SmallBoxinputs"></span>
						</div>



						<div class="field-flex" style="margin-top: 2px">
							<label for="inpSmallBoxTRQT" class="label">כמות:</label> <input
								type="number" id="inpSmallBoxTRQT"
								class="input-xs SmallBoxinputs SmallBoxinputsRefresh "
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>


						<div class="field-flex" style="margin-top: 2px">
							<label for="inpSmallBoxPANR" class="label">מספר אריזה:</label> <input
								type="number" id="inpSmallBoxPANR"
								class="input-xs SmallBoxinputs " autocomplete="off"
								aria-required="true" data-validate="" value="" onchange="" />
						</div>





					</div>


				</div>

				<div class="row">
					<div class="one-third column">
						<div class="card">
							<div class="card-header">
								<h2 class="card-title" id="crdListLotsTitle" >תוכן אריזה/מנות</h2>




								<button type="button" id="category-button"
									class="btn-icon btn-actions hide-focus" tabindex="-1"
									onclick="toggleSmallPackageList()">
									<svg class="icon" focusable="false" aria-hidden="true"
										role="presentation">
                    <use xlink:href="#icon-grid"></use>
                </svg>
									<span class="audible">מק"ט</span>
								</button>

							</div>

							<div class="card-content" id="cardByPackages">
							<!-- 
								<div class="card-group-action">
									<div class="flex-toolbar" role="toolbar"
										aria-label="Card group action toolbar">
										<div class="toolbar-section title">רשימת אריזות:</div>
										<div class="toolbar-section buttonset">
											<button type="button" id="category-button"
												class="btn-icon btn-actions hide-focus" tabindex="-1"
												onclick="showPackageList()">
												<svg class="icon" focusable="false" aria-hidden="true"
													role="presentation">
                    <use xlink:href="#icon-refresh"></use>
                </svg>
												<span class="audible">רענן</span>
											</button>
										</div>
									</div>
								</div>
								-->
								<div class="listview" id="pack-listview"
									data-options="{'template': 'pack-tmpl', 'selectable': 'false'}"></div>
							</div>

							<div class="card-content" id="cardByItems" style="display: none;">
								<div class="card-group-action">
									<div class="flex-toolbar" role="toolbar"
										aria-label="Card group action toolbar">
										<div class="toolbar-section title">
											רשימת מנות: <label for="inpPackCardITNO" class="label">מק"ט:</label>
											<input type="text" id="inpPackCardITNO" class="input-sm  "
												autocomplete="off" aria-required="true" data-validate=""
												value="" onchange="" />


										</div>
										<div class="toolbar-section buttonset">
											<button type="button" id="category-button"
												class="btn-icon btn-actions hide-focus" tabindex="-1"
												onclick="showPackageListByItem()">
												<svg class="icon" focusable="false" aria-hidden="true"
													role="presentation">
                    <use xlink:href="#icon-refresh"></use>
                </svg>
												<span class="audible">רענן</span>
											</button>
										</div>
									</div>
								</div>
								<div class="listview" id="packLots-listview"
									data-options="{'template': 'packLots-tmpl', 'selectable': 'false'}"></div>
									
								
										
									
							</div>
							<div class="card-content" id="cardByContent" style="display: none;">
							<!-- 
								<div class="card-group-action">
									<div class="flex-toolbar" role="toolbar"
										aria-label="Card group action toolbar">
										<div class="toolbar-section title">
											רשימת מנות: <label for="inpPackContentPANR" class="label">אריזה:</label>
											<input type="text" id="inpPackContentPANR" class="input-sm  "
												autocomplete="off" aria-required="true" data-validate=""
												value="" onchange="" />


										</div>
										
									</div>
								</div>
								-->
									
								<div class="listview" id="packContent-listview"
									data-options="{'template': 'packContent-tmpl', 'selectable': 'false'}"></div>
										
									
							</div>
						</div>
					</div>

				</div>

			</div>


			<div id="maincontentBigBoxDetails" class="divsection"
				style="display: none;">
				<div class="row" style="margin-top: 4px"></div>

				<div class="row">
					<div class="six columns">
						<h3 id="bigBoxDetailHeader"></h3>
					</div>
					<div class="six columns">
						<h5 id="bigBoxDetailHeaderSub"></h5>
					</div>
				</div>
				<div class="row">
					<div class="six columns">


						<div class="field-flex" style="margin-top: 2px">
							<label for="inpDetailPANR" class="label">מספר אריזה:</label> <input
								type="number" id="inpDetailPANR"
								class="input-xs BigBoxDetailinputs " autocomplete="off"
								aria-required="true" data-validate="" value="" onchange="" />

						</div>





						<div class="field-flex" style="margin-top: 2px">
							<label for="inpBigBoxBARCODE" class="label">מנה:</label> <input
								type="text" id="inpBigBoxBARCODE"
								class="input-sm BigBoxDetailinputs  " autocomplete="off"
								aria-required="true" data-validate="" value="" onchange="" />
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpBigBoxITNO" class="label">פריט:</label> <input
								type="text" id="inpBigBoxITNO"
								class="input-sm BigBoxDetailinputs  " autocomplete="off"
								aria-required="true" data-validate="" value="" onchange="" />
						</div>



						<div class="field label-left">
							<span class="label">תיאור</span> <span
								class="data BigBoxDetailinputs " id="inpSmallBoxITDS"></span>
						</div>





						<div class="field-flex" style="margin-top: 2px">
							<label for="inpBigBoxTRQT" class="label">כמות:</label> <input
								type="number" id="inpBigBoxTRQT"
								class="input-xs BigBoxDetailinputs  " autocomplete="off"
								aria-required="true" data-validate="" value="" onchange="" />
						</div>





					</div>


				</div>


				<div class="row">
					<div class="one-third column">
						<div class="card" id="cardBigBoxDetails">
							<div class="card-header">
								<h2 class="card-title">Big Box</h2>



								<button type="button" id="category-button"
									class="btn-icon btn-actions hide-focus" tabindex="-1"
									onclick="showOneBigPackageList(gSelectedBigBox)">
									<svg class="icon" focusable="false" aria-hidden="true"
										role="presentation">
                    <use xlink:href="#icon-refresh"></use>
                </svg>
									<span class="audible">רענן</span>
								</button>



							</div>

							<div class="card-content">
								<div class="listview" id="bigboxpackDetail-listview"
									data-options="{'template': 'bigboxpackDetail-tmpl', 'selectable': 'false'}"></div>
							</div>




						</div>
					</div>

				</div>

			</div>

			<div id="maincontentBigBox" class="divsection" style="display: none;">
				<div class="row" style="margin-top: 4px"></div>

				<div class="row">
					<div class="one-third column">
						<div class="card">
							<div class="card-header">
								<h2 class="card-title">
									בחר Big Box <span class="round ruby07 badge"
										style="color: #ffffff" id="bdgBigBoxCard"></span>
								</h2>



								<button type="button" id="category-button"
									class="btn-icon btn-actions hide-focus" tabindex="-1"
									onclick="newBigBoxPACT()">
									<svg class="icon" focusable="false" aria-hidden="true"
										role="presentation">
                    <use xlink:href="#icon-new-document"></use>
                </svg>
									<span class="audible">חדש</span>
								</button>

								<!-- 
									<button type="button" id="category-button"
									class="btn-icon btn-actions hide-focus" tabindex="-1"
									onclick="showBigPackageList()">
									<svg class="icon" focusable="false" aria-hidden="true"
										role="presentation">
                    <use xlink:href="#icon-refresh"></use>
                </svg>
									<span class="audible">רענן</span>
								</button>-->

							</div>

							<div class="card-content">
								<div class="listview" id="bigboxpack-listview"
									data-options="{'template': 'bigboxpack-tmpl', 'selectable': 'false'}"></div>
							</div>




						</div>
					</div>

				</div>


				<!-- 
				<div class="row">
					<div class="one-third column">
						<div class="card">
							<div class="card-header">
								<h2 class="card-title">Small Box</h2>




								<button type="button" id="category-button"
									class="btn-icon btn-actions hide-focus" tabindex="-1"
									onclick="showPackageList()">
									<svg class="icon" focusable="false" aria-hidden="true"
										role="presentation">
                    <use xlink:href="#icon-refresh"></use>
                </svg>
									<span class="audible">רענן</span>
								</button>

							</div>

							<div class="card-content">
								<div class="listview" id="smallboxTOpack-listview"
									data-options="{'template': 'smallboxTOpack-tmpl', 'selectable': 'false'}"></div>
							</div>




						</div>
					</div>

				</div>
-->




			</div>





			<div id="maincontentMoPick" class="divsection" style="display: none;">
				<div class="row" style="margin-top: 4px"></div>
				<div class="row">
					<div class="six columns">

						<div class="field-flex">
							<label for="inpWHLO" class="required label">מחסן: </label> <input
								type="text" id="inpWHLO" class="input-xs MoPickinputs "
								placeholder="000" data-options='{ "pattern" : "###" }'
								autocomplete="off" aria-required="true" data-validate="required"
								value="" onchange="" /> <br /> <span id="inpWHNM"
								class="data-description"></span>
						</div>

						<div class="field-flex" style="margin-top: 2px">
							<label for="inpMFNO" class="label">ה.ייצור:</label> <input
								type="text" id="inpMFNO" class="input-sm MoPickinputs"
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>

						<div class="field-flex" style="margin-top: 2px; width: 80px">
							<label for="inpDLIX" class="label">מס.משלוח:</label> <input
								type="number" id="inpDLIX" class="input-sm MoPickinputs"
								autocomplete="off" aria-required="true" data-validate=""
								value="" onchange="" />
						</div>


						<button type="button" style="margin-top: 2px"
							class="btn-primary turquoise04" onclick="getMoPickDelivery()">בחר</button>

					</div>
				</div>

				<div class="row">
					<div class="one-third column">
						<div class="card">
							<div class="card-header">
								<h2 class="card-title">
									משלוחים <span class="round turquoise04 badge"
										id="bdgMoPickDeliveries"></span>
								</h2>



								<button type="button" id="category-button"
									class="btn-icon btn-actions hide-focus turquoise04"
									tabindex="-1" onclick="getMoPickDelivery()">
									<svg class="icon" focusable="false" aria-hidden="true"
										role="presentation">
                    <use xlink:href="#icon-refresh"></use>
                </svg>
									<span class="audible">רענן</span>
								</button>



							</div>
							<div class="card-content">
								<div class="listview" id="mopickDeliveries-listview"
									data-options="{'template': 'mopickDeliveries-tmpl', 'selectable': 'true'}"></div>
							</div>
						</div>
					</div>
				</div>

			</div>


			<!-- section div -->


			<div id="maincontentMoPickDetails" class="divsection"
				style="display: none;">
				<div class="row" style="margin-top: 4px"></div>

				<div class="row">
					<div class="six columns">
						<h3 id="MoPickDetailHeader"></h3>
					</div>
					<div class="six columns">
						<h5 id="MoPickDetailHeaderSub"></h5>
					</div>
				</div>
				<div class="row">
					<div class="six columns" style="margin-top: 2px">
						<table>
							<tr>
								<td>
									<div class="field-flex">
										<label for="inpMoPickBARCODE" class="label">מנה:</label> <input
											type="text" id="inpMoPickBARCODE"
											class="input-sm MoPickDetailInputs" autocomplete="off"
											aria-required="true" data-validate="" value="" onchange="" />
									</div>
								</td>
								<td>
									<div class="field-flex" style="width: 70px">
										<button type="button" style="margin-top: 2px"
											class="btn-primary turquoise04" onclick="MoPickIssue()">נפק</button>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="six columns">
						<div class="field-flex" style="margin-top: 2px">
							<label for="inpMoPickTRQT" class="label">כמות:</label> <input
								type="number" id="inpMoPickTRQT"
								class="input-xs MoPickDetailInputs  " autocomplete="off"
								aria-required="true" data-validate="" value="" onchange="" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="one-third column">
						<div class="card">
							<div class="card-header">
								<h2 class="card-title">
									מנות לאיסוף <span class="round turquoise04 badge"
										id="bdgMoPickCount"></span>
								</h2>



								<button type="button" id="category-button"
									class="btn-icon btn-actions hide-focus turquoise04"
									tabindex="-1" onclick="showMoPickDetailsList()">
									<svg class="icon" focusable="false" aria-hidden="true"
										role="presentation">
                    <use xlink:href="#icon-refresh"></use>
                </svg>
									<span class="audible">חדש</span>
								</button>



							</div>
							<div class="card-content">
								<div class="listview" id="mopick-listview"
									data-options="{'template': 'mopick-tmpl', 'selectable': 'false'}"></div>
							</div>
						</div>
					</div>
				</div>


			</div>



			<div id="maincontentPhsInv" class="divsection" style="display: none;">
				<div class="row" style="margin-top: 4px"></div>
				<div class="row">
					<div class="six columns">

						<div class="field-flex">
							<label for="inpWHLOPhsInvinputs" class="required label">מחסן: </label> <input
								type="text" id="inpWHLOPhsInvinputs" class="input-xs PhsInvinputs "
								placeholder="000" data-options='{ "pattern" : "###" }'
								autocomplete="off" aria-required="true" data-validate="required"
								value="" onchange="" /> <br /> <span id="inpWHNM"
								class="data-description"></span>
						</div>


					</div>
				</div>

				<div class="compound-field">

					<div class="two columns">
						<div class="field" style="margin-top: 2px">
							<label for="ddlSTNB" class="label">מספר ספירה:</label> <select
								id="ddlSTNB" autocomplete="off" class="dropdown"
								data-init="false">

							</select>



						</div>
					</div>
				</div>
				<div class="one-third column">
					<div class="card" id="cardPhsInv" style="display: none;">
						<div class="card-header">
							<h2 class="card-title">ספירת מלאי</h2>

						</div>
						<div class="card-content">
							<div class="compound-field">

								<div class="two columns">
									<div class="field-flex" style="margin-top: 2px; width: 100px">
										<label for="inpWHSLPhsInvinputs" class="label">איתור:</label> <input
											type="text" id="inpWHSLPhsInvinputs" class="input-sm PhsInvinputs "
											autocomplete="off" aria-required="true" data-validate=""
											value="" onchange="" />

									</div>
								</div>
							</div>
							<div class="compound-field">

								<div class="two columns">

									<div class="field-flex" style="margin-top: 2px">
										<label for="inpPhsBARCODE" class="label">מנה:</label> <input
											type="text" id="inpPhsBARCODE" class="input-sm PhsInvinputs"
											autocomplete="off" aria-required="true" data-validate=""
											value="" onchange="" /> <span class="field-info"
											id="inpPhsBARCODEerr" style="display: none;"> <svg
												class="icon icon-info-field" focusable="false"
												aria-hidden="true" role="presentation">
                 <use xlink:href="#icon-error"></use>
              </svg> <span class="audible">Information</span> <span
											id="spnPhsBanoError PhsInvinputs">מנה כבר נספרה </span>

										</span>

									</div>
								</div>
							</div>
							<div class="compound-field">
								<div class="two columns">
									<div class="field" style="margin-top: 2px">
										<label for="inpPhsITNO" class="label">מק''ט:</label> <span
											id="inpPhsITNO" class="PhsInvinputs" style="font-size: 12px"></span>
									</div>

								</div>
								<div class="two columns">
									<div class="field" style="margin-top: 2px">
										<label for="inpPhsITDS" class="label">תיאור:</label> <span
											id="inpPhsITDS" class="PhsInvinputs" style="font-size: 12px"></span>
									</div>

								</div>


							</div>
							<div class="compound-field">

								<div class="two columns">

									<div class="field-flex" style="margin-top: 2px">
										<label for="inpPhsTRQT" class="label">כמות:</label> <input
											type="number" id="inpPhsTRQT" class="input-xs PhsInvinputs  "
											autocomplete="off" aria-required="true" data-validate=""
											value="" onchange="" />
									</div>
								</div>
							</div>

							<div class="compound-field">

								<div class="two columns">
									<div class="field-flex" style="margin-top: 8px; width: 70px">
										<button type="button" class="btn graphite05"
											onclick="PhsInvDo()">עדכן</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>
		</section>


	</div>


	<!-- modal -->
	<div class="modal" id="modal-crtBigBox">
		<div class="modal-content">

			<div class="modal-header">
				<h1 class="modal-title">הקמת אריזה</h1>
			</div>

			<div class="modal-body">
				<div class="row" style="margin-right: 14px; margin-left: 14px;">

					<div class="compound-field">

						<div class="two columns">
							<label for="inpCrtPACT" class="label required">סוג אריזה:
							</label> <input type="text" id="inpCrtPACT" class="input-xs mdlCrtBigbox"
								aria-required="true" autocomplete="off" value="" onchange="" />
						</div>
					</div>
					<div class="compound-field">

						<div class="two columns">
							<div class="field" style="margin-top: 2px">
								<label for="ddlCrtPACT" class="label">סוג אריזה:</label> <select
									id="ddlCrtPACT" autocomplete="off" class="dropdown"
									data-init="false">

								</select>



							</div>
						</div>
					</div>


					<div class="compound-field">

						<div class="two columns">
							<label for="inpCrtGRWE" class="label">משקל </label> <input
								type="number" id="inpCrtGRWE" autocomplete="off"
								class="input-xs mdlCrtBigbox" value="" onchange="" />
						</div>
					</div>

				</div>

				<div class="modal-buttonset">
					<button type="button" class="btn-modal" style="width: 50%;">בטל</button>
					<button type="button" id="btncrtBigBoxlOK" onclick="createBigBox()"
						class="btn-modal-primary" style="width: 50%;">הקם</button>
				</div>

			</div>
		</div>
	</div>


	<!-- modal -->



	<div class="modal" id="modal-findItemCarmel">
		<div class="modal-content">

			<div class="modal-header">
				<h1 class="modal-title">חיפוש פריט</h1>
			</div>

			<div class="modal-body">
				<div class="row" style="margin-right: 14px; margin-left: 14px;">


					<div class="compound-field">

						<div class="two columns">
							<label for="inpITNOsearch" class="label">מק"ט </label> <input
								type="text" id="inpITNOsearch" class="input-mm findItemCarmel"
								value="" onchange="" />
						</div>
						<div class="four columns">
							<label for="inpITDSsearch" class="label">תיאור</label> <input
								type="text" id="inpITDSsearch" class="input-sm findItemCarmel"
								style="width: 300px" value="" onchange="" />
						</div>
						<div class="two columns">
							<label for="inpPOPNsearch" class="label">מק"ט לקוח</label> <input
								type="text" id="inpPOPNsearch" class="input-mm findItemCarmel"
								value="" onchange="" />
						</div>
					</div>

				</div>

				<div class="row"
					style="margin-right: 14px; margin-left: 14px; height: 500px">
					<div class="full-height full-width">
						<div id="datagridFindTemCarmel" class="datagrid"></div>

					</div>
				</div>
				<div class="modal-buttonset">
					<button type="button" class="btn-modal" style="width: 50%;">בטל</button>
					<button type="button" id="btnfindItemCarmelOK"
						onclick="btnfindItemCarmelOKClicked()" class="btn-modal-primary"
						style="width: 50%;">הוסף</button>
				</div>


			</div>
		</div>

	</div>

	<script id="task-tmpl" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li>
            {{/disabled}}
              
              <p class="listview-heading">
{{#escalated}}
                     <small class="{{escalatedClass}}">{{escalatedText}}</small>
                   {{/escalated}}
מנה:<b>{{MLBANO}}</b>  תוקף:<b>{{MLPRDT}}</b> </p>
   			 <p class="listview-subheading">איתור:<b>{{MLWHSL}}</b> אזור מלאי:{{MLSLTP}}</p>
              <p class="listview-micro">כמות: <b>{{MLSTQT}}</b> מוקצה: <b>{{MLALQT}}</b></p>

                
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>
	<script id="task-tmpl-whsl" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li>
            {{/disabled}}
              
              <p class="listview-heading">
{{#escalated}}
                     <small class="{{escalatedClass}}">{{escalatedText}}</small>
                   {{/escalated}}

מנה:<b>{{MLBANO}}</b> תוקף:<b>{{MLPRDT}}</b>  </p>
   			 <p class="listview-subheading">מק"ט:<b>{{MLITNO}}</b> {{MMITDS}}</p>
              <p class="listview-micro">כמות: <b>{{MLSTQT}}</b> מוקצה: <b>{{MLALQT}}</b></p>

                
                   
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>

	<script id="task-tmpl-stockzones" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li>
            {{/disabled}}
              
              <p class="listview-heading">אזור מלאי:{{SDSLTP}} </p>
				<p class="listview-subheading">{{MNARNM}} </p>
   			 <p class="listview-micro"><span class="round graphite05  badge">{{ITEMS_NUM}}</span>מק"טים </p>
         
                
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>


	<script id="pack-tmpl" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li>
            {{/disabled}}
              
              <p class="listview-heading">אריזה:<b>{{OSPANR}}</b> </p>

   			 <p class="listview-micro">נאסף :<b>{{OSDLQT}}</b> משתמש אחרון:<b>{{OSCHID}}</b></p>
             <!-- <p class="listview-micro">כמות: {{MLSTQT}} מוקצה: {{MLALQT}}</p>-->

              <p class="listview-micro">
<button type="button" class="btn-secondary-border " 
							 onclick='showPackageContent("{{OSPANR}}")' >
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-bullet-list"></use>
  </svg>
<span>תוכן</span>
						</button>
<button type="button" class="btn-secondary-border  " 
							 onclick='delSmallPanr("{{OSPANR}}")' >
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-delete"></use>
  </svg>
<span>פרק אריזה</span>
						</button>

</p>   
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>



	<script id="packLots-tmpl" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li>
            {{/disabled}}
              
              <p class="listview-heading">מנה:<b>{{OSBANO}}</b> 



<button type="button" class="btn-secondary-border  " id="btnClear"
							 onclick='delSmallLot("{{id}}")' >
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-delete"></use>
  </svg>
<span>פרק מנה</span>
						</button>

</p>
   			 <p class="listview-subheading">אריזה:<b>{{OSPANR}}</b> נאסף:<b>{{OSDLQT}}</b> </p>
              <p class="listview-micro">הזמנה: <b>{{OSRIDN}}/{{OSRIDL}}</b> משתמש אחרון:<b>{{OSCHID}}</b></p>

                
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>



	<script id="packContent-tmpl" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li>
            {{/disabled}}
              
              <p class="listview-heading">מנה:<b>{{OSBANO}}</b> 



<button type="button" class="btn-secondary-border  " id="btnClear"
							 onclick='delSmallLot("{{id}}")' >
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-delete"></use>
  </svg>
<span>פרק מנה</span>
						</button>

</p>
   			 <p class="listview-subheading">מק"ט:<b>{{OSITNO}}</b> נאסף:<b>{{OSDLQT}}</b> </p>
              <p class="listview-micro">הזמנה: <b>{{OSRIDN}}/{{OSRIDL}}</b> <font style="color:red">{{OTHERFLAG}}</font></p>
<p class="listview-micro">משתמש אחרון:<b>{{OSCHID}}</b></p>

                
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>
	<script id="bigboxpack-tmpl" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li class="{{ORPANR}}">
            {{/disabled}}
              
              <p class="listview-heading">אריזה:<b>{{ORPANR}}</b>

<button type="button" class="btn-secondary-border btnConnectPackage " id="btnConnect"
							 onclick='showBigBoxDetails("{{ORPANR}}")' >
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-user-status-available"></use>
  </svg>
<span>בחר</span>
						</button>


</p>
   			 <p class="listview-subheading">סוג אריזה :<b>{{ORPACT}}</b> {{M4PANM}}
</p>
 <p class="listview-micro">
 משקל:
 <input
								type="number" id="inplvGRWE" class="input-xs lvGRWE" panr="{{ORPANR}}"
								value="{{ORGWTM}}" onchange="" />
 </p>
            <p class="listview-micro">מכיל: <b>{{PACKED}}</b> אריזות </p>
<button type="button" class="btn-secondary-border  " id="btnClear"
							 onclick='delSmallPanr("{{ORPANR}}")' >
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-delete"></use>
  </svg>
<span>פרק אריזה</span>
						</button>

                
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>


	<script id="bigboxpackDetail-tmpl" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li class="{{ORPANR}}">
            {{/disabled}}
              
              <p class="listview-heading">אריזה:<b>{{ORPANR}}</b>




</p>
   			 <p class="listview-subheading">סוג אריזה :<b>{{ORPACT}}</b> {{M4PANM}}
</p>
 
            <p class="listview-micro">מכיל: <b>{{PACKED}}</b> אריזות </p>

                
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>

	<script id="smallboxTOpack-tmpl" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li>
            {{/disabled}}
              
              <p class="listview-heading">אריזה:<b>{{OSPANR}}</b> 



<button type="button" class="btn-secondary-border btnConnectPackage " id="btnConnect"
							 onclick='connectPackage("{{OSPANR}}")' >
							<svg role="presentation" aria-hidden="true" focusable="false"
								class="icon">
    <use xlink:href="#icon-confirm"></use>
  </svg>
<span>בחר</span>
						</button>

</p>
   			 <p class="listview-subheading">נאסף :<b>{{OSDLQT}}</b> משתמש אחרון:<b>{{OSCHID}}</b></p>
             <!-- <p class="listview-micro">כמות: {{MLSTQT}} מוקצה: {{MLALQT}}</p>-->

                
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>

	<script id="mopick-tmpl" type="text/html">

        <ul>
          {{#dataset}}

            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li>
            {{/disabled}}
             
              <p class="listview-heading">מנה:<b>{{MQBANO}}</b> 	כמות:<b>{{MQTRQT}}</b>  	מוכן:<b>{{G2DLQT}}</b>



</p>
   			 <p class="listview-subheading">הזמנה :<b>{{MQRIDN}}/{{MQRIDL}}</b> איתור:<b>{{MQWHSL}}</b></p>
              <p class="listview-micro"><b>{{MQITNO}}</b> {{MMITDS}}</p>

                  {{#escalated}}
                     <small class="{{escalatedClass}}">{{escalatedText}}</small>
                   {{/escalated}}
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>

	<script id="mopickDeliveries-tmpl" type="text/html">

        <ul>
          {{#dataset}}
            {{#disabled}}
              <li class="is-disabled">
            {{/disabled}}
            {{^disabled}}
              <li>
            {{/disabled}}
              
              <p class="listview-heading">משלוח:<b>{{OQDLIX}}/{{PIPLSX}}</b> 

          <svg class="icon" focusable="false" style="display:{{ISINPROG}}" aria-hidden="true" role="presentation">
            <use xlink:href="#icon-user-status-away"></use>
          </svg>
        
      


</p>
   			 <p class="listview-subheading">תאריך :<b>{{PIESPD}}</b></p>
           
                
                
             
            </div>

            </li>
          {{/dataset}}
        </ul>

      </script>

	<script>
		var POPOVER_OPTIONS = {
			closebutton : true,
			content : $('#item-popover-contents'),
			extraClass : 'alternate',
			placement : 'right',
			popover : true,
			offset : {
				y : 10
			},
			title : 'מידע על הפריט',
			trigger : 'click'
		};

		$('#item-popover-trigger').popover(POPOVER_OPTIONS);
	</script>

	<script type="text/javascript">
		$('body').initialize('he-IL');

		
		console.log("prog init");
		$('body').on('initialized', function() {
			//alert("body init!");
			$('#progress-battery').progress(); //12.2.20
			bodyInit();
		});

		$(".PoRinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				getPoData(enteredField);

			}

		});
		$(".PoRinputs").click(function() {
			$(this).select();
		});

		$(".MoRinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				getMoData(enteredField);

			}

		});
		$(".MoRinputs").click(function() {
			$(this).select();
		});

		$(".BqRinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				runBalQuery(enteredField);

			}

		});
		$(".BqRinputs").click(function() {
			$(this).select();
		});

		$(".Mvlinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				getBanoData(enteredField);

			}

		});

		$(".Mvlinputs").click(function() {
			$(this).select();
		});

		$(".MvlConinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
					getMvlConData(enteredField); //12.4.20

			}

		});

		$(".MvlConinputs").click(function() {
			$(this).select();
		});

		$(".Pickinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				getPickData(enteredField);

			}

		});

		$(".Pickinputs").click(function() {
			$(this).select();
		});

		$(".SmallBoxinputs").click(function() {
			$(this).select();
		});

		$(".SmallBoxinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				getPickData(enteredField);

			}

		});

		$(".BigBoxDetailinputs").click(function() {
			$(this).select();
		});

		$(".BigBoxDetailinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				BigBoxDetailEnter(enteredField);

			}

		});

		$(".mdlCrtBigbox").click(function() {
			$(this).select();
		});

		$(".mdlCrtBigbox").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				createBigBox();

			}

		});

		$("#inpPackCardITNO").click(function() {
			$(this).select();
		});

		$("#inpPackCardITNO").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				showPackageListByItem();

			}

		});

		$(".MoPickinputs").click(function() {
			$(this).select();
		});

		$(".MoPickinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				getMoPickDelivery(enteredField);

			}

		});

		$(".MoPickDetailInputs").click(function() {
			$(this).select();
		});

		$(".MoPickDetailInputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				MoPickDetailsEnter(enteredField);

			}

		});

		$(".PhsInvinputs").click(function() {
			$(this).select();
		});

		$(".PhsInvinputs").keydown(function(event) { // 31.12.15

			event.stopPropagation();

			if (event.keyCode == 13) { // Enter
				var enteredField = $(this)[0].id;// console.log($(this));
				PhsInvEnter(enteredField);

			}

		});
	</script>
</body>

</html>


