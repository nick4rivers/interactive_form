/* jshint esversion: 6 */


// start by setting focus to the name input
$('#name').focus();

// ---------------- JOB ROLE TEXT BOX ----------------------
// hide it on page load
$('#other-title').hide();

$('#title').on('change', function() {
  if ($(this).val() === 'other') {
    $('#other-title').fadeIn(500);
  }
});


$('i').hide();

