(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Const = {};

Const.WHITE_KEYS = ["C", "D", "E", "F", "G", "A", "B"];
Const.BLACK_KEYS_SHARP = ["C#", "D#", "F#", "G#", "A#"];
Const.BLACK_KEYS_FLAT = ["Db", "Eb", "Gb", "Ab", "Bb"];

Const.KEYBORDS = [Const.WHITE_KEYS[0], Const.BLACK_KEYS_SHARP[0], Const.WHITE_KEYS[1], Const.BLACK_KEYS_SHARP[1], Const.WHITE_KEYS[2], Const.WHITE_KEYS[3], Const.BLACK_KEYS_SHARP[2], Const.WHITE_KEYS[4], Const.BLACK_KEYS_SHARP[3], Const.WHITE_KEYS[5], Const.BLACK_KEYS_SHARP[4], Const.WHITE_KEYS[6]];

Const.DEGREE_HALFTONE_COUNT = {
    1: 0,
    2: 2,
    3: 4,
    4: 5,
    5: 7,
    6: 9,
    7: 11
};

Const.CHORD_OPTIONS = ["MINOR", "SUS2", "SUS4", "OMIT", "FLAT5", "AUGMENT", "7th", "MAJOR7", "ADD"];

module.exports = Const;

},{}],2:[function(require,module,exports){
"use strict";

var Key = require("./key");

$(document).ready(function () {
    $("li").click(function () {
        var li = $(this);
        var isRemove = li.parent().hasClass("sharpFlat") && li.hasClass("selected");
        li.siblings("li").removeClass("selected");
        if (isRemove) {
            li.removeClass("selected");
        } else {
            li.addClass("selected");
        }
        var selected = "";
        $("li.selected").each(function () {
            selected += $(this).text();
        });
        var key = new Key();
        var tds = $(".result td");
        var result = key.setKeyDegree(selected.replace("♭", "b"), $("input").val());
        $(".result th").each(function (idx) {
            var result = key.setKeyDegree(selected.replace("♭", "b"), idx + 1);
            tds.eq(idx).text(result.key.replace("b", "♭"));
        });
    });
    $("#calcButton").click(function () {
        var selected = "";
        $("li.selected").each(function () {
            selected += $(this).text();
        });
        var key = new Key();
        var result = key.setKeyDegree(selected.replace("♭", "b"), $("input").val());
        var va = "";
        if (1 <= result.octaves) {
            va = 8 * result.octaves + "va";
        } else if (result.octaves <= -1) {
            va = 8 * result.octaves + "va bassa";
        }
        $(".resultKey").text(result.key.replace("b", "♭") + va);
    });
});

},{"./key":3}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Const = require("./const");

var Key = function () {
    function Key(key, octaves) {
        _classCallCheck(this, Key);

        this.key = key || Const.WHITE_KEYS.C;
        this.octaves = octaves || 0;
    }

    _createClass(Key, [{
        key: "convertFlatToSharp",
        value: function convertFlatToSharp(flatKey) {
            var index = Const.BLACK_KEYS_FLAT.indexOf(flatKey);
            if (index == -1) {
                return null;
            }
            return Const.BLACK_KEYS_SHARP[index];
        }
    }, {
        key: "setKeyDegree",
        value: function setKeyDegree(rootKey, degree) {
            var sharp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var flat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            var sharpkey = this.convertFlatToSharp(rootKey);
            rootKey = sharpkey || rootKey;

            var octaves = 0;
            var octaveDegree = 8;
            if (flat === true && sharp === true) {
                flat = false;
                sharp = false;
            }
            if (flat === true) {
                degree--;
                sharp = true;
                flat = false;
            }
            while (octaveDegree <= degree) {
                octaves++;
                degree = degree - (octaveDegree - 1);
            }
            var distance = Const.DEGREE_HALFTONE_COUNT[degree.toString()];

            var keybords = Const.KEYBORDS;
            var rootIdx = keybords.indexOf(rootKey);
            if (sharp) {
                rootIdx = rootIdx + 1;
            } else if (flat) {
                rootIdx = rootIdx - 1;
            }
            if (1 <= rootIdx) {
                keybords = keybords.slice(rootIdx).concat(keybords.slice(0, rootIdx));
            }

            return {
                "octaves": octaves,
                "key": keybords[distance],
                "distance": distance
            };
        }
    }]);

    return Key;
}();

module.exports = Key;

},{"./const":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvY29uc3QuanMiLCJqcy9zcmMvaW5kZXguanMiLCJqcy9zcmMva2V5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBTSxRQUFRLEVBQWQ7O0FBR0EsTUFBTSxVQUFOLEdBQW1CLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixFQUF5QixHQUF6QixDQUFuQjtBQUNBLE1BQU0sZ0JBQU4sR0FBeUIsQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsRUFBZ0IsSUFBaEIsRUFBcUIsSUFBckIsQ0FBekI7QUFDQSxNQUFNLGVBQU4sR0FBd0IsQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsRUFBZ0IsSUFBaEIsRUFBcUIsSUFBckIsQ0FBeEI7O0FBR0EsTUFBTSxRQUFOLEdBQWlCLENBQ2IsTUFBTSxVQUFOLENBQWlCLENBQWpCLENBRGEsRUFFYixNQUFNLGdCQUFOLENBQXVCLENBQXZCLENBRmEsRUFHYixNQUFNLFVBQU4sQ0FBaUIsQ0FBakIsQ0FIYSxFQUliLE1BQU0sZ0JBQU4sQ0FBdUIsQ0FBdkIsQ0FKYSxFQUtiLE1BQU0sVUFBTixDQUFpQixDQUFqQixDQUxhLEVBTWIsTUFBTSxVQUFOLENBQWlCLENBQWpCLENBTmEsRUFPYixNQUFNLGdCQUFOLENBQXVCLENBQXZCLENBUGEsRUFRYixNQUFNLFVBQU4sQ0FBaUIsQ0FBakIsQ0FSYSxFQVNiLE1BQU0sZ0JBQU4sQ0FBdUIsQ0FBdkIsQ0FUYSxFQVViLE1BQU0sVUFBTixDQUFpQixDQUFqQixDQVZhLEVBV2IsTUFBTSxnQkFBTixDQUF1QixDQUF2QixDQVhhLEVBWWIsTUFBTSxVQUFOLENBQWlCLENBQWpCLENBWmEsQ0FBakI7O0FBZUEsTUFBTSxxQkFBTixHQUE4QjtBQUMxQixPQUFFLENBRHdCO0FBRTFC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O0FBQ0g7QUFDRCxnQkFBRyxLQUFLLE9BQVIsRUFBZ0I7QUFDWiwyQkFBVyxTQUFTLEtBQVQsQ0FBZSxPQUFmLEVBQXdCLE1BQXhCLENBQStCLFNBQVMsS0FBVCxDQUFlLENBQWYsRUFBa0IsT0FBbEIsQ0FBL0IsQ0FBWDtBQUNIOztBQUVELG1CQUFPO0FBQ0gsMkJBQVksT0FEVDtBQUVILHVCQUFRLFNBQVMsUUFBVCxDQUZMO0FBR0gsNEJBQVc7QUFIUixhQUFQO0FBS0g7Ozs7OztBQUlMLE9BQU8sT0FBUCxHQUFpQixHQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIlxuXG5jb25zdCBDb25zdCA9IHsgICAgXG59XG5cbkNvbnN0LldISVRFX0tFWVMgPSBbXCJDXCIsXCJEXCIsXCJFXCIsXCJGXCIsXCJHXCIsXCJBXCIsXCJCXCJdXG5Db25zdC5CTEFDS19LRVlTX1NIQVJQID0gW1wiQyNcIixcIkQjXCIsXCJGI1wiLFwiRyNcIixcIkEjXCJdXG5Db25zdC5CTEFDS19LRVlTX0ZMQVQgPSBbXCJEYlwiLFwiRWJcIixcIkdiXCIsXCJBYlwiLFwiQmJcIl1cblxuXG5Db25zdC5LRVlCT1JEUyA9IFtcbiAgICBDb25zdC5XSElURV9LRVlTWzBdLFxuICAgIENvbnN0LkJMQUNLX0tFWVNfU0hBUlBbMF0sXG4gICAgQ29uc3QuV0hJVEVfS0VZU1sxXSxcbiAgICBDb25zdC5CTEFDS19LRVlTX1NIQVJQWzFdLFxuICAgIENvbnN0LldISVRFX0tFWVNbMl0sXG4gICAgQ29uc3QuV0hJVEVfS0VZU1szXSxcbiAgICBDb25zdC5CTEFDS19LRVlTX1NIQVJQWzJdLFxuICAgIENvbnN0LldISVRFX0tFWVNbNF0sXG4gICAgQ29uc3QuQkxBQ0tfS0VZU19TSEFSUFszXSxcbiAgICBDb25zdC5XSElURV9LRVlTWzVdLFxuICAgIENvbnN0LkJMQUNLX0tFWVNfU0hBUlBbNF0sXG4gICAgQ29uc3QuV0hJVEVfS0VZU1s2XVxuXVxuXG5Db25zdC5ERUdSRUVfSEFMRlRPTkVfQ09VTlQgPSB7XG4gICAgMTowLFxuICAgIDI6MixcbiAgICAzOjQsXG4gICAgNDo1LFxuICAgIDU6NyxcbiAgICA2OjksXG4gICAgNzoxMVxufVxuXG5Db25zdC5DSE9SRF9PUFRJT05TID0gW1xuICAgICAgICBcIk1JTk9SXCIsXG4gICAgICAgIFwiU1VTMlwiLFxuICAgICAgICBcIlNVUzRcIixcbiAgICAgICAgXCJPTUlUXCIsXG4gICAgICAgIFwiRkxBVDVcIixcbiAgICAgICAgXCJBVUdNRU5UXCIsXG4gICAgICAgIFwiN3RoXCIsXG4gICAgICAgIFwiTUFKT1I3XCIsXG4gICAgICAgIFwiQUREXCJcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBDb25zdDsiLCJcInVzZSBzdHJpY3RcIlxuXG5jb25zdCBLZXkgPSByZXF1aXJlKFwiLi9rZXlcIilcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJChcImxpXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBsaSA9ICQodGhpcyk7XG4gICAgICAgIGNvbnN0IGlzUmVtb3ZlID0gbGkucGFyZW50KCkuaGFzQ2xhc3MoXCJzaGFycEZsYXRcIikgJiYgbGkuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbGkuc2libGluZ3MoXCJsaVwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBpZihpc1JlbW92ZSl7XG4gICAgICAgICAgICBsaS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxpLmFkZENsYXNzKFwic2VsZWN0ZWRcIilcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSBcIlwiO1xuICAgICAgICAkKFwibGkuc2VsZWN0ZWRcIikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZWN0ZWQgKz0gJCh0aGlzKS50ZXh0KClcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBrZXkgPSBuZXcgS2V5KCk7XG4gICAgICAgIGxldCB0ZHMgPSAkKFwiLnJlc3VsdCB0ZFwiKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ga2V5LnNldEtleURlZ3JlZShzZWxlY3RlZC5yZXBsYWNlKFwi4pmtXCIsXCJiXCIpLCAkKFwiaW5wdXRcIikudmFsKCkpO1xuICAgICAgICAkKFwiLnJlc3VsdCB0aFwiKS5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBrZXkuc2V0S2V5RGVncmVlKHNlbGVjdGVkLnJlcGxhY2UoXCLima1cIixcImJcIiksIGlkeCArIDEpO1xuICAgICAgICAgICAgdGRzLmVxKGlkeCkudGV4dChyZXN1bHQua2V5LnJlcGxhY2UoXCJiXCIsXCLima1cIikpO1xuICAgICAgICB9KVxuICAgIH0pO1xuICAgICQoXCIjY2FsY0J1dHRvblwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSBcIlwiO1xuICAgICAgICAkKFwibGkuc2VsZWN0ZWRcIikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZWN0ZWQgKz0gJCh0aGlzKS50ZXh0KClcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBrZXkgPSBuZXcgS2V5KCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGtleS5zZXRLZXlEZWdyZWUoc2VsZWN0ZWQucmVwbGFjZShcIuKZrVwiLFwiYlwiKSwgJChcImlucHV0XCIpLnZhbCgpKTtcbiAgICAgICAgbGV0IHZhID0gXCJcIjtcbiAgICAgICAgaWYoMSA8PSByZXN1bHQub2N0YXZlcyl7XG4gICAgICAgICAgICB2YSA9IDggKiByZXN1bHQub2N0YXZlcyArIFwidmFcIjtcbiAgICAgICAgfSBlbHNlIGlmKHJlc3VsdC5vY3RhdmVzIDw9IC0xKXtcbiAgICAgICAgICAgIHZhID0gOCAqIHJlc3VsdC5vY3RhdmVzICsgXCJ2YSBiYXNzYVwiO1xuICAgICAgICB9XG4gICAgICAgICQoXCIucmVzdWx0S2V5XCIpLnRleHQoXG4gICAgICAgICAgICByZXN1bHQua2V5LnJlcGxhY2UoXCJiXCIsXCLima1cIikgKyB2YVxuICAgICAgICApXG4gICAgICAgIFxuICAgIH0pO1xufSlcbiIsIlwidXNlIHN0cmljdFwiXG5cbmNvbnN0IENvbnN0ID0gcmVxdWlyZShcIi4vY29uc3RcIik7XG5cbmNsYXNzIEtleSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCBvY3RhdmVzKSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5IHx8IENvbnN0LldISVRFX0tFWVMuQztcbiAgICAgICAgdGhpcy5vY3RhdmVzID0gb2N0YXZlcyB8fCAwO1xuICAgIH1cblxuICAgIGNvbnZlcnRGbGF0VG9TaGFycChmbGF0S2V5KXtcbiAgICAgICAgY29uc3QgaW5kZXggPSBDb25zdC5CTEFDS19LRVlTX0ZMQVQuaW5kZXhPZihmbGF0S2V5KTtcbiAgICAgICAgaWYoaW5kZXggPT0gLTEpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENvbnN0LkJMQUNLX0tFWVNfU0hBUlBbaW5kZXhdO1xuICAgIH1cblxuICAgIHNldEtleURlZ3JlZShyb290S2V5LCBkZWdyZWUsIHNoYXJwID1mYWxzZSwgZmxhdCA9IGZhbHNlKXtcbiAgICAgICAgdmFyIHNoYXJwa2V5ID0gdGhpcy5jb252ZXJ0RmxhdFRvU2hhcnAocm9vdEtleSk7XG4gICAgICAgIHJvb3RLZXkgPSBzaGFycGtleSB8fCByb290S2V5O1xuXG4gICAgICAgIGxldCBvY3RhdmVzID0gMDtcbiAgICAgICAgY29uc3Qgb2N0YXZlRGVncmVlID0gODtcbiAgICAgICAgaWYoZmxhdCA9PT0gdHJ1ZSAmJiBzaGFycCA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICBmbGF0ID0gZmFsc2U7XG4gICAgICAgICAgICBzaGFycCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGZsYXQgPT09IHRydWUpe1xuICAgICAgICAgICAgZGVncmVlLS07XG4gICAgICAgICAgICBzaGFycCA9IHRydWU7XG4gICAgICAgICAgICBmbGF0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKCBvY3RhdmVEZWdyZWUgPD0gZGVncmVlKXtcbiAgICAgICAgICAgIG9jdGF2ZXMrKztcbiAgICAgICAgICAgIGRlZ3JlZSA9IGRlZ3JlZSAtIChvY3RhdmVEZWdyZWUgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IENvbnN0LkRFR1JFRV9IQUxGVE9ORV9DT1VOVFtkZWdyZWUudG9TdHJpbmcoKV07XG5cbiAgICAgICAgbGV0IGtleWJvcmRzID0gQ29uc3QuS0VZQk9SRFM7XG4gICAgICAgIGxldCByb290SWR4ID0ga2V5Ym9yZHMuaW5kZXhPZihyb290S2V5KTtcbiAgICAgICAgaWYoc2hhcnApe1xuICAgICAgICAgICAgcm9vdElkeCA9IHJvb3RJZHggKyAxO1xuICAgICAgICB9IGVsc2UgaWYoZmxhdCl7XG4gICAgICAgICAgICByb290SWR4ID0gcm9vdElkeCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMSA8PSByb290SWR4KXtcbiAgICAgICAgICAgIGtleWJvcmRzID0ga2V5Ym9yZHMuc2xpY2Uocm9vdElkeCkuY29uY2F0KGtleWJvcmRzLnNsaWNlKDAsIHJvb3RJZHgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcIm9jdGF2ZXNcIiA6IG9jdGF2ZXMsXG4gICAgICAgICAgICBcImtleVwiIDoga2V5Ym9yZHNbZGlzdGFuY2VdLFxuICAgICAgICAgICAgXCJkaXN0YW5jZVwiOmRpc3RhbmNlXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBLZXk7XG5cbiJdfQ==
