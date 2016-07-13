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

		console.log(dateCreated, dateDue, description, isHardGoal, location, name, urgency); 

		var container = document.createElement('div');
		container.className = "itemContainer";
		container.addEventListener('click', toggleContent);
		document.getElementById('itemList').appendChild(container);

		var main = document.createElement('div');
		main.className = "main";
		container.appendChild(main);

		var nameDateElement = document.createElement('div');
		nameDateElement.className= "nameDate";
		container.appendChild(nameDateElement);

		var nameElement = document.createElement('span');
		nameElement.className = "name";
		nameElement.innerHTML = name;
		nameDateElement.appendChild(nameElement);

		var dateDueElement = document.createElement('span');
		dateDueElement.className = "dateDue";
		dateDueElement.innerHTML = dateDue;
		nameDateElement.appendChild(dateDueElement);

		//create the content element and it's children

		var contentElement = document.createElement('div');
		contentElement.className = "content";
		container.appendChild(contentElement);

		var firstRow = document.createElement('div');
		firstRow.className = "firstRow";
		contentElement.appendChild(firstRow);

		var dateCreatedElement = document.createElement('span');
		dateCreatedElement.className = "dateCreated";
		dateCreatedElement.innerHTML = dateCreated;
		firstRow.appendChild(dateCreatedElement);

		var locationElement = document.createElement('span');
		locationElement.className = "location";
		locationElement.innerHTML = location;
		firstRow.appendChild(locationElement);

		var secondRow = document.createElement('div');
		secondRow.className = "secondRow";
		contentElement.appendChild(secondRow);

		var isHardGoalElement = document.createElement('span');
		isHardGoalElement.className = "isHardGoal";
		isHardGoalElement.innerHTML = isHardGoal;
		secondRow.appendChild(isHardGoalElement);

		var urgencyElement = document.createElement('span');
		urgencyElement.className = "urgency"
		urgencyElement.innerHTML = urgency;
		secondRow.appendChild(urgencyElement);

		var descriptionElement = document.createElement('div');
		descriptionElement.className = "description";
		descriptionElement.innerHTML = description;
		contentElement.appendChild(descriptionElement);

	}
}

function toggleContent(evt){
	$(evt.target).closest('.itemContainer').find('.content').toggle();
}







