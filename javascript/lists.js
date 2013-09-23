function appendToList(taskList){
	function a(){
		return 	$('<a>').attr('href',
					'#listId='+taskList.key+
					'&name='+encodeURI(taskList.name)
				).click(function(){
					hideLists();
				});
	}
				
	$("#Lists").append(
		$('<tr>')
		.append(
			$('<td>').append(
				a().append(
					$('<img>')
					.attr('src', '/images/list.png')
					.attr('width', 40)
					.attr('height', 40)
				)
			)
		)
		.append(
			$('<td>').append(
				a().append(taskList.name+' ('+taskList.notFinishedTasks+')').attr('class', 'hiddenLink')
			)
		)
	);
}

//on load
$(function(){	
	//deltask button
	$(document).on('click', '#delListBtn', function(){
		if(confirm('Are you sure you want to delete the "'+getUrlVar('name')+'" list?')){
			$.post("/deleteTaskList", {'listId': getUrlVar('listId') },
				function(response){
					if(process(response)){
						window.location.hash = ""
					}
				}, "json");
		}
	});

	//new list form
	$("#newListFrom").submit(function(){
		$.post("/createTaskList", $(this).serializeArray(),
			function(response){
				if(process(response)){
					appendToList(response.taskList);
					$('#newListFrom')[0].reset();
					window.location.hash = '#listId='+response.taskList.key+'&name='+encodeURI(response.taskList.name)
				}
			}, "json");
		return false;
	});

	//new list form
	$("#changeListNameForm").submit(function(){
		$.post("/changeTaskListName/"+getUrlVar('listId'), $(this).serializeArray(),
			function(response){
				if(process(response)){
					window.location.hash = "#listId="+getUrlVar('listId')+"&name="+$('#changeListNameForm input:text').val();
				}
			}, "json");
		return false;
	});
});

function populateTaskLists(){
	//get task lists
	$.getJSON("/getTaskLists", 
		function(response){
			$("#Lists").html("");
			for(var i in response.taskLists){
				appendToList(response.taskLists[i]);
			}
		}
	);
}

