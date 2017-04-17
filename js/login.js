firebase.auth().onAuthStateChanged(function(user){
		if(user){
			$("#user_name").append(user.displayName);
			$("#logout_button").show();
			$("#login_button").hide();
		}else{
			$("#logout_button").hide();
			$("#login_button").show();
		}
	});

	$("#logout_button").click(function(){
		firebase.auth().signOut();
		window.location = "index.html";
	});

	$("#login_button").click(function(){
		window.location = "login.html";
	})