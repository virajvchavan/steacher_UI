var subject_id = getQueryVariable("id");
if(!subject_id)
{
    $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
}
var subjectsRef = firebase.database().ref().child("subjects");

subjectsRef.once("value", snap =>{
    if(snap.hasChild(subject_id))
    {
        console.log("Child aahe");
    }
    else
    {
        $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
    }
});


var subjectRef = subjectsRef.child(subject_id);

subjectRef.once("value", snap =>{
    console.log(snap.val());
    $("#subject_name, #page_title").prepend(snap.child("name").val());
    $("#subject_description").append(snap.child("description").val());
    $("#students_count").append("Students: " + snap.child("users").numChildren());
    snap.child("department").forEach(function(child_snapshot)
                 {
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#subject_dept").append("<a href='dept.html?id="+ id +"' style='color: #eaeaea;'>"+ name +"</a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
               
});

//show the projects
subjectRef.child("projects").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#projects_list").append("<a href=project.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the users
subjectRef.child("users").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#users_list").append("<a href=profile.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});