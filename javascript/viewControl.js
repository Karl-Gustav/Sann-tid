$( document ).ajaxError(function(event, jqxhr, exception, thrownError){
	console.log("Error:");
	console.log(jqxhr);
	if (jqxhr.status == 0){
		writeError("Connection problems, continue working as normal, but the changes will be gone when you get the internet connection back!")
	} else if (jqxhr.status == 401){
		writeError("You have been loged out from your Google acount, redirecting you to the login page...");
		setTimeout(function(){
			window.location = jqxhr.getResponseHeader('Location');
		},5000);
	} else {
		writeError(jqxhr.responseText);
	}
	
}).ajaxStart(function(){
	$('#updateTasks').attr('src', '/images/loading40x40.gif')
	
}).ajaxStop(function(){
	$('#updateTasks').attr('src', '/images/refresh.png')
});

//Hides settings on clicks outside settings
$(document).mouseup(function (e){
    var $container = $('#addUserDiv, .listContent');

    if (!$container.is(e.target) && $container.has(e.target).length === 0)    {
        $container.hide();
    }
});

//onload
$(function(){
	//if page is reloaded
	init();
	
	//monitor url changes
	$(window).bind('hashchange', function () {
		init();
	});
	
	//show lists
	$(document).on('click', '#showLists', function(e){
		toggleLists();
		return false;
	});
	
	//logout button
	$('#logoutBtn').click(function(){
		if(confirm('This will log you out, is this what you wanted?'))
			$.get('/getLogoutUrl', function(response){
				window.location = response;
			});
	});
});

function init(){
	//Set list name
	var listName = getUrlVar('name');
	if(listName != null){
		$('#head h3').html(listName+':');
		document.title = listName;
		$('#changeListNameForm input[type=text]').val(listName);
	} else {
		$('#head h3').html('Your lists:');
		document.title = 'Our lists';
	}
	
	if(isTaskView()){
		hideLists();
		showTasks();

			
		populateTaskList();
		
	} else {
		populateTaskLists();
		hideTasks();
		showLists();
	}
}

function showTasks(){
	$('.taskContent').slideDown();
	$('#taskControls').show();
}

function hideTasks(){
	$('.taskContent').slideUp();
	$('#taskControls').hide();
}

function showLists(){
	$('.listContent').slideDown();
}

function hideLists(){
	$('.listContent').slideUp();
}

function toggleLists(){
	if($('.listContent').toggle().is(':visible')){
		populateTaskLists();
	}
}

function isTaskView(){
	return getUrlVars().length > 1;
}
