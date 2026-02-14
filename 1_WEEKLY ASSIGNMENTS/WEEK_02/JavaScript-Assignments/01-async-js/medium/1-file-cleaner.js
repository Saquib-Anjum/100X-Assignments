// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require("fs");
// const data = "";
// fs.readFile("clean.txt", "UTF-8", (err, data) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     data = data;
//     console.log(data);
//   }
// });

//remove all extre space
//To do that we need a regular Expression
//

function cleanFile(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(data);
      const newData = data.replace(/\s+/g, " ");
      fs.writeFile(path, newData, (err) => {
        if (err) console.log(err);
        else console.log("File Updated");
      });
    }
  });
}
cleanFile("clean.txt");
