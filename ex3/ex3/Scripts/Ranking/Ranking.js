$(document).ready(function () {
    $("#menuBar").load("/Views/UpperMenu.html");
    $("table").hide();
});

var apiuri = "/api/Users";
$.get(apiuri).done(function (response, status) {


    //create users array
    var users = new Array(response.length);
    for (var i = 0; i < response.length; i++) {
        var userName = response[i].UserName;
        var wins = response[i].Wins;
        var loses = response[i].Loses;
        users[i] = { name: userName, won: wins, lost: loses };
    }

    //sort users
    users.sort(function (a, b) {
        var keyA = a['won'] - a['lost'];
        var keyB = b['won'] - b['lost'];
        // Compare the 2 keys
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });

    //create table
    for (var i = 0; i < users.length; i++) {
        var name = users[i]['name'];
        var wins = users[i]['won'];
        var loses = users[i]['lost'];
        var colorString = "";
        if (name == sessionStorage['name']) {
            colorString = ' class="table-active"';
        }
        var rank = i + 1;
        $('#table_body').append("<tr" + colorString + "><th scope='row'>" + rank + "</th><td>" + name + "</td> <td>" + wins + "</td> <td>" + loses + "</td>" + "</tr>");
    }
    $("#loader").hide();
    $("#table").show();

}).fail(function (response, status) {
    alert("no connection to server.");
    $("loader").hide();
});