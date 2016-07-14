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
		var dateDue = data[i].dateDue;
		var description = data[i].description;
		var isHardGoal = data[i].isHardGoal;
		var location = data[i].location;
		var name = data[i].name;
		var urgency = data[i].urgency;
		var difficulty = data[i].difficulty;

		var container = document.createElement('div');
		// Have a different background color for hard goals
		if (isHardGoal === true) {
			container.className = "itemContainer hardGoal"
		} else {
			container.className = "itemContainer";
		}
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
		var formattedDate = new Date(dateDue);
		dateDueElement.innerHTML = formattedDate.toLocaleDateString() + ' ' + formattedDate.toLocaleTimeString();
		nameDateElement.appendChild(dateDueElement);

		var downArrowElement = document.createElement('i');
		downArrowElement.addEventListener('click', toggleContent);
		downArrowElement.className = "fa fa-chevron-circle-down fa-lg";
		nameDateElement.appendChild(downArrowElement);

		var deleteElement = document.createElement('i');
		deleteElement.addEventListener('click', removeContent);
		deleteElement.className = "fa fa-times-circle";
		nameDateElement.appendChild(deleteElement);
		


		//create the content element and it's children

		var contentElement = document.createElement('div');
		contentElement.className = "content";
		container.appendChild(contentElement);

		var descriptionElement = document.createElement('div');
		descriptionElement.className = "description";
		descriptionElement.innerHTML = description;
		contentElement.appendChild(descriptionElement);

		var firstRow = document.createElement('div');
		firstRow.className = "firstRow";
		contentElement.appendChild(firstRow);

		var locationElement = document.createElement('span');
		locationElement.className = "location";
		locationElement.innerHTML = "Location: " + location;
		firstRow.appendChild(locationElement);

		var secondRow = document.createElement('div');
		secondRow.className = "secondRow";
		contentElement.appendChild(secondRow);

		var urgencyElement = document.createElement('span');
		urgencyElement.className = "urgency"
		urgencyElement.innerHTML = "Urgency: " + urgency;
		secondRow.appendChild(urgencyElement);

		var difficultyElement = document.createElement('span');
		difficultyElement.className = "difficulty"
		difficultyElement.innerHTML = "Difficulty: " + difficulty;
		secondRow.appendChild(difficultyElement);

	}
}

function toggleContent(evt){
	$(evt.target).closest('.itemContainer').find('.content').toggle();
	if($(evt.target).hasClass('fa-chevron-circle-down')){
		$(evt.target).removeClass('fa-chevron-circle-down');
		$(evt.target).addClass('fa-chevron-circle-up');	
	}
	else{
		$(evt.target).addClass('fa-chevron-circle-down');
		$(evt.target).removeClass('fa-chevron-circle-up');
	}

}

function removeContent(evt){
	$(evt.target).remove("fa fa-times-circle");
}






