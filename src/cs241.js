module.exports = {
	name: 'CS 241',
	url: 'https://subversion.ews.illinois.edu/svn/fa16-cs241/',
	hw: {
		'know_your_tools': 'know_your_tools/grade_report.txt',
	},
	parser: function(id, data) {
		console.log(id, data);
	},
	grade: {
		'know_your_tools': {
			'test1': {
				'timestamp': '',
				'earned': 0,
				'score': 0,
				'weight': 0,
				'testcase': {
					'test1': {
						'score': 0,
						'earned': 0,
						'name': '',
						'log': '',
					}
				},
			},
		},
	},
}