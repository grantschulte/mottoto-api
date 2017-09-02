function createUpdateObject(allowed, body) {
  if (!allowed.length || !body) {
    return {};
  }

  let updateParams = {};

  for (let p in body) {
    if (body.hasOwnProperty(p) && allowed.indexOf(p) >= 0) {
      updateParams[p] = body[p];
    }
  }

  return updateParams;
}

module.exports = { createUpdateObject };
