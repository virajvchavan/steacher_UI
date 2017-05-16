firebase.auth().onAuthStateChanged(function(user){
		if(user){
			$("#user_name").append(user.displayName);
			$("#logout_button").show();
			$("#login_button").hide();
			$("#profile_link").attr("href","profile.html?id="+user.uid);
		}else{
			$("#profile_link").remove();
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
	});


function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
}



    