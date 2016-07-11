window.onload = function(){
	
	$.get({
  		url: 'http://127.0.0.1:8081/item',
  		success: function(data) {
  			loadItems(data);
  		},
  		dataType: "json"
	});
};

function loadItems(data){
	console.log(data[0]);
	for(var i = 0; i < data.length; i++){
		var dateCreated = data[i].dateCreated;
		var dateDue = data[i].dateDue;
		var description = data[i].description;
		var isHardGoal = data[i].isHardGoal;
		var location = data[i].location;
		var name = data[i].name;
		var urgency = data[i].urgency; 

		var container = document.createElement('div');
		container.className = "itemContainer";
		container.innerHTML = "Test";
		document.getElementById('itemList').appendChild(container);
	}
}
	
