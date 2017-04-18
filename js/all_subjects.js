subjectsRef = firebase.database().ref().child("subjects");

//show the subjects
subjectsRef.once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.key;
					var name = child_snapshot.child("name").val();
                    var description  =child_snapshot.child("description").val();
        
                    //console.log(name + description + id);
            
                    $("#all_subjects").append("<div class='card card-inverse' style='background-color: #333; border-color: #333;''><div class='card-block'><a href='subject.html?id="+ id +"'><h3 class='card-title'>"+ name +"</h3></a><p class='card-text'>"+ description +"</p></div></div>");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});
