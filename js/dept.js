var dept_id = getQueryVariable("id");
var deptRef = firebase.database().ref().child("departments").child(dept_id);

deptRef.once("value", snap =>{
    console.log(snap.val());
    $("#dept_name").append(snap.child("name").val());
    $("#dept_description").append(snap.child("description").val());
    $("#students_count").append("Projects: " + snap.child("users").numChildren());
    $("#subjects_count").append("Users: " + snap.child("subjects").numChildren());
})

//show the users
deptRef.child("users").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#users_list").append("<a href=project.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
				});
});

//show the subjects
deptRef.child("subjects").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#subjects_list").append("<a href=profile.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
				});
});