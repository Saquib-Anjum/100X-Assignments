//count the word from file
import fs from "fs";
import { Command } from "commander";
const program = new Command();
program
  .name("counter")
  .description("Cli to do file based task")
  .version("0.8.0");

program
  .command("count")
  .description("count the number of lines in file")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });
program.parse();
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
