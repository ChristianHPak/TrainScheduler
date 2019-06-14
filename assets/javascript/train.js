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

    $("tbody").append("<tr>" + "<th scope='col'> " + ChildSnapshot.val().EmployeeName + "<td scope='col'>" + ChildSnapshot.val().EmployeeRole + "<td scope='col'>" + ChildSnapshot.val().EmployeeStartDate + "<td scope='col'>" + ChildSnapshot.val().MonthsWorked + " Month(s)" + "<td scope='col'>" + ChildSnapshot.val().EmployeeMonthlyRate + "<td scope='col'> $" + ChildSnapshot.val().TotalBilled)


}, function (errorObj) {
    console.log("Errors handled: " + errorObj.code)
});

$("#Employee-Submit").on("click", function (event) {
    event.preventDefault();

    var todaysdate = moment()

    var EmployeeName = $("#Employee-Name").val().trim();
    var EmployeeRole = $("#Employee-Role").val().trim();
    var EmployeeStartDate = moment($("#Employee-StartDate").val()).format('L');
    var EmployeeMonthlyRate = parseInt($("#Employee-MonthlyRate").val());

    var MonthsWorked = moment().diff(EmployeeStartDate, 'month')
    var TotalBilled = (MonthsWorked * EmployeeMonthlyRate);

    //saves info in database
    database.ref().push({
        EmployeeName: EmployeeName,
        EmployeeRole: EmployeeRole,
        EmployeeMonthlyRate: EmployeeMonthlyRate,
        EmployeeStartDate: EmployeeStartDate,
        MonthsWorked: MonthsWorked,
        TotalBilled: TotalBilled
    });

    $("input").val("")
});