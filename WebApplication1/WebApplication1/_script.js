var yapper = {};
yapper.yaps = [];
yapper.Yaps = function (message, username) {
    this.name = username;
    this.message = message;
};

yapper.ajaxPost = function () {
    "use strict"
    if (document.getElementById("message").value == "" || document.getElementById("message").value == " ") {
        var request = new XMLHttpRequest();
        request.open("POST", "https://codercamps-chatapp.firebaseio.com/.json");
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                document.getElementById("message").value = "";
                yapper.ajaxGet();
            }
            else {
                console.log("error" + this.response);
            }
        };
        request.onerror = function () {
            console.log("Server Error");
        };
        request.send(JSON.stringify(new yapper.Yaps(document.getElementById("message").value, document.getElementById("userName").value = "unknown")));
    }
    else {
        var request = new XMLHttpRequest();
        request.open("POST", "https://codercamps-chatapp.firebaseio.com/.json");
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                document.getElementById("message").value = "";
                yapper.ajaxGet();
            }
            else {
                console.log("error" + this.response);
            }
        }
        request.onerror = function () {
            console.log("server error");
        }
        request.send(JSON.stringify(new yapper.Yaps(document.getElementById("message").value, document.getElementById("userName").value)));
    }
}
yapper.ajaxGet = function () {
    "use strict"
    var request = new XMLHttpRequest();
    request.open("GET", "https://codercamps-chatapp.firebaseio.com/.json");
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            yapper.yaps = [];
            var data = (JSON.parse(this.response));
            for (var i in data) {
                yapper.yaps.push(data[i]);
            }
            yapper.yaps.reverse();
            yapper.writeYaps();
        }
        else {
            console.log("error" + this.response);
        }
    }
    request.onerror = function () {
        console.log("server error");
    }
    request.send();
}
yapper.writeYaps = function () {
    "use strict"
    var holder = "";
    for (var i in yapper.yaps) {
        holder += "<p>" + yapper.yaps[i].name + ": " + yapper.yaps[i].message + "</p><br/>";
    }
    document.getElementById("yapper").innerHTML = holder;
}
yapper.ajaxGet();
yapper.interval = setInterval(yapper.ajaxGet, 3000);