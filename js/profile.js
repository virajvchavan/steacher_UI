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

var uid  = getQueryVariable("id");
var rootRef = firebase.database().ref();
var usersRef = rootRef.child("users");

if(!uid)
{
    $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
}

usersRef.once("value", snap =>{
    if(snap.hasChild(uid))
    {
        console.log("Child aahe");
    }
    else
    {
        $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
    }
});

userRef = usersRef.child(uid);
firebase.auth().onAuthStateChanged(function(user){

		userRef.once("value", snap => {
			var user_class = snap.child("class").val();
			userRef.child("department").once("value", snap_dept => {
				
				snap_dept.forEach(function(child_snapshot)
				{
					var user_dept_id = child_snapshot.key;
					var user_dept_name = child_snapshot.val();

					$("#user_dept").append(user_dept_name);
					$("#user_dept").attr("href", "dept.html?id="+ user_dept_id);
				});
			});
			var num_projects = snap.child("projects").numChildren();
			var num_skills = snap.child("skills").numChildren();
			var user_name = snap.child("name").val();
			var user_email = snap.child("email").val();

			$("#num_projects").append(num_projects);
			$("#num_skills").append(num_skills);
			$("#user_email").append(user_email);
			$("#user_display_name, #page_title").prepend(user_name);

			var user_skills = snap.child("skills").val();
			var user_subjects = snap.child("subjects").val();
			var user_projects = snap.child("projects").val();

			//console.log(user_dept + user_skills + user_subjects);

			$("#user_class").append(user_class);
			
		});
			});

//show the user skills
userRef.child("skills").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var user_skill_id = child_snapshot.val();
					var user_skill_name = child_snapshot.key;
            
                    $("#skills_list").append("<a href=skill.html?id="+ user_skill_id +"><li class='list-group-item'>"+ user_skill_name +"</li></a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the user subjects
userRef.child("subjects").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var user_subject_id = child_snapshot.val();
					var user_subject_name = child_snapshot.key;
            
                    $("#subjects_list").append("<a href=subject.html?id="+ user_subject_id +"><li class='list-group-item'>"+ user_subject_name +"</li></a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the user projects
userRef.child("projects").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var user_project_id = child_snapshot.val();
					var user_project_name = child_snapshot.key;
            
                    $("#projects_list").append("<a href=project.html?id="+ user_project_id +"><li class='list-group-item'>"+ user_project_name +"</li></a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the user achievements
userRef.child("achievements").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var user_achievement_name = child_snapshot.val();
            
                    $("#achievements_list").append("<li class='list-group-item'>"+ user_achievement_name +"</li>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the user extra cur activities
userRef.child("extra").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var user_achievement_name = child_snapshot.val();
            
                    $("#extra_cur_list").append("<li class='list-group-item'>"+ user_achievement_name +"</li>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the skills in select
rootRef.child("skills").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.key;
					var name = child_snapshot.child("name").val();
        
            		$("#select_skills, #select_skills_for_project").append("<option id='"+ id +"'>"+ name +"</option>")
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the subjects in select
rootRef.child("subjects").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.key;
					var name = child_snapshot.child("name").val();
        
            		$("#select_subjects").append("<option id='"+ id +"'>"+ name +"</option>")
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});



