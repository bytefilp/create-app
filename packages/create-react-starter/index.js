#!/usr/bin/env node

const childProcess = require("child_process");
const ph = require("path");
const fs = require("fs");

const fse = require("fs-extra");
const commander = require("commander");

const info = require("./package.json");

/*
    初始化git
 */
function gitInit() {
  return new Promise((resolve, reject) => {
    const command = "git";
    const args = ["init"];
    const child = childProcess.spawn(command, args, {stdio: "inherit"});
    child.on("close", (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`
        });
        return;
      }
      resolve();
    });
  });
}

/*
    初始化npm
 */
function npmInit() {
  return new Promise((resolve, reject) => {
    const command = process.platform === "win32" ? "npm.cmd" : "npm";
    const args = ["init", "-y"];
    const child = childProcess.spawn(command, args, {stdio: "inherit"});
    child.on("close", (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`
        });
        return;
      }
      resolve();
    });
  });
}

/*
    安装模板项目
 */
function npmInstall() {
  return new Promise((resolve, reject) => {
    const command = process.platform === "win32" ? "npm.cmd" : "npm";
    const args = ["install"];
    const child = childProcess.spawn(command, args, {stdio: "inherit"});
    child.on("close", (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`
        });
        return;
      }
      resolve();
    });
  });
}

/*
    安装模板项目
 */
function install(templateName) {
  return new Promise((resolve, reject) => {
    const command = process.platform === "win32" ? "npm.cmd" : "npm";
    const args = ["install", templateName];
    const child = childProcess.spawn(command, args, {stdio: "inherit"});
    child.on("close", (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`
        });
        return;
      }
      resolve();
    });
  });
}

/*
    复制模板项目到工作区
 */
function copyTemplate(templateName) {
  const nowPath = process.cwd();
  const templatePath = ph.join(nowPath, "node_modules", templateName);
  return new Promise((resolve, reject) => {
    fse.copy(templatePath, nowPath, {overwrite: true}, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/*
    重命名gitignore文件
 */
function renameGitIgnore() {
  const gitIgnoreFilePath = ph.join(process.cwd(), "gitignore");
  const targetGitIgnoreFilePath = ph.join(process.cwd(), ".gitignore");
  if (fs.existsSync("gitignore")) {
    fs.renameSync(gitIgnoreFilePath, targetGitIgnoreFilePath);
  }
}

async function installAction(templateName) {
  await npmInit();
  await install(templateName);
  await copyTemplate(templateName);
  renameGitIgnore();
  await gitInit();
  await npmInstall();
}

function main() {
  commander.name("+").usage(info.description).version(info.version);

  commander.on("command:*", function () {
    commander.help();
  });

  commander
    .command("install <templateName>")
    .alias("i")
    .description("Copy template to current directory")
    .action(installAction);

  commander.parse(process.argv);
}

main();
