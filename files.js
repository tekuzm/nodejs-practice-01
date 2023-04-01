const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");

const { dataValidator } = require("./helpers/dataValidator");
const { checkExtension } = require("./helpers/checkExtension");

const log = console.log;

const getFiles = async () => {
  const pathDir = path.join(__dirname, "files");
  try {
    const dirFiles = await fs.readdir(pathDir);
    if (!dirFiles.length) {
      log(chalk.bgRed("There is no files!"));
    }
    log(chalk.bgGreen(dirFiles));
  } catch (error) {
    log(chalk.bgRedBright(error));
  }
};

const createFile = async (fileName, content) => {
  const file = { fileName, content };
  const result = dataValidator(file);
  const { error } = result;
  if (error) {
    const message = `Please, specify ${error.details[0].context.key}!`;
    log(chalk.bgRed(message));
    return;
  }
  const { fileExtension, result: isContain } = checkExtension(fileName);

  if (!isContain) {
    const message = `This application doesn't support files with ${fileExtension} extension!`;
    log(chalk.bgBlue(message));
    return;
  }

  try {
    await fs.writeFile(
      path.join(__dirname, "files", fileName),
      content,
      "utf-8"
    );
    log(chalk.bgGreenBright("File was successfully created!"));
  } catch (error) {
    log(chalk.bgRedBright(error));
  }
};

module.exports = { createFile, getFiles };
