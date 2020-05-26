$(document).ready(function(){
    let slider1 = document.getElementById("r1");
    let slider2 = document.getElementById("r2");
    let slider3 = document.getElementById("r3");

    slider1.onchange = function() {
        document.body.style.backgroundColor = getCurrentColour();
        postFun(1);
    };

    slider2.onchange = function() {
        document.body.style.backgroundColor = getCurrentColour();
        postFun(1);
    };

    slider3.onchange = function() {
        document.body.style.backgroundColor = getCurrentColour();
        postFun(1);
    };

    function getCurrentColour() {
        return "rgb(" + slider1.value + "," + slider2.value + "," + slider3.value +")";
    }

    function dec2hex(col1, col2, col3) {
        let hex = "#";
        if ((parseInt(col1)).toString(16).length === 1) {
            hex += "0" + (parseInt(col1)).toString(16);
        } else {
            hex += (parseInt(col1)).toString(16);
        }
        if ((parseInt(col2)).toString(16).length === 1) {
            hex += "0" + (parseInt(col2)).toString(16);
        } else {
            hex += (parseInt(col2)).toString(16);
        }
        if ((parseInt(col3)).toString(16).length === 1) {
            hex += "0" + (parseInt(col3)).toString(16);
        } else {
            hex += (parseInt(col3)).toString(16);
        }

        return hex;
    }

    function postFun(type) {
        let color = dec2hex(slider1.value, slider2.value, slider3.value);
        $.post(
            "/lights",
            {
                type: type,
                color: color
            }
        );
    }

    $(".off").click(function(e){
        e.preventDefault();
        postFun(0);
        document.body.style.backgroundColor = "#000000";
        document.getElementById("r1").value = 0;
        document.getElementById("r2").value = 0;
        document.getElementById("r3").value = 0;
    });
});
