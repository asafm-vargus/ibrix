<%@page import="java.util.*"%>
<%@ include file="/sors/ServerInstace.jsp"%>
<!DOCTYPE html>
<html lang="he-IL">
<head>

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
	<meta name="version" content="4.16.2" />
	<meta name="commit" content="" />

	<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
	<!--  ver 4.13
<link rel="stylesheet" href="../sors/infor-4-13-0/css/light-theme.css" />
<link rel="stylesheet" href="../sors/infor-4-13-0/css/demo.css"
	type="text/css">

<link rel="stylesheet" href="css/bigtable.css" />

<script src="../sors/infor-4-13-0/js/jquery-3.3.1.min.js"></script>
<script src="../sors/infor-4-13-0/js/d3.min.js"></script>

<script src="../sors/infor-4-13-0/js/sohoxi.js"></script>
<script src="../sors/infor-4-13-0/js/sohoxi-migrate-4.4.0.js"></script>
 -->

	<link rel="stylesheet"
		href="../sors/infor-4-19-3/css/theme-soho-light.css" />


	<script src="../sors/infor-4-19-3/js/jquery-3.4.1.min.js"></script>


	<script src="../sors/infor-4-19-3/js/d3.v4.min.js"></script>
	<script src="../sors/infor-4-19-3/js/sohoxi.js"></script>
	<script src="../sors/infor-4-19-3/js/sohoxi-migrate-4.4.0.js"></script>

	<script src="../sors/global_sors.js"></script>
	<%
//24.3.19 prevent caching of index.js
Random rand = new Random();
int n =rand.nextInt(90000) + 10000;


%>


	<nav id="application-menu" class="application-menu"
		style="display: none">

		<div class="accordion panel inverse"
			data-options="{'allowOnePane': true}">

			<div class="accordion-header is-selected">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
          <use xlink:href="#icon-home"></use>
        </svg>
				<a href="#"><span>Item One</span></a>
			</div>

			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
          <use xlink:href="#icon-tools"></use>
        </svg>
				<a href="#"><span>Item Two</span></a>
			</div>

			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
          <use xlink:href="#icon-columns"></use>
        </svg>
				<a href="#"><span>Item Three</span></a>
			</div>

			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
          <use xlink:href="#icon-cascade"></use>
        </svg>
				<a href="#"><span>Item Four</span></a>
			</div>

			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
          <use xlink:href="#icon-insert-image"></use>
        </svg>
				<a href="#"><span>Item Five</span></a>
			</div>

			<div class="accordion-header">
				<svg class="icon" focusable="false" aria-hidden="true"
					role="presentation">
          <use xlink:href="#icon-ledger"></use>
        </svg>
				<a href="#"><span>Item Six</span></a>
			</div>

		</div>

		<div class="branding">
			<svg class="icon" viewBox="0 0 34 34" focusable="false"
				aria-hidden="true" role="presentation">
        <use xlink:href="#icon-logo"></use>
      </svg>
		</div>
	</nav>

	<div class="page-container no-scroll">
		<header class="header is-personalizable">
			<div class="toolbar has-more-button do-resize">
				<div class="title">

					<h1>
						<!--
      -->


						<span>IDS Enterprise</span>

					</h1>
				</div>

				<div class="buttonset">
					<button type="button" id="info-btn" class="btn-icon invisible"
						data-options="{'placement': 'below', 'keepOpen': 'true'}">
						<svg class="icon" focusable="false" aria-hidden="true"
							role="presentation">
              <use xlink:href="#icon-info"></use>
            </svg>
						<span class="audible">Example Information</span>
					</button>
				</div>

				<!-- included in all "header-*.html" templates -->
				<div class="more">
					<button class="btn-actions page-changer" type="button" title="More">
						<svg class="icon" focusable="false" aria-hidden="true"
							role="presentation">
          <use xlink:href="#icon-more"></use>
        </svg>
						<span class="audible" data-translate="text">More</span>
					</button>
					<ul class="popupmenu is-selectable">
						<li class="heading" role="presentation">Theme</li>
						<li class="is-selectable is-checked"><a href="#"
							data-theme="theme-soho-light">Light</a></li>
						<li class="is-selectable"><a href="#"
							data-theme="theme-soho-dark">Dark</a></li>
						<li class="is-selectable"><a href="#"
							data-theme="theme-soho-contrast">High Contrast</a></li>
						<li class="separator"></li>
						<li class="personalization-colors"></li>
					</ul>
				</div>
			</div>
		</header>


