var itemData = [];

window.onload = function(){
	$.get({
  		url: 'http://127.0.0.1:8081/item',
  		success: function(data) {
  			loadItems(data);
  			itemData = data;
  		},
  		dataType: "json"
	});
};

function loadItems(data){
	var hardGoals = [];
	var softGoals = [];

	// Split between hard and soft goals
	for (var i = 0; i < data.length; i++) {
		var isHardGoal = data[i].isHardGoal;
		if (isHardGoal === true) {
			hardGoals.push(data[i]);
		} else {
			softGoals.push(data[i]);
		}
	}

	// Sort hard goals by date due
	if (hardGoals.length > 1) {
		var temp;
		for (var i = 1; i < hardGoals.length; i++) {
			for (var j = i; j > 0; j--) {
				var currDate = new Date(hardGoals[j].dateDue);
				var nextDate = new Date(hardGoals[j - 1].dateDue);
				if (currDate < nextDate) {
					temp = hardGoals[j];
					hardGoals[j] = hardGoals[j - 1];
					hardGoals[j - 1] = temp;
				}
			}
		}
	}

	if (softGoals.length > 1) {
		// Sort soft goals by urgency
		var tempItemUrgency;
		for (var i = 1; i < softGoals.length; i++) {
			for (var j = i; j > 0; j--) {
				var currUrg = softGoals[j].urgency;
				var nextUrg = softGoals[j - 1].urgency;
				if (currUrg > nextUrg) {
					tempItemUrgency = softGoals[j];
					softGoals[j] = softGoals[j - 1];
					softGoals[j - 1] = tempItemUrgency;
				}
			}
		}
/*
		// If there's a tie in urgency, sort by easiest difficulty first
		var tempItemDifficulty;
		var currentUrgency = softGoals[0].urgency;
		for (var x = 0; x < softGoals.length; x++) {
			// Skip if already sorted
			if (currentUrgency === softGoals[x].urgency) {
				continue;
			}

			currentUrgency = softGoals[x].urgency;
			for (var i = 1; i < softGoals.length && (i + 1 === softGoals.length || softGoals[i + 1].urgency === currentUrgency); i++) {
				for (var j = i; j > 0 && (j - 1 === 0 || softGoals[j - 1].urgency === currentUrgency); j--) {
					var currDiff = softGoals[j].difficulty;
					var nextDiff = softGoals[j - 1].difficulty;
					if (currUrg > nextUrg) {
						tempItemDifficulty = softGoals[j];
						softGoals[j] = softGoals[j - 1];
						softGoals[j - 1] = tempItemDifficulty;
					}
				}
			}
		}*/
	}

	var combined = hardGoals.concat(softGoals);

	for(var i = 0; i < combined.length; i++){
		var dateDue = combined[i].dateDue;
		var description = combined[i].description;
		var isHardGoal = combined[i].isHardGoal;
		var location = combined[i].location;
		var name = combined[i].name;
		var urgency = combined[i].urgency;
		var difficulty = combined[i].difficulty;

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
		deleteElement.addEventListener('click', deleteItem);
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

function deleteItem(evt){
	// Get the index
	var parent = $(evt.target).closest('.itemContainer');
	var index = $('.itemContainer').index(parent);
	var id = itemData[index]._id;

	$.ajax({
  		url: 'http://127.0.0.1:8081/item/' + id,
  		type: 'DELETE',
  		success: function() {
  			itemData.splice(index, 1);
  			parent.remove();
  		}
	});
}






