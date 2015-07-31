function newTab(event){
        chrome.storage.local.set({'newTab': event.target.value}, function() {
          // Notify that we saved.
          message('Settings saved');
        });
}
window.onload = function(){
	chrome.storage.local.get('newTab', function(items) {
	  // Notify that we saved.
		if(items){
			var elem = document.getElementById("newTab"+items['newTab']);
			if(elem)
				elem.checked =  true;
		}
	});	
	document.getElementById("newTabYes").addEventListener('click',	newTab);
	document.getElementById("newTabNo").addEventListener('click',	newTab);
}
