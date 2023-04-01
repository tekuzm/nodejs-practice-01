const joi = require("joi");

const dataValidator = (data) => {
  const shema = joi.object({
    fileName: joi.string().required(),
    content: joi.string().required(),
  });

  return shema.validate(data);
};

module.exports = { dataValidator };
