const puppeteer = require("puppeteer");
const converters = require("../services/converters");
const Information = require("../models/Information");

module.exports = {
  async robo() {
    console.log("Tentarei obter as informações do Painel Covid ES agora !!!");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
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
            "#pvExplorationHost > div > div > exploration > div > explore-canvas > div > div.canvasFlexBox > div > div.displayArea.disableAnimations.fitToWidthOrigin > div.visualContainerHost > visual-container-repeat > visual-container:nth-child(3) > transform > div > div:nth-child(4) > div > visual-modern > div > svg > g:nth-child(1) > text > tspan"
          ).textContent;
        const getDeaths = () =>
          document.querySelector(
            "#pvExplorationHost > div > div > exploration > div > explore-canvas > div > div.canvasFlexBox > div > div.displayArea.disableAnimations.fitToWidthOrigin > div.visualContainerHost > visual-container-repeat > visual-container:nth-child(4) > transform > div > div:nth-child(4) > div > visual-modern > div > svg > g:nth-child(1) > text > tspan"
          ).textContent;
        const getRefused = () =>
          document.querySelector(
            "#pvExplorationHost > div > div > exploration > div > explore-canvas > div > div.canvasFlexBox > div > div.displayArea.disableAnimations.fitToWidthOrigin > div.visualContainerHost > visual-container-repeat > visual-container:nth-child(8) > transform > div > div:nth-child(4) > div > visual-modern > div > svg > g:nth-child(1) > text > tspan"
          ).textContent;
        const getSuspects = () =>
          document.querySelector(
            "#pvExplorationHost > div > div > exploration > div > explore-canvas > div > div.canvasFlexBox > div > div.displayArea.disableAnimations.fitToWidthOrigin > div.visualContainerHost > visual-container-repeat > visual-container:nth-child(7) > transform > div > div:nth-child(4) > div > visual-modern > div > svg > g:nth-child(1) > text > tspan"
          ).textContent;

        debugger;

        return {
          error: false,
          data: {
            date_register: new Date().toISOString(),
            cases: getCases().replace(",", "."),
            deaths: getDeaths().replace(",", "."),
            refused: getRefused().replace(",", "."),
            suspects: getSuspects().replace(",", "."),
          },
        };
      });
    } catch (error) {
      console.log("⛔️ Erro ao recuperar informação!");
      console.log(error);

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
