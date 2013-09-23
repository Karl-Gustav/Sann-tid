//on load
$(function(){
	
	//add User to form
	$('#addUserForm').submit(function(){
		if($(this).find('input[type=text]').val() == "")
			writeError('You can\'t add a empty email address!');
		
		var listKey = getUrlVar('listId');
		$.post('/addUserToList/'+listKey, $(this).serializeArray(),
			function(response){
				write(response);
				
				$('#addUserDiv').slideUp(400);
				$('#addUserForm')[0].reset();
			}, 'json');
		return false;
	});
	
	//delete user from list
	$(document).on('click', '#deleteUserFromList', function(){
		var email = $(this).text();
		if (confirm('Are you shure you want to remove "'+email+'" from this list?')){
			var listKey = getUrlVar('listId');
			$.post('/deleteListUsers/'+listKey, {"email": email}, 
			function(response){
				write(response);
				$('#addUserDiv').slideUp(400);
			},'json');
		}
	});
	
	//add new user dropdown
	$('#addUserDiv').hide();
	$('#showAddUserDivBtn').click(function(){
		if($('#addUserDiv').is(':visible')){
			$('#addUserDiv').slideUp(400);
		}else{
			$('#addUserDiv').slideDown(400);
			var listKey = getUrlVar('listId');
			$.getJSON('/getListUsers/'+listKey, function(response){
				var out = "";
				for(var i in response.users)
					out += '<li><a id="deleteUserFromList"><img src="/images/minus.png" class="minus"/>'+response.users[i]+'<a></li>'
				$('#addUserList').html(out)
			});
		}
	});

});
