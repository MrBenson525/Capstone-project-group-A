// The codes below specify the hiding and showing of hidden text on the intro content section upon hovering company logos, the content of hidden text will change upon hovering different logos
$('#image-wrapper > .image-wrapper-small').find('img[src="/image/spotify.png"]').hover(function(){
	$('#hiddenMessage').html("All the thanks to Spotify for making the creation of this website possible!");
	$('#hiddenMessage').animate({opacity: 1}, 300);
});
$('#image-wrapper > .image-wrapper-small').find('img[src="/image/spotify.png"]').mouseout(function(){
	$('#hiddenMessage').animate({opacity: 0}, 300);
});

$('#image-wrapper > .image-wrapper-small').find('img[src="/image/googlePlayMusic.png"]').hover(function(){
	$('#hiddenMessage').html("All the thanks to Google Play Music for making the creation of this website possible!");
	$('#hiddenMessage').animate({opacity: 1}, 300);
});
$('#image-wrapper > .image-wrapper-small').find('img[src="/image/googlePlayMusic.png"]').mouseout(function(){
	$('#hiddenMessage').animate({opacity: 0}, 300);
});

$('#image-wrapper > .image-wrapper-small').find('img[src="/image/itunes.png"]').hover(function(){
	$('#hiddenMessage').html("All the thanks to iTunes for making the creation of this website possible!");
	$('#hiddenMessage').animate({opacity: 1}, 300);
});
$('#image-wrapper > .image-wrapper-small').find('img[src="/image/itunes.png"]').mouseout(function(){
	$('#hiddenMessage').animate({opacity: 0}, 300);
});

$('#image-wrapper > .image-wrapper-small').find('img[src="/image/soundCloud.png"]').hover(function(){
	$('#hiddenMessage').html("All the thanks to Sound Cloud for making the creation of this website possible!");
	$('#hiddenMessage').animate({opacity: 1}, 300);
});
$('#image-wrapper > .image-wrapper-small').find('img[src="/image/soundCloud.png"]').mouseout(function(){
	$('#hiddenMessage').animate({opacity: 0}, 300);
})	
