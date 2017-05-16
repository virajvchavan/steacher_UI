//gets the logged in user's data and if if it's the first time for user, save the form's data into database

//If this is the first log in ever, then this is when a database entry is added for the user the first time
firebase.auth().onAuthStateChanged(function(user){

	var usersRef = firebase.database().ref().child("users");

	usersRef.once("value", snap =>{
		//if this is not the first time user has logged in: i.e. a database entry already exists, then redirect to its page
	    if(snap.hasChild(user.uid))
	    {
	        console.log("Child aahe")
	        window.location = "profile.html?id="+user.uid;
	    }
	    $("#full_name").val(user.displayName);

	    $("#btnSubmit").click(function(){
	    	var user_class = $("#select_year").val();
	    	var user_dept = $("#select_depts").val();
	    	var user_prn = $("#prn").val();
	    	var user_dept_id = $("#select_depts").children(":selected").attr("id");

	    	var user_role = $("input:radio[name='role']:checked").val()
	        	
	    	
	    	writeBasicUserData(user_role, user.uid, user_prn, user.displayName, user_class, user_dept, user_dept_id);
	    });
	});
});

var rootRef = firebase.database().ref();
var deptsRef = rootRef.child("departments");

//show the departments in select
deptsRef.once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var id = child_snapshot.key;
					var name = child_snapshot.child("name").val();
        
            		$("#select_depts").append("<option id='"+ id +"'>"+ name +"</option>")
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});


$('input[type="radio"][name="role"]').change(function() {
        if (this.value == 'student') {
            $("#div_year, #div_prn").show();        }
        else if (this.value == 'teacher') {
            $("#div_year, #div_prn").hide();
        }
    });

//$("#dcacl").prop('disabled',true);

function writeBasicUserData(role, uid, prn, name,user_class, depar, departKey) {
	//1. add the user details in users
	//2. add the user in the department

  			firebase.database().ref('users/'+uid).set({
  				role: role,
  				name: name,
  				prn: prn,
  				class: user_class,
  		    	department:{
  		    		[departKey]: depar
  		    	}
  		     });

  			deptsRef.child(departKey).child("users").update({
				[name]: uid
			});

  		}