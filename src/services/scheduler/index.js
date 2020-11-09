const schedule = require('node-schedule');
const RecurrenceJob = require('./RecurrenceJob');

class Scheduler {
  constructor () {
    this.jobs = new Map();
  }

  get RecurrenceJob () {
    return RecurrenceJob;
  }

  get numberOfJobs () {
    return this.jobs.size;
  }

  listJobs () {
    console.log(`Scheduled Jobs (${this.numberOfJobs})`);

    let count = 1;
    for (const [key] of this.jobs) {
      console.log(`${count}:`, key);
      count++;
    }
  }

  newJob ({ identifier, rule, job }) {
    if (!this.jobs.has(identifier)) {
      const newJob = schedule.scheduleJob(identifier, rule, job);
      this.jobs.set(identifier, newJob);
    }
  }

  cancelJob (identifier) {
    schedule.cancelJob(identifier);
    this.jobs.delete(identifier);
  }
}

module.exports = new Scheduler();
