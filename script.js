function chrome_window_oncreate(win) {
	console.log('window created ' + win);
}

function apply() {
	var url = jQuery('#url_text').val();
	var orientation = jQuery('input:radio[name=orientation]:checked').val()
	//var orientation = jQuery('#prefs_form')[0].orientation.value;
	var resolution = jQuery('input:radio[name=resolution]:checked').val()
	//var resolution = jQuery('#prefs_form')[0].resolution.value;
	var width, height;
	if(resolution === 'custom') {
		width = jQuery('#custom_width_text').val();
		height = jQuery('#custom_height_text').val();
	} else {
		var widthxheight = resolution.split('x');
		width = widthxheight[0];
		height = widthxheight[1];
	}

	// save prefs in local storage
	var prefs = {
		'url': url,
		'orientation': orientation,
		'resolution': resolution,
		'width': width,
		'height': height,
	};
	localStorage.setItem('prefs', JSON.stringify(prefs));

	if(orientation === 'landscape') {
		var w = width;
		width = height;
		height = w;
	}

	var createData = {
		url: url,
		width: parseInt(width),
		height: parseInt(height),
		type: 'popup'
	};

	//jQuery('#result').html(JSON.stringify(prefs));
	try {
		chrome.windows.create(createData, chrome_window_oncreate);
	} catch(e) {
		//jQuery('#result').html(e.message);
	}
	//var target = 'mobilewebviewer_' + resolution;
	//var specs = 'toolbar=1,status=yes,location=yes,width=' + width + ',height='+height;
	//window.open(url, target, specs);
}

function main() {
	// load prefs from local storage
	var prefs = JSON.parse(localStorage.getItem('prefs'));
	if(prefs) {
		jQuery('#url_text').val(prefs.url);
		jQuery('input:radio[name=orientation]').filter('[value=' + prefs.orientation + ']').attr('checked', true);
		jQuery('input:radio[name=resolution]').filter('[value=' + prefs.resolution + ']').attr('checked', true);
		jQuery('#custom_width_text').val(prefs.width);
		jQuery('#custom_height_text').val(prefs.height);
	}
	jQuery('#apply_button').click(apply);	
}

