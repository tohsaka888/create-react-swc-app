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
        const language = answers.template || "javascript";
        createTemplate({ name: answers.name, language: language });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    const language =
      Object.keys(params.option).length === 0
        ? "javascript"
        : (Object.keys(params.option)[0] as "javascript" | "typescript");

    createTemplate({ name: params.name, language });
  }
};

export default handleCreate;
