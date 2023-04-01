const checkExtension = (fileName) => {
  const EXTENSIONS = ["txt", "css", "json", "js", "yaml", "html"];
  const splitedFileName = fileName.split(".");
  const fileExtension = splitedFileName[splitedFileName.length - 1];
  const result = EXTENSIONS.some((el) => el === fileExtension);
  console.log({ fileExtension, result });

  return { fileExtension, result };
};

module.exports = { checkExtension };
