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
$("#add_skills_to_project").hide();
var uid  = getQueryVariable("id");

firebase.auth().onAuthStateChanged(function(user){
		if(user){
			$("#user_name").text(user.displayName);
			$("#logout_button").show();
			$("#login_button").hide();
			$("#profile_link").attr("href","profile.html?id="+user.uid);

			if(uid != user.uid)
			{
				$(".profile_buttons").hide();
			}
		}else{
			$("#profile_link").remove();
			$("#logout_button").hide();
			$("#login_button").show();
			$(".profile_buttons").hide();
		}

	});

	$("#logout_button").click(function(){
		firebase.auth().signOut();
		window.location = "index.html";
	});

	$("#login_button").click(function(){
		window.location = "login.html";
	});
    


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

		userRef.on("value", snap => {
			var user_class = snap.child("class").val();
			userRef.child("department").once("value", snap_dept => {
				
				snap_dept.forEach(function(child_snapshot)
				{
					var user_dept_id = child_snapshot.key;
					var user_dept_name = child_snapshot.val();

					$("#user_dept").text(user_dept_name);
					$("#user_dept").attr("href", "dept.html?id="+ user_dept_id);
				});
			});
			var num_projects = snap.child("projects").numChildren();
			var num_skills = snap.child("skills").numChildren();
			var user_name = snap.child("name").val();
			var user_email = snap.child("email").val();

			$("#num_projects").text("Projects: " + num_projects);
			$("#num_skills").text("Skills: " + num_skills);
			$("#user_email").text(user_email);
			$("#user_display_name, #page_title").text(user_name);

			var user_skills = snap.child("skills").val();
			var user_subjects = snap.child("subjects").val();
			var user_projects = snap.child("projects").val();

			//console.log(user_dept + user_skills + user_subjects);

			$("#user_class").text(user_class);
			
		});
			});

//show the user skills
userRef.child("skills").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var user_skill_id = child_snapshot.val();
					var user_skill_name = child_snapshot.key;
            
                    $("#skills_list").append("<a href=skill.html?id="+ user_skill_id +"><li class='list-group-item'>"+ user_skill_name +"</li></a>");

                    $("#skills_modal").append(" <a href=skill.html?id="+ user_skill_id +"><span class='badge badge-success'>"+ user_skill_name +"</span></a> ");
        
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

                    $("#subjects_modal").append(" <a href=subject.html?id="+ user_subject_id +"><span class='badge badge-success'>"+ user_subject_name +"</span></a> ");
        
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
userRef.child("achievements").on("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var user_achievement_name = child_snapshot.val();
            
                    $("#achievements_list").append("<li class='list-group-item'>"+ user_achievement_name +"</li>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the user extra cur activities
userRef.child("extra").on("value", snap =>{
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

//adding skills through modal form
$("#submitSkillsBtn").click(function(){

	//1. add skill to the logged in user
	//2. add logged in user to the skill

	var new_skill = $("#select_skills").val();
	var new_skill_id= $("#select_skills").children(":selected").attr("id");

	firebase.auth().onAuthStateChanged(function(user){

	//add skill to the user
	usersRef.child(user.uid).child("skills").update({
  				[new_skill]: new_skill_id
  		     });

	//add user to the skill
	rootRef.child("skills").child(new_skill_id).child("users").update({
		[user.displayName]: user.uid
	});

	});

	$("#skills_list").append("<a href=skill.html?id="+ new_skill_id +"><li class='list-group-item'>"+ new_skill +"</li></a>");

    $("#skills_modal").append(" <a href=skill.html?id="+ new_skill_id +"><span class='badge badge-success'>"+ new_skill +"</span></a> ");

});


//adding subjects through modal form
$("#submitSubjectsBtn").click(function(){

	//1. add subject to the logged in user
	//2. add logged in user to the subject

	var new_subject = $("#select_subjects").val();
	var new_subject_id= $("#select_subjects").children(":selected").attr("id");

	firebase.auth().onAuthStateChanged(function(user){

	//add skill to the user
	usersRef.child(user.uid).child("subjects").update({
  				[new_subject]: new_subject_id
  		     });

	//add user to the skill
	rootRef.child("subjects").child(new_subject_id).child("users").update({
		[user.displayName]: user.uid
	});

	});

	$("#subjects_list").append("<a href=subject.html?id="+ new_subject_id +"><li class='list-group-item'>"+ new_subject +"</li></a>");

    $("#subjects_modal").append(" <a href=subject.html?id="+ new_subject_id +"><span class='badge badge-success'>"+ new_subject +"</span></a> ");

});

//add a project to db
$("#submitProjectBtn").click(function(){
	
	//1. add all the basic data to the project
	//2. add project to the logged in user

	var project_name = $("#project_name").val();
	var project_description = $("#project_description").val();
	var github_link = $("#github_link").val();
	var online_link = $("#online_link").val();

	firebase.auth().onAuthStateChanged(function(user){
		var project_id = writeUserProjects(user.uid, user.displayName, project_name, project_description, github_link, online_link);

		$("#projects_list").append("<a href=project.html?id="+ project_id +"><li class='list-group-item'>"+ project_name +"</li></a>");

		$("#new_project_id").val(project_id);
		$("#new_project_name").val(project_name);

	});

	$("#add_project_form").hide();
	$("#add_skills_to_project").show();



});



//add skills to a project
$("#submitSkillsForProjectBtn").click(function(){
	//1. add skill to the project
	//2. add project to the skill

	var new_skill = $("#select_skills_for_project").val();
	var new_skill_id= $("#select_skills_for_project").children(":selected").attr("id");
	var new_project_name = $("#new_project_name").val();
	var new_project_id = $("#new_project_id").val();

	firebase.auth().onAuthStateChanged(function(user){
		//add skill to the project
		rootRef.child("projects").child(new_project_id).child("skills").update({
	  				[new_skill]: new_skill_id
	  		     });

		//add project to the skill
		rootRef.child("skills").child(new_skill_id).child("projects").update({
			[new_project_name]: new_project_id
		});
	});


    $("#skills_in_project_modal").append(" <a href=skill.html?id="+ new_skill_id +"><span class='badge badge-success'>"+ new_skill +"</span></a> ");
})




//adding a new project
function writeUserProjects(uid,user_name,projectName,projectInfo,projectGithub,projectLink) {
			 var refForProjectDocument=firebase.database().ref('/projects').push();
  			 refForProjectDocument.set({
  				name: projectName,
  		    	description: projectInfo,
  		    	github:projectGithub,
  		    	source_code: projectLink,
  		    	users:{
  		    		[user_name]: uid
  		    	}
  		     });
			var projectId=refForProjectDocument.key;
						
			var ref=firebase.database().ref('users/'+uid+'/projects/');
  			ref.update({
  				[projectName] : projectId
  		    });

  		    return projectId;
  		   
}