</head>
		<body class="no-scroll ">

			<!-- include file="../sors/infor-4-13-0/components/icons/svg.html"%>-->
			<%@include file="../sors/infor-4-19-3/svg/svg.html"%>



			<section id="maincontent" class="page-container scrollable"
				role="main">



				<style nonce="05b63a69">
.example1 .slide-content {
	height: 100px;
	padding: 300px 20px 20px 20px;
	text-align: center;
	width: 100%;
}

</style>

					<div class="row" class="top-padding"
				style="margin-right: 24px; margin-top: 60px">
					<div class="six columns">

						<div class="card">
							<div class="card-header">
							  <h2 class="widget-title">תמונות</h2>
							</div>
							<div class="card-content">
								<div class="circlepager example1" id="imgSlides">
									<div class="slides"></div>




								</div>


							</div>
						</div>
					</div>

				</div>
	
	
	</section>
	<script nonce="05b63a69">
		// Initialize all IDS Enterprise Controls and set the locale
		var initialLocale = 'en-US';
		initialLocale = 'en-US';

		$('body').initialize({
			locale : initialLocale
		});
		getUUIDs();

		function getUUIDs() {

			var grid, columns = [], dataset = [];
			 /* /Purchase_Order[@Purchase_Order_Number = "139952"] */
			 /* /User_Image[@User_ID=\"INT-EHUDP\"] */
			var dataToSend = {
				doctype : "Item_Picture",
				srchqry : "@Item_Number=\"FHB00300000A\""

			};
			 /*
			var dataToSend = {
					doctype : "Purchase_Order",
					srchqry : "@Purchase_Order_Number=\"139952\""

				};
			 */
			var url = "../../prtsrvlt/searchIDM";
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
					var slidHTML = '<div class="slides" >';
					var cssHTML = "";
					for (var i = 0; i < data.length; i++) {
						slidHTML += '  <div class="slide"><div class="slide-content"><p><a href="#" onclick="showImage(\'' +  data[i].uuid + '\',\'' + data[i].MimeType + '\',\'' + data[i].EntityName + '\' )" class="hyperlink" id="slide-link-'
								+ (i + 1) + '">';
						slidHTML += data[i].DisplayName;

						slidHTML += '</a><br><p>';
						slidHTML += data[i].LastChanged;
						slidHTML += '</p></div></div>';

						cssHTML += ".example1 .slides .slide:nth-child("
								+ (i + 1) + ") .slide-content {";
						cssHTML += " background: url('../../prtsrvlt/showIDM?imgtype=SMALL_PREVIEW&doctype="
								+ data[i].EntityName;
						cssHTML += "&uuid=" + data[i].uuid + " ') 50% ";
						if (i == 0 && 1 == 2) {
							cssHTML += " -30px ";

						} else {
							cssHTML += " 0 ";
						}
						cssHTML += " no-repeat;";
						cssHTML += "} ";
						/*
						dataset.push({
							id : i,
							uuid : data[i].uuid,
							EntityName : data[i].EntityName,
							Pid : data[i].Pid,
							DisplayName : data[i].DisplayName
							
						});
						 */
					}

					cssHTML += '</div>';
					/*
					 .example1 .slides .slide:nth-child(1) .slide-content {
					      background: url('../../prtsrvlt/showIDM?imgtype=THUMBNAIL&doctype=User_Image&uuid=9f150556-51a8-4172-80b7-203d5c88f0b4') 50% -30px no-repeat;
					    }
					 .example1 .slides .slide:nth-child(2) .slide-content {
					      background: url('../../prtsrvlt/showIDM?imgtype=THUMBNAIL&doctype=User_Image&uuid=a3388110-627b-4aad-bdd2-34527f5d9cb9') 50% 0 no-repeat;
					    }
					 */
					$("#imgSlides").html(
							"<style>" + cssHTML + "</style>" + slidHTML);
				}

				$("#imgSlides").initialize()
				//console.log(dataset);
			}
		}
		
		function showImage(uuid,mime,docttype){
		
			var uri="showIDM.jsp?mime=" + mime + "&doctype=" + docttype + "&uuid=" + uuid;
			window.open(uri,'_blank');
			
		}
	</script>

	<script nonce="05b63a69">
		// Initialize the demo info popup
		$('#info-btn:not(.invisible)').popover({
			closebutton : true,
			content : $('#info-popup'),
			extraClass : 'alternate',
			placement : 'bottom',
			popover : true,
			tooltipElement : '#info-popup-tooltip',
			title : 'Example Information',
			trigger : 'click'
		});
	</script>
	</body>
</html>
