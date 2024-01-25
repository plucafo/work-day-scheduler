var saveBtn = $(".saveBtn");
var currentDateEl = $("#currentDate");
var currentTimeEl = $("#currentTime");
var timeBlockEl = $(".time-block");

$(function () {
  var currentDateTime = dayjs();
  var date = currentDateTime.format("dddd, MMMM D");
  var time = currentDateTime.format("h:mma");
  var hour = parseInt(currentDateTime.format("H"));
 
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
    currentDateEl.text(date);
    currentTimeEl.text(time);
  }

  updateDateTime();

  setInterval(updateDateTime, 1000); // Updates the time every second
  
  // Adds classes to elements if it a certain time of day
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
