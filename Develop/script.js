var saveBtn = $(".saveBtn");
var currentDateEl = $("#currentDate");
var currentTimeEl = $("#currentTime");
var timeBlockEl = $(".time-block");

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  var currentDateTime = dayjs();
  var date = currentDateTime.format("dddd, MMMM D");
  var time = currentDateTime.format("h:mma");
  var hour = parseInt(currentDateTime.format("H"));
  // var hour = 12;
  console.log(hour);

  saveBtn.on("click", function () {
    var timeBlock = $(this).parent(".time-block");
    var timeBlockId = timeBlock.attr("id");

    var task = timeBlock.find(".description").val();

    localStorage.setItem(timeBlockId, task);
  });
    
  // THIS WORKS for displaying saved text to the text elements - write for loop 
  var value = localStorage.getItem("hour-9")
  var textEl = $('hour-9').children(".description");
  textEl.val(value);
  
    

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


  
  // Sets the Date and Time and writes it to the page whenever the function is called
  function updateDateTime() {
    currentDateEl.text(date);
    currentTimeEl.text(time);
  }

  updateDateTime(); // Set initial Date / Time

  setInterval(updateDateTime, 1000); // Updates the time every second

   // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  timeBlockEl.each(function () {
    var timeBlock = $(this);
  
    var timeBlockHour = parseInt(timeBlock.attr("id").split("-")[1]);
  
    if (timeBlockHour === hour) {
      timeBlock.addClass("present");
    } else if (timeBlockHour < hour) {
      timeBlock.addClass("past");
    } else {
      timeBlock.addClass("future");
    }
  });
});



