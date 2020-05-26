function btn_un() {
    $.ajax({
        type: "POST",
        url: "/",
        data: {
            action: "unlock",
        },
        success: function (data, status) {
            $("#response_text").html(data.response);
        },
        dataType: 'json'
    });
}
function btn_to() {
    $.ajax({
        type: "POST",
        url: "/",
        data: {
            action: "toggle",
        },
        success: function (data, status) {
            $("#response_text").html(data.response);
        },
        dataType: 'json'
    });
}
