import { Chalk } from "chalk";
import ora from "ora";
import shell from "shelljs";
import inquirer from "inquirer";
function createTemplate({ name, language }) {
    const chalk = new Chalk({
        level: 3
    });
    console.log(chalk.cyan(`⚛️   React With SWC  ⚛️`));
    const downloadGitRepo = (url, name, branch)=>{
        shell.exec(branch ? `git clone ${url} -b ${branch} ${name}` : `git clone ${url} ${name}`, {
            async: true,
            silent: true
        }, (code, stdout, stderr)=>{
            if (code !== 0) {
                progress.fail(stderr);
            } else {
                shell.cd(`./${name}`);
                shell.rm("-rf", ".git", "pnpm-lock.yaml");
                progress.succeed("🎉🎉🎉 succeed download template! 🎉🎉🎉");
                inquirer.prompt([
                    {
                        type: "list",
                        name: "package",
                        message: "🤔 choose a package manager",
                        choices: [
                            "npm",
                            "yarn",
                            "pnpm"
                        ]
                    }
                ]).then((answers)=>{
                    const progress = ora();
                    progress.start();
                    shell.exec(`${answers.package} install`, {}, ()=>{
                        progress.succeed("🎉🎉🎉 success download dependencies! 🎉🎉🎉");
                        console.log("🚀 run:" + chalk.cyan(answers.package === "npm" ? ` cd ./${name} && npm run dev` : ` cd ./${name} && ${answers.package} dev`));
                    });
                }).catch((error)=>{
                    console.error(error);
                });
            }
        });
    };
    const progress = ora();
    progress.start(`create ${chalk.green(name)}, downloading template...\n`);
    downloadGitRepo(language !== "module" ? `https://github.com/tohsaka888/swc-react-template.git` : `https://github.com/tohsaka888/react-swc-module-template.git`, name, language !== "module" ? language.toLowerCase() : undefined);
}
export default createTemplate;
