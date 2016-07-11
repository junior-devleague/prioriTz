$(document).ready(function(){
	$('#calendar').fullCalendar({
		header:{
			left: "prev, next, today",
			center: "title",
			right: "month, basicWeek, basicDay"
		},
		defultDate:"2016-06-12",
		editable: true,
		eventLimit:true,
	});
});
