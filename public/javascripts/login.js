console.log("Ali to dela?");

var send = function() {
    console.log("Ali to dela?");

    if ($("#name").val() == "" || $("#pass").val() == "") {
        $("#r").html("Vpiši vse podatke");
    } else {
        $("$r").html("");
        $.ajax({
            url : "/log",
            type : "POST",
            data : {
                name: $("#name").val(),
                pass: $("#pass").val()
            },
            success : function(data, status, jqXHR) {
                if (data) {
                    $("#r").html("Prijava v <strong>" + $("#name").val());
                } else {
                    $("#r").html("Prijava neuspešna");
                }
            },
            error : function(data, textStatus, jqXHR) {
                console.log(data);
                alert("Napaka");
            }
        });
    }
};