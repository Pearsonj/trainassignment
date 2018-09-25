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
var minutesTillNext = "";
var nextTrain = "";






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

    // var firstConvert = moment(trainTime, "HH:mm").subtract(1, "years");
    // console.log(firstConvert);

    // var currentTime = moment();
    // console.log(
    //     moment(currentTime).format("hh:mm"));

    // var diffTime = moment(currentTime).diff(moment(firstConvert), "minutes");
    // console.log(diffTime);

    // var tRemaining = diffTime % trainFreq;
    // console.log(tRemaining);

    // var tTillTrain = trainFreq - tRemaining;
    // console.log(tTillTrain);

    // var nextTrain = moment().add(diffTimes, 'minutes');
    // console.log(moment(nextTrain).format("hh:mm"));

    // var diffTime = trainTime % trainFreq;

    // var newTimeTill = trainTime - diffTime;


    // console.log(newTimeTill, "minutes");
    // timeTill = moment().diff(moment(trainTime, "minutes"));

    $('#trainName').val("");
    $('#trainDes').val("");
    $('#trainTime').val("");
    $('#trainFreq').val("");

    var convert = moment("traintime " + trainTime, "HH:mm").subtract(1, "years");
    console.log(convert);

    var currentTime = moment();
    console.log("current Time " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(convert), "minutes");
    console.log("Difference in time: " + diffTime);

    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    minutesTillNext = trainFreq - tRemainder;
    console.log("minutes till next train: " + minutesTillNext);
    console.log(minutesTillNext);
    nextTrain = moment().add(minutesTillNext, "minutes");
    console.log("arrival time: " + moment(nextTrain).format("hh:mm"));

   


    database.ref().push({
        trainName: trainName,
        trainDes: trainDes,
        trainTime: trainTime,
        trainFreq: trainFreq,
        minutesTillNext: minutesTillNext,
        nextTrain: moment(nextTrain).format("hh:mm"),
    });
   
});









database.ref().on('child_added', function (childSnapshot) {

   
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDes);
    console.log(childSnapshot.val().trainTime);
    console.log(childSnapshot.val().trainFreq);
    console.log(childSnapshot.val().nextTrain);
    console.log(childSnapshot.val().minutesTillNext);



    var tableRow = $('<tr>');
    tableRow.addClass('trainTimes');
    var trainTd = tableRow.html('<td>' + childSnapshot.val().trainName + '</td> <td>' + childSnapshot.val().trainDes + '</td> <td>' + childSnapshot.val().minutesTillNext + '</td> <td>' + childSnapshot.val().trainFreq + '</td> <td>' + childSnapshot.val().nextTrain + '</td>');
    tableRow.append(trainTd);

    $('#trainBoard').append(tableRow)

    


}, function (errorObject) {
    console.log('error: ' + errorObject.code);


});

