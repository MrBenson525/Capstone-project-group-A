// JS codes for countdown timer

// Global variables to track all stats of countdown clock
var countdown = [0,0,0,0,0,0];
var milliseconds = [0,0];
var digit = 0;
var begin = false;
var duration = (countdown[0]*1 + countdown[1]*10 + countdown[2]*60 + countdown[3]*600 + countdown[4]*3600 + countdown[5]*36000)*1000;
var display = $('#display > h1');
var displayMs = $('#display > p');

// The display of timer will keep on updating in case user made any changes and the interval determine refresh rate of clock
setInterval(function(){
	display.html(`${countdown[5]}${countdown[4]}:${countdown[3]}${countdown[2]}:${countdown[1]}${countdown[0]}`);	
	displayMs.html(`${milliseconds[1]}${milliseconds[0]}`);
	duration = (countdown[0]*1 + countdown[1]*10 + countdown[2]*60 + countdown[3]*600 + countdown[4]*3600 + countdown[5]*36000)*1000;
}, 100);

var reset = $('#resetBtn');
var start = $('#startBtn');
var key0 = $('#0');
var key1 = $('#1');
var key2 = $('#2');
var key3 = $('#3');
var key4 = $('#4');
var key5 = $('#5');
var key6 = $('#6');
var key7 = $('#7');
var key8 = $('#8');
var key9 = $('#9');

// Resetting everything upon clicking reset button
reset.click(function(){
	countdown = [0,0,0,0,0,0];
	milliseconds = [0,0];
	digit = 0;
	begin = false;
	$('#display').css({"background": "rgba(0,0,0,0)", "transition": "all 0.6s ease"})
})

// Change value of clock depending on ID of key clicked
$(".key").click(function(e){
	var number = Number(e.target.id);
	if(digit < 6 && begin == false){
		for(let i = digit; i > 0; i--){
			countdown[i] = countdown[i - 1];
		}		
		countdown[0] = number;
		digit++;
	}
})

start.click(function(){
	delete future;
	duration = (countdown[0]*1 + countdown[1]*10 + countdown[2]*60 + countdown[3]*600 + countdown[4]*3600 + countdown[5]*36000)*1000;
	// resetting clock upon failure condition
	if(duration > 360060000){		
		countdown = [0,0,0,0,0,0];
		milliseconds = [0,0];
		digit = 0;
		begin = false;	
		throw new Error('Invalid input: Value too large for countdown.');
	} else if (duration == 0){
		countdown = [0,0,0,0,0,0];
		milliseconds = [0,0];
		digit = 0;
		begin = false;
		throw new Error('Invalid input: Value cannot be zero.');
	} else {

		begin = true;
		future = (new Date()).getTime() + duration;
		var checkingLoop = setInterval(timeLoop, 55);
		function timeLoop(){
			if(begin == true){
				if(remaining){
					remaining = future - (new Date()).getTime();
				} else {
					// create remaining time variable for first refresh
					var remaining = future - (new Date()).getTime();
				}
				// actions to perform when and before remaining time runs out
				if(remaining <= 0){
					clearInterval(checkingLoop);
					console.log("HI");
					countdown = [0,0,0,0,0,0];
					milliseconds = [0,0];
					digit = 0;
					begin = false;
					$('#display').css({"background": "#248238", "transition": "all 0.6s ease"});
				} else {
					countdown[5] = Math.floor(remaining / (10*60*60*1000));
					remaining -= countdown[5]*10*60*60*1000;
					countdown[4] = Math.floor(remaining / (60*60*1000));
					remaining -= countdown[4]*60*60*1000;
					countdown[3] = Math.floor(remaining / (10*60*1000));
					remaining -= countdown[3]*10*60*1000;
					countdown[2] = Math.floor(remaining / (60*1000));
					remaining -= countdown[2]*60*1000;
					countdown[1] = Math.floor(remaining / (10*1000));
					remaining -= countdown[1]*10*1000;
					countdown[0] = Math.floor(remaining / 1000);
					remaining -= countdown[0]*1000;
					milliseconds[1] = Math.floor(remaining / 100);
					remaining -= milliseconds[1]*100;
					milliseconds[0] = Math.floor(remaining / 10); 		
				}
			}
		}
	}
})
