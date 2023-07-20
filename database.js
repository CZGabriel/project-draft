(function(){

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	var firebaseConfig = {
		apiKey: "AIzaSyDCZQ1LLfE3-WJLht8QFYLFJODlfb4OMio",
		authDomain: "capstone-a6549.firebaseapp.com",
		databaseURL: "https://capstone-a6549-default-rtdb.firebaseio.com/",
		projectId: "capstone-a6549",
		storageBucket: "capstone-a6549.appspot.com",
		messagingSenderId: "625333378064",
		appId: "1:625333378064:web:51fffd8df1f2257e16be95",
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);


	// handle on firebase db
	const db = firebase.database();

	// get elements
	const message = document.getElementById('message');
	const write   = document.getElementById('write');
	const read	  = document.getElementById('read');
	const status  = document.getElementById('status');

	// write
	write.addEventListener('click', e => {
		const messages = db.ref('messages');

		// simple id - ok for example, do not use in production
		const id = (new Date).getTime(); 

		// write to db
		messages.child(id).set({'message' : message.value})
			.then(function(){
				status.innerHTML = "Wrote to DB!";
			});
	});

	// read
	read.addEventListener('click', e => {
		status.innerHTML = '';
		const messages = db.ref('messages');

		messages.once('value')
		  .then(function(dataSnapshot) {
		  	var data = dataSnapshot.val();
		  	var keys = Object.keys(data);

		  	keys.forEach(function(key){
		  		console.log(data[key]);
				status.innerHTML += JSON.stringify(data[key]) + '<br>';
		  	});
		});
	});


}());