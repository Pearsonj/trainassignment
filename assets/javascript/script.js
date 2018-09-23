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
var timeTill = "";

$('#submit').on('click', function (event) {
    event.preventDefault();

    trainName = $('#trainName').val().trim();
    trainDes = $('#trainDes').val().trim();
    trainTime = $('#trainTime').val().trim();
    trainFreq = $('#trainFreq').val().trim();
    

    console.log('trainDes', trainDes);
    console.log('trainTime', trainTime);
    console.log('trainfreq', trainFreq);
    console.log('trainName', trainName);

    var firstConvert = moment(trainTime, "HH:mm").subtract(1, "years");

    var currentTime = moment();
    console.log(
        moment(currentTime).format("hh:mm"));

    var diffTime = moment(currentTime).diff(moment(firstConvert), "minutes");
    console.log(diffTime);

    var tRemaining = diffTime % trainFreq;
    console.log(tRemaining);

    var tTillTrain = trainFreq - tRemaining;
    console.log(tTillTrain);
    timeTill = moment().diff(moment(trainTime), "minutes");

    var diffTime = trainTime % trainFreq;

    newTimeTill = trainTime - diffTime;

    console.log(newTimeTill);


    database.ref().push({
        trainName: trainName,
        trainDes: trainDes,
        trainTime: trainTime,
        trainFreq: trainFreq,
        timeTill:tTillTrain
        
    });

    
    var nextTrain = moment().add(tTillTrain, 'minutes');
    console.log(moment(nextTrain).format("hh:mm"));

    $('#trainName').val("");
    $('#trainDes').val("");
    $('#trainTime').val("");
    $('#trainFreq').val("");

    
});

database.ref().on('child_added', function (childSnapshot) {

    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDes);
    console.log(childSnapshot.val().trainTime);
    console.log(childSnapshot.val().trainFreq);
    console.log(childSnapshot.val().timeTill);

    var tableRow = $('<tr>');
    tableRow.addClass('trainTimes');
    var trainTd = tableRow.html('<td>' + childSnapshot.val().trainName + '</td> <td>' + childSnapshot.val().trainDes + '</td> <td>' + childSnapshot.val().trainTime + '</td> <td>' + childSnapshot.val().trainFreq + '</td>' + '<td>' + childSnapshot.val().timeTill + '</td>');
    tableRow.append(trainTd);

    $('#trainBoard').append(tableRow)

}, function (errorObject) {
    console.log('error: ' + errorObject.code);
});