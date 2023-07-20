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

	// get elements
	const email    = document.getElementById('email');
	const password = document.getElementById('password');
	const login    = document.getElementById('login');
	const signup   = document.getElementById('signup');
	const logout   = document.getElementById('logout');

	// login
	login.addEventListener('click', e => {
		const auth  = firebase.auth();		
		const promise = auth.signInWithEmailAndPassword(email.value, password.value);
		promise.catch(e => console.log(e.message));
	});

	// signup
	signup.addEventListener('click', e => {
		// TODO: check for real email
		const auth  = firebase.auth();
		const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
		promise.catch(e => console.log(e.message));
	});

    // logout
	logout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

    // login state
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
			logout.style.display = 'inline';
			login.style.display  = 'none';
			signup.style.display = 'none';
		}
		else{
			console.log('User is not logged in');
			logout.style.display = 'none';			
			login.style.display  = 'inline';
			signup.style.display = 'inline';
		}
	});

}());