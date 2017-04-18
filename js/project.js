var project_id = getQueryVariable("id");
var projectRef = firebase.database().ref().child("projects").child(project_id);

projectRef.once("value", snap =>{
    console.log(snap.val());
    $("#project_name").append(snap.child("name").val());
    $("#project_description").append(snap.child("description").val());
})

//show the skills
projectRef.child("skills").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#skills_list").append("<a href=project.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the users
projectRef.child("users").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#users_list").append("<a href=profile.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});