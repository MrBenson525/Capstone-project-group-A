// The code below specified the calling endpoint and search value for countries API and currency API depending the input field used by the user in supportApi section

// Global variables to bind values received from API server for chaining deferred to use
var countryLat = null;
var countryLng = null;
var currency = null;
var currencyCode = null;
var exchange = null;

// This section specified emptying the other input field when user is typing on one input field to avoid conflicting search endpoints
$('#countryInput').keypress(function(e){
	if($('#countryInput').val().length > 0){
		$('#capitalInput').val('');
	}		
})
$('#capitalInput').keypress(function(e){
	if($('#capitalInput').val().length > 0){
		$('#countryInput').val('');
	}		
})

// Upon submitting the form, define a function to make correct API calls with correct endpoints and value
// The arguments fed into the function depends on the input field used
$('#searchForm').submit(function(e){
	e.preventDefault();
	// User will search by name of country or capital name
	// The function will make 3 deferred objects, the first to call countries API for getting the latitude, longitude and currency information of search location
	// The second deferred to make a live timing clock and displaying the currency detected as well as expanding the height of the section, afterwards calling the currency API
	// The third deferred use the response object to get the current exchange rate for HKD and the target country currency, and display the exchange rate after calculation
	function searchRouter(endpoint, searchValue){
		$.get(`https://restcountries.eu/rest/v2/${endpoint}/${searchValue}`).then(
			function(resp){
				countryLat = resp[0]["latlng"][0];
				countryLng = resp[0]["latlng"][1];
				currencyCode = resp[0]["currencies"][0]["code"];
				currency = resp[0]["currencies"][0]["name"];
			}
		).then(
			function(){
				$('#supportApi').animate({
					height: "950px"
				}, 1000);
				$('#searchResult > #currency').html(`Your local currency detected: ${currency}`);
				setInterval(function(){
					var time = new Date();
					$('#searchResult > #hkTime').html(`Your detected current Time: ${time}
						`);						
				}, 1000);
				return $.get(`http://data.fixer.io/api/latest?access_key=ca7612cf67ba6aa58debc0460c6f3f00`)
			}
		).then(
			function(resp){
				var hkd = resp["rates"]["HKD"];
				var target = resp["rates"][currencyCode];
				var rate = hkd/target;
				$('#searchResult > #exchange').html(`Current exchange rate for HKD: 1 ${currencyCode} to ${rate.toFixed(2)} HKD. (Information provided by fixer)`)
				$('#searchResult > #userThanks').html("Thank you for using our service");	
			}
		)			
	}
	//Passing different argument to the function with different endpoint depending on the input field used for search
	if($('#countryInput').val()){
		searchRouter("name", $('#countryInput').val())
	}
	if($('#capitalInput').val()){
		searchRouter("capital", $('#capitalInput').val())
	}
});