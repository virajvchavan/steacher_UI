var projectsRef = firebase.database().ref().child("projects");

//show the projects
projectsRef.once("value", snap =>{
    snap.forEach(function(child_snapshot)
	{
		var id = child_snapshot.key;
		var name = child_snapshot.child("name").val();
	    var description = child_snapshot.child("description").val();

	    $("#all_projects").append('<div class="card card-inverse" style="background-color: #333; border-color: #333;"><div class="card-block"><a href="project.html?id='+ id +'"><h3 class="card-title">'+ name +'</h3></a><p id="'+  id +'" class="card-text">'+ description + '<br>');

	    //show the skills
		child_snapshot.child("skills").forEach(function(skills_snapshot)
		{
			var skill_id = skills_snapshot.val();
			var skill_name = skills_snapshot.key;
						                
			$("#" + id).append(" <div class='badge badge-primary'> "+ skill_name +" </div> ");
		});

		$("#all_projects").append("</p></div></div></div>");
                    
	});
});
