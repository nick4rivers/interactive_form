/* jshint esversion: 6 */

// start by setting focus to the name input
$('#name').focus();

// ---------------- JOB ----------------------
// hide it on page load
$('#other-title').hide();

$('#title').on('change', function() {
  if ($(this).val() === 'other') {
    $('#other-title').fadeIn(500);
  }
});


// ---------------- T-SHIRT ----------------------
// Create a select color option and set it on load
$('#color').append('<option value="select">Select T-Shirt Color</option>');
$('#color').val('select');


// get a shirt colors collection, and hide them all
const shirtColors = $('#color option');
shirtColors.hide();

// get value, and and set appropriately on change
$('#design').on('change', function() {
  shirtColors.hide();
  if ($(this).val() === 'js puns') {
    shirtColors.slice(0, 3).show();
    $('#color').val('cornflowerblue');
  } else if ($(this).val() === 'heart js') {
    shirtColors.slice(3, 6).show();
    $('#color').val('tomato');
  } else {
    shirtColors.hide();
    $('#color').val('select');
  }
});

// ---------------- REGISTER ----------------------
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
let costCounter = 0;
let totalCost = 0;

const getCost = function() {
  costCounter = 0;
  const workshopBoxes = checkBoxes.slice(1, 8);
  workshopBoxes.each(function(index, item){
    if (workshopBoxes.eq(index).prop('checked')) {
      costCounter += 1;
    }
  });
  totalCost = 100 * costCounter;
  if (checkBoxes.eq(0).prop('checked')) {
    totalCost += 200;
  }
};

// listen for clicks, calculate and add the total
$('.activities').on('click', function() {
  getCost();
  $('p').remove('.total-cost');
  $('.activities').append('<p class="total-cost">Total registration cost $' + totalCost + '</p>');
});


// ---------------- PAYMENT ----------------------

// a simple hide payment function, with arrow syntax!
const hidePayment = () => {
  $('#paypal').hide();
  $('#bitcoin').hide();
  $('#credit-card').hide();
};

hidePayment();

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
// I know I should refactor some of this, but oh well!!


// name validate
const nameValidate = function(){
  if ($('#name').val()) {
    $('#name').removeClass('validate');
    return true;
  } else {
    $('#name').addClass('validate');
    return false;
  }
};

// email validate
const emailValidate = function(){
  let emailValue = $('#mail').val();
  if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)) {
    $('#mail').removeClass('validate');
    return true;
  } else {
    $('#mail').addClass('validate');
    return false;
  }
};

// regestration validate
const registrationValidate = function(){
  if (totalCost != 0) {
    $('.activities legend').removeClass('validate-text');
    return true;
  } else {
    $('.activities legend').addClass('validate-text');
    return false;
  }
};

// credit card validate
const creditValidate = function(){
  if ($('#payment').val() === 'credit card') {
    let creditValue = $('#cc-num').val();
    if (/^[0-9]{13,17}/.test(creditValue)) {
      $('#cc-num').removeClass('validate');
      return true;
    } else {
      $('#cc-num').addClass('validate');
      return false;
    }
  } else {
    return true;
  }
};

// zip validate
const zipValidate = function(){
  if ($('#payment').val() === 'credit card') {
    let zipValue = $('#zip').val();
    if (/^[0-9]{5}/.test(zipValue)) {
      $('#zip').removeClass('validate');
      return true;
    } else {
      $('#zip').addClass('validate');
      return false;
    }
  } else {
    return true;
  }
};

// cvv validate
const cvvValidate = function(){
  if ($('#payment').val() === 'credit card') {
    let zipValue = $('#cvv').val();
    if (/^[0-9]{3}/.test(zipValue)) {
      $('#cvv').removeClass('validate');
      return true;
    } else {
      $('#cvv').addClass('validate');
      return false;
    }
  } else {
    return true;
  }
};

// validation message
const validationMessage = '<i class="fas fa-exclamation-circle"><span>  Review Registration Information</span></i><br>';

// on submit trigger that runs validation functions
$('form').on('submit', function(event) {
    if (nameValidate() &
        emailValidate() &
        creditValidate() &
        zipValidate() &
        cvvValidate() &
        registrationValidate()) {
      alert('Success!! Thanks for registering');
    } else {
      event.preventDefault();
      $('i').remove();
      $('br').remove();
      $(validationMessage).insertBefore($('button'));
    }
});
