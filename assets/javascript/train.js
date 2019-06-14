var firebaseConfig = {
    apiKey: "AIzaSyCyK0oFDFd6-PgFnZzaqruP2XsClXc0jv4",
    authDomain: "bootcamp-c712f.firebaseapp.com",
    databaseURL: "https://bootcamp-c712f.firebaseio.com",
    projectId: "bootcamp-c712f",
    storageBucket: "bootcamp-c712f.appspot.com",
    messagingSenderId: "1079610811747",
    appId: "1:1079610811747:web:e11b57157afd5d4a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref().on("child_added", function (ChildSnapshot) {

    var TrainName = childSnapshot.val().TrainName;
    var TrainDestination = childSnapshot.val().TrainDestination;
    var TrainFrequency = childSnapshot.val().TrainFrequency;
    var TrainStart = childSnapshot.val().TrainStart;

    var timeArray = tFirstTrain.split(":");
    var trainTime = moment()
        .hours(timeArray[0])
        .minutes(timeArray[1]);
    var ArrivalTime = moment.max(moment(), trainTime);
    var TrainMin;
    var nextTrain;

    if (ArrivalTime === trainTime) {
        nextTrain = trainTime.format("hh:mm A");
        TrainMin = trainTime.diff(moment(), "minutes");
    } else {

        var TimeDifference = moment().diff(trainTime, "minutes");
        var TrainRemainder = TimeDifference % TrainFrequency;
        TrainMin = TrainFrequency - TrainRemainder;

        nextTrain = moment()
            .add(tMinutes, "m")
            .format("hh:mm A");
    }

    $("tbody").append("<tr>" + "<th scope='col'> " + TrainName + "<td scope='col'>" + TrainDestination + "<td scope='col'>" + TrainFrequency + " Minute(s)" + "<td scope='col'>" + nextTrain + "<td scope='col'>" + TrainMin) + "</td></tr>";

}, function (errorObj) {
    console.log("Errors handled: " + errorObj.code)
});

$("#Employee-Submit").on("click", function (event) {
    event.preventDefault();

    var TrainName = $("#Train-Name").val().trim();
    var TrainDestination = $("#Train-Destination").val().trim();
    var TrainStart = moment($("#Train-Start").val()).format('L');
    var TrainFrequency = parseInt($("#Train-Frequency").val());

    //saves info in database
    database.ref().push({
        TrainName: TrainName,
        TrainDestination: TrainDestination,
        TrainStart: TrainStart,
        TrainFrequency: TrainFrequency,
    });

    $("input").val("")
});