const MonthMap = require("../models/MonthMap");

module.exports = {
  async create(request, response) {
    const { month, path, code } = request.body;
    console.log(code)
    let monthExists = await MonthMap.findOne({
      code: code,
    });
    if (monthExists) {
      return response.json("⚠️ Já existe no db! \n");
    } else {
      const monthMap = await MonthMap.create({
        month,
        path,
        code,
      });

      return response.json(monthMap);
    }
  },
  async index(request, response) {
    const monthMaps = await MonthMap.find();
    return response.json(monthMaps.reverse());
  },
};
