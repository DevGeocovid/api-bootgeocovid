const puppeteer = require("puppeteer");
const converters = require("./converters");
const Information = require("../models/Information");

module.exports = {
  async robo() {
    console.log("Bem vindo ao Bot CovidES 🤖");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const url = `https://app.powerbi.com/view?r=eyJrIjoiNTlmMDU3ZDEtNDU3Zi00MzZiLTkxN2QtNDhhMDVhOTA2MmU0IiwidCI6IjhiMjA4ZmViLTIyMTYtNDQ1Zi1iZmQxLTk1MjU4ZDlkMjExMSJ9`;

    let result;
    try {
      await Promise.all([
        page.waitForNavigation({ timeout: 60000 }),
        page.goto(url, {
          waitUntil: "networkidle0",
          timeout: 60000,
        }),
      ]);

      result = await page.evaluate(() => {
        const getCases = () =>
          document.querySelector(
            "#pvExplorationHost > div > div > exploration > div > explore-canvas-modern > div > div.canvasFlexBox > div > div.displayArea.disableAnimations.fitToWidthOrigin > div.visualContainerHost > visual-container-repeat > visual-container-modern:nth-child(21) > transform > div > div:nth-child(3) > div > visual-modern > div > svg > g:nth-child(1) > text > tspan"
          ).textContent;
        const getDeaths = () =>
          document.querySelector(
            "#pvExplorationHost > div > div > exploration > div > explore-canvas-modern > div > div.canvasFlexBox > div > div.displayArea.disableAnimations.fitToWidthOrigin > div.visualContainerHost > visual-container-repeat > visual-container-modern:nth-child(23) > transform > div > div:nth-child(3) > div > visual-modern > div > svg > g:nth-child(1) > text > tspan"
          ).textContent;
        const getRefused = () =>
          document.querySelector(
            "#pvExplorationHost > div > div > exploration > div > explore-canvas-modern > div > div.canvasFlexBox > div > div.displayArea.disableAnimations.fitToWidthOrigin > div.visualContainerHost > visual-container-repeat > visual-container-modern:nth-child(16) > transform > div > div:nth-child(3) > div > visual-modern > div > svg > g:nth-child(1) > text > tspan"
          ).textContent;
        const getSuspects = () =>
          document.querySelector(
            "#pvExplorationHost > div > div > exploration > div > explore-canvas-modern > div > div.canvasFlexBox > div > div.displayArea.disableAnimations.fitToWidthOrigin > div.visualContainerHost > visual-container-repeat > visual-container-modern:nth-child(14) > transform > div > div:nth-child(3) > div > visual-modern > div > svg > g:nth-child(1) > text > tspan"
          ).textContent;

        return {
          error: false,
          data: {
            date_register: new Date().toISOString(),
            cases: getCases(),
            deaths: getDeaths(),
            refused: getRefused(),
            suspects: getSuspects(),
          },
        };
      });
    } catch (error) {
      console.log("⛔️ Erro ao recuperar informação!");

      return { ...error };
    }

    if (!result.error) {
      console.log("🛠 Informação recuperada!");
      const { date_register, cases, deaths, refused, suspects } = result.data;

      const idInformation = converters.formatDate(date_register);

      let informationExists = await Information.findOne({
        idInformation: idInformation,
      });

      if (informationExists) {
        console.log("⚠️ Já existe no db! \n");
      } else {
        await Information.create({
          idInformation,
          date_register,
          cases,
          deaths,
          refused,
          suspects,
        });
        console.log("✅ Salvo com sucesso! \n");
      }
    }
    await browser.close();
  },
};
