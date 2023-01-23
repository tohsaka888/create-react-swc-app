#!/usr/bin/env node
import { Command } from "commander";
import handleCreate from "./handleCreate.js";

export type ModuleType = "javascript" | "typescript" | "module";

const program = new Command();

program
  .description("create a project")
  .argument("[name]", "project name")
  .option("-ts --typescript", "language")
  .option("-js --javascript", "language")
  .action((name, option) => {
    handleCreate({ name, option }, program.opts());
  });

program.parse(process.argv);
