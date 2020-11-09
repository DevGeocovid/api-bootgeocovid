class RecurrenceJob {
  constructor () {
    this._rule = {
      second: '0',
      minute: '*',
      hour: '*',
      date: '*',
      month: '*',
      daysOfWeek: '*'
    };

    this._step = null;
  }

  get _step () {
    const step = this.__step;
    this.__step = null;
    return step;
  }

  set _step (value) {
    this.__step = value;
  }

  get job () {
    return this._job;
  }

  get identifier () {
    return this._identifier;
  }

  get rule () {
    const { second, minute, hour, date, month, daysOfWeek } = this._rule;
    return `${second} ${minute} ${hour} ${date} ${month} ${daysOfWeek}`;
  }

  setOnRule (segment, value) {
    if (typeof value === 'number') {
      value = value.toString();
    }

    this._rule[segment] = value || `${this._rule[segment]}${this.__step}`;
  }

  /**
   * Informa a tarefa que será executada.
   * @param {function} jobFunction - função a ser executada.
   */
  executeJob (identifier, jobFunction) {
    if (typeof jobFunction !== 'function') {
      throw new Error('Task deve ser uma função.');
    }

    this._identifier = identifier;
    this._job = jobFunction;
    return this;
  }

  /**
   * Informa um valor para a recorrência.
   * @param {number} number - recorrência
   */
  every (number) {
    if (number) {
      this._step = `/${number}`;
    }

    return this;
  }

  /**
   * Informa o segundo que a tarefa deve ser executada, ou
   * que a recorrência é em segundos.
   * @example second(1) | second('1-20') | second('5,8,15-20')
   * @param {number | string} second - segundo a executar a tarefa.
   */
  second (second) {
    this.setOnRule('second', second);
    return this;
  }

  /**
   * Informa o minuto que a tarefa deve ser executada, ou
   * que a recorrência é em minutos.
   * @example minute(1) | minute('1-20') | minute('5,8,15-20')
   * @param {number | string} minute - minuto a executar a tarefa.
   */
  minute (minute) {
    this.setOnRule('minute', minute);
    return this;
  }

  /**
   * Informa a hora que a tarefa deve ser executada, ou
   * que a recorrência é em horas.
   * @example hour(1) | hour('1-20') | hour('5,8,15-20')
   * @param {number | string} hour - hora a executar a tarefa.
   */
  hour (hour) {
    this.setOnRule('hour', hour);
    return this;
  }

  /**
   * Informa o dia que a tarefa deve ser executada, ou
   * que a recorrência é em dias.
   * @example day(1) | day('1-20') | day('5,8,15-20')
   * @param {number | string} day - dia a executar a tarefa.
   */
  day (day) {
    this.setOnRule('day', day);
    return this;
  }

  /**
   * Informa o mês que a tarefa deve ser executada, ou
   * que a recorrência é em meses.
   * @example month(1) | month('1-6') | month('1,4,6-10')
   * @param {number | string} month - mês a executar a tarefa.
   */
  month (month) {
    this.setOnRule('month', month);
    return this;
  }

  /**
   * Informa os dias da semana que a tarefa deve ser executada.
   * `
   *
   *  0 - domingo
   *
   *  1 - segunda
   *
   *  2 - terça
   *
   *  3 - quarta
   *
   *  4 - quinta
   *
   *  5 - sexta
   *
   *  6 - sábado
   *
   *  7 - domingo
   * `
   * @exemple daysOfWeek('1,4-6') - (segunda e de quinta a sábado)
   * @param {number | string} daysOfWeek - dias da semana a executar a tarefa.
   */
  daysOfWeek (daysOfWeek) {
    if (daysOfWeek) {
      this._rule.daysOfWeek = daysOfWeek;
    }
    return this;
  }
}

module.exports = RecurrenceJob;
