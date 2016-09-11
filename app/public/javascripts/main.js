$(document).ready(function() {

  function calculateReadability(text) {
    var c_over_w = text.replace(/[^A-Z0-9]/gi, "").length / (text.split(' ').length - 1);
    var w_over_s = (text.split(' ').length - 1) / (text.replace(/([.?!])\s*(?=[A-Z0-9])/gi, "$1|").split("|")).length;
    // console.log("c_over_w : "+ c_over_w);
    // console.log("w_over_s : "+ w_over_s);
    var r = Math.round(4.71*c_over_w + 0.5*w_over_s - 21.43);
    if (r < 1) {
      return 1
    } else if (r > 14) {
      return 14;
    }
    return r;
  }
});
