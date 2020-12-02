const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email {
  constructor() {
    this.message = {
      success: "✅ Salvo com sucesso!",
      error: "⛔️ Erro ao salvar!",
    };
    this.from = "matheusdasilvarocha@gmail.com";
    this.to = ["matheus.rocha.75@edu.ufes.br", "willian.cqueiroz@gmail.com"];
  }

  /**
   * Metodo de enviar email
   * @param {string} type
   *@example type = 'error' | type = 'success'
   * @memberOf Mail
   */
  send({ type, e = null }) {
    const { from, to, message } = this;
    const msg = {
      to,
      from,
      subject: `${e ? "⛔️" : "✅"}Botzão rodou🤖`,
      html: e
        ? `<span>${message[type]}</span>
        <pre>${JSON.stringify(e, null, 2)}</pre>`
        : `<span>${message[type]}</span>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

module.exports = new Email();
