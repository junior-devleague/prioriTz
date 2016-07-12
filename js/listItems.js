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
	for(var i = 0; i < data.length; i++){
		var dateCreated = data[i].dateCreated;
		var dateDue = data[i].dateDue;
		var description = data[i].description;
		var isHardGoal = data[i].isHardGoal;
		var location = data[i].location;
		var name = data[i].name;
		var urgency = data[i].urgency;

		console.log(location); 

		var container = document.createElement('div');
		container.className = "itemContainer";
		document.getElementById('itemList').appendChild(container);

		var main = document.createElement('div');
		main.className = "main";
		container.appendChild(main);

		var nameElement = document.createElement('span');
		nameElement.className = "name";
		nameElement.innerHTML = name;
		main.appendChild(nameElement);

		var dateDueElement = document.createElement('span');
		dateDueElement.className = "Date due";
		dateDueElement.innerHTML = date due;
		main.appendChild(dateDueElement);
	}
}
	
