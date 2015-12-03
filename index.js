var uuid = require('node-uuid');
var aws = require('aws-sdk');
var dynamo = new aws.DynamoDB();
exports.handler = function(event, context) {
	var messId = uuid.v4();
	var chatId = event.message.chat.id;
	var text = event.message.text;
	var chat = event.message.chat.title;
	var author = event.message.from.username;
	var params = {
		TableName: "logs",
		Item: {
			"id":{
				"S":messId
			}, 
			"chat_id": {
				"N":JSON.stringify(chatId)
			},
			"chat_name": {
				"S":chat
			},
			"author":{
				"S":author
			},
			"readable_date": {
				"S":Date().toString()
			},
			"text": {
				"S":text
			},
			"time": {
				"N":JSON.stringify(Date.now())
			}
		}	
	};
	dynamo.putItem(params, function(err, data) {
		if(err) {
			context.fail(err);
			return;
		}
		context.succeed(data);
	});
};
