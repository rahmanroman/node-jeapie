node-jeapie
===========

node.js module for push messages to jeapie

## Install
	npm install node-jeapie

If you are not familiar with Jeapie - visit http://jeapie.com

## Usage example :

Personal message

```javascript
var provider = require('node-jeapie').JeapieProvider('<API_KEY>');
provider.sendPersonal({
  title: 'Hello, user',
  message: 'Its time to PUSH',
  priority:provider.PRIORITY_NORMAL
}, function(result) {
  if(result.success) {
    console.log(result.message);
  } else {
    console.error(result.error);
  }
});
```

Broadcast message

```javascript
var provider = require('node-jeapie').JeapieProvider('<API_KEY>');
provider.sendBroadcast({
  title: 'Hello, all',
  message: 'Its time to PUSH',
  priority:provider.PRIORITY_LOW
});
```

Message to specified users

```javascript
var provider = require('node-jeapie').JeapieProvider('<API_KEY>');
provider.sendUsers({
  title: 'Hello, users',
  message: 'Its time to PUSH',
  emails: ['user1@mail.com', 'user2@mail.com'],
  priority:provider.PRIORITY_HIGH
});
```

