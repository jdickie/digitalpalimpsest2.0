

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
        <title>The Archimedes Palimpsest Project</title>
       <link rel="shortcut icon" href="images/favicon.ico" />
    
		
		<link type="text/css" href="./jquery/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" />
		<!-- <link type="text/css" href="http://jqueryui.com/latest/themes/base/ui.all.css" rel="stylesheet" />-->
		<link rel="stylesheet" href="./lib/openlayerscode/theme/default/style.css" type="text/css" /> 
		<?php 
			// detect browser
			$browser = get_browser();
			if(preg_match('/Explorer/', $browser['browser'])) {
		
				echo '<link rel="stylesheet" href="./lib/openlayerscode/theme/default/ie6-style.css" type="text/css" />'; 
	
			}
		
		?>
		<link type="text/css" href="./css/default/style.css" rel="stylesheet" />
		
		<script type="text/javascript" src="./lib/Infusion-1.3.1/InfusionAll.js"></script>
		<script type="text/javascript" src="../mithgrid/dist/mithgrid.js"></script>
		<script type="text/javascript" src="./lib/openlayerscode/OpenLayers.js"></script>
	
		<script type="text/javascript" src="./lib/archie_2.0.js"></script>
    </head>