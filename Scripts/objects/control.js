/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(y_rotationSpeed) {
            this.y_rotationSpeed = y_rotationSpeed;
        }
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));
