import inquirer from "inquirer";
import createTemplate from "./createTemplate.js";

type Option =
  | {
      javascript: boolean;
    }
  | { typescript: boolean };

type Params = {
  name: string;
  option: Option;
};

const handleCreate = (params: Params, options) => {
  if (params.option) {
    params.option = { javascript: true };
  }
  if (!params.name) {
    inquirer
      // 用户交互
      .prompt([
        {
          type: "input",
          name: "name",
          message: "🤔 project name?",
        },
        {
          type: "list",
          name: "template",
          message: "🤔 choose a template",
          choices: ["JavaScript", "TypeScript"],
        },
      ])
      .then((answers) => {
        createTemplate({ name: answers.name });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    createTemplate({ name: params.name });
  }
};

export default handleCreate;
