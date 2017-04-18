//var subject_id = "-Khwz2REfnNP1GudT8ZR";
var subject_id = getQueryVariable("id");
var subjectRef = firebase.database().ref().child("subjects").child(subject_id);

subjectRef.once("value", snap =>{
    console.log(snap.val());
    $("#subject_name").append(snap.child("name").val());
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