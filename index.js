#!/usr/bin/env node

var program = require('commander');
var axios 	= require('axios');
var clc 	= require('cli-color');
var Table   = require('cli-table');

var keyword;
// keyword = '';

function getUniv(country)
{
	let param = {
		params : {
			country : country,
			name 	: keyword
		}
	};

	axios
		.get('http://universities.hipolabs.com/search',param)
		.then(function(res){
			var parse = res.data;

			var table = new Table({
			    head: ['No', 'Name' , 'Country' , 'Country ID', 'Website']
			});

			Object.keys(parse).forEach(function(key)
			{
				table.push(
					[
						clc.blue(parseInt(key)+1) , 
						parse[key].name , 
						clc.yellow(parse[key].country), 
						clc.green.bold(parse[key].alpha_two_code), 
						clc.white.bgBlue.underline(parse[key].web_page)
					]
				);
			});

			console.log(table.toString());

		})
		
	// console.log(param)
}

program
 .arguments('<country>')
 .option(
    '-n, --name <value>',
    'Search university name',
    function (value) {
      keyword = value;
    })
 .action(getUniv)
 .parse(process.argv);