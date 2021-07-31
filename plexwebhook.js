var sock = require('net');
var http = require('http');
var url = require('url');
require('dotenv').config();

const {SmartThingsClient, BearerTokenAuthenticator} = require('@smartthings/core-sdk')
const client = new SmartThingsClient(new BearerTokenAuthenticator(process.env.SMARTTHINGS_TOKEN))

const PORT = 8083;

var server = http.createServer(onRequest);
server.listen(PORT);
console.log("The Plex Webhook Server has started");

function onRequest(request, response){
	let body = [];
	request.on('data', (chunk) => {
	  body.push(chunk);
	}).on('end', () => {
	  body = Buffer.concat(body).toString();
		
		if (body.indexOf("media.resume") > -1) {
			console.log("Media resume");
			client.scenes.execute('e767af5d-00f7-4cbe-a1c2-ebffe1296e55');
		} else if (body.indexOf("media.pause") > -1) {
			console.log("Media pause");
			client.scenes.execute('ee125cc2-a805-47ca-b2da-57d36df00ade');
		}
		
		response.end();
	});
}
