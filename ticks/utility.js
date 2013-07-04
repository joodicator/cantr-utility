var utility = new function () {
    this.last = function (list) {
        return list[list.length - 1];
    };
    this.scan = function (list, func, fail) {
        for (var n = 0; n < list.length; n++) {
            var result = func(list[n]);
            if (typeof result != "undefined") return result;
        } if (arguments.length > 2) return fail(list);
    }; 
    this.removeNode = function (node) {
        node.parentNode.removeChild(node);
    };
    this.setText = function (node, text) {
        if ("textContent" in node) node.textContent = text;
        else if ("innerText" in node) node.innerText = text;
        else if ("innerHTML" in node) node.innerHTML = text;
    }
};

Array.prototype.map = Array.prototype.map || function (func) {
    array = [];
    utility.scan(this, function (item) { array.push(func(item)); });
    return array;
};