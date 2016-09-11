(function() {
    "use strict";
    var ՐՏ_Temp;

    function ՐՏ_Iterable(iterable) {
        var ՐՏ_Temp;
        if (Array.isArray(iterable) || iterable instanceof String || typeof iterable === "string") {
            return iterable
        }
        return Object.keys(iterable)
    }

    function ՐՏ_bind(fn, thisArg) {
        var ՐՏ_Temp, fn, ret;
        if (fn.orig) {
            fn = fn.orig
        }
        if (thisArg === false) {
            return fn
        }
        ret = function() {
            var ՐՏ_Temp;
            return fn.apply(thisArg, arguments)
        };
        ret.orig = fn;
        return ret
    }

    function range(start, stop, step) {
        var ՐՏ_Temp, stop, start, step, length, idx, range;
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0
        }
        step = arguments[2] || 1;
        length = Math.max(Math.ceil((stop - start) / step), 0);
        idx = 0;
        range = new Array(length);
        while (idx < length) {
            range[idx++] = start;
            start += step
        }
        return range
    }

    function len(obj) {
        var ՐՏ_Temp;
        if (typeof obj.indexOf === "function") {
            return obj.length
        }
        return Object.keys(obj).length
    }

    function eq(a, b) {
        var ՐՏ_Temp, i;
        "\n    Equality comparison that works with all data types, returns true if structure and\n    contents of first object equal to those of second object\n\n    Arguments:\n        a: first object\n        b: second object\n    ";
        if (a === b) {
            return true
        }
        if (Array.isArray(a) && Array.isArray(b) || a instanceof Object && b instanceof Object) {
            if (a.constructor !== b.constructor || a.length !== b.length) {
                return false
            }
            if (Array.isArray(a)) {
                for (i = 0; i < len(a); i++) {
                    if (!eq(a[i], b[i])) {
                        return false
                    }
                }
            } else {
                if (Object.keys(a).length !== Object.keys(b).length) {
                    return false
                }
                var ՐՏ_Iter0 = ՐՏ_Iterable(a);
                for (var ՐՏ_Index0 = 0; ՐՏ_Index0 < ՐՏ_Iter0.length; ՐՏ_Index0++) {
                    i = ՐՏ_Iter0[ՐՏ_Index0];
                    if (!eq(a[i], b[i])) {
                        return false
                    }
                }
            }
            return true
        }
        return false
    }

    function ՐՏ_in(val, arr) {
        var ՐՏ_Temp;
        if (typeof arr.indexOf === "function") {
            return arr.indexOf(val) !== -1
        }
        return arr.hasOwnProperty(val)
    }

    function dir(item) {
        var ՐՏ_Temp, arr;
        arr = [];
        for (var i in item) {
            arr.push(i)
        }
        return arr
    }

    function ՐՏ_extends(child, parent) {
        var ՐՏ_Temp;
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child
    }(function() {
        var __name__ = "__main__";

        function longest_common_substring(s1, s2) {
            var ՐՏ_Temp, m, i, x_longest, longest, x, y;
            m = (function() {
                var ՐՏ_Iter = ՐՏ_Iterable(xrange(1 + len(s1))),
                    ՐՏ_Result = [],
                    i;
                for (var ՐՏ_Index = 0; ՐՏ_Index < ՐՏ_Iter.length; ՐՏ_Index++) {
                    i = ՐՏ_Iter[ՐՏ_Index];
                    ՐՏ_Result.push([0] * (1 + len(s2)))
                }
                return ՐՏ_Result
            })();
            var ՐՏ_Unpack1 = [0, 0];
            longest = ՐՏ_Unpack1[0];
            x_longest = ՐՏ_Unpack1[1];
            var ՐՏ_Iter2 = ՐՏ_Iterable(xrange(1, 1 + len(s1)));
            for (var ՐՏ_Index2 = 0; ՐՏ_Index2 < ՐՏ_Iter2.length; ՐՏ_Index2++) {
                x = ՐՏ_Iter2[ՐՏ_Index2];
                var ՐՏ_Iter3 = ՐՏ_Iterable(xrange(1, 1 + len(s2)));
                for (var ՐՏ_Index3 = 0; ՐՏ_Index3 < ՐՏ_Iter3.length; ՐՏ_Index3++) {
                    y = ՐՏ_Iter3[ՐՏ_Index3];
                    if (s1[x - 1] === s2[y - 1]) {
                        m[x][y] = m[x - 1][y - 1] + 1;
                        if (m[x][y] > longest) {
                            longest = m[x][y];
                            x_longest = x
                        }
                    } else {
                        m[x][y] = 0
                    }
                }
            }
            return s1.slice(x_longest - longest, x_longest)
        }

        function longest_common_sentence(s1, s2) {
            var ՐՏ_Temp, s1_words, s2_words;
            s1_words = s1.split(" ");
            s2_words = s2.split(" ");
            return " ".join(longest_common_substring(s1_words, s2_words))
        }
    })();
})();