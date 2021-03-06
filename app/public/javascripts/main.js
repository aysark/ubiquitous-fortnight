$(document).ready(function() {
  var oldtext =""
  var originalArticleText = "";


      $('#emailMessage').keyup(function(){

         var text = $('#emailMessage').val();
         if(oldtext.length+ 20<text.length){

                oldtext = text;
                var readabilityGrade = calculateReadability(text);
                $('#readabilityGrade').removeClass();
                if (readabilityGrade <= 6) {
                  $('#readabilityGrade').addClass("ui green circular label");
                } else if (readabilityGrade > 6 && readabilityGrade <= 9) {
                  $('#readabilityGrade').addClass("ui olive circular label");
                } else if (readabilityGrade > 9 && readabilityGrade <= 11) {
                  $('#readabilityGrade').addClass("ui yellow circular label");
                } else if (readabilityGrade > 11 && readabilityGrade <= 13) {
                  $('#readabilityGrade').addClass("ui orange circular label");
                } else {
                  $('#readabilityGrade').addClass("ui red circular label");
                }
                $('#readabilityGrade').text(readabilityGrade);

                $.get("readingTime?text="+text, function(data){
                  var seconds = Math.round(data.minutes * 60);

                  $('#readingTime').removeClass();
                  if (seconds <= 120) {
                    $('#readingTime').addClass("ui green circular label");
                  } else if (seconds > 120 && seconds <= 240) {
                    $('#readingTime').addClass("ui olive circular label");
                  } else if (seconds > 240 && seconds <= 300) {
                    $('#readingTime').addClass("ui yellow circular label");
                  } else if (seconds > 300 && seconds <= 420) {
                    $('#readingTime').addClass("ui orange circular label");
                  } else {
                    $('#readingTime').addClass("ui red circular label");
                  }
                  $('#readingTime').text(seconds + "s");
                });


                if(text.split(' ').length>350 && text.split(' ').length <500){
                    $('#wordCount').removeClass();
                    $('#wordCount').addClass("ui green circular label");
                }
                else{
                    $('#wordCount').removeClass();
                    $('#wordCount').addClass("ui red circular label");
                }
                $('#wordCount').text(text.split(' ').length);


                // $.get("clarityAnalysis?text="+text, function(data){
                //         $('#clarity').text(Math.floor(data.clarity));
                //       });

                // $.get("toneAnalysis?text="+text, function(data){
                //         $('#toneAnalysis').text(Math.floor(data.agreeableness_big5*10));
                // });

                $.post("smartTips", {"input":"content", "text":text},
                  function(data) {
                    if (data.success) {
                      var color_map = {"tip1":"#ADF0FF", "tip2":"#FFFF00"};
                      
                      var words_a = [];
                      for (var i=0; i<data.results.length; i++) {
                        words_a.push({color: color_map[data.results[i]["type"]],
                            words: [data.results[i]["annotate"]]});

                        if (data.results[i]["type"] === "tip1") {
                          $('.smartSentences').append("<div class='ui segment left aligned blue'><h5>"+data.results[i]["heading"]+"</h5><p>"+data.results[i]["description"]+"</p<</div>");
                        } else if (data.results[i]["type"] === "tip2") {
                          $('.smartSentences').append("<div class='ui segment left aligned yellow'><h5>"+data.results[i]["heading"]+"</h5><p>"+data.results[i]["description"]+"</p<</div>");
                        }
                      }

                      $('.highlightTextarea-highlighter').empty();

                      $('#emailMessage').highlightTextarea({
                          words: words_a,
                          caseSensitive: false
                      });
                    } else {
                      console.error(data);
                    }
                });

                $.post("similarArticlesSentiment", {"input":"content", "text":text}, function(data) {
                  if (data.success) {
                    if (data.results["type"] === "tip3-positive") {
                      $('.smartSentences').append("<div class='ui segment left aligned green'><h5>"+data.results["heading"]+"</h5><p>"+data.results["description"]+"</p<</div>");
                    } else if (data.results["type"] === "tip3-negative") {
                      $('.smartSentences').append("<div class='ui segment left aligned red'><h5>"+data.results["heading"]+"</h5><p>"+data.results["description"]+"</p<</div>");
                    }
                  } else {
                    console.error(data);
                  }
                });

                }
      });


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