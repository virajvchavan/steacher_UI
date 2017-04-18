var deptsRef = firebase.database().ref().child("departments");

//show the projects
deptsRef.once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.key;
					var name = child_snapshot.child("name").val();
                    var num_students = child_snapshot.child("users").numChildren();
                    var num_subjects = child_snapshot.child("subjects").numChildren();
                    var num_projects = child_snapshot.child("projects").numChildren();
        
                    console.log(name + id);
            
                    $("#all_depts").append("<div class='card card-inverse' style='background-color: #333; border-color: #333;'><div class='card-block'><a href='dept.html?id="+ id +"'><h3 class='card-title'>"+ name +"</h3></a>Subjects: <span class='badge badge-primary'>"+ num_subjects +"</span>&nbsp;&nbsp;&nbsp;Students: <span class='badge badge-primary'>" + num_students + "</span>&nbsp;&nbsp;&nbsp;Projects: <span class='badge badge-primary'>"+ num_projects +"</span>&nbsp;&nbsp;&nbsp;</div></div>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});
