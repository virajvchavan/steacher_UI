var project_id = getQueryVariable("id");
if(!project_id)
{
    $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
}
var projectsRef = firebase.database().ref().child("projects");

projectsRef.once("value", snap =>{
    if(snap.hasChild(project_id))
    {
        console.log("Child aahe");
    }
    else
    {
        $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
    }
});
//if()
//{
//    $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
//}

if(project_id)
{
    var projectRef = projectsRef.child(project_id);
    projectRef.once("value", snap =>{
        $("#project_name, #page_title").prepend(snap.child("name").val());
        $("#project_description").append(snap.child("description").val());
    })

    //show the skills
    projectRef.child("skills").once("value", snap =>{
        snap.forEach(function(child_snapshot)
    {
    					var id = child_snapshot.val();
    					var name = child_snapshot.key;
                
                        $("#skills_list").append("<a href=skill.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
            
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
}

