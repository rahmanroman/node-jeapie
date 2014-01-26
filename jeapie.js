'use strict';

var request = require('request');

var PERSONAL_API_URI	= 'https://api.jeapie.com/v2/personal/send/message.json';
var BROADCAST_API_URI	= 'https://api.jeapie.com/v2/broadcast/send/message.json';
var USERS_API_URI		= 'https://api.jeapie.com/v2/users/send/message.json';

var PRIORITY_LOW		= -1;
var PRIORITY_NORMAL		= 0;
var PRIORITY_HIGH		= 1;

function send(url, token, options, cb) {
	options.token	= token;
	options.title	= options.title || '';
	options.message	= options.message || '';
	//options.priority = options.priority || PRIORITY_NORMAL;
	
	request({
		url:		url,
		method:		'POST',
		form:		options,
		json:		true
	}, function(e, r, body) {
		cb(body);
	});
};

module.exports = {
	JeapieProvider: function(token) {
		return {
			PRIORITY_LOW:		PRIORITY_LOW,
			PRIORITY_NORMAL:	PRIORITY_NORMAL,
			PRIORITY_HIGH:		PRIORITY_HIGH,
			
			sendPersonal: function(options, cb) {
				send(PERSONAL_API_URI, token, options, cb);
			},
			
			sendBroadcast: function(options, cb) {
				send(BROADCAST_API_URI, token, options, cb);
			},
			
			sendUsers: function(options, cb) {
				if(options.emails instanceof Array) 
					options.emails = options.emails.join(',');
				else
					options.emails = options.emails || '';
					
				send(USERS_API_URI, token, options, cb);
			}
		};
	}
};