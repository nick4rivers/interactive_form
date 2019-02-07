/* jshint esversion: 6 */

// start by setting focus to the name input
$('#name').focus();

// ---------------- JOB ROLE SECTION----------------------
// hide it on page load
$('#other-title').hide();

$('#title').on('change', function() {
  if ($(this).val() === 'other') {
    $('#other-title').fadeIn(500);
  }
});


// ---------------- T-SHIRT INFO SECTION ----------------------

// get a shirt colors collection
const shirtColors = $('#color option');


// get the value of the design text box
$('#design').on('change', function() {
  shirtColors.show();
  if ($(this).val() === 'js puns') {
    shirtColors.slice(3, 6).hide();
    $('#color').val('cornflowerblue');
  } else if ($(this).val() === 'heart js') {
    shirtColors.slice(0, 3).hide();
    $('#color').val('tomato');
  }
});


// ---------------- REGISTER FOR ACTIVITIES ----------------------
// start by getting a collection of all checkbox inputs
const checkBoxes = $('input[type=checkbox]');


// disable function
const disableCheckbox = function(boxNum){
  checkBoxes.eq(boxNum).prop('disabled', true);
  checkBoxes.eq(boxNum).parent().addClass('disable-checkbox');
};

// enable function
const enableCheckbox = function(boxNum){
  checkBoxes.eq(boxNum).prop('disabled', false);
  checkBoxes.eq(boxNum).parent().removeClass('disable-checkbox');
};

// dependent set status function
const setCheckboxes = function(check, conflict) {
  checkBoxes.eq(check).on('click', function() {
    if ($(this).prop('checked')) {
      disableCheckbox(conflict);
    } else {
      enableCheckbox(conflict);
    }
  });
};

// check conflicts and disable as needed
setCheckboxes(1, 3);
setCheckboxes(3, 1);
setCheckboxes(2, 4);
setCheckboxes(4, 2);


// Get my total cost
let totalCost = 0;

const getCost = function() {
  const workshopBoxes = checkBoxes.slice(1, 8);
  let costCounter = 0;
  workshopBoxes.each(function(index, item){
    if (workshopBoxes.eq(index).prop('checked')) {
      costCounter += 1;
    }
  });
  totalCost = 100 * costCounter;
  if (checkBoxes.eq(0).prop('checked')) {
    totalCost += 200;
  }
  console.log("You got -> $" + totalCost);
};

// listen for clicks, calculate and add the total
$('.activities').on('click', function() {
  getCost();
  $('p').remove('.total-cost');
  $('.activities').append('<p class="total-cost">Total registration cost $' + totalCost + '</p>');
});


// ---------------- PAYMENT SECTION ----------------------

// a simple hide payment function, with arrow syntax!
const hidePayment = () => {
  $('#paypal').hide();
  $('#bitcoin').hide();
  $('#credit-card').hide();
};

// set credit card as default, make sure it's showing
$('#payment').val('credit card');
$('#credit-card').show();

// set my listener, show payment information based on selection
$('#payment').on('change', function() {
  if ($(this).val() === 'paypal') {
    hidePayment();
    $('#paypal').show();
  } else if ($(this).val() === 'bitcoin') {
    hidePayment();
    $('#bitcoin').show();
  } else if ($(this).val() === 'credit card') {
    hidePayment();
    $('#credit-card').show();
  } else {
    hidePayment();
  }
});


// ---------------- Validation ----------------------

// name validate
const nameValidate = function(){
  if ($('#name').val()) {
    $('#name').removeClass('validate');
    console.log('name is true');
    return true;
  } else {
    $('#name').addClass('validate');
    console.log('name is false');
    return false;
  }
};

// email validate
const emailValidate = function(){
  let emailValue = $('#mail').val();
  if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)) {
    $('#mail').removeClass('validate');
    console.log('email is true');
    return true;
  } else {
    $('#mail').addClass('validate');
    console.log('email is false');
    return false;
  }
};

// validate credit card
const creditValidate = function(){
  if ($('#payment').val() === 'credit card') {
    let creditValue = $('#cc-num').val();
    if (creditValue === 'good') {
      $('#cc-num').removeClass('validate');
      console.log('card number is true');
      return true;
    } else {
      $('#cc-num').addClass('validate');
      console.log('card number is false');
      return false;
    }
  } else {
    console.log('card number no card');
    return true;
  }
};


// build out this message for bottom of page
// <i id="val-name" class="fas fa-exclamation-circle"><span>  Please enter a valid name</span></i>

// on submit trigger that runs validation function
$('form').on('submit', function(event) {
    event.preventDefault();
    if (nameValidate() &
        emailValidate() &
        creditValidate()) {
      alert('good to go');
    } else {
    }
});
