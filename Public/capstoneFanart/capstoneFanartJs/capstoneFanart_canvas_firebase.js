// Initialize Firebase
var config = {
	apiKey: "AIzaSyB-Jkrp7Syi-kxuwJ7q4PHEFRglMjacFCc",
	databaseURL: "https://accelerate-capstone-project.firebaseio.com",
	projectId: "accelerate-capstone-project",
	storageBucket: "accelerate-capstone-project.appspot.com"
};
//return app object
var firebase = firebase.initializeApp(config);
var auth = firebase.auth();
let storageRef = firebase.storage().ref();

window.onload = function() {
  // document.getElementById('uploaded-image').addEventListener('change', handleFileSelect, false);
  // document.getElementById('uploaded-image').disabled = true;
  auth.onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById('uploaded-image').disabled = false;
    } else {
      // Sign the user in anonymously since accessing Storage requires the user to be authorized.
      auth.signInAnonymously().catch(function(error) {
        if (error.code === 'auth/operation-not-allowed') {
          window.alert('Anonymous Sign-in failed. Please make sure that you have enabled anonymous ' +
              'sign-in on your Firebase project.');
        }
      });
    }
  });
}

$('#image-submit').click(function(e){
	let file = document.getElementById('uploaded-image').files[0];
	var metadata = {
		'contentType': file.type
	}
	//Upload image file to firebase storage
	let uploadTask = storageRef.child('images/'+file.name).put(file, metadata).then(function(snapshot){
			//Calling the retrieve method for the URL
			return snapshot.ref.getDownloadURL()
		}).then(function(url){
			console.log("HI");
			$('#canvas').css('background-image', 'url(' + url + ')')
			$('#canvas').css('background-size', 'cover');
			$('#canvas').css('background-position', 'center');
			$('#canvas').css('background-blend-mode', 'overlay');
			$('#canvas').css('background-color', 'rgba(255,255,255,0.6)');
		})
		// .then(function(url){
		// 	$('#download-button').click(function(){
		// 		let img = new Image();
		// 		img.src = url;
		// 		img.crossOrigin = "Anonymous";
		// 		img.onload = function(){
		// 			ctxReal.globalCompositeOperation="destination-over";
		// 			ctxReal.drawImage(img, 0, 0, 700, 500);
		// 			this.href = document.getElementById('canvas').toDataURL();
		// 			this.download = 'test.png';
		// 			ctxReal.clearRect(0, 0, canvas.width(), canvas.height());
		// 		}
		// 	})
		// })
})