// JS codes for todo list application

//Remove item upon clicking close icon
var close = document.getElementsByClassName("close");
var k;
for(k = 0; k < close.length; k++){
	close[k].onclick = function(){
		var div = this.parentElement;
		div.remove();
	}
}

var checkable = true;
var container = $('#list-container');
container.click(function(e){
	// Toggle checked class when clicking item
	if(e.target.tagName == "LI" && checkable == true){
		e.target.classList.toggle("checked-item");
	}
	// Toggle editing name or cost when clicking corresponding buttons
	if(e.target.dataset.editablename == "true"){
		editBtnName(e.target);
	}
	if(e.target.dataset.editablecost == "true"){
		editBtnCost(e.target);
	}
});
function editBtnName(target){
	// Replace text with input field having same content
	var oldNameField = $(target).siblings(".name");
	var newNameInput = $('<input class="name-edit-mode"/>').val(oldNameField.html());
	oldNameField.replaceWith(newNameInput);
	// Prevent toggle checked class when finished editing
	checkable = false;
	// Function to replace input field with text of changed content
	var saveName = function(){
		var newNameContent = $('<span/>').text(newNameInput.val());
		newNameContent.addClass('name');
		newNameInput.replaceWith(newNameContent);
		setTimeout(function(){
			checkable = true}, 1500);
	}
	// Call function upon blurring
	newNameInput.on('blur', saveName).focus();
}
function editBtnCost(target){
	// Replace text with input field having same content and remove dollar sign
	var oldCostField = $(target).siblings(".cost");
	var newCostInput = $('<input type="number" class="cost-edit-mode"/>').val(oldCostField.html().substring(1));
	oldCostField.replaceWith(newCostInput);
	// Prevent toggle checked class when finished editing
	checkable = false;
	// Function to replace input field with text of changed content plus dollar sign
	var saveCost = function(){
		var newCostContent = $('<span/>').text(`$${newCostInput.val()}`);
		newCostContent.addClass('cost');
		newCostInput.replaceWith(newCostContent);
		calculateBudget();
		setTimeout(function(){
			checkable = true}, 1500);
	}
	// Call function upon blurring
	newCostInput.on('blur', saveCost).focus();
}
function newElement(){
	var li = document.createElement("LI");
	// Creating text node
	var nameInput = document.getElementById("list-input").value;
	var nameValue = document.createTextNode(nameInput);
	var costInput = document.getElementById("cost-input").value;
	var costValue = document.createTextNode(`$${costInput}`);
	var editName = document.createTextNode(`Edit Name`);
	var editCost = document.createTextNode(`Edit Cost`);
	var sign = document.createTextNode("\u00D7");
	// Creating element for text nodes to append
	var name = document.createElement("SPAN");
	var cost = document.createElement("SPAN");
  	var editBtnName = document.createElement("SPAN");
  	var editBtnCost = document.createElement("SPAN");
  	var del = document.createElement("SPAN");
  	// Assign class to elements
  	name.className = "name";
  	cost.className = "cost";
  	editBtnName.className = "edit-name";
  	editBtnCost.className = "edit-cost";
  	del.className = "close";
  	// Append text nodes to elements
  	name.appendChild(nameValue);
  	cost.appendChild(costValue);
  	editBtnName.appendChild(editName);
  	editBtnCost.appendChild(editCost);
  	del.appendChild(sign);
  	// Set attribute for editing element
  	editBtnName.setAttribute("data-editableName", "true");
  	editBtnCost.setAttribute("data-editableCost", "true");
  	// Append all element to new parent todo-list item
  	li.appendChild(name);
  	li.appendChild(cost);
  	li.appendChild(editBtnName);
  	li.appendChild(editBtnCost);
  	li.appendChild(del);
  	// Reject adding item on failure condition
  	if(nameInput === '' || costValue === ''){
		alert("The input fields cannot be empty");
	} else {
		document.getElementById("list-container").appendChild(li);
	}
  	for (i = 0; i < close.length; i++) {
		$(close[i]).click(function(){
	  		var div = this.parentElement;
	  		div.remove();
	  		calculateBudget();
		})
	}	
	calculateBudget();
	$('#cost-input').val('');
	$('#list-input').val('');
}

// Function to update budget display
function calculateBudget(){
	var totalBudget = 0;
	var costItems = document.getElementsByClassName("cost");
	for(let y = 0; y < costItems.length; y++){
		totalBudget += Number($($('#list-container > li')[y]).find('.cost').html().substring(1))
	}
	$('#budget').html(`Your current budget needed for this arragement: $${totalBudget}`);	
}


