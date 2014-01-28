// The MIT License (MIT)
//
// Copyright (c) 2014 Roman Rahman
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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