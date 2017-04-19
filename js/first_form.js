firebase.auth().onAuthStateChanged(function(user){

	var usersRef = firebase.database().ref().child("users");

	usersRef.once("value", snap =>{
	    if(snap.hasChild(user.uid))
	    {
	        console.log("Child aahe")
	        window.location = "profile.html?id="+user.uid;
	    }
	    else
	    {
	    	
	    }
	});
});

var deptsRef = firebase.database().ref().child("departments");

//show the projects
deptsRef.once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.key;
					var name = child_snapshot.child("name").val();
        
                    console.log(name + id);
            
            		$("#select_depts").append("<option id='"+ id +"'>"+ name +"</option>")
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});
