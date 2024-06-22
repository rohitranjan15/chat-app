const validateSchema = (schema, data) => {
  return new Promise((resolve, reject) => {
    const { error } = schema.validate(data);
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
};

module.exports = {
  validateSchema, // Export the validateSchema function
};
