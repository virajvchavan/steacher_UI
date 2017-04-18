//only the basic data of logged in user
var name, email, photoUrl, emailVerified;
var uid = "xoVFEPDXZjXwGsn4TKajWlVQmDz2";
userRef = firebase.database().ref().child("users").child(uid);
firebase.auth().onAuthStateChanged(function(user){
		if(user){
			  name = user.displayName;
			  email = user.email;
			  photoUrl = user.photoURL;
			  emailVerified = user.emailVerified;
			  uid = user.uid; 


		$("#user_display_name").append(name);

		userRef.once("value", snap => {
			var user_class = snap.child("class").val();
			userRef.child("department").once("value", snap_dept => {
				
				snap_dept.forEach(function(child_snapshot)
				{
					var user_dept_id = child_snapshot.key;
					var user_dept_name = child_snapshot.val();

					$("#user_dept").append(user_dept_name);
					$("#user_dept").attr("href", "dep.html?id="+ user_dept_id);
				});
			});
			var num_projects = snap.child("projects").numChildren();
			var num_skills = snap.child("skills").numChildren();

			$("#num_projects").append(num_projects);
			$("#num_skills").append(num_skills);
			$("#user_email").append(email);

			var user_skills = snap.child("skills").val();
			var user_subjects = snap.child("subjects").val();
			var user_projects = snap.child("projects").val();

			//console.log(user_dept + user_skills + user_subjects);

			$("#user_class").append(user_class);
			
		});
				}
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



