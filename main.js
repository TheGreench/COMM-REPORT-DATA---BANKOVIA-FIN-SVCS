// Variables
const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const config = require('./config.json');
const app = express();
const router = express.Router();
const port = config.port || 3000;

// Routers
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});
router.get('/loc-score-bankovia',function(req,res){
    res.sendFile(path.join(__dirname+'/bankovia.html'));
});

// Start The Page
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);
console.log('[LOG] ' + chalk.green(`COMM REPORT DATA - BANKOVIA FIN SVCS is running on port: ${chalk.yellow(port)}`));
