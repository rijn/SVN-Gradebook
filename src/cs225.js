module.exports = {
	name: 'CS 225',
	url: 'https://subversion.ews.illinois.edu/svn/fa16-cs225/',
	list: {
		'know_your_tools': 'know_your_tools/grade_report.txt',
	},
	update: function(){
		this.data['name'] = 'CS225';
	},
	parser: function(id, data) {
		console.log(id, data);

		/* rerender view */
		func.pubsub.emit("data_update");
	},
	tpl: `
		<button class="ui primary button">Update</button>
		[:=name:]
	`,
	data: {
		'name': 'cs225',
	},
}