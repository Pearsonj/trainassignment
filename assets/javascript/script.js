var config = {
    apiKey: "AIzaSyC_XC_HgkFx4G4aNZRs5XVbo-d66cQ3IHo",
    authDomain: "traintimetable-4c481.firebaseapp.com",
    databaseURL: "https://traintimetable-4c481.firebaseio.com",
    projectId: "traintimetable-4c481",
    storageBucket: "",
    messagingSenderId: "1035191570568"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var trainDes = "";
var trainTime = "";
var trainFreq = "";

$('#submit').on('click', function(event){
    event.preventDefault();
    
    trainName = $('#trainName').val().trim();
    trainDes = $('#trainDes').val().trim();
    trainTime = $('#trainTime').val().trim();
    trainFreq = $('#trainFreq').val().trim();

    console.log('trainDes', trainDes);
    console.log('trainTime', trainTime);
    console.log('trainfreq', trainFreq);
    console.log('trainName', trainName);
});