var saveBtn = $(".saveBtn");
var currentDateEl = $("#currentDate");
var currentTimeEl = $("#currentTime");
var timeBlockEl = $(".time-block");

$(function () {
  // Saves whatever is typed in the time blocks to local storage when the save button is clicked
  saveBtn.on("click", function () {
    var timeBlock = $(this).parent(".time-block");
    var timeBlockId = timeBlock.attr("id");
    var task = timeBlock.children(".description").val();

    localStorage.setItem(timeBlockId, task);
  });

  // Displays the saved data in each time block field
  for (var i = 9; i < 18; i++) {
    var value = localStorage.getItem(`hour-${i}`);
    var textEl = $(`#hour-${i}`).children(".description");
    textEl.val(value);
  }

  // Displays the date and time on the webpage
  function updateDateTime() {
    var currentDateTime = dayjs();  // Move inside the function to get the current time
    var date = currentDateTime.format("dddd, MMMM D");
    var time = currentDateTime.format("h:mma");

    currentDateEl.text(date);
    currentTimeEl.text(time);

    // Adds classes to elements if it is a certain time of day
    timeBlockEl.each(function () {
      var timeBlock = $(this);
      var timeBlockHour = parseInt(timeBlock.attr("id").split("-")[1]);
      
      // Adds classes to elements if it a certain time of day
      if (timeBlockHour === currentDateTime.hour()) {
        timeBlock.addClass("present");
      } else if (timeBlockHour < currentDateTime.hour()) {
        timeBlock.addClass("past");
      } else {
        timeBlock.addClass("future");
      }
    });
  }

  updateDateTime();

  setInterval(updateDateTime, 1000); // Updates the time every second
  

});
