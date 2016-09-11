$(function() {
  var $context = $(".context");
  var $form = $("form");
  var $button = $form.find("button[name='perform']");
  var $input1 = $form.find("input[name='keyword1']");
  var $input2 = $form.find("input[name='keyword2']");
  var $input3 = $form.find("input[name='keyword3']");
  var $input4 = $form.find("input[name='keyword4']");
  var $input5 = $form.find("input[name='keyword5']");


  $button.on("click.perform", function() {

    // Determine search term
    var searchTerm = $input.val();

    // Remove old highlights and highlight
    // new search term afterwards
    $context.removeHighlight();
    $context.highlight(searchTerm);

  });
  $button.trigger("click.perform");
});
