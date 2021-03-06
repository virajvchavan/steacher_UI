var skill_id = getQueryVariable("id");
var skillsRef = firebase.database().ref().child("skills");

if(!skill_id)
{
    $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
}

skillsRef.once("value", snap =>{
    if(snap.hasChild(skill_id))
    {
        console.log("Child aahe");
    }
    else
    {
        $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
    }
});

skillRef = skillsRef.child(skill_id);
skillRef.once("value", snap =>{
    
    $("#skill_name, #page_title").prepend(snap.child("name").val());
    $("#skill_description").append(snap.child("description").val());
    $("#num_projects").append("Projects: " + snap.child("projects").numChildren());
    $("#num_users").append("Users: " + snap.child("users").numChildren());
    $("#website_link").attr("href", snap.child("website").val());
})

//show the projects
skillRef.child("projects").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#projects_list").append("<a href=project.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the users
skillRef.child("users").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#users_list").append("<a href=profile.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});