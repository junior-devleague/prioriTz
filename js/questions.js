$(document).ready(function() {
	$('#submit_button').click(function() {
		var values = $('form').serializeArray();
		var item = {};

		// Remove previous required notifiers
		$('.required').remove()

		var valid = true;
		for (var i = 0; i < values.length; i++) {
			var data = values[i];
			if (!data.value || data.value === '') {
				valid = false;
				var id = '#' + data.name;
				$(id).closest('div').append('<span class="required">This field is required.</span>')
			}
			item[data.name] = data.value;
		}
		item.dateCreated = Date.now();

		// Only send the post request if all data is present
		if (valid) {
			$.post({
  				url: 'http://127.0.0.1:8081/item',
  				data: JSON.stringify(item),
  				success: onSuccess,
    			contentType: "application/json",
  				dataType: "json"
			});
		}
	});
});


function onSuccess() {
	window.location.replace('index.html');
}