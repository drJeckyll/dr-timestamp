/*
 Create all the context menu items.
 */
browser.contextMenus.create({
	id: "decode-timestamp",
	title: 'Decode timestamp',
	contexts: ["selection"]
});

function timestamp_decode(info, tab) {

	var func = 'alert("Invalid timestamp")';

	var timestamp = parseInt(info.selectionText);
	if(!isNaN(timestamp))
	{
		var date 		= new Date(timestamp*1000);

		var day 		= (date.getDate() < 10 ? "0"+date.getDate() : date.getDate());
		var month 		= (date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1);
		var year		= date.getFullYear();

		var hours 		= (date.getHours() < 10 ? "0"+date.getHours() : date.getHours());
		var minutes 	= (date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes());
		var seconds 	= (date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds());

		var string = year+'/'+month+'/'+day+' '+hours+':'+minutes+':'+seconds;

		func = 'alert("'+string+'")';
	}

	var executing = browser.tabs.executeScript({
		code: func
	});
	executing.then();
}

/*
 The click event listener, where we perform the appropriate action given the
 ID of the menu item that was clicked.
 */
//noinspection JSUnresolvedVariable,BadExpressionStatementJS
browser.contextMenus.onClicked.addListener((info, tab) => {
	if(info.menuItemId === 'decode-timestamp')
	{
		timestamp_decode(info, tab);
	}
});
