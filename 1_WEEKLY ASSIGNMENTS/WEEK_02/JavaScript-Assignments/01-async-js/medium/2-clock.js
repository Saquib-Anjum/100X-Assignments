// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

function mechinicalTimer() {
  const now = new Date();

  //  - HH:MM::SS (Eg. 13:45:23)
  const time_24_hr = now.toLocaleTimeString("en-GB");

  //  - HH:MM::SS AM/PM (Eg 01:45:23 PM)
  const time_12_hr = now.toLocaleTimeString("en-US");
  console.log("24 hours Clock   ->" + time_24_hr);
  console.log("12 hours Clock   ->" + time_12_hr);
}
mechinicalTimer();
setInterval(mechinicalTimer, 1000);
