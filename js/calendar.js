var items = [];
var itemEvents = [];

$(document).ready(function() {
	$('#calendar').fullCalendar({
		header:{
			left: "prev, next, today",
			center: "title",
			right: "month, basicWeek, basicDay"
		},
		defultDate: "2016-06-12",
		editable: true,
		eventLimit: true,
		eventRender: renderEvent
	});
	loadItems();
});

function loadItems() {
	$.get({
  		url: 'http://127.0.0.1:8081/item',
  		success: createEvents,
  		dataType: "json"
	});
}

function createEvents(data) {
	for(var i = 0; i < data.length; i++){
		var itemId = data[i]._id;
		var itemName = data[i].name;
		var itemDateDue = data[i].dateDue;
		var itemDescription = data[i].description;
		var itemLocation = data[i].location;
		var itemDifficulty = data[i].difficulty;
		var itemIsHardGoal = data[i].isHardGoal;
		var itemUrgency = data[i].urgency;

		var itemColor;
		if (itemIsHardGoal) {
			itemColor = "#FFABA8";
		} else {
			itemColor = "#97D8D8";
		}

		var currentEvent = {
			id: itemId,
			title: itemName,
			start: itemDateDue,

			description: itemDescription,
			location: itemLocation,
			difficulty: itemDifficulty,
			urgency: itemUrgency,

			color: itemColor,
			editable: false,
			startEditable: false,
			durationEditable: false,

		};

		itemEvents.push(currentEvent);
	}
	$('#calendar').fullCalendar('addEventSource', itemEvents);
}

function renderEvent(event, element) {
	var viewType = $('#calendar').fullCalendar('getView').type;

	if (viewType === "basicWeek" || viewType === "basicDay") {
    	var descriptionElement = document.createElement("span");
    	descriptionElement.className = "fc-description";
    	descriptionElement.innerHTML = event.description;
    	element.append(descriptionElement);

    	element.append("<br>");

    	var locationElement = document.createElement("span");
    	locationElement.className = "fc-location";
    	locationElement.innerHTML = "Location: " + event.location;
    	element.append(locationElement);
	}

	if (viewType === "basicDay") {
    	element.append("<br>");

    	var urgencyElement = document.createElement("span");
    	urgencyElement.className = "fc-urgency";
    	urgencyElement.innerHTML = "Urgency: " + event.urgency;
    	element.append(urgencyElement);

    	element.append("<br>");

    	var difficultyElement = document.createElement("span");
    	difficultyElement.className = "fc-difficulty";
    	difficultyElement.innerHTML = "Difficulty: " + event.difficulty;
    	element.append(difficultyElement);
	}
}