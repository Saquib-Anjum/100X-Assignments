import fs from "fs";
import { Command } from "commander";

const program = new Command();

program
  .name("todo")
  .description("add todos using cli in todo.json")
  .version("0.8.0");

program
  .command("add")
  .description("Enter todos")
  .arguments("<task>")
  .action((task) => {
    let todos = [];
    let id = 1;
    // check if file exists
    if (fs.existsSync("todo.json")) {
      const data = fs.readFileSync("todo.json", "utf-8");
      todos = data ? JSON.parse(data) : [];
      //let n = todos.length;
      if (todos.length > 0) {
        id = todos[todos.length - 1].id + 1;
      }
    }

    todos.push({
      id: id,
      todo: task,
      done: false,
    });

    fs.writeFileSync("todo.json", JSON.stringify(todos, null, 2));

    console.log("Task added ✅");
  });
//delete the todo with id
program
  .command("delete")
  .description("Enter todos")
  .arguments("<task> id")
  .action((task) => {
    let todos = [];
    console.log(task);
    const id = parseInt(task);
    //check if file exists
    if (fs.existsSync("todo.json")) {
      const data = fs.readFileSync("todo.json", "utf-8");
      todos = data ? JSON.parse(data) : [];
      //let n = todos.length;
      if (todos.length > 0) {
        todos.splice(id - 1, 1);
      }
    }

    fs.writeFileSync("todo.json", JSON.stringify(todos, null, 2));

    console.log("Task deleted ✅");
  });
program.parse(process.argv);
