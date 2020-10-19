/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// PIN Functions
function visible(id) {
	document.getElementById(id).style.display = 'block';
}
function invisible(id) {
	document.getElementById(id).style.display = 'none';
}
function RequestData() {
	const axios = require('axios');
	const config = require('../config.json');
	try {
		const pin = document.getElementById('pin').value;
		if (pin < 4) return visible('invalidPIN');
		invisible('pre');
		const { data } = axios({
			method: 'post',
			url: 'https://comm.libraryofcode.org/report/v2/soft',
			headers: { Authorization: config.vendor },
			data: {
				userID,
				pin: pin,
			},
		});
		visible('data-pre');
		console.log(data);
	}
	catch (error) {
		console.log(error);
	}
}