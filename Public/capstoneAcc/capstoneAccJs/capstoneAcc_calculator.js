// JS codes for calculator functionality

$('.cal-btn').click(function(){
	if($(this).attr('data-role')=="number" || $(this).attr('id')=="sqrt"){
		$("#cal-display").html($("#cal-display").html() + $(this).html());
	} else {
		// Only allow input when the key is not a number while display is not empty
		// Only allow input when key is executor while display is not empty
		if($('#cal-display').html() != '' && $(this).attr('data-role')!="executor"){
			$("#cal-display").html($("#cal-display").html() + $(this).html());
		}
	}
});
$('#deleteAll').click(function(){
	$("#cal-display").html('');
})
$('#delete').click(function(){
	$('#cal-display').html($('#cal-display').html().substring(0, $('#cal-display').html().length - 1));
})
$('#compute').click(function(){
	var expression = $('#cal-display').html();
	// regex replacement for exponential calculation
	var answer = expression.replace(/\^/i,'**');
	answer = answer.replace(/√([0-9]+$)/i,'*$1**(1/2)')
	if (answer[0] == "*"){
		answer = answer.substring(1, answer.length);
	}
	$('#cal-display').html(eval(answer));
})