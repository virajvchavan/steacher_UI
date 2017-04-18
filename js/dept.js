var dept_id = getQueryVariable("id");
if(!dept_id)
{
    $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
}
var deptsRef = firebase.database().ref().child("departments");

deptsRef.once("value", snap =>{
    if(snap.hasChild(dept_id))
    {
        console.log("Child aahe");
    }
    else
    {
        $("body").html("<div style='text-align: center; padding: 50px;'><h1>Error 404</h1><br><h6>And you are lost!</h6></div>");
    }
});

deptsRef.child(dept_id).once("value", snap =>{
    console.log(snap.val());
    $("#dept_name, #page_title").prepend(snap.child("name").val());
    $("#dept_description").append(snap.child("description").val());
    $("#students_count").append("Projects: " + snap.child("users").numChildren());
    $("#subjects_count").append("Users: " + snap.child("subjects").numChildren());
})

//show the users
deptsRef.child(dept_id).child("users").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#users_list").append("<a href=project.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
				});
});

//show the subjects
deptsRef.child(dept_id).child("subjects").once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.val();
					var name = child_snapshot.key;
            
                    $("#subjects_list").append("<a href=profile.html?id="+ id +"><li class='list-group-item'>"+ name +"</li></a>");
        
				});
});