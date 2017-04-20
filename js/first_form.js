firebase.auth().onAuthStateChanged(function(user){

	var usersRef = firebase.database().ref().child("users");

	usersRef.once("value", snap =>{
	    if(snap.hasChild(user.uid))
	    {
	        console.log("Child aahe")
	        window.location = "profile.html?id="+user.uid;
	    }
	    $("#full_name").val(user.displayName);

	    $("#btnSubmit").click(function(){
	    	var user_class = $("#select_year").val();
	    	var user_dept = $("#select_depts").val();

	    	var user_dept_id = $("#select_depts").children(":selected").attr("id");
	    	
	    	writeBasicUserData(user.uid, user.displayName, user_class, user_dept, user_dept_id);
	    });
	});
});

var rootRef = firebase.database().ref();
var deptsRef = rootRef.child("departments");

//show the deoartments in select
deptsRef.once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.key;
					var name = child_snapshot.child("name").val();
        
            		$("#select_depts").append("<option id='"+ id +"'>"+ name +"</option>")
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

function writeBasicUserData(uid,name,user_class, depar, departKey) {
	//1. add the user details in users
	//2. add the user in the department

  			firebase.database().ref('users/'+uid).set({
  				name: name,
  				class: user_class,
  		    	department:{
  		    		[departKey]: depar
  		    	}
  		     });

  			deptsRef.child(departKey).child("users").update({
				[name]: uid
			});

  		}