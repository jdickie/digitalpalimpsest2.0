<?php
	// Start.php
	// Creates hook to start up the interface
	// @author Grant Dickie
	// 
	// We will start the interface by loading in a MITHGrid.Application.Workplace
?>

<script type="text/javascript">
	$(document).ready(function() {
		var workspace = MITHGrid.Application.Workspace("#workspace");
		workspace.run();
	});
</script>
