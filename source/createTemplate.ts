import { Chalk } from "chalk";
import download from "download-git-repo";
import ora from "ora";
import shell from "shelljs";
import inquirer from "inquirer";

type Props = {
  name: string;
  language: "javascript" | "typescript";
};

function createTemplate({ name, language }: Props) {
  const chalk = new Chalk({ level: 3 });
  console.log(chalk.cyan(`⚛️   React With SWC  ⚛️`));

  const progress = ora();
  progress.start(`create ${chalk.green(name)}, downloading template...\n`);
  download(
    `direct:https://github.com/tohsaka888/swc-react-template.git#${language}`,
    name,
    {
      clone: true,
    },
    (error: Error) => {
      if (error) {
        progress.fail(error.name + error.message);
      } else {
        shell.cd(`./${name}`);
        shell.rm("-rf", ".git", "pnpm-lock.yaml");
        progress.succeed("🎉🎉🎉 succeed download template! 🎉🎉🎉");
        inquirer
          .prompt([
            {
              type: "list",
              name: "package",
              message: "🤔 choose a package manager",
              choices: ["npm", "yarn", "pnpm"],
            },
          ])
          .then((answers) => {
            const progress = ora();
            progress.start();
            shell.exec(`${answers.package} install`, {}, () => {
              progress.succeed("🎉🎉🎉 success download dependencies! 🎉🎉🎉");
              console.log(
                "🚀 run:" +
                  chalk.cyan(
                    answers.package === "npm"
                      ? ` cd ./${name} && npm run dev`
                      : ` cd ./${name} && ${answers.package} dev`
                  )
              );
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  );
}

export default createTemplate;
