import $ from 'jquery';

module.exports = {
	verify: function(url, success, fail) {
		console.log(url);
		$.ajax({
			url: url,
			timeout: 5000,
			success: success,
			error: fail,
		})
	}
}