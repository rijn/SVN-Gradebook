import $ from 'jquery';

module.exports = {
	verify: function(url, success, fail) {
		$.ajax({
			url: url,
			timeout: 5000,
			success: success,
			error: fail,
		})
	}
}