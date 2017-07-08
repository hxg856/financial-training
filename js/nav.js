$(function () {
    var userID = "";
    $.ajax({
        url: "http://119.29.236.25/get_myself",
        type: "GET",
        dataType: "json",
        success: function (res) {
            //console.log(res);
            userID = res.data.user.userID;
            var userName = "res.data.user.usename";
            var $name = $(" <p class='navbar-text navbar-left' style='font-size:1.2em'></p>");
            $name.text(userName);
            $("#afname").before($name);
        }
    });
    $("#exit").click(function () {
        alert("xxx");
        var data = {
            userID: userID
        };
        $.ajax({
            url: "http://119.29.236.25/exit",
            type: "POST",
            dataType: "json",
            data: data,
            success: function (res) {
                console.log(res);
            }
        })
    })

});
