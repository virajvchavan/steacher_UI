//only the basic data of logged in user
var name, email, photoUrl, emailVerified;
var uid;
firebase.auth().onAuthStateChanged(function(user){
		if(user){
			  name = user.displayName;
			  email = user.email;
			  photoUrl = user.photoURL;
			  emailVerified = user.emailVerified;
			  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
			                   // this value to authenticate with your backend server, if
			                   // you have one. Use User.getToken() instead.


			  userRef = firebase.database().ref().child("users").child(uid);


		$("#user_display_name").append(name);

		userRef.once("value", snap => {
			var user_class = snap.child("class").val();
			userRef.child("department").once("value", snap_dept => {
				
				snap_dept.forEach(function(child_snapshot)
				{
					var user_dept_id = child_snapshot.key;
					var user_dept_name = child_snapshot.val();

					$("#user_dept").append(user_dept_name);
					$("#user_dept").attr("href", "dep.html?id="+ user_dept_id);
				});
			});
			var num_projects = snap.child("projects").numChildren();
			var num_skills = snap.child("skills").numChildren();

			$("#num_projects").append(num_projects);
			$("#num_skills").append(num_skills);
			$("#user_email").append(email);

			var user_skills = snap.child("skills").val();
			var user_subjects = snap.child("subjects").val();
			var user_projects = snap.child("projects").val();

			//console.log(user_dept + user_skills + user_subjects);

			$("#user_class").append(user_class);
			
		});
				}
			});


