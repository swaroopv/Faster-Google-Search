
function callbackForChangingURL() {
	//debugger;
	//console.log("changing URL");
	queryJsonObject = processQueryString(this.getAttribute("href"));
	chrome.storage.local.get('newTab', function(items) {
		fasterSearch.newTab = items.newTab;
	});	
	
	if (queryJsonObject.url)
		this.setAttribute("href", queryJsonObject.url);
	
	if(fasterSearch.newTab == "Yes"){	
			this.setAttribute("target","_blank");		
	}	
}
function processAnchorElements() {

	//console.log("processing of anchor elements started");
	var aList = document.getElementsByTagName("a");
	
	chrome.storage.local.get('newTab', function(items) {
		fasterSearch.newTab = items.newTab;
	});
	
	for (var i = 0; i < aList.length; ++i) {
		//debugger;
		try {
			var mdAttr = aList[i].getAttribute("onmousedown");
			if (mdAttr && mdAttr.match(fasterSearch.linkPatt))
				aList[i].onclick = callbackForChangingURL;

		} catch (exception) {
			console.log("Faster google search extension: exception" + exception);
		}
	}

}
//console.log("it runs!!");
var fasterSearch = {};
fasterSearch.linkPatt = /return rwt/;
if (document.getElementById("searchform")) {
	
	var container = document.getElementById("main");
	if (container) {
		container.addEventListener("DOMNodeInserted", function () {
			//console.log("DOMNodeInserted processing all anchor elements");
			
			clearTimeout(fasterSearch.timerId);
			fasterSearch.timerId = setTimeout(processAnchorElements, 300);
			
		});

		processAnchorElements();
	}

}else{
	console.log("No search form");
}
	


function processQueryString(q) {
	/* parse the query */
	var x = q.replace(/;/g, '&').split('&'),
	i,
	name,
	t;
	/* q changes from string version of query to object */
	for (q = {}, i = 0; i < x.length; i++) {
		t = x[i].split('=', 2);
		name = unescape(t[0]);
		if (!q[name])
			q[name] = [];
		if (t.length > 1) {
			q[name][q[name].length] = unescape(t[1]);
		}
		/* next two lines are nonstandard */
		else
			q[name][q[name].length] = true;
	}
	return q;
}