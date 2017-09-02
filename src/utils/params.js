function createUpdateObject(allowed, body) {
  if (!allowed.length || !body) {
    return {};
  }

  let updateParams = {};

  for (let p in body) {
    if (body.hasOwnProperty(p) && allowed.indexOf(p) >= 0) {
      console.log("ALLOWED", p);
      updateParams[p] = body[p];
    }
  }

  return updateParams;
}

module.exports = { createUpdateObject };
