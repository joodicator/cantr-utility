var CantrTicks = new function () {

    // Utility
    function localTime () { return (new Date).valueOf(); }

    var remoteError = 0;

    function remoteTime () {
        return localTime() - localOffset - remoteError;
    }

    function formatPeriod (period) {
        function pad (s) { s = String(s); while (s.length < 2) s = "0" + s; return s; }
        var period = new Date(period);
        return [pad(period.getUTCHours()), pad(period.getUTCMinutes()), pad(period.getUTCSeconds())].join(":");
    }

    // Sychronise
    var localOffset = 0;
    this.sync = function (remoteTime) { localOffset = localTime() - remoteTime; };

    // Configure
    var timers = []
    this.config = function (input) { timers = input; };

    // Initialise
    window.onload = function () {

        // Timers
        timers = timers.map(function (spec) { return new function () {
            this.id = function () { return spec.id; };
            this.info = function () { return spec.info; };
            this.next = function (now) {
                var sub = now % spec.period;
                return utility.scan(spec.times, function (then) {
                    if (then >= sub) return (now + then - sub);
                }, function (times) {
                    return (now + spec.period - sub + times[0]);
                });
            };
        } });

        // Hidden Listing
        var hidden = new function () {
            var tray = document.getElementById("show_tray");
            var show = document.getElementById("show");
            this.add = function (title, callback) {
                var row = tray.insertRow(tray.rows.length);
                var cell = row.insertCell(0);
                utility.setText(cell, title);
                cell.onclick = function () {
                    show.className = "closed";
                    utility.removeNode(row);
                    callback();
                };
            };
            show.onclick = function () {
                if ((tray.rows.length > 0) && (show.className == "closed")) {
                    window.setTimeout(function () { show.className = "open"; }, 0);
                }
            };
            document.onclick = function () {
                show.className = "closed";
            };
        };

        // Visible Listing
        var listing = new function () {
            var table = document.getElementById("main");
            function update (timer) {
                var row = document.getElementById(timer.id());
                if (row.style.display != "none") {
                    var now = remoteTime();
                    var next = timer.next(now);
                    var remain = next - now;
                    utility.setText(getElementsByClassName("next", null, row)[0],
                        (new Date(localTime() + remain)).toLocaleTimeString());
                    utility.setText(getElementsByClassName("remain", null, row)[0],
                        formatPeriod(remain));
                }
            }
            function hide (timer) {
                var row = document.getElementById(timer.id());
                row.style.display = "none";
                hidden.add(timer.info().title, function () {
                    cookies.set(timer.id() + "_hidden");
                    row.style.display = "";
                    update(timer);
                })
            }
            utility.scan(timers, function (timer) {
                var row = document.getElementById("listing-template").cloneNode(true)
                var info = timer.info(), id = timer.id();
                utility.setText(getElementsByClassName("title", null, row)[0], info.title || "");
                utility.setText(getElementsByClassName("period", null, row)[0], info.period || "");
                if ("extra" in info) {
                    utility.setText(getElementsByClassName("tip_content", null, row)[0], info.extra);
                    getElementsByClassName("tip_control", null, row)[0].style.display = "";
                }
                utility.last(table.tBodies).appendChild(row);
                row.id = id;
                getElementsByClassName("hide", null, row)[0].onclick = function () {
                    cookies.set(id + "_hidden", true);
                    hide(timer);
                };
                if (cookies.get(id + "_hidden", false)) {
                    hide(timer);
                } else {
                    row.style.display = "";
                    update(timer);
                }
            });

            function updateAll() {
                var current_time = document.getElementById("current_time");
                if (current_time) {
                    var now = new Date(remoteTime()).toLocaleTimeString();
                    utility.setText(current_time, "Current time: " + now);
                }
                utility.scan(timers, update);
            }
            updateAll();
            window.setInterval(updateAll, 1000);
        };
    };
};
