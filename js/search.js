var search_key = getQueryVariable("s");
search_key = search_key.toLowerCase();

$("#search_value").val(search_key);

var rootRef = firebase.database().ref();

//show the user skills
rootRef.child("skills").orderByChild("lower_name").equalTo(search_key).once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var skill_id = child_snapshot.key;
					var skill_name = child_snapshot.child("name").val();
            
                    $("#skills_list").append("<a href=skill.html?id="+ skill_id +"><li class='list-group-item'>"+ skill_name +"</li></a>");

                    $("#skills_modal").append(" <a href=skill.html?id="+ skill_id +"><span class='badge badge-success'>"+ skill_name +"</span></a> ");
        
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});

//show the subjects in select
rootRef.child("subjects").orderByChild("lower_name").equalTo(search_key).once("value", snap =>{
    snap.forEach(function(child_snapshot)
{
					var subject_id = child_snapshot.key;
					var subject_name = child_snapshot.child("name").val();
        
            		$("#subjects_list").append("<a href=subject.html?id="+ subject_id +"><li class='list-group-item'>"+ subject_name +"</li></a>");

                    $("#subjects_modal").append(" <a href=subject.html?id="+ subject_id +"><span class='badge badge-success'>"+ subject_name +"</span></a> ");
                    //<a href="skill.html"><li class="list-group-item">HTML</li></a>
				});
});
