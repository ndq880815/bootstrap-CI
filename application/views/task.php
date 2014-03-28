<link href="<?php echo base_url('assets/css/google-map.css'); ?>" rel="stylesheet">
<div class="main" id="task">
	<div id="map">
		<div class="input-group">
			<input type="text" class="form-control text-box">
			<button type="button" class="btn btn-default btn-lg btn-search">
				<span class="glyphicon glyphicon-search"></span>
			</button>
		</div>
		<div id="map-canvas"></div>
	</div>
	
	<script src="<?= base_url('assets/js/google-map.js') ?>" type="text/javascript"></script>
	<script type="text/javascript">
		$( document ).ready(function() {
			loadMapScript();
		});		
	</script>
</div>