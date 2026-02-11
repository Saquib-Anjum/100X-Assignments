// ## Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.
const fs = require("fs");
const newData = "I have completed my degree";
fs.writeFile("Writefile.txt", newData, (err) => {
  if (err) {
    console.log(err);
  }
});
