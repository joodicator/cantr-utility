function el (id) { return document.getElementById(id) }

function val (id) { return +el(id).value }

function update (form, days, hours, minutes, seconds) {
    el(form + "-days").value = days.toString();
    el(form + "-hours").value = hours.toString();
    el(form + "-minutes").value = minutes.toString();
    el(form + "-seconds").value = seconds.toString().replace(/(\.\d{2}).*$/, "$1");
}

window.onload = function () {
    el("earth-convert").onclick = function () {
        var sum = val("earth-seconds") / 5
                + val("earth-minutes") * 12
                + val("earth-hours") * 720
                + val("earth-days") * 17280;
        if (isNaN(sum)) return;
        var seconds = sum % 60;
        var minutes = (sum = (sum - seconds) / 60) % 36;
        var hours = (sum = (sum - minutes) / 36) % 8;
        var days = (sum - hours) / 8;
        update("cantr", days, hours, minutes, seconds);
    };
    el("cantr-convert").onclick = function () {
        var sum = val("cantr-seconds") * 5
                + val("cantr-minutes") * 300
                + val("cantr-hours") * 10800
                + val("cantr-days") * 86400;
        if (isNaN(sum)) return;
        var seconds = sum % 60;
        var minutes = (sum = (sum - seconds) / 60) % 60;
        var hours = (sum = (sum - minutes) / 60) % 24;
        var days = (sum - hours) / 24;
        update("earth", days, hours, minutes, seconds);
    };
};