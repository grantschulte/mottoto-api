const dbUri = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return `mongodb://localhost/mottoto-test`;
      break;

    case "production":
      return process.env.MONGODB_URI;
      break;

    default:
      return `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
  }
};

module.exports = { dbUri };
