//OnLoad
$(function(){
	$(document).on('click', '#taskLink', function(){
		markComplete($(this).parent());
		return false;
	});


	//add new task form (keyup)	
	$newTaskFormText = $('#newTaskFormText');	
	$newTaskFormText.autosize();
	$('#newTaskBtn').click(function(){
		submitNewTaskForm($newTaskFormText);
	});
	$newTaskFormText.keyup(function(event){
		if (event.keyCode != 13) {
                return false;
        }
        submitNewTaskForm($(this));
	});
	
	function submitNewTaskForm($textarea){
		var text = $textarea.val().replace(/(\n|\r)/gm,"");
		$textarea.val('').trigger('autosize');
		
		if(text == ""){
			writeError('You can\'t create a empty task!');
			return false;
		}
		var listKey = getUrlVar('listId');
		$.post('/createTask/'+listKey, { text: text },
			function(response){
				if(response.error)
					writeError(response.error);
				else
					appendTaskToList(response.task);
			}, 'json');

		return false;
	}
	
	//detete all compleated tasks
	$('#deleteCompleatedTasks').click(function(){
		var tasks = [];
		$compleatedTasks = $('#taskList div[completed=true]');
		$compleatedTasks.each(function(){
			tasks.push($(this).attr('key'));
		});
		if( confirm('Are you shure you want to delete the compleated tasks('+tasks.length+')?') ){
			$compleatedTasks.hide();
			$.post('/deleteTasks', {"taskKeys[]": tasks}, 
				function(response){
					if(write(response)){
						$compleatedTasks.remove();
					}else{
						$compleatedTasks.show();
					}
				},'json'
			);
		}
	});
	
	$(document).on('click', '#metadataLink', function(){
		var date = localTimeFromUTC($(this).parent().attr('date'));
		var fDate = $.format.date(date, 'HH:mm dd.MM.yyyy')
		var author = $(this).parent().attr('author');
		
		alert('This task was created '+ fDate +' by '+ author +'!');
		return false;
	});
	
	$('#updateTasks').click(populateTaskList);
});

function populateTaskList(){
	//Get taskListKey
	var listKey = getUrlVar('listId');

	//Load task list
	$('#taskList').html('');
	$.getJSON('/getTasks/'+listKey, 
		function(response){
			if(response.error){
				writeError(response.error);
			}else{
				for(var i in response.tasks){
					appendTaskToList(response.tasks[i]);
				}
			}
		}
	);
}

function markComplete($div){
	var completed = $div.attr('completed') !== "true";
	var taskKey = $div.attr('key');
	
	$div.remove();
	
	$.post('/updateTask/'+taskKey, {"completed": completed},
		function(response){
			appendTaskToList(response.task);
		}, "json");
	return false;
}

function appendTaskToList(task){
	var $taskDiv = $('<div>').addClass('taskDiv')
	.attr('key', task.key)
	.attr('completed', task.completed)
	.attr('author', task.author)
	.attr('date', task.date)
	$taskDiv.append($('<img>').attr('src',"/images/blue_right_arrow.png").attr('id', 'metadataLink'))
	$taskDiv.append(linkify(task.text));
	
	$img = $('<img>')
		.attr('id','checkboxImage')
		.attr('width', 40)
		.attr('height', 40);
	$a = $('<a>').attr('href', '#').attr('id', 'taskLink').append($img);
	
	if( task.completed ){
		$img.attr('src', '/images/checked.png');
		$('#taskList').append($taskDiv.prepend($a).css('text-decoration', 'line-through'));
	}else{
		$img.attr('src', '/images/unchecked.png');
		$('#taskList').prepend($taskDiv.prepend($a));
	}
	return $taskDiv;
}

function linkify(text){
	var output = "";
	m = text.match(/(.*?)(https?:\S+)(.*)/);
	if(!m){
		return '<a href="#" id="taskLink" class="hiddenLink">'+ text +'</a>';
	}else{
		beforeUrl = m[1];
		url = m[2];
		rest = m[3];
	}
	if(beforeUrl){
		output += linkify(beforeUrl);
	}
	if(url){
		var shortUrl = (url.length > 30) ? url.substring(0,30) +'...' : url;
		output += '<a href="'+ url +'" target="_blank">'+ shortUrl +'</a>';
	}
	if(rest){
		output += linkify(rest);
	}
	return  output;
}
