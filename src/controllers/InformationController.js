const Information = require("../models/Information");

module.exports = {
  async index(request, response) {
    const informations = await Information.find();
    return response.json(informations);
  },
  async last(request, response) {
    const informations = await Information.find();
    return response.json(informations.pop());
  },

};
