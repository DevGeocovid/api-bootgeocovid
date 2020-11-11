const lib = require("email"),
  Email = lib.Email;

class MailSend {
  constructor() {
    this.sucess = {
      message: "✅ Salvo com sucesso!",
    };
    this.error = {
      message: "⛔️ Erro ao salvar!",
    };
    this.from = "matheusdasilvarocha@gmail.com";
    this.to = "matheusdasilvarocha@gmail.com";
  }

  /**
   * Metodo de enviar email
   * @param {string} type
   *@example type = 'error' | type = 'sucess'
   * @memberOf Mail
   */
  send(type) {
    let email;
    mail.from = this.from;
    if (type === "sucess") {
      email = new Email({
        to: this.to,
        subject: this.sucess.message,
        body: `Result: ${this.message}`,
      });
      email.send();
    }
    if (type === "error") {
      email = new Email({
        to: this.to,
        subject: this.sucess.message,
        body: `Result: ${this.message}`,
      });
      email.send();
    }
  }
}

module.exports = new MailSend();
