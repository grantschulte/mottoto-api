function getMongoUri(env = process.env.NODE_ENV) {
  switch (env) {
    case "test":
      return `mongodb://localhost/mottoto-test`;
      break;

    case "production":
      return process.env.MONGODB_URI;
      break;

    default:
      return `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
  }
}

function getPort(env = process.env.NODE_ENV) {
  switch (env) {
    case "test":
      return 7000;
      break;

    default:
      return 5000;
  }
}

function getCorsWhitelist(env = process.env.NODE_ENV) {
  switch (env) {
    case "test":
      return ["localhost"];
      break;

    case "production":
      return [
        /\.mottoto\.com$/,
        /\.venomous-comb.surge\.sh$/,
        "https://s3.amazonaws.com/www.mottoto.com/"
      ];
      break;

    default:
      return ["localhost"]
  }
}

module.exports = { getCorsWhitelist, getMongoUri, getPort };
