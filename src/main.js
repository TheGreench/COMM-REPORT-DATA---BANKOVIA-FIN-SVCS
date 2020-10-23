/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Variables
const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const config = require('./config.json');
const app = express();
const router = express.Router();
const port = 6362 || 3000;

// Routers
// English
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/html/english/index.html'));
});
router.get('/loc-score-bankovia', function(req, res) {
	res.sendFile(path.join(__dirname + '/html/english/bankovia.html'));
});
// Spanish
router.get('/es/', function(req, res) {
	res.sendFile(path.join(__dirname + '/html/english/index.html'));
});
router.get('/es/loc-score-bankovia', function(req, res) {
	res.sendFile(path.join(__dirname + '/html/english/bankovia.html'));
});

// Start The Page
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);
console.log('[LOG] ' + chalk.green(`COMM REPORT DATA - BANKOVIA FIN SVCS is running on port: ${chalk.yellow(port)}`));